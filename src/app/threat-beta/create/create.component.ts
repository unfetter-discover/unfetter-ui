import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { take, pluck, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Malware, IntrusionSet } from 'stix';
import { ThreatBoard } from 'stix/unfetter/index';

import { ThreatDashboardBetaService } from '../threat-beta.service';
import { ThreatFeatureState } from '../store/threat.reducers';
import * as boardActions from '../store/threat.actions';
import { AppState } from '../../root-store/app.reducers';
import { generateUUID } from '../../global/static/generate-uuid';
import { GenericApi } from '../../core/services/genericapi.service';
import { SortHelper } from '../../global/static/sort-helper';
import { Constance } from '../../utils/constance';
import { SelectOption } from './select-option';

enum PageActions {
    CREATE = 'create',
    EDIT = 'update',
}

@Component({
    selector: 'create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    private action: PageActions = PageActions.CREATE;

    @Input() threatboard: ThreatBoard = new ThreatBoard({
        name: null,
        boundaries: {
            start_date: null,
            end_date: null,
        },
    } as ThreatBoard);

    private user: any;

    public maxStartDate;

    public minEndDate;

    public readonly dateError = {
        startDate: { isError: false },
        endDate: {
            isError: false,
            isSameOrBefore: false,
            isSameOrBeforeMessage: 'End Date must be after Start Date.'
        },
        errorMessage: 'Not a valid date'
    };

    public readonly dateFormat = 'M/D/YYYY';

    public target: string = '';

    public malwares: SelectOption[];

    public intrusions: SelectOption[];

    public loading: boolean = true;

    constructor(
        private threatboardService: ThreatDashboardBetaService,
        private boardStore: Store<ThreatFeatureState>,
        private appStore: Store<AppState>,
        private genericApi: GenericApi,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
    ) {
    }

    ngOnInit() {
        if (this.route.snapshot.routeConfig.path !== PageActions.CREATE.toString()) {
            const id = this.route.snapshot.paramMap.get('id');
            this.boardStore.select('threat')
                .pipe(
                    pluck('boardList'),
                    distinctUntilChanged()
                )
                .subscribe(
                    (boards: any[]) => {
                        if (!boards || !boards.length) {
                            console.log(`${this.timestamp()} Received nothing from the threatboard store!`);
                        } else {
                            const threatboard = boards.find(board => board.id === id);
                            if (!threatboard) {
                                console.log(`${this.timestamp()} Requested threatboard not found!!`);
                            } else {
                                this.convertThreatBoard(threatboard);
                                this.action = PageActions.EDIT;
                            }
                        }
                    },
                    (err) => console.log(`${this.timestamp()} could not load board ${id}`, err),
                    () => this.loadOptions()
                );
        }

        this.appStore.select('users')
            .pipe(
                pluck('userProfile'),
                take(1),
            )
            .subscribe(
                user => this.user = user,
                err => console.log(`${this.timestamp()} could not load user`, err),
            );

        this.loadOptions();
    }

    private convertThreatBoard(threatboard: any) {
        const board = {...threatboard};
        if (!board.boundaries) {
            board.boundaries = {};
        }
        if (!board.boundaries.targets) {
            board.boundaries.targets = [];
        }
        if (!board.boundaries.malware) {
            board.boundaries.malware = [];
        }
        if (!board.boundaries.intrusion_sets) {
            board.boundaries.intrusion_sets = [];
        }
        this.threatboard = board as ThreatBoard;
    }

    private loadOptions() {
        const observables = [];

        const malwareFilter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
        const malwareUrl = `${Constance.MALWARE_URL}?${malwareFilter}`;
        const malwareQuery$ = this.genericApi.get(malwareUrl);
        observables.push(malwareQuery$);

        const intrusionFilter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
        const instrusionUrl = `${Constance.INTRUSION_SET_URL}?${intrusionFilter}`;
        const intrusionsQuery$ = this.genericApi.get(instrusionUrl);
        observables.push(intrusionsQuery$);

        const sub1$ = forkJoin(observables, (s1, s2) => [s1, s2])
            .pipe(take(1))
            .subscribe(
                (data: [Malware[], IntrusionSet[]]) => {
                    const [malware, intrusions] = data;
                    this.convertOptions(malware, intrusions);
                },
                (err) => console.log(`${this.timestamp()} Could not load options data`, err),
                () => this.loading = false
            );
    }

    private convertOptions(malware: Malware[], intrusions: IntrusionSet[]) {
        const boundaries: any = this.threatboard.boundaries;

        this.malwares = malware
            .map((el) => ({ value: el.id, displayValue: el.attributes.name } as SelectOption))
            .sort(SortHelper.sortDescByField('displayValue'));
        boundaries.malware = (boundaries.malware || []).map(mal => this.malwares.find(m => m.value === mal));

        this.intrusions = intrusions
            .map((el) => ({ value: el.id, displayValue: el.attributes.name } as SelectOption))
            .sort(SortHelper.sortDescByField('displayValue'));
        boundaries.intrusion_sets = (boundaries.intrusion_sets || []).map(is => this.intrusions.find(i => i.value === is));
    }

    /**
     * @description determine if the form has the minimum information needed to save the board
     */
    isValid() {
        return (!!this.threatboard.name && (this.threatboard.name.trim().length > 0)) &&
                !!this.threatboard.boundaries.start_date;
    }

    /**
     * @description handle start date changed, does validation
     */
    public startDateChanged(value: any): void {
        if (!value) {
            this.minEndDate = null;
            this.dateError.startDate.isError = false;
            this.dateError.endDate.isSameOrBefore = false;
            this.threatboard.boundaries.start_date = null;
        } else if (moment(value, this.dateFormat).isValid()) {
            this.threatboard.boundaries.start_date = moment(value, this.dateFormat).toDate();
            this.dateError.startDate.isError = false;
            const date = moment(value, this.dateFormat).add(1, 'd');
            this.minEndDate = new Date(date.year(), date.month(), date.date());
            this.isEndDateSameOrBeforeStartDate(value);
        } else {
            this.threatboard.boundaries.start_date = null;
            this.dateError.startDate.isError = true;
        }
    }

    /**
     * @description handle end date changed, does validation
     */
    public endDateChanged(value: any): void {
        if (!value) {
            this.dateError.endDate.isError = false;
            this.dateError.endDate.isSameOrBefore = false;
            this.threatboard.boundaries.end_date = null;
        } else if (moment(value, this.dateFormat).isValid()) {
            this.dateError.endDate.isError = false;
            this.threatboard.boundaries.end_date = moment(value, this.dateFormat).toDate();
            this.isEndDateSameOrBeforeStartDate(value);
        } else {
            this.threatboard.boundaries.end_date = null;
            this.dateError.endDate.isError = true;
            this.dateError.endDate.isSameOrBefore = false;
        }
    }

    /**
     * @description Determine if the current end date is invalid against the current start date.
     */
    public isEndDateSameOrBeforeStartDate(value: any): void {
        const dateValue = moment(value, this.dateFormat);
        const endDate = moment(this.threatboard.boundaries.end_date, this.dateFormat);
        const startDate = moment(this.threatboard.boundaries.start_date, this.dateFormat);
        if (dateValue.isValid() && endDate.isSameOrBefore(startDate)) {
            this.dateError.endDate.isSameOrBefore = true;
        } else {
            this.dateError.endDate.isSameOrBefore = false;
        }
    }

    /**
     * @description add to selected malwares, add a chip
     */
    public addChip(value: any, stixType: 'intrusion_sets' | 'malware' | 'targets'): void {
        if (!value || !stixType) {
            return;
        }
        let chips = new Set(this.threatboard.boundaries[stixType] || []);
        chips.add(value);
        const sortedChips = Array.from(chips).sort(SortHelper.sortDescByField<any, any>('displayValue'));
        this.threatboard.boundaries[stixType] = sortedChips;
    }

    /**
     * @description Remove a chip from the correct chip Set
     */
    public removeChip(stixName: any, stixType: 'intrusion_sets' | 'malware' | 'targets') {
        if (!stixName || !stixType) {
            return;
        }
        let chips = new Set(this.threatboard.boundaries[stixType] || []);
        chips.delete(stixName);
        const sortedChips = Array.from(chips).sort(SortHelper.sortDescByField<any, any>('displayValue'));
        this.threatboard.boundaries[stixType] = sortedChips;
    }

    /**
     * @description go back to list view
     */
    public onCancel(event?: UIEvent): void {
        if (this.action === PageActions.CREATE) {
            this.location.back();
        } else {
            this.router.navigate(['threat-beta', this.threatboard.id, 'feed']);
        }
    }

    /**
     * @description Save the threat board and then route to the dashboard view.
     */
    public onSave(event?: UIEvent): void {
        const meta: any = this.threatboard.metaProperties || {};
        const board: any = {
            ...this.threatboard,
            type: 'x-unfetter-threat-board',
            id: this.threatboard.id || null,
            created: this.threatboard.created || new Date(),
            modified: new Date().toISOString(),
            created_by_ref: this.threatboard.created_by_ref ||
                    (this.user && this.user.identity ? this.user.identity.id : null) || null,
            boundaries: {
                ...this.threatboard.boundaries,
                malware: this.mapBoundaries(this.threatboard.boundaries.malware),
                intrusion_sets: this.mapBoundaries(this.threatboard.boundaries.intrusion_sets),
            },
            metaProperties: {
                published: meta.published || false,
                comments: meta.comments || [],
                potentials: meta.potentials || [],
            },
        };

        console.log(`calling ${this.action.toString()}Board()`);
        this.threatboardService[`${this.action.toString()}Board`](board)
            .subscribe(
                (response) => {
                    if (response && response.length && response[0].attributes) {
                        board.id = response[0].attributes.id;
                    }
                    console['debug'](`${this.timestamp()} board ${this.action}d`, response);
                    this.boardStore.dispatch(new boardActions.FetchBaseData());
                    this.boardStore.dispatch(new boardActions.SetSelectedBoardId(board.id));
                    this.boardStore.dispatch(new boardActions.FetchBoardDetailedData(board.id));
                },
                (err) => console.log(`${this.timestamp()} error ${this.action.toString().slice(0, -1)}ing board`, err),
                () => this.router.navigate(['threat-beta', board.id, 'feed'])
            );
    }

    private mapBoundaries(values: any[]) {
        if (values) {
            return values.map(value => {
                if (typeof value === 'string') {
                    return value;
                }
                if (value.id) {
                    return value.id;
                }
                if (value.value) {
                    return value.value;
                }
                return undefined;
            }).filter(value => !!value);
        }
        return [];
    }

    private timestamp() {
        return `(${new Date().toISOString()})`;
    }
}
