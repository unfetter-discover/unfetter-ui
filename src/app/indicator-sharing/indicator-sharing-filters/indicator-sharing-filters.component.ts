import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { SearchParameters } from '../models/search-parameters';

@Component({
  selector: 'indicator-sharing-filters',
  templateUrl: './indicator-sharing-filters.component.html',
  styleUrls: ['./indicator-sharing-filters.component.scss']
})
export class IndicatorSharingFiltersComponent implements OnInit {

  public searchForm: FormGroup;
  public killChainPhases$: Observable<any>;
  public labels$: Observable<any>;

  constructor(
    public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>, 
    private fb: FormBuilder
  ) {
    const params = { ...fromIndicatorSharing.initialSearchParameters };
    if (params.indicatorName) {
      delete params.indicatorName;
    }
    this.searchForm = fb.group(params);
    this.searchForm.setValue(fromIndicatorSharing.initialSearchParameters);
  }

  public ngOnInit() {
    const searchChanges$ = this.searchForm.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        (searchParams: SearchParameters) => {
          this.store.dispatch(new indicatorSharingActions.SetSearchParameters(searchParams));
          this.store.dispatch(new indicatorSharingActions.FilterIndicators());
        },
        (err) => {
          console.log(err);
        },
        () => {
          searchChanges$.unsubscribe();
        }
      );

    this.killChainPhases$ = this.store.select('config')
      .pluck('configurations')
      .filter((configurations: any) => configurations.killChains !== undefined)
      .pluck('killChains')
      .filter((killChains: any) => killChains.find((kc) => kc.name === 'mitre-attack') !== null)
      .map((killChains: any) => killChains.find((kc) => kc.name === 'mitre-attack').phase_names);

    this.labels$ = this.store.select('indicatorSharing')
      .pluck('indicators')
      .map((indicators: any) => {
        return indicators
          .filter((indicator) => indicator.labels && indicator.labels.length)
          .map((indicator) => indicator.labels)
          .reduce((prev, cur) => prev.concat(cur), []);
      })
      .map((labels) => {
        const labelSet = new Set(labels);
        return Array.from(labelSet);
      });
  }

  public clearSearchParamaters() {
    this.searchForm.reset(fromIndicatorSharing.initialSearchParameters);
    this.store.dispatch(new indicatorSharingActions.ClearSearchParameters());
  }

}
