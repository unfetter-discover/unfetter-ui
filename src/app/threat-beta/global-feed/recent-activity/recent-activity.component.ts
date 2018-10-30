import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ThreatFeatureState } from '../../store/threat.reducers';

@Component({
  selector: 'recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss']
})
export class RecentActivityComponent implements OnInit {

  /**
   * The full list of comments (with replies) and threatboard article (with comments and replies). Should also list
   * comments made on reports that are a part of the threatboard.
   */
  private _activity = {};

  constructor(private boardStore: Store<ThreatFeatureState>) { }

  ngOnInit() {
    // TODO need reports & articles (that have comments) too
    this.boardStore.select('threat')
      .pipe(
        pluck('boardList')
      )
      .subscribe(
        (boards: any[]) => {
          boards.forEach(board => {
            if (board && board.metaProperties && board.metaProperties.comments) {
              board.metaProperties.comments.forEach(comment => this._activity[comment.id] = comment);
            }
          });
        },
        (err) => console.log(`(${new Date().toISOString()}) Error loading threat boards:`, err)
      );

    // articles.forEach(article => this._activity[article.id] = article);
    // console['debug'](`(${new Date().toISOString()}) activity list:`, this._activity);
    // this._loaded = true;

  }

  public get activity() { return Object.values(this._activity); } // TODO .sort(this.activitySorts[this.activeSort].sorter); }

  public addAComment(comment: any) {
    this._activity[comment.id] = comment;
}
}
