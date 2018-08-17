import { take, filter, pluck, distinctUntilChanged, finalize, debounceTime, map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable ,  BehaviorSubject } from 'rxjs';

import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { Constance } from '../../utils/constance';
import { IndicatorBase } from '../models/indicator-base-class';
import { fadeInOut } from '../../global/animations/fade-in-out';
import { ConfirmationDialogComponent } from '../../components/dialogs/confirmation/confirmation-dialog.component';
import { initialSearchParameters } from '../store/indicator-sharing.reducers';
import { heightCollapse } from '../../global/animations/height-collapse';
import { generateStixRelationship } from '../../global/static/stix-relationship';
import { StixRelationshipTypes } from '../../global/enums/stix-relationship-types.enum';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { downloadBundle } from '../../global/static/stix-bundle';
import { SearchParameters } from '../models/search-parameters';

type mainWell = 'stats' | 'attackPatternsUsed' | 'none';

@Component({
    selector: 'indicator-sharing-list',
    templateUrl: 'indicator-sharing-list.component.html',
    styleUrls: ['indicator-sharing-list.component.scss'],
    animations: [fadeInOut, heightCollapse],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndicatorSharingListComponent extends IndicatorBase implements OnInit, OnDestroy {

    public displayedIndicators: any[];
    public filteredIndicators: any[];
    public DEFAULT_LENGTH: number = Constance.INDICATOR_SHARING.DEFAULT_LIST_LENGTH;
    public filterOpen: boolean = false;
    public filterOpened: boolean = false;
    public collapseAllCards: boolean = true;
    public activeMainWell: mainWell = 'attackPatternsUsed';
    public totalIndicatorCount$: Observable<number>;
    public userToken$: Observable<string>;
    public collapseAllCardsSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.collapseAllCards);
    public initialHighlightObj = {
        labels: {},
        intrusionSets: {},
        phases: {}
    };
    public highlightObj = { ...this.initialHighlightObj };
    public filtersInitOpen$: Observable<boolean>;

    @ViewChild('filterContainer') public filterContainer: MatSidenav;

    constructor(
        public dialog: MatDialog,
        public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>,
        private indicatorSharingService: IndicatorSharingService,
        // Used for SERVER_CALL_COMPLETE, this should be moved to ngrx
        protected changeDetectorRef: ChangeDetectorRef
    ) {
        super(store, changeDetectorRef);
        this.totalIndicatorCount$ = this.store.select('indicatorSharing')
            .pipe(pluck('totalIndicatorCount'));

        this.filtersInitOpen$ = this.store.select('indicatorSharing')
            .pipe(
                pluck('searchParameters'),
                take(1),
                map((searchParameters) => JSON.stringify(searchParameters) !== JSON.stringify(initialSearchParameters))
            );
    }

    public ngOnInit() {
        this.initBaseData();

        const filteredIndicatorSub$ = this.store.select('indicatorSharing').pipe(
            pluck('filteredIndicators'),
            distinctUntilChanged())
            .subscribe(
                (res: any[]) => this.filteredIndicators = res,
                (err) => console.log(err),
                () => filteredIndicatorSub$.unsubscribe()
            );

        const displayedIndicatorSub$ = this.store.select('indicatorSharing').pipe(
            pluck('displayedIndicators'),
            distinctUntilChanged())
            .subscribe(
                (res: any[]) => {
                    this.displayedIndicators = res;
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    displayedIndicatorSub$.unsubscribe();
                }
            );

        const searchParametersSub$ = this.store.select('indicatorSharing')
            .pipe(
                pluck('searchParameters'),
                debounceTime(15),
                distinctUntilChanged<SearchParameters>(),
                finalize(() => searchParametersSub$ && searchParametersSub$.unsubscribe())
            )
            .subscribe(
                (searchParameters) => {
                    // ~~~ Auto filter open on first search ~~~
                    if (!this.filterOpened && JSON.stringify(searchParameters) !== JSON.stringify(initialSearchParameters)) {
                        // Open container on first valid search if it wasn't already opened
                        this.filterContainer.open();
                    }

                    // ~~~ (Re)build highlightObj map ~~~
                    this.highlightObj.phases = {};
                    this.highlightObj.labels = {};
                    this.highlightObj.intrusionSets = {};

                    searchParameters.killChainPhases.forEach((phase) => {
                        this.highlightObj.phases[phase] = true;
                    });

                    searchParameters.labels.forEach((label) => {
                        this.highlightObj.labels[label] = true;
                    });

                    searchParameters.intrusionSets.forEach((intrusionSet) => {
                        this.highlightObj.intrusionSets[intrusionSet] = true;
                    });
                },
                (err) => {
                    console.log(err);
                }
            );

        const indicatorToSensorMap$ = this.store.select('indicatorSharing').pipe(
            pluck('indicatorToSensorMap'),
            distinctUntilChanged())
            .subscribe(
                (res) => {
                    this.indicatorToSensorMap = res;
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    indicatorToSensorMap$.unsubscribe();
                }
            );

        const getUser$ = this.store.select('users').pipe(
            filter((users: any) => users.userProfile && users.userProfile._id),
            take(1))
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

        this.userToken$ = this.store.select('users')
            .pipe(
                pluck('token')
            );
    }

    public ngOnDestroy() {
        this.dialog.closeAll();
    }

    public showMoreIndicators() {
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

    public setMainWell(wellTab: mainWell) {
        if (this.activeMainWell === wellTab) {
            this.activeMainWell = 'none';
        } else {
            this.activeMainWell = wellTab;
        }
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

        const downloadData$ = this.indicatorSharingService.getDownloadData(indicatorsCopy.map((ind) => ind.id), Array.from(attackPatternIdSet), Array.from(sensorIdSet))
            .subscribe(
                (downloadData) => {
                    console.log(downloadData);
                    downloadBundle([indicatorsCopy, ...sensorRelationships, ...downloadData], `analytic-exchange-enhanced-bundle`);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    downloadData$.unsubscribe();
                }
            );
    }

}
