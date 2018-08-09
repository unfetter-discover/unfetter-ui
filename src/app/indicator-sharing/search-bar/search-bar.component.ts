
import { filter, pluck, debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { SearchParameters } from '../models/search-parameters';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public searchTerm: FormControl = new FormControl('');

  constructor(
    public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>
  ) { }

  ngOnInit() {
    this.store.select('indicatorSharing')
      .pipe(
        pluck('searchParameters'),
        pluck('indicatorName'),
        take(1)
      )
      .subscribe(
        (indicatorName: string) => {
          if (this.searchTerm.value === '' && indicatorName !== '') {
            this.searchTerm.patchValue(indicatorName);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    
    const searchChanges$ = this.searchTerm.valueChanges.pipe(debounceTime(300),
      distinctUntilChanged())
      .subscribe(
        (indicatorName: string) => {
          this.store.dispatch(new indicatorSharingActions.SetSearchParameters({ indicatorName }));
          this.store.dispatch(new indicatorSharingActions.FetchIndicators());
        },
        (err) => {
          console.log(err);
        },
        () => {
          searchChanges$.unsubscribe();
        }
      );

    const indicatorName$ = this.store.select('indicatorSharing').pipe(
      pluck('searchParameters'),
      pluck('indicatorName'),
      distinctUntilChanged(),
      filter((indicatorName: string) => indicatorName === ''))
      .subscribe(
        (_) => {
          this.searchTerm.setValue('');
        },
        (err) => {
          console.log(err);
        },
        () => {
          indicatorName$.unsubscribe();
        }
      );    
  }

}
