import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, tap, pluck, debounceTime  } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../../app.service';
import { UserListItem } from '../../../models/user/user-profile';

@Component({
  selector: 'markdown-mentions',
  templateUrl: './markdown-mentions.component.html',
  styleUrls: ['./markdown-mentions.component.scss']
})
export class MarkdownMentionsComponent implements OnInit {

  /**
   * @description If you wish to use this event emitter, be sure to pass in
   * and empty functions for the onLinkCallback input
   */
  @Output()
  public userIdClicked: EventEmitter<string> = new EventEmitter();

  @Input()
  public set markDown(md: string) {
    this.markDown$.next(md)
  }
  public get markDown() { return this._markDown }

  /**
   * @description Used to pass in a Form Control's `valueChanges`
   */
  @Input()
  public markDown$: Subject<string> = new Subject();

  public rendered$: Observable<string>;
  private _markDown: string;

  /**
   * @description Adds customizable behavior for clicking of a link to a user.
   * 
   * Default behavior is to them to their profile page.
   * 
   * If your callback has `this` in it, be sure to set `this.callbackName = this.callbackName.bind(this)`
   * in the parent class's constructor.
   */
  @Input()
  public onLinkCallback: (userId: string) => void = (userId: string): void => {
    this.router.navigate([`/users/profile/${userId}`]);
  };  

  constructor(
    private store: Store<AppState>,
    private router: Router
    ) { }

  ngOnInit() {    
    this.rendered$ = combineLatest(
        this.markDown$,
        this.store.select('users')
          .pipe(
            pluck<any, UserListItem[]>('userList')
          )
      )
      .pipe(
        debounceTime(100),
        map(([md, users]) => {
          return md.replace(
            /(^@\w+)|(\W)(@\w+)/g,
            (match, g1, g2, g3) => {
              const user = users.find((_user) => _user.userName === (g1 || g3).substring(1));
              if (user) {
                if (g1) {
                  return `<a data-link="${user._id}">${g1}</a>`;
                } else {
                  return `${g2}<a data-link="${user._id}">${g3}</a>`;
                }
              } else {
                return match;
              }
            }
          );
        }),
        tap((md) => this._markDown = md),
      );
  }

  public onClick(e: any) {
    const userId = e.target.getAttribute('data-link');
    if (userId) {
      this.onLinkCallback(userId);
      this.userIdClicked.emit(userId);
    }
  }

}
