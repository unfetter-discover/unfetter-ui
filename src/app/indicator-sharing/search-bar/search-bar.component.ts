
import { filter, pluck, debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit {

  public searchTerm: FormControl = new FormControl('');

  constructor(
    public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>
  ) { }

  ngOnInit() {
    const getIndicatorName$ = this.store.select('indicatorSharing')
      .pipe(
        pluck('searchParameters'),
        pluck('indicatorName'),
        distinctUntilChanged<string>(),
        filter((indicatorName) => indicatorName !== this.searchTerm.value),
        finalize(() => getIndicatorName$ && getIndicatorName$.unsubscribe())
      )
      .subscribe(
        (indicatorName) => {
          console.log('Setting search term based off of change in NGRX');
          this.searchTerm.patchValue(indicatorName);
        },
        (err) => {
          console.log(err);
        }
      );
    
    const searchChanges$ = this.searchTerm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged<string>(),
        finalize(() => searchChanges$ && searchChanges$.unsubscribe())
      )
      .subscribe(
        (indicatorName) => {
          this.store.dispatch(new indicatorSharingActions.SetSearchParameters({ indicatorName }));
          this.store.dispatch(new indicatorSharingActions.FetchIndicators());
        },
        (err) => {
          console.log(err);
        }
      );   
  }

}
