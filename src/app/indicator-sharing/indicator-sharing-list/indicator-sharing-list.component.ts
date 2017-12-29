import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/pluck';

import { IndicatorSharingService } from '../indicator-sharing.service';
import { AddIndicatorComponent } from '../add-indicator/add-indicator.component';
import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { Constance } from '../../utils/constance';
import { IndicatorBase } from '../models/indicator-base-class';

@Component({
    selector: 'indicator-sharing-list',
    templateUrl: 'indicator-sharing-list.component.html',
    styleUrls: ['indicator-sharing-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class IndicatorSharingListComponent extends IndicatorBase implements OnInit, OnDestroy {

    public displayedIndicators: any[];
    public filteredIndicators: any[];
    public DEFAULT_LENGTH: number = 10;
    public searchParameters;

    constructor(
        private indicatorSharingService: IndicatorSharingService, 
        public dialog: MatDialog,
        public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>,
        // Used for SERVER_CALL_COMPLETE, this should be moved to ngrx
        protected changeDetectorRef: ChangeDetectorRef
    ) { 
        super(store, changeDetectorRef);
    }

    public ngOnInit() { 
        this.initBaseData();

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


        const getUser$ = this.store.select('users')
            .take(1)
            .subscribe(
                (users: any) => {
                    console.log(users);
                    this.store.dispatch(new indicatorSharingActions.StartSocialStream(users.userProfile._id));
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    if (getUser$) {
                        getUser$.unsubscribe();
                    }
                }
            );

    }    

    public ngOnDestroy() {
        this.dialog.closeAll();
        // Moved to layout
        // this.store.dispatch(new indicatorSharingActions.ClearData());
    }

    public openDialog() {
        const dialogRef = this.dialog.open(AddIndicatorComponent, {
            width: Constance.DIALOG_WIDTH_MEDIUM,
            height: Constance.DIALOG_HEIGHT_TALL
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
}
