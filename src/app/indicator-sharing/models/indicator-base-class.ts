import { Store } from '@ngrx/store';

import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { ChangeDetectorRef } from '@angular/core';

export abstract class IndicatorBase {
    public indicatorToAttackPatternMap = {};
    public identities = [];
    public indicatorToSensorMap = {};
    public SERVER_CALL_COMPLETE = false;

    constructor(
        public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>,
        protected changeDetectorRef: ChangeDetectorRef
    ) { }

    protected initBaseData() {
        const getIdentities$ = this.store.select('indicatorSharing')
            .pluck('identities')
            .distinctUntilChanged()
            .subscribe(
                (identities: any[]) => {
                    this.identities = identities;
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    if (getIdentities$) {
                        getIdentities$.unsubscribe();
                    }
                }
            );

        const getIndicatorToSensorMap$ = this.store.select('indicatorSharing')
            .pluck('indicatorToSensorMap')
            .distinctUntilChanged()
            .subscribe(
                (indicatorToSensorMap) => {
                    this.indicatorToSensorMap = indicatorToSensorMap;
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    if (getIndicatorToSensorMap$) {
                        getIndicatorToSensorMap$.unsubscribe();
                    }
                }
            );

        const getIndicatorToAttackPatternMap$ = this.store.select('indicatorSharing')
            .pluck('indicatorToApMap')
            .distinctUntilChanged()
            .subscribe(
                (indicatorToAttackPatternMap) => {
                    this.indicatorToAttackPatternMap = indicatorToAttackPatternMap;
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    if (getIndicatorToAttackPatternMap$) {
                        getIndicatorToAttackPatternMap$.unsubscribe();
                    }
                }
            );

        const getServerCallComplete$ = this.store.select('indicatorSharing')
            .pluck('serverCallComplete')
            .distinctUntilChanged()
            .subscribe(
                (serverCallComplete: boolean) => {
                    // This is to check that it was only assigned once, to avoid change detection errors                    
                    if (!this.SERVER_CALL_COMPLETE && serverCallComplete) {
                        this.SERVER_CALL_COMPLETE = serverCallComplete;
                        this.changeDetectorRef.detectChanges();
                    }
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    if (getServerCallComplete$) {
                        getServerCallComplete$.unsubscribe();
                    }
                }
            );
    }

    public updateIndicator(newIndicatorState) {
        this.store.dispatch(new indicatorSharingActions.UpdateIndicator(newIndicatorState));
    }

    public getAttackPatternsByIndicatorId(indicatorId) {
        return this.indicatorToAttackPatternMap[indicatorId] !== undefined ? this.indicatorToAttackPatternMap[indicatorId] : [];
    }

    public getIdentityNameById(createdByRef) {
        const identityMatch = this.identities && this.identities.length > 0 ? this.identities.find((identity) => identity.id === createdByRef) : null;

        if (identityMatch && identityMatch.name !== undefined) {
            return { id: identityMatch.id, name: identityMatch.name };
        } else {
            return false;
        }
    }

    public getSensorsByIndicatorId(indicatorId) {
        if (Object.keys(this.indicatorToSensorMap).includes(indicatorId)) {
            return this.indicatorToSensorMap[indicatorId];
        } else {
            return null;
        }
    }
}

