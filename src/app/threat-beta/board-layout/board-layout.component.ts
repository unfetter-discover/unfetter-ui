import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { filter, pluck, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ThreatFeatureState } from '../store/threat.reducers';
import * as fromThreat from '../store/threat.actions';

@Component({
  selector: 'board-layout',
  templateUrl: './board-layout.component.html',
  styleUrls: ['./board-layout.component.scss']
})
export class BoardLayoutComponent implements OnInit {
  public finishedLoadingAll$: Observable<boolean> = new BehaviorSubject(true).asObservable(); // TODO

  public failedToLoad = new BehaviorSubject(false).asObservable();

  public boardId$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<ThreatFeatureState>
  ) { }

  ngOnInit() {
    this.boardId$ = this.route.params
      .pipe(
        filter((params) => params && params.boardId),
        pluck('boardId')
      );

    const selectedBoard$: Subscription = this.boardId$
      .pipe(finalize(() => selectedBoard$ && selectedBoard$.unsubscribe()))
      .subscribe(
        (id) => {
          this.store.dispatch(new fromThreat.SetSelectedBoardId(id));
        },
        (err) => {
          console.log(err);
        }
      );
  }

}
