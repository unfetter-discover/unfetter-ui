import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pluck, distinctUntilChanged, finalize, filter } from 'rxjs/operators';

import { SortTypes } from '../models/sort-types.enum';
import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';

@Component({
  selector: 'indicator-sharing-sort',
  templateUrl: './indicator-sharing-sort.component.html',
  styleUrls: ['./indicator-sharing-sort.component.scss']
})
export class IndicatorSharingSortComponent implements OnInit {

  public sortBy: SortTypes = SortTypes.NEWEST;
  public sortTypes = SortTypes;
  
  constructor(public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>) { }

  public ngOnInit() {
    const sortBy$ = this.store.select('indicatorSharing')
      .pipe(
        pluck('sortBy'),
        distinctUntilChanged<SortTypes>(),
        filter((sortBy) => this.sortBy !== sortBy),
        finalize(() => sortBy$ && sortBy$.unsubscribe())
      )
      .subscribe(
        (sortBy: SortTypes) => {
          console.log('Setting sort by based off of change in NGRX');
          this.sortBy = sortBy;          
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public sortIndicators() {
    this.store.dispatch(new indicatorSharingActions.SetSortBy(this.sortBy));
    this.store.dispatch(new indicatorSharingActions.FetchIndicators());
  }

}
