import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';

import { Constance } from '../../utils/constance';
import { Boundaries } from '../models/boundaries';
import { Report } from '../../models/report';
import { Malware } from '../../models/malware';
import { IntrusionSet } from '../../models/intrusion-set';
import { SelectOption } from '../models/select-option';
import { ThreatReport } from '../models/threat-report.model';
import { ModifyReportDialogComponent } from '../modify-report-dialog/modify-report-dialog.component';
import { ThreatReportOverviewService } from '../../threat-dashboard/services/threat-report-overview.service';
import { ThreatReportModifyDataSource } from '../modify/threat-report-modify.datasource';
import { ThreatReportSharedService } from '../services/threat-report-shared.service';
import { GenericApi } from '../../core/services/genericapi.service';
import { SortHelper } from '../../global/static/sort-helper';
import { DateHelper } from '../../global/static/date-helper';

@Component({
    selector: 'threat-report-editor',
    templateUrl: './threat-report-editor.component.html',
    styleUrls: ['./threat-report-editor.component.scss']
})
export class ThreatReportEditorComponent implements OnInit, OnDestroy {

    public id = '';

    public loading = true;

    public title = 'Create';

    public threatReport = new ThreatReport();

    public intrusions: SelectOption[];

    public malware: SelectOption[];

    public maxStartDate;

    public minEndDate;

    public reportsDataSource: MatTableDataSource<Partial<Report>>;

    public readonly displayColumns = ['name', 'actions'];

    public readonly dateError = {
        startDate: { isError: false },
        endDate: { isError: false, isSameOrBefore: false, isSameOrBeforeMessage: 'End Date must be after Start Date.' },
        errorMessage: 'Not a valid date'
    };

    public readonly dateFormat = this.dateFormat;

    public readonly viewPath = `threat-dashboard`;

