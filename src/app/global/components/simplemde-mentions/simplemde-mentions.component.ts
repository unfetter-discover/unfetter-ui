import { Component, forwardRef, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { of as observableOf, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Simplemde } from 'ng2-simplemde';
import { Key } from 'ts-keycode-enum';
import { take, switchMap, combineAll, map } from 'rxjs/operators';
import * as SimpleMDE from 'simplemde';

import { UserHelpers } from '../../static/user-helpers';
import { SimpleMDEConfig } from '../../static/simplemde-config';
import { HostListener } from '@angular/core';
import { RxjsHelpers } from '../../static/rxjs-helpers';
import { CodeMirrorHelpers, CursorPos } from '../../static/codemirror-helpers';

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

  // TODO delete junk data
  public user$ = observableOf([
    {
      userName: 'Bobby3',
      _id: '1234'
    },
    {
      userName: 'JiMMy4',
      _id: '5678'
    },
    {
      userName: 'todamaxxxxx',
      _id: '5436'
    },
    {
      userName: 'henryhenry',
      _id: '978456'
    }
  ]);
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
    
  private atSignPosition: CursorPos;
  private _showUserMentions = false;
  private codeMirror: any;
  private codeMirrorHelpers: CodeMirrorHelpers;
  private mentionTerm$ = new BehaviorSubject<string>('');
  private onTouchedCallback: () => {};
  private onChangeCallback: (_: any) => {};
  private _innerValue: string;

  @HostListener('document:mousedown', ['$event']) public clickedOutside(event) {
    if (this.showUserMentions && !this.userMentions.nativeElement.contains(event.target)) {
      this.showUserMentions = false;
    }
  }

  get showUserMentions() { return this._showUserMentions }

  set showUserMentions(v: boolean) {
    if (!v) {
      this.mentionTerm$.next('');
    }
    this._showUserMentions = v;
  }

  public ngOnInit() {
    this.displayedUsers$ = combineLatest(this.user$, this.mentionTerm$)
      .pipe(
        map(([users, mentionTerm]) => {
          return users
            .filter((user) => {
              return user.userName.toLowerCase().indexOf(mentionTerm.toLowerCase()) > -1
            })
            .map((user: any) => {
              user.avatar_url = UserHelpers.getAvatarUrl(user);
              return user;
            });          
        }),
        RxjsHelpers.sortByField('userName', 'ASCENDING')
      );
  }

  public ngAfterViewInit() {
    this.codeMirror = this.mde.simplemde.codemirror;
    this.codeMirrorHelpers = new CodeMirrorHelpers(this.codeMirror);

    this.codeMirror.on('keydown', (_, event: KeyboardEvent) => {
      const cursor: CodeMirror.Range | { from: any, to: any } = this.codeMirrorHelpers.getCursor();
      const word = this.codeMirrorHelpers.getWordAt(cursor.to);         
      
      if (cursor.from.line !== cursor.to.line || cursor.from.ch !== cursor.to.ch) {
        // Stop if a multi selection occured
        this.showUserMentions = false;      
      } else if (!this.showUserMentions) {
        // Show mentions menu(s)
        if (event.keyCode === Key.AtSign) {
          this.mentionTerm$.next('');
          this.showUserMentions = true;
          this.codeMirrorHelpers.positionAtCursor(this.userMentions.nativeElement);
        }
      } else if (this.showUserMentions) {
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
          case Key.Escape:
          case Key.Space:
          case Key.AtSign:
            this.showUserMentions = false;
            break;
          case Key.Backspace:
            if (this.value.endsWith('@')) {
              this.showUserMentions = false;
            }
            this.mentionTerm$.next(this.mentionTerm$.value.slice(0, -1));
            break;
          case Key.Enter:
          case Key.Tab:
            event.preventDefault();
            this.addMention();
            break;
          default:
            if (event.keyCode >= 33 && event.keyCode <= 126) {
              this.mentionTerm$.next(this.mentionTerm$.value.concat(event.key));
            }
            this.selectedUserIndex = 0;
        }
      }      
    });
  }

  public addMention() {
    const doc = this.codeMirror.getDoc();
    const cursor = doc.getCursor();

    const pos = {
      line: cursor.line,
      ch: cursor.ch
    };

    combineLatest(this.displayedUsers$, this.mentionTerm$)
      .pipe(take(1))
      .subscribe(([users, mentionTerm]) => {
        // Delete the search string
        if (mentionTerm && mentionTerm.length) {
          pos.ch = pos.ch - mentionTerm.length;
          this.codeMirror.replaceRange('', pos, { line: pos.line, ch: pos.ch + mentionTerm.length });
        }

        // Insert mention
        if (users[this.selectedUserIndex]) {
          const newMention = `${users[this.selectedUserIndex].userName} `;

          doc.replaceRange(newMention, pos);

          requestAnimationFrame(() => {
            this.codeMirror.focus();
            this.codeMirror.setCursor(pos.line, pos.ch + newMention.length);
            this.codeMirror.markText(
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
    if (v !== this._innerValue) {
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
