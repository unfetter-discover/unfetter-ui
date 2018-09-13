import { Component, forwardRef, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { of as observableOf, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Simplemde } from 'ng2-simplemde';
import { Key } from 'ts-keycode-enum';
import { take, switchMap, combineAll, map } from 'rxjs/operators';
import { UserHelpers } from '../../static/user-helpers';

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
  public showUserMentions = false;
  @ViewChild('userMentions') public userMentions: ElementRef;
  @ViewChild('mde') public mde: Simplemde | any;

  private codeMirror: any;
  private mentionTerm$ = new BehaviorSubject('');
  private onTouchedCallback: () => {};
  private onChangeCallback: (_: any) => {};
  private _innerValue: string;

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
        })
      );
  }

  public ngAfterViewInit() {
    this.codeMirror = this.mde.simplemde.codemirror;

    this.codeMirror.on('keydown', (_, event: KeyboardEvent) => {
      if (!this.showUserMentions) {
        if (event.keyCode === Key.AtSign) {
          this.mentionTerm$.next('');
          this.showUserMentions = true;
          const pos = this.codeMirror.cursorCoords();
          const left = pos.left + 10, top = pos.bottom;
          this.userMentions.nativeElement.style.left = left + 'px';
          this.userMentions.nativeElement.style.top = top + 'px';
        }
      } else if (this.showUserMentions) {
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
            // case Key.Space:
            this.showUserMentions = false;
            break;
          case Key.Backspace:
            if (this.value.endsWith('@')) {
              this.showUserMentions = false;
            }
            this.mentionTerm$.next(this.mentionTerm$.value.slice(0, -1));
            break;
          case Key.Enter:
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