    private readonly subscriptions = [];

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected location: Location,
        protected genericApi: GenericApi,
        protected dialog: MatDialog,
        protected service: ThreatReportOverviewService,
        protected sharedService: ThreatReportSharedService,
        protected snackBar: MatSnackBar) {
    }

    ngOnInit() {
        if (this.route.snapshot.routeConfig.path === 'create') {
            this.threatReport = new ThreatReport();
            this.reportsDataSource = new MatTableDataSource(this.threatReport.reports);
            if (this.sharedService.threatReportOverview) {
                this.clone();
            }
            this.title = 'Create';
            this.loading = false;
        } else /* modifying an existing threat report */ {
            this.id = this.route.snapshot.paramMap.get('id');
            this.load(this.id);
        }

        this.initSelects();
    }

    /**
     * @description deep clone `this.threatReportOverview` from this components `this.sharedService`
     */
    private clone(): void {
        // remember to new up an object, otherwise object method will not exist, using just an object literal copy
        const tmp = Object.assign(new ThreatReport(),
                JSON.parse(JSON.stringify(this.sharedService.threatReportOverview)));
        this.threatReport = tmp;

        // this is needed to make sure boundaries is acutally and object and not an object literal at runtime
        this.threatReport.boundaries = new Boundaries();
        this.threatReport.boundaries.intrusions =
            this.sharedService.threatReportOverview.boundaries.intrusions || new Set<{ any }>();
        this.threatReport.boundaries.targets =
            this.sharedService.threatReportOverview.boundaries.targets || new Set<string>();
        this.threatReport.boundaries.malware =
            this.sharedService.threatReportOverview.boundaries.malware || new Set<{ any }>();
        if (this.sharedService.threatReportOverview.boundaries.startDate) {
            this.threatReport.boundaries.startDate =
                    new Date(this.sharedService.threatReportOverview.boundaries.startDate);
        }
        if (this.sharedService.threatReportOverview.boundaries.endDate) {
            this.threatReport.boundaries.endDate =
                    new Date(this.sharedService.threatReportOverview.boundaries.endDate);
        }
    }

    /**
     * @description load workproducts, setup this components datasource
     */
    public load(threatReportId?: string): void {
        this.loading = true;

        if (!threatReportId) {
            // get any inprogress threat reports, or create a new one
            this.threatReport = this.sharedService.threatReportOverview || new ThreatReport();
            this.reportsDataSource = new MatTableDataSource(this.threatReport.reports);
            this.title = 'Create';
            this.loading = false;
        } else {
            // this may be an unsaved threat report
            this.service.load(threatReportId)
                .subscribe(
                    (data) => {
                        this.threatReport = data as ThreatReport;
                        this.reportsDataSource = new MatTableDataSource(this.threatReport.reports);
                        // clear out an inprogress threat reports we were creating
                        this.sharedService.threatReportOverview = this.threatReport;
                        // removing spinner, put on change queue
                        requestAnimationFrame(() => {
                            this.title = 'Modify';
                            this.loading = false;
                        });
                    }
                );
        }
    }

    /**
     * @description deep clone `this.threatReportOverview` from this components `this.sharedService`
     */
    private initSelects(): void {
        const intrusionFilter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
        const instrusionUrl = `${Constance.INTRUSION_SET_URL}?${intrusionFilter}`;
        const o1$ = this.genericApi.get(instrusionUrl);

        const malwareFilter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
        const malwareUrl = `${Constance.MALWARE_URL}?${malwareFilter}`;
        const o2$ = this.genericApi.get(malwareUrl);

        const sub1$ = Observable.combineLatest(o1$, o2$, (s1, s2) => [s1, s2]).subscribe(
            (data) => {
                const intrusions: IntrusionSet[] = data[0];
                const malware: Malware[] = data[1];
                this.intrusions = intrusions
                    .map((el) => {
                        return { value: el.id, displayValue: el.attributes.name } as SelectOption;
                    })
                    .sort(SortHelper.sortDescByField('displayValue'));
                this.malware = malware
                    .map((el) => {
                        return { value: el.id, displayValue: el.attributes.name } as SelectOption;
                    })
                    .sort(SortHelper.sortDescByField('displayValue'));
            },
            (err) => console.log(err),
            () => console.log('fetch complete'));
        this.subscriptions.push(sub1$);
    }

    /**
     * @description clean up component
     */
    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    /**
     * @description handle start date changed, does validation
     */
    public startDateChanged(value: any): void {
        if (!value) {
            this.minEndDate = null;
            this.dateError.startDate.isError = false;
            this.dateError.endDate.isSameOrBefore = false;
            this.threatReport.boundaries.startDate = null;
        } else if (moment(value, this.dateFormat).isValid()) {
            this.threatReport.boundaries.startDate = moment(value, this.dateFormat).toDate();
            this.dateError.startDate.isError = false;
            const date = moment(value, this.dateFormat).add(1, 'd');
            this.minEndDate = new Date(date.year(), date.month(), date.date());
            this.isEndDateSameOrBeforeStartDate(value);
        } else {
            this.threatReport.boundaries.startDate = null;
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
            this.threatReport.boundaries.endDate = null;
        } else if (moment(value, this.dateFormat).isValid()) {
            this.dateError.endDate.isError = false;
            this.threatReport.boundaries.endDate = moment(value, this.dateFormat).toDate();
            this.isEndDateSameOrBeforeStartDate(value);
        } else {
            this.threatReport.boundaries.endDate = null;
            this.dateError.endDate.isError = true;
            this.dateError.endDate.isSameOrBefore = false;
        }
    }

    private isEndDateSameOrBeforeStartDate(value: any): void {
        if (moment(value, this.dateFormat).isValid() &&
                moment(this.threatReport.boundaries.endDate, this.dateFormat).isSameOrBefore(
                        moment(this.threatReport.boundaries.startDate, this.dateFormat))) {
            this.dateError.endDate.isSameOrBefore = true;
        } else {
            this.dateError.endDate.isSameOrBefore = false;
        }
    }

    /**
     * @description add to selected malwares, add a chip
     * @param {string} value
     * @param {string} stixType
     */
    public addChip(value: any, stixType: string): void {
        if (!value || !stixType) {
            return;
        }

        let chips: Set<any> | undefined;
        switch (stixType) {
            case 'intrusion-set':
                chips = this.threatReport.boundaries.intrusions;
                break;
            case 'malware':
                chips = this.threatReport.boundaries.malware;
                break;
            case 'target':
                chips = this.threatReport.boundaries.targets;
                break;
        }

        if (chips) {
            if (typeof value === 'string') {
                chips = chips.add(value);
            } else {
                if (!this.hasValue(chips, value)) {
                    chips = chips.add(value);
                }
            }
        }
    }

    /**
     * @description check if option.value is present in the given set
     * @param {Set<any>} chips
     * @param {{ value: any}} option
     * @return {boolean} true if found, otherwise false
     */
    public hasValue(chips: Set<any>, option: { value: any }): boolean {
        return chips.has(option.value);
    }

    /**
     * @description Remove a chip from the correct chip Set
     * @param {string} stixName
     * @param {string} stixType
     */
    public removeChip(stixName: any, stixType: string) {
        if (!stixName || !stixType) {
            return;
        }

        let chips;
        switch (stixType) {
            case 'intrusion-set':
                chips = this.threatReport.boundaries.intrusions;
                break;
            case 'malware':
                chips = this.threatReport.boundaries.malware;
                break;
            case 'target':
                chips = this.threatReport.boundaries.targets;
                break;
        }
        chips.delete(stixName);
    }

    /**
     * @return true is string and true or boolean and true, otherwise false
     */
    private isTruthy(val: boolean | string = false): boolean {
        const isBool = typeof val === 'boolean';
        const isString = typeof val === 'string';
        return (isBool && val === true) || (isString && val === 'true');
    }

    /**
     * @return true is string and false or boolean and false, otherwise true
     */
    private isFalsey(val: boolean | string | Partial<Report> | undefined): boolean {
        const isUndefined = typeof val === 'undefined';
        const isBool = typeof val === 'boolean';
        const isString = typeof val === 'string';
        return isUndefined || (isBool && val === false) || (isString && val === 'false');
    }

    /**
     * @description determines if the form is safe for submitting
     */
    public isValid(): boolean {
        return this.threatReport.name && !this.dateError.startDate.isError
                && !this.dateError.endDate.isError && !this.dateError.endDate.isSameOrBefore;
    }

    /**
     * @description go back to list view
     * @param {UIEvent} event optional
     */
    public onCancel(event?: UIEvent): void {
        if (this.title === 'Modify') {
            this.sharedService.threatReportOverview = null;
            this.router.navigate([`/${this.viewPath}/view/${this.id}`]);
        } else {
            this.location.back();
        }
    }

    /**
     * @description Save the threat report and then route to the dashboard view.
     * @param {UIEvent} event optional
     */
    public onSave(event?: UIEvent): void {
        const sub$ = this.service.saveThreatReport(this.threatReport)
            .subscribe(
                (reports) => {
                    this.router.navigate([`/${this.viewPath}`]);
                },
            (err) => console.log(err),
        );
        this.subscriptions.push(sub$);
    }

    /**
     * @description Create a new report to be added to this work product.
     * @param {UIEvent} event optional
     */
    public onCreateReport(event?: UIEvent): void {
        const opts = {
            width: '800px',
            height: 'calc(100vh - 140px)'
        };
        this.dialog
            .open(ModifyReportDialogComponent, opts)
            .afterClosed()
            .subscribe((result: Partial<Report> | boolean) => {
                if (this.isFalsey(result)) {
                    return;
                }
                const report = this.fixReportDateBeforeSave(result as Report);
                const sub$ = this.service.upsertReport(report)
                    .subscribe(() => {
                        console.log('saved report, reloading');
                        this.load(this.threatReport.id);
                    },
                    (err) => console.log(err),
                    () => sub$.unsubscribe());
                },
                (err) => console.log(err)
            );
    }

    /**
     * @description handle when a csv file is parsed into reports
     * @param {Report[]} event
     */
    public onFileParsed(event?: Report[]): void {
        if (!event) {
            return;
        }

        const reports = this.fixReportDatesBeforeSave(event);
        const sub$ = this.service.upsertReports(reports)
            .subscribe(() => {
                console.log('saved reports, reloading');
                this.load(this.threatReport.id);
            },
            (err) => console.log(err),
            () => sub$.unsubscribe());
    }

    /**
     * @description notify user of any upload or parse errors
     * @param {string} event optional
     */
    public onFileUploadFail(event?: string): void {
        if (!event) {
            return;
        }
        // notify the user of the error
        this.snackBar.open(event, 'Close', {
            duration: 3400,
        });
    }

    /**
     * @description turn dates into ISO Date format or backend will complain on validation
     */
    private fixReportDatesBeforeSave(reports: Report[]): Report[] {
        return reports.map((report) => this.fixReportDateBeforeSave(report));
    }

    /**
     * @description turn dates into ISO Date format or backend will complain on validation
     */
    private fixReportDateBeforeSave(report: Report): Report {
        const item = report;
        if (item && item.attributes && item.attributes.created) {
            // turn to required ISO8601 format or clear the date because we cant use it
            item.attributes.created = DateHelper.getISOOrUndefined(item.attributes.created);
        }
        return item;
    }

    /**
     * @description Add an existing report to this work product.
     * @param {report} Report include this report in the current workproduct
     * @param {UIEvent} event optional
     */
    public onImportReport(report: Report, event?: UIEvent): void {
        if (!report || !this.threatReport) {
            return;
        }

        if (event) {
            event.preventDefault();
        }

        this.threatReport.reports = this.threatReport.reports.concat(report);
        console.log(report);
        console.log(this.threatReport);
        if (!this.threatReport.id) {
            // this threat report is in progress so do not save to db until they hit save
            return;
        }

        const sub$ = this.service.upsertReports([report], this.threatReport)
            .subscribe(
                (tro) => console.log(tro),
                (err) => console.log(err),
                () => sub$.unsubscribe());
    }

    /**
     * @description Share the given personal report. Not yet implemented.
     * @param {report} Report name of a personal report that the user wants to change to a shared report
     * @param {UIEvent} event optional
     */
    public onShareReport(report: Report, event?: UIEvent): void {
        // Not yet implemented
    }

    /**
     * @description Edit the given report's information.
     * @param {report} Report the name of a report on the work product that the user wants to change
     * @param {UIEvent} event optional
     */
    public onModifyReport(report: Report, event?: UIEvent): void {

    }

    /**
     * @description Remove the given report from this work product.
     * @param {report} Report a report name that the user wants to remove from this work product
     * @param {UIEvent} event optional
     */
    public onRemoveReport(report: Report, event?: UIEvent): void {
        if (!report || !this.threatReport) {
            return;
        }

        if (event) {
            event.preventDefault();
        }

        console.log(report);
        console.log(this.threatReport);
        this.threatReport.reports =
                this.threatReport.reports.filter((el) => el.attributes.id !== report.attributes.id);
        if (!this.threatReport.id) {
            // this threat report is in progress so do not save to db until they hit save
            return;
        }

        const sub$ = this.service.removeReport(report, this.threatReport)
            .subscribe(
                (tro) => console.log(tro),
                (err) => console.log(err),
                () => sub$.unsubscribe());
    }

}
