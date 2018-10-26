
import { finalize, pluck, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { ChangeDetectorRef } from '@angular/core';
import { SortHelper } from '../../global/static/sort-helper';

export abstract class IndicatorBase {
    public errorMessage: string = null;
    public indicatorToAttackPatternMap = {};
    public intrusionSetToAttackPatternMap = {};
    public identities = [];
    public indicatorToSensorMap = {};
    public SERVER_CALL_COMPLETE = false;

    constructor(
        public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>,
        protected changeDetectorRef: ChangeDetectorRef
    ) { }

    protected initBaseData() {
        const getIdentities$ = this.store.select('stix').pipe(
            pluck('identities'),
            distinctUntilChanged())
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

        const getIndicatorToSensorMap$ = this.store.select('indicatorSharing').pipe(
            pluck('indicatorToSensorMap'),
            distinctUntilChanged())
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

        const getIndicatorToAttackPatternMap$ = this.store.select('indicatorSharing').pipe(
            pluck('indicatorToApMap'),
            distinctUntilChanged())
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

        const getServerCallComplete$ = this.store.select('indicatorSharing').pipe(
            pluck('serverCallComplete'),
            distinctUntilChanged())
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

        const getIntrusionSetToAttackPatternMap$ = this.store.select('indicatorSharing').pipe(
            pluck('intrusionSetsByAttackpattern'),
            finalize(() => getIntrusionSetToAttackPatternMap$ && getIntrusionSetToAttackPatternMap$.unsubscribe()),
            distinctUntilChanged())
                .subscribe(
                    (intrusionSetsByAttackpattern) => {
                        this.intrusionSetToAttackPatternMap = intrusionSetsByAttackpattern;
                    },
                    (err) => {
                        console.log(err);
                    }
                );
    }

    public updateIndicator(newIndicatorState) {
        this.store.dispatch(new indicatorSharingActions.UpdateIndicator(newIndicatorState));
    }

    public getAttackPatternsByIndicatorId(indicatorId) {
        return this.indicatorToAttackPatternMap[indicatorId] !== undefined ? this.indicatorToAttackPatternMap[indicatorId] : [];
    }
    
    /**
     * @param  {string} indicatorId
     * @returns any[]
     * @description takes an indicator ID, finds the attack patterns related to that indicator,
     * then returns the intrusion sets related to that attack pattern
     */
    public getIntrusionSetsByIndicatorId(indicatorId: string): any[] {
        const attackPatterns = this.getAttackPatternsByIndicatorId(indicatorId);
        const isSet = new Set();
        attackPatterns.forEach((ap) => {
            const intrusionSets = this.intrusionSetToAttackPatternMap[ap.id] !== undefined ? this.intrusionSetToAttackPatternMap[ap.id] : [];
            intrusionSets.forEach((is) => isSet.add(JSON.stringify(is)));
        });
        const retVal = Array.from(isSet)
            .map((is) => JSON.parse(is))
            .sort(SortHelper.sortDescByField('name', true));
        return retVal;
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

