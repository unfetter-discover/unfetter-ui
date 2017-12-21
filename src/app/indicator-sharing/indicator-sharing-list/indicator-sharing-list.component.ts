import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/pluck';

import { IndicatorSharingService } from '../indicator-sharing.service';
import { AddIndicatorComponent } from '../add-indicator/add-indicator.component';
import { ConfigService } from '../../core/services/config.service';
import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';

@Component({
    selector: 'indicator-sharing-list',
    templateUrl: 'indicator-sharing-list.component.html',
    styleUrls: ['indicator-sharing-list.component.scss']
})

export class IndicatorSharingListComponent implements OnInit, OnDestroy {

    public displayedIndicators: any[];
    public identities: any[];
    public filteredIndicators: any[];
    public DEFAULT_LENGTH: number = 10;
    public serverCallComplete: boolean = false;
    public indicatorToAttackPatternMap: any = {};
    public indicatorToSensorMap: any = {};
    public SERVER_CALL_COMPLETE = false;
    public sensors: any[];
    public searchParameters;

    constructor(
        private indicatorSharingService: IndicatorSharingService, 
        public dialog: MatDialog,
        private configService: ConfigService,
        public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>
    ) { }

    public ngOnInit() { 
        const getData$ = Observable.forkJoin(
            this.indicatorSharingService.getIdentities(),
            this.indicatorSharingService.getIndicators(),
            this.indicatorSharingService.getAttackPatternsByIndicator(),
            this.indicatorSharingService.getSensors()
        )
        .subscribe(
            (results) => {
                // Identities
                this.identities = results[0].map((r) => r.attributes); 
                this.store.dispatch(new indicatorSharingActions.SetIdentities(this.identities));

                // Indicators
                this.store.dispatch(new indicatorSharingActions.SetIndicators(results[1].map((res) => res.attributes)));

                const filteredIndicatorSub$ = this.store.select('indicatorSharing')
                    .pluck('filteredIndicators')
                    .distinctUntilChanged()
                    .subscribe(
                        (res: any[]) => {
                            this.filteredIndicators = res;
                        },
                        (err) => {
                            console.log(err);
                        },
                        () => {
                            filteredIndicatorSub$.unsubscribe();
                        }
                    );
                
                const displayedIndicatorSub$ = this.store.select('indicatorSharing')
                    .pluck('displayedIndicators')
                    .distinctUntilChanged()
                    .subscribe(
                        (res: any[]) => {
                            this.displayedIndicators = res;
                        },
                        (err) => {
                            console.log(err);
                        },
                        () => {
                            filteredIndicatorSub$.unsubscribe();
                        }
                    );

                const searchParametersSub$ = this.store.select('indicatorSharing')
                    .pluck('searchParameters')
                    .distinctUntilChanged()
                    .subscribe(
                        (res) => {
                            this.searchParameters = res;
                        },
                        (err) => {
                            console.log(err);
                        },
                        () => {
                            searchParametersSub$.unsubscribe();
                        }
                    );

                const indicatorToSensorMap$ = this.store.select('indicatorSharing')
                    .pluck('indicatorToSensorMap')
                    .distinctUntilChanged()
                    .subscribe(
                        (res) => {
                            this.indicatorToSensorMap = res;
                        },
                        (err) => {
                            console.log(err);
                        },
                        () => {
                            searchParametersSub$.unsubscribe();
                        }
                    );
                
                // Attack patterns
                results[2].attributes.forEach((res) => {
                    this.indicatorToAttackPatternMap[res._id] = res.attackPatterns;
                });

                // Sensors with observed data paths
                this.sensors = results[3].map((r) => r.attributes);
                this.store.dispatch(new indicatorSharingActions.SetSensors(this.sensors));
                // this.buildIndicatorToSensorMap();
            },
            (err) => {
                console.log(err);
            },
            () => {
                this.SERVER_CALL_COMPLETE = true;
                getData$.unsubscribe();
            }
        );
    }    

    public ngOnDestroy() {
        this.dialog.closeAll();
        this.store.dispatch(new indicatorSharingActions.ClearData());
    }

    public updateIndicator(newIndicatorState) {
        this.store.dispatch(new indicatorSharingActions.UpdateIndicator(newIndicatorState));
    }

    public openDialog() {
        const dialogRef = this.dialog.open(AddIndicatorComponent, {
            width: '800px',
            height: 'calc(100vh - 50px)'
        });

        const dialogRefClose$ = dialogRef.afterClosed()
            .subscribe((res) => {
                    if (res) {
                        this.store.dispatch(new indicatorSharingActions.AddIndicator(res.indicator));
                        this.store.dispatch(new indicatorSharingActions.FilterIndicators());
                        if (res.newRelationships) {
                            const getPatterns$ = this.indicatorSharingService.getAttackPatternsByIndicator()
                                    .subscribe((patternsRes) => {
                                        patternsRes.attributes.forEach((e) => {
                                            this.indicatorToAttackPatternMap[e._id] = e.attackPatterns;
                                        });
                                    },
                                    (err) => {
                                        console.log(err);
                                    },
                                    () => {
                                        getPatterns$.unsubscribe();
                                    }
                                );
                        }                        
                        // this.buildIndicatorToSensorMap();
                        // TODO handle update in ngrx
                        // this.filterIndicators();
                    }
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    dialogRefClose$.unsubscribe();
                }
            );
    }

    public showMoreIndicators() {
        this.store.dispatch(new indicatorSharingActions.ShowMoreIndicators());
    }

    public displayShowMoreButton() {
        if (!this.SERVER_CALL_COMPLETE || !this.displayedIndicators || this.displayedIndicators.length === 0) {
            return false;
        } else {
            return this.displayedIndicators.length < this.filteredIndicators.length;
        }
    }

    public getAttackPatternsByIndicatorId(indicatorId) {
        return this.indicatorToAttackPatternMap[indicatorId] !== undefined ? this.indicatorToAttackPatternMap[indicatorId] : [];
    }

    public getIdentityNameById(createdByRef) {
        const identityMatch = this.identities && this.identities.length > 0 ? this.identities.find((identity) => identity.id === createdByRef) : null;
        
        if (identityMatch && identityMatch.name !== undefined) {
            return { id: identityMatch.id, name: identityMatch.name};
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
