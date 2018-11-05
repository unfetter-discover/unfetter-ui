import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';

@Component({
    selector: 'indicator-sharing-layout.',
    templateUrl: 'indicator-sharing-layout.component.html',
    styleUrls: ['indicator-sharing-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class IndicatorSharingLayoutComponent implements OnInit, OnDestroy {

    constructor(public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>) { }
    public ngOnInit(): void {
        this.store.dispatch(new indicatorSharingActions.FetchData());
    }
    public ngOnDestroy(): void {
        this.store.dispatch(new indicatorSharingActions.ClearData());
    }
}
