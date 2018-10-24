import { Component, OnInit, Input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';

import { Malware, IntrusionSet } from 'stix';
import { ThreatBoard } from 'stix/unfetter/index';

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

    @Input() threatboard: ThreatBoard = new ThreatBoard({
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
        protected genericApi: GenericApi,
    ) {
    }

    ngOnInit() {
        const malwareFilter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
        const malwareUrl = `${Constance.MALWARE_URL}?${malwareFilter}`;
        const malwareQuery$ = this.genericApi.get(malwareUrl);

        const intrusionFilter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
        const instrusionUrl = `${Constance.INTRUSION_SET_URL}?${intrusionFilter}`;
        const intrusionsQuery$ = this.genericApi.get(instrusionUrl);

        const sub1$ = forkJoin(malwareQuery$, intrusionsQuery$, (s1, s2) => [s1, s2])
            .pipe(take(1))
            .subscribe(
                (data: [Malware[], IntrusionSet[]]) => {
                    console.log('malware and intrusions loaded:', data);
                    const [malware, intrusions] = data;
                    this.malwares = malware
                        .map((el) => ({ value: el.id, displayValue: el.attributes.name } as SelectOption))
                        .sort(SortHelper.sortDescByField('displayValue'));
                    this.intrusions = intrusions
                        .map((el) => ({ value: el.id, displayValue: el.attributes.name } as SelectOption))
                        .sort(SortHelper.sortDescByField('displayValue'));
                    console.log('malware options', this.malwares);
                    console.log('intrusion options', this.intrusions);
                },
                (err) => console.log(err),
                () => this.loading = false
            );
    }

    isValid() {
        return this.threatboard.boundaries.start_date !== null;
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

}
