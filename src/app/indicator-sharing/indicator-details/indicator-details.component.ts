import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { IndicatorBase } from '../models/indicator-base-class';

@Component({
  selector: 'app-indicator-details',
  templateUrl: './indicator-details.component.html',
  styleUrls: ['./indicator-details.component.scss']
})
export class IndicatorDetailsComponent extends IndicatorBase implements OnInit {

  public indicator: any;
  private id: string;
  private retryFetch: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>,
    protected changeDetectorRef: ChangeDetectorRef
  ) { 
    super(store, changeDetectorRef);
  }

  public ngOnInit() {
    const getId$ = this.route.params
      .pluck('id')
      .subscribe(
        (id: string) => {
          this.errorMessage = null;
          this.indicator = null;

          // Reset retryFetch if new ID
          if (this.id && id !== this.id) {
            this.retryFetch = true;
          }
          
          this.id = id;
          this.initBaseData();
          this.initData();
        },
        (err) => {
          console.log(err);
        },
        () => {
          if (getId$) {
            getId$.unsubscribe();
          }
        }
      );
  }

  private initData() {
    const indicators$ = this.store.select('indicatorSharing')
      .pluck('indicators')
      .distinctUntilChanged()
      .filter((indicators: any[]) => indicators.length > 0)
      .subscribe(
        (indicators: any[]) => {
          const findIndicator = indicators.find((indicator) => indicator.id === this.id);
          if (findIndicator) {
            this.indicator = findIndicator;

            // If data isn't found, reload data, but only try it once
          } else if (this.retryFetch) {
            this.store.dispatch(new indicatorSharingActions.FetchData());

            // Still not found after retry
          } else if (!this.retryFetch && this.SERVER_CALL_COMPLETE) {
            this.errorMessage = 'Can not find analytic.';
          }
          this.retryFetch = false;
        },
        (err) => {
          console.log(err);
        },
        () => {
          indicators$.unsubscribe();
        }
      );
  }
}
