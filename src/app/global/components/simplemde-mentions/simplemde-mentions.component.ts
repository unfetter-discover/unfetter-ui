import { Component, forwardRef, ViewChild, ElementRef, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { of as observableOf, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { take, switchMap, combineAll, map, pluck, withLatestFrom, filter } from 'rxjs/operators';
import { Simplemde } from 'ng2-simplemde';
import { Key } from 'ts-keycode-enum';
import * as SimpleMDE from 'simplemde';
import { Store } from '@ngrx/store';

import { UserHelpers } from '../../static/user-helpers';
import { SimpleMDEConfig } from '../../static/simplemde-config';
import { RxjsHelpers } from '../../static/rxjs-helpers';
import { CodeMirrorHelpers } from '../../static/codemirror-helpers';
import { UserListItem, UserProfile } from '../../../models/user/user-profile';
import { AppState } from '../../../root-store/app.reducers';
import { getOrganizations } from '../../../root-store/users/user.selectors';

interface MentionTerm {
  wordRange: CodeMirror.Range,
  term: string,
  currentPos?: CodeMirror.Position
}

@Component({
  selector: 'simplemde-mentions',
  templateUrl: './simplemde-mentions.component.html',
  styleUrls: ['./simplemde-mentions.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SimplemdeMentionsComponent),
      multi: true
    }
  ]
})
export class SimplemdeMentionsComponent implements ControlValueAccessor, AfterViewInit, OnInit {

  /**
   * @description The length of the list of users in user mentions
   */
  public readonly DISPLAYED_USER_LIMIT = 5;

  public user$: Observable<UserListItem[]>;
  public displayedUsers$: Observable<any>;
  public selectedUserIndex = 0;
  @ViewChild('userMentions') public userMentions: ElementRef;
  @ViewChild('mde') public mde: Simplemde | any;
  
  public mdeOptions: SimpleMDE.Options = {
    ...SimpleMDEConfig.basicConfig,
    previewRender(input) {
      const rendered = this.parent.markdown(input);
      return rendered.replace(
        /(^@\w+)|(\W)(@\w+)/g,
        (match, g1, g2, g3) => {
          if (g1) {
            return `<span class="mentionHighlight">${g1}</span>`;
          } else {
            return `${g2}<span class="mentionHighlight">${g3}</span>`;
          }
        }
      );
    }
  };

  private _showUserMentions = false;
  private codeMirror: CodeMirror.Editor;
  private codeMirrorHelpers: CodeMirrorHelpers;
  private initMentionTerm: MentionTerm = {
    wordRange: {
      anchor: { line: -1, ch: -1 },
      head: { line: -1, ch: -1 }
    } as CodeMirror.Range,
    term: ''
  };
  private mentionTerm$ = new BehaviorSubject<MentionTerm>(this.initMentionTerm);
  private onTouchedCallback: () => {};
  private onChangeCallback: (_: any) => {};
  private _innerValue: string;

  @HostListener('document:mousedown', ['$event']) public clickedOutside(event) {
    if (this.showUserMentions && !this.userMentions.nativeElement.contains(event.target)) {
      this.showUserMentions = false;
    }
  }

  constructor(private store: Store<AppState>) { }

  get showUserMentions() { return this._showUserMentions }

  set showUserMentions(v: boolean) {
    if (!v) {
      this.mentionTerm$.next(this.initMentionTerm);
    }
    this._showUserMentions = v;
  }

  public ngOnInit() {
    this.user$ = this.store.select('users').pipe(pluck('userList'));
    
    this.displayedUsers$ = combineLatest(this.user$, this.mentionTerm$)
      .pipe(
        map(([users, mentionTerm]) => {
          const splitTerm = mentionTerm.term.split('@');
          const term = splitTerm.length > 1 && splitTerm[1] ? splitTerm[1].toLowerCase() : null;
          if (!term) {
            return users;
          } else {
            return users
              .filter((user) => user.userName.toLowerCase().indexOf(term) > -1 
                || user.firstName.toLowerCase().indexOf(term) > -1 
                || user.lastName.toLowerCase().indexOf(term) > -1);
          }     
        }),
        RxjsHelpers.sortByField('userName', 'ASCENDING'),
        withLatestFrom(this.store.select(getOrganizations)),
        map(([displayedUsers, organizations]) => {          
          if (!organizations.length) {
            return displayedUsers;
          }
          // Prioritize users in same org(s) after alphabetical sort
          return displayedUsers
            .sort((a, b) => {
              let aOrg = UserHelpers.getNumMatchingOrgs(organizations, a);
              let bOrg = UserHelpers.getNumMatchingOrgs(organizations, b);
              if (aOrg > aOrg) {
                return -1;
              } else if (aOrg < bOrg) {
                return 1;
              } else {
                return 0;
              }
            });
        }),
        withLatestFrom(this.store.select('users').pipe(pluck<any, UserProfile>('userProfile'))),
        map(([displayedUsers, userProfile]) => {
          const userName = userProfile && userProfile.userName;
          // Remove user from user list, slice to limit
          return displayedUsers
            .filter((user) => userName ? user.userName !== userName : true)
            .slice(0, this.DISPLAYED_USER_LIMIT);
        })        
      );
  }

  public ngAfterViewInit() {
    this.codeMirror = this.mde.simplemde.codemirror;
    this.codeMirrorHelpers = new CodeMirrorHelpers(this.codeMirror);

    this.codeMirror.on('keydown', (_, event: KeyboardEvent) => {
      const cursor = this.codeMirrorHelpers.getCursor();
      const word = this.codeMirrorHelpers.getWordAt(cursor.to);        
      
      if (cursor.from.line !== cursor.to.line || cursor.from.ch !== cursor.to.ch) {
        // Stop if a multi selection occured
        this.showUserMentions = false;    
      } else if (!this.showUserMentions) {
        // Show mentions menu(s) if @ and cursor at begining of a line or word
        if (event.keyCode === Key.AtSign && (cursor.to.ch === 0 || this.codeMirror.getTokenAt(cursor.to).string.match(/\s/))) {
          this.mentionTerm$.next(this.initMentionTerm);
          this.showUserMentions = true;
          this.codeMirrorHelpers.positionAtCursor(this.userMentions.nativeElement);
          this.mentionTerm$.next({
            wordRange: word.range,
            term: '@'
          });
        }
      } else if (this.showUserMentions) {
        const inRange = this.codeMirrorHelpers.checkIfInRange(this.mentionTerm$.value.wordRange, cursor.to);
        // Handle mentions
        switch (event.keyCode) {
          case Key.UpArrow:
            if (this.selectedUserIndex > 0) {
              this.selectedUserIndex--;
            }
            event.preventDefault();
            break;
          case Key.DownArrow:            
            this.user$.pipe(take(1)).subscribe((users) => {
              if (this.selectedUserIndex + 1 < users.length) {
                this.selectedUserIndex++;
              }
            });
            event.preventDefault();
            break;
          case Key.LeftArrow:
          case Key.RightArrow:
            if (!inRange) {
              this.showUserMentions = false;
            }
            break;
          case Key.Escape:
          case Key.Space:
          case Key.AtSign:
            this.showUserMentions = false;
            break;
          case Key.Backspace:
            if (this.codeMirror.getTokenAt(cursor.to).string.match(/[@\s]/)) {
              // Close mention if at whitespace or an `@` sign
              this.showUserMentions = false;
            } else if (inRange) {
              // Handle character deletion
              const predictedWord = this.codeMirrorHelpers.predictDeletion(word, cursor.to);
              const updatedRange = {
                ...word.range,
                head: {
                  ...word.range.head,
                  ch: word.range.head.ch - 1
                }                
              };
              this.mentionTerm$.next({
                wordRange: updatedRange,
                term: predictedWord
              });
            } else {
              this.showUserMentions = false;
            }
            break;
          case Key.Enter:
          case Key.Tab:
            event.preventDefault();
            this.addMention();
            break;
          default:
            if (!inRange && this.mentionTerm$.value.term.length > 1) {
              this.showUserMentions = false;
            } else if (event.keyCode >= 33 && event.keyCode <= 126) {
              const predictedWord = this.codeMirrorHelpers.predictWord(word, cursor.to, event.key);
              this.mentionTerm$.next({
                wordRange: word.range,
                term: predictedWord
              });
            }
            this.selectedUserIndex = 0;
        }
      }      
    });
  }

  public addMention() {
    combineLatest(this.displayedUsers$, this.mentionTerm$)
      .pipe(take(1))
      .subscribe(([users, mentionTerm]) => {
        const doc = this.codeMirror.getDoc();
        
        // Delete the search string
        const pos = mentionTerm.wordRange.anchor;
        if (mentionTerm && mentionTerm.term.length) {
          const rangeToReplace = this.codeMirrorHelpers.getMentionTermRange(mentionTerm.wordRange);
          pos.ch = rangeToReplace.start;
          const line = mentionTerm.wordRange.anchor.line;
          doc.replaceRange('', { line, ch: rangeToReplace.start }, { line, ch: rangeToReplace.end + 1 });
        }

        // // Insert mention
        if (users[this.selectedUserIndex]) {
          const newMention = `@${users[this.selectedUserIndex].userName} `;

          doc.replaceRange(newMention, pos);

          requestAnimationFrame(() => {
            this.codeMirror.focus();
            doc.setCursor(pos.line, pos.ch + newMention.length);
            doc.markText(
              { line: pos.line, ch: pos.ch - 1 },
              { line: pos.line, ch: pos.ch + newMention.length - 1 },
              { className: 'mentionHighlight' }
            );
          });
          this.showUserMentions = false;
        }
      });
  }

  set value(v: string) {
    if (v !== this._innerValue && this.onChangeCallback) {
      this._innerValue = v;
      this.onChangeCallback(v);
    }
  }

  get value(): string {
    return this._innerValue;
  }

  /**
   * @override ControlValueAccessor
   * @param fn
   */
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  /**
   * @override ControlValueAccessor
   * @param fn 
   */
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  /**
   * @override ControlValueAccessor
   * @param v 
   */
  writeValue(v: string) {
    if (v !== this._innerValue) {
      this._innerValue = v;
    }
  }
}
