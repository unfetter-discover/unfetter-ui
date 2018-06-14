
import {finalize, debounceTime, distinctUntilChanged, pluck, map, filter, withLatestFrom} from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material';

import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { SearchParameters } from '../models/search-parameters';
import { IndicatorHeatMapFilterComponent } from '../indicator-tactics/indicator-heatmap-filter.component';
import { getPreferredKillchainPhases } from '../../root-store/config/config.selectors';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { ConfigKeys } from '../../global/enums/config-keys.enum';
import { UserState } from '../../root-store/users/users.reducers';
import { ObservedDataFilterComponent } from './observed-data-filter/observed-data-filter.component';
import { Constance } from '../../utils/constance';

@Component({
  selector: 'indicator-sharing-filters',
  templateUrl: './indicator-sharing-filters.component.html',
  styleUrls: ['./indicator-sharing-filters.component.scss']
})
export class IndicatorSharingFiltersComponent implements OnInit {

  public searchForm: FormGroup;
  public killChainPhases$: Observable<string[]>;
  public labels$: Observable<string[]>;
  public dataSources$: Observable<string[]>;
  public intrusionSets$: Observable<any[]>;
  public organizations$: Observable<any[]>;
  public sensors$: Observable<any[]>;
  public heatmapVisible = false;
  public observedDataVisible = false;
  public attackPatterns: any[] = [];

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
    this.organizations$ = this.store.select('indicatorSharing')
      .pipe(pluck('identities'));
    this.sensors$ = this.store.select('indicatorSharing')
      .pipe(pluck('sensors'));
  }

  public ngOnInit() {
    const searchChanges$ = this.searchForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged())
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
      
    this.killChainPhases$ = this.store.select(getPreferredKillchainPhases);

    this.labels$ = this.store.select('indicatorSharing').pipe(
      pluck('indicators'),
      map((indicators: any) => {
        return indicators
          .filter((indicator) => indicator.labels && indicator.labels.length)
          .map((indicator) => indicator.labels)
          .reduce((prev, cur) => prev.concat(cur), []);
      }),
      map((labels: string[]) => {
        const labelSet = new Set(labels);
        return Array.from(labelSet);
      }));

    this.dataSources$ = this.store.select('config').pipe(
      pluck('configurations'),
      filter(RxjsHelpers.filterByConfigKey(ConfigKeys.DATA_SOURCES)),
      pluck(ConfigKeys.DATA_SOURCES),
      map((dataSources: string[]) => dataSources.sort()));

    const getAttackPatterns$ = this.store.select('indicatorSharing').pipe(
      pluck('attackPatterns'),
      withLatestFrom(this.store.select('users')))
      .subscribe(
        ([attackPatterns, user]: [any[], UserState]) => {
          if (user.userProfile.preferences && user.userProfile.preferences.killchain) {
            this.attackPatterns = attackPatterns
              .filter((ap) => {
                return ap.kill_chain_phases &&
                  ap.kill_chain_phases
                    .map((kc) => kc.kill_chain_name)
                    .includes(user.userProfile.preferences.killchain);
              });
          } else {
            this.attackPatterns = attackPatterns;
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          if (getAttackPatterns$) {
            getAttackPatterns$.unsubscribe();
          }
        }
    );

    this.intrusionSets$ = this.store.select('indicatorSharing').pipe(
      pluck('intrusionSets'));
  }

  public clearSearchParameters() {
    this.searchForm.reset({ ...fromIndicatorSharing.initialSearchParameters });
    this.store.dispatch(new indicatorSharingActions.ClearSearchParameters());
  }

  public toggleObservedDataDialog() {
    if (this.observedDataVisible) {
      this.observedDataVisible = false;
      this.dialog.closeAll();
    } else {
      this.observedDataVisible = true;
      const dialog = this.dialog.open(ObservedDataFilterComponent, {
        width: Constance.DIALOG_WIDTH_MEDIUM,
        height: Constance.DIALOG_HEIGHT_TALL,
        hasBackdrop: true,
        disableClose: false,
        closeOnNavigation: true,
        data: {
          formCtrl: this.searchForm.get('observedData')
        }
      });
      const dialog$ = dialog.afterClosed().pipe(
        finalize(() => dialog$ && dialog$.unsubscribe()))
        .subscribe(
          (result) => {
            this.observedDataVisible = false;
          },
          (err) => console.log(err),
        );
    }
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
      const dialog = this.dialog.open(IndicatorHeatMapFilterComponent, {
        width: 'calc(100vw - 400px)',
        height: '600px',
        hasBackdrop: true,
        disableClose: false,
        closeOnNavigation: true,
        position: {
          left: '345px',
        },
        data: {
          active: this.searchForm.value.attackPatterns,
        },
      });
      dialog.afterClosed().subscribe(
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
