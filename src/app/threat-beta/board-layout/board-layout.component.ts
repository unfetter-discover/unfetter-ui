import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { filter, pluck, finalize, switchMap, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ThreatFeatureState } from '../store/threat.reducers';
import * as fromThreat from '../store/threat.actions';

@Component({
  selector: 'board-layout',
  templateUrl: './board-layout.component.html',
  styleUrls: ['./board-layout.component.scss']
})
export class BoardLayoutComponent implements OnInit {
  public finishedLoadingAll$: Observable<boolean>; // TODO

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

    const selectedBoardChange$: Subscription = this.store.select('threat')
      .pipe(
        filter((threat) => threat.dashboardLoadingComplete),
        take(1),
        switchMap(() => this.boardId$),
        finalize(() => selectedBoardChange$ && selectedBoardChange$.unsubscribe())
      )
      .subscribe(
        (id) => {
          this.store.dispatch(new fromThreat.SetSelectedBoardId(id));
          this.store.dispatch(new fromThreat.FetchBoardDetailedData(id));
        },
        (err) => {
          console.log(err);
        }
      );

    this.finishedLoadingAll$ = this.store.select('threat').pipe(pluck('threatboardLoadingComplete'));
  }

}
