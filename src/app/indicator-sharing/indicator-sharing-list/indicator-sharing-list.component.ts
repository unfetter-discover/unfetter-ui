import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/pluck';

import { AddIndicatorComponent } from '../add-indicator/add-indicator.component';
import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { Constance } from '../../utils/constance';
import { IndicatorBase } from '../models/indicator-base-class';
import { fadeInOut } from '../../global/animations/fade-in-out';
import { ConfirmationDialogComponent } from '../../components/dialogs/confirmation/confirmation-dialog.component';
import { initialSearchParameters } from '../store/indicator-sharing.reducers';
import { IndicatorHeatMapComponent } from '../indicator-heat-map/indicator-heat-map.component';
import { heightCollapse } from '../../global/animations/height-collapse';
import { generateStixRelationship } from '../../global/static/stix-relationship';
import { StixRelationshipTypes } from '../../global/enums/stix-relationship-types.enum';

@Component({
    selector: 'indicator-sharing-list',
    templateUrl: 'indicator-sharing-list.component.html',
    styleUrls: ['indicator-sharing-list.component.scss'],
    animations: [ fadeInOut, heightCollapse ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class IndicatorSharingListComponent extends IndicatorBase implements OnInit, OnDestroy {

    public displayedIndicators: any[];
    public filteredIndicators: any[];
    public DEFAULT_LENGTH: number = 10;
    public searchParameters;
    public filterOpen: boolean = false;
    public filterOpened: boolean = false;
    public showSummaryStats: boolean = false;
    public collapseAllCards: boolean = false;
    public collapseAllCardsSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.collapseAllCards);

    @ViewChild('filterContainer') public filterContainer: MatSidenav;

    constructor(
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
                    if (!this.filterOpened && JSON.stringify(res) !== JSON.stringify(initialSearchParameters)) {
                        // Open container on first valid search if it wasn't already opened
                        this.filterContainer.open();
                    }
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
            .filter((users: any) => users.userProfile && users.userProfile._id)
            .take(1)
            .subscribe(
                (users: any) => {
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
    }

    public openDialog(data?: any) {
        const configObj = {
            width: Constance.DIALOG_WIDTH_MEDIUM,
            height: Constance.DIALOG_HEIGHT_TALL
        };
        if (data) {
            configObj['data'] = data;
        }
        const dialogRef = this.dialog.open(AddIndicatorComponent, configObj);

        const dialogRefClose$ = dialogRef.afterClosed()
            .subscribe(
                (res) => {
                    if (res && !res.editMode) {
                        this.store.dispatch(new indicatorSharingActions.AddIndicator(res.indicator));
                        this.store.dispatch(new indicatorSharingActions.FetchIndicators());
                        if (res.newRelationships) {
                            this.store.dispatch(new indicatorSharingActions.RefreshApMap());
                        } 
                    } else if (res && res.editMode) {
                        this.store.dispatch(new indicatorSharingActions.StartUpdateIndicator(res.indicator));
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
        console.log('Loading more indicators');
        this.store.dispatch(new indicatorSharingActions.ShowMoreIndicators());
        this.changeDetectorRef.markForCheck();    
    }

    public displayShowMoreButton() {
        if (!this.SERVER_CALL_COMPLETE || !this.displayedIndicators || this.displayedIndicators.length === 0) {
            return false;
        } else {
            return this.displayedIndicators.length < this.filteredIndicators.length;
        }
    }

    public openedStart() {
        this.filterOpened = true;
        this.filterOpen = true;
    }

    public closedStart() {
        this.filterOpen = false;
    }

    public deleteIndicator(indicator: any) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { attributes: { name: indicator.name } } });
        const closeDialog$ = dialogRef.afterClosed()
            .subscribe(
                (confirmed) => {
                    if (confirmed) {
                        this.store.dispatch(new indicatorSharingActions.StartDeleteIndicator(indicator.id));
                    }
                },
                (err) => {
                    console.log(err);
                },
                () => closeDialog$.unsubscribe()
            );
    }

    public editIndicator(indicatorToEdit: any) {
        this.openDialog(indicatorToEdit);
    }

    public toggleShowStatistics() {
        this.showSummaryStats = !this.showSummaryStats;
        this.changeDetectorRef.markForCheck();
    }

    public downloadResults() {
        const sensorRelationships: any[] = [];
        const attackPatternIdSet = new Set();
        const sensorIdSet = new Set();

        const indicatorsCopy = this.filteredIndicators
            .map((indicator) => {
                const indicatorCopy = { ...indicator };
                const enhancements: any = {};
                const sensorIds: string[] = this.getSensorsByIndicatorId(indicator.id) ? this.getSensorsByIndicatorId(indicator.id)
                    .map((sensor) => sensor.id) : [];
                const attackPatternIds: string[] = this.getAttackPatternsByIndicatorId(indicator.id)
                    .map((ap) => ap.id);                

                if (indicatorCopy.metaProperties) {
                    delete indicatorCopy.metaProperties;
                }

                if (indicator.metaProperties && indicator.metaProperties.queries) {
                    const generatedQueries = { ...indicator.metaProperties.queries };
                    const queryArr = [];
                    for (let name in generatedQueries) {
                        queryArr.push({ name, query: generatedQueries[name].query });
                    }

                    enhancements.x_unfetter_generated_queries = queryArr;
                }

                if (indicator.metaProperties && indicator.metaProperties.additional_queries) {
                    enhancements.x_unfetter_user_queries = [...indicator.metaProperties.additional_queries];
                }

                if (sensorIds && sensorIds.length) {
                    sensorIds.forEach((sensorId) => {
                        sensorIdSet.add(sensorId)
                        sensorRelationships.push(generateStixRelationship(sensorId, indicator.id, StixRelationshipTypes.X_UNFETTER_CAN_RUN));
                    });
                }

                if (attackPatternIds && attackPatternIds.length) {
                    attackPatternIds.forEach((attackPatternId) => attackPatternIdSet.add(attackPatternId));
                }

                return {
                    ...indicatorCopy,
                    ...enhancements
                };
            });
            
        indicatorsCopy
            .forEach((indicator) => {
                if (indicator.metaProperties) {
                    delete indicator.metaProperties;
                }
            });
        
        console.log(this.filteredIndicators);
        console.log(indicatorsCopy);         
        console.log('####', Array.from(sensorIdSet));  
        console.log('$$$$', Array.from(attackPatternIdSet));  
    }

}
