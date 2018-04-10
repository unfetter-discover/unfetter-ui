import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material';

import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { SearchParameters } from '../models/search-parameters';
import { IndicatorHeatMapComponent } from '../indicator-heat-map/indicator-heat-map.component';

@Component({
  selector: 'indicator-sharing-filters',
  templateUrl: './indicator-sharing-filters.component.html',
  styleUrls: ['./indicator-sharing-filters.component.scss']
})
export class IndicatorSharingFiltersComponent implements OnInit {

  public searchForm: FormGroup;
  public killChainPhases$: Observable<any>;
  public labels$: Observable<any>;
  private heatmapVisible = false;

  constructor(
    public dialog: MatDialog,
    public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>, 
    private fb: FormBuilder
  ) {
    const params = { ...fromIndicatorSharing.initialSearchParameters };
    try {
      delete params.indicatorName;
    } catch (e) { }
    this.searchForm = fb.group(params);
    this.searchForm.setValue(params);
  }

  public ngOnInit() {
    const searchChanges$ = this.searchForm.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        (searchParams: SearchParameters) => {
          this.store.dispatch(new indicatorSharingActions.SetSearchParameters(searchParams));
          this.store.dispatch(new indicatorSharingActions.FetchIndicators());
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

  public clearSearchParameters() {
    this.searchForm.reset(fromIndicatorSharing.initialSearchParameters);
    this.store.dispatch(new indicatorSharingActions.ClearSearchParameters());
  }

  /**
   * @description Displays a slide-out that shows the user a heat map of all attack patterns for filtering
   */
  public toggleHeatMapDialog() {
    if (this.heatmapVisible) {
      this.heatmapVisible = false;
      this.dialog.closeAll();
    } else {
      this.heatmapVisible = true;
      this.dialog.open(IndicatorHeatMapComponent, {
        width: 'calc(100vw - 400px)',
        height: '500px',
        hasBackdrop: true,
        disableClose: false,
        closeOnNavigation: true,
        position: {
          left: '345px',
        },
        data: {
          active: this.searchForm.value.attackPatterns,
        },
      }).afterClosed().subscribe(
        result => {
          if (result) {
            this.searchForm.get('attackPatterns').patchValue(result);
          }
          this.heatmapVisible = false;
        },
        (err) => console.log(err),
      );
    }
  }

}
