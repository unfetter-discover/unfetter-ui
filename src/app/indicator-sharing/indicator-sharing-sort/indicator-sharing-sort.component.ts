import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { SortTypes } from '../models/sort-types.enum';
import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';

@Component({
  selector: 'indicator-sharing-sort',
  templateUrl: './indicator-sharing-sort.component.html',
  styleUrls: ['./indicator-sharing-sort.component.scss']
})
export class IndicatorSharingSortComponent implements OnInit {

  public sortBy: string = 'NEWEST';
  public sortTypes = SortTypes;
  
  constructor(public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>) { }

  ngOnInit() {
  }

  public sortIndicators() {
    this.store.dispatch(new indicatorSharingActions.SortIndicators(this.sortBy));
    this.store.dispatch(new indicatorSharingActions.FetchIndicators());
  }

}
