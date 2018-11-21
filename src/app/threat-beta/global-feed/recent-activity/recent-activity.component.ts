import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck, distinctUntilChanged, take } from 'rxjs/operators';
import { ThreatFeatureState } from '../../store/threat.reducers';
import { ThreatBoard } from 'stix/unfetter/index';
import { AppState } from '../../../app.service';
import { User } from '../../../models/user/user';
import { AngularHelper } from '../../../global/static/angular-helper';

@Component({
  selector: 'recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentActivityComponent implements OnInit {

  /**
   * The full list of comments (with replies) and threatboard article (with comments and replies). Should also list
   * comments made on reports that are a part of the threatboard.
   */
  public board$: Observable<any>;
  public user: User;

  constructor(private boardStore: Store<ThreatFeatureState>,
              private appStore: Store<AppState>) { }

  ngOnInit() {
    this.appStore.select('users')
    .pipe(
      pluck('userProfile'),
      take(1),
    )
    .subscribe(
      (user: User) => {
        console['debug'](`(${new Date().toISOString()}) got user info:`, user);
        this.user = user;
      },
      err => console.log('could not load user', err)
    );
    // TODO need reports & articles (that have comments) too
    this.board$ = this.boardStore.select('threat')
      .pipe(
        pluck('boardList'),
        distinctUntilChanged((a: ThreatBoard[], b: ThreatBoard[]) => JSON.stringify(a) === JSON.stringify(b)),
      );
      // .subscribe(
      //   (res) => { },
      //   (err) => console.log(`(${new Date().toISOString()}) Error loading threat boards:`, err)
      //   // () => this.board$.unsubscribe()
      // );
    // articles.forEach(article => this._activity[article.id] = article);
    // console['debug'](`(${new Date().toISOString()}) activity list:`, this._activity);
    // this._loaded = true;

  }

  public trackByFn(index: number, item: any): number {
    return AngularHelper.genericTrackBy(index, item);
  }
}
