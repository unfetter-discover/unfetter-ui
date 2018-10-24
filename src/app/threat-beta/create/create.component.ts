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
import { SelectOption } from './select-option';
import { GenericApi } from '../../core/services/genericapi.service';
import { SortHelper } from '../../global/static/sort-helper';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    private action: 'create' | 'edit' = 'create';

    @Input() threatboard: ThreatBoard = new ThreatBoard({
        name: null,
        boundaries: {
            start_date: null,
            end_date: null,
        },
    } as ThreatBoard);

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
        private genericApi: GenericApi,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
    ) {
    }

    ngOnInit() {
        if (this.route.snapshot.routeConfig.path !== 'create') {
            // modifying an existing threat board
            const id = this.route.snapshot.paramMap.get('id');
            this.boardStore.select('threat')
                .pipe(
                    pluck('boardList'),
                    distinctUntilChanged()
                )
                .subscribe(
                    (boards: any[]) => {
                        if (!boards || !boards.length) {
                            console.log('Received nothing from the threatboard store!');
                        } else {
                            const threatboard = boards.find(board => board.id === id);
                            if (!threatboard) {
                                console.log('Requested threatboard not found!!');
                            } else {
                                this.threatboard = {...threatboard} as ThreatBoard;
                                if (!this.threatboard.boundaries.targets) {
                                    this.threatboard.boundaries.targets = [];
                                }
                                if (!this.threatboard.boundaries.malware) {
                                    this.threatboard.boundaries.malware = [];
                                }
                                if (!this.threatboard.boundaries.intrusion_sets) {
                                    this.threatboard.boundaries.intrusion_sets = [];
                                }
                                this.action = 'edit';
                            }
                        }
                    },
                    (err) => console.log(`(${new Date().toISOString()}) could not load board ${id}`, err),
                    () => this.loading = false
                );
        }

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
                    this.malwares = malware
                        .map((el) => ({ value: el.id, displayValue: el.attributes.name } as SelectOption))
                        .sort(SortHelper.sortDescByField('displayValue'));
                    this.intrusions = intrusions
                        .map((el) => ({ value: el.id, displayValue: el.attributes.name } as SelectOption))
                        .sort(SortHelper.sortDescByField('displayValue'));
                },
                (err) => console.log(err),
                () => this.loading = false
            );
    }

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
        console.log(`adding '${value}' to ${stixType}:`, this.threatboard.boundaries);
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
        if (this.action === 'create') {
            this.location.back();
        } else {
            this.router.navigate(['threat-beta', this.threatboard.id, 'feed']);
        }
    }

    /**
     * @description Save the threat board and then route to the dashboard view.
     */
    public onSave(event?: UIEvent): void {
        if (this.action === 'edit') {
            this.threatboardService.updateBoard(this.threatboard)
                .subscribe(
                    (response) => {
                        console['debug'](`(${new Date().toISOString()}) board updated`, response);
                        this.router.navigate(['threat-beta', this.threatboard.id, 'feed']);
                    },
                    (err) => console.log(`(${new Date().toISOString()}) error updating board`, err)
                );
        } else {
            // creating a new board...
            this.threatboardService.updateBoard(this.threatboard)
                .subscribe(
                    (response) => {
                        console['debug'](`(${new Date().toISOString()}) board created`, response);
                        // this.router.navigate(['threat-beta', this.threatboard.id, 'feed']);
                    },
                    (err) => console.log(`(${new Date().toISOString()}) error creating board`, err)
                );
        }
        // TODO need to trigger "rescanning" reports for potential matches
    }

}
