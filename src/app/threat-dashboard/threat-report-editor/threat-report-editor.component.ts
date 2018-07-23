import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericApi } from '../../core/services/genericapi.service';
import { DateHelper } from '../../global/static/date-helper';
import { SortHelper } from '../../global/static/sort-helper';
import { IntrusionSet } from '../../models/intrusion-set';
import { Malware } from '../../models/malware';
import { Report } from '../../models/report';
import { ThreatReportOverviewService } from '../../threat-dashboard/services/threat-report-overview.service';
import { Constance } from '../../utils/constance';
import { SelectOption } from '../models/select-option';
import { ThreatReport } from '../models/threat-report.model';
import { ReportEditorComponent } from './report-editor/report-editor.component';
import { ReportImporterComponent } from './report-importer/report-importer.component';

@Component({
    selector: 'threat-report-editor',
    templateUrl: './threat-report-editor.component.html',
    styleUrls: ['./threat-report-editor.component.scss']
})
export class ThreatReportEditorComponent implements OnInit, OnDestroy {
    public id = '';
    public intrusions: SelectOption[];
    public loading = true;
    public malware: SelectOption[];
    public maxStartDate;
    public minEndDate;
    public reportRemovals = new Set<Partial<Report>>();
    public reportsDataSource: MatTableDataSource<Partial<Report>>;
    public target: string = '';
    public threatReport = new ThreatReport();
    public title = 'Create';
    public threatReportDescriptionFormControl: FormControl;

    public readonly displayColumns = ['name', 'actions'];

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

    public readonly viewPath = `threat-dashboard/view`;

    private readonly subscriptions = [];

    constructor(
        protected dialog: MatDialog,
        protected genericApi: GenericApi,
        protected location: Location,
        protected route: ActivatedRoute,
        protected router: Router,
        protected service: ThreatReportOverviewService,
        protected snackBar: MatSnackBar
    ) { }

    /**
     * @returns void
     */
    public ngOnInit(): void {
        this.threatReportDescriptionFormControl = new FormControl('');
        this.listenOnFormChanges();
        if (this.route.snapshot.routeConfig.path !== 'create') {
            // modifying an existing threat report
            this.id = this.route.snapshot.paramMap.get('id');
            this.load(this.id);
            this.initSelects();
            return;
        }

        this.threatReport = new ThreatReport();
        this.reportsDataSource = new MatTableDataSource(this.threatReport.reports);
        this.title = 'Create';
        // this.loading = false;
        this.initSelects();
    }

    /**
     * @description listen to reactive form changes
     * @returns void
     */
    public listenOnFormChanges(): void {
        const sub$ = this.threatReportDescriptionFormControl
            .valueChanges
            .pipe(
                debounceTime(350)
            )
            .subscribe((val) => {
                this.threatReport.description = val;
            },
                (err) => console.log(err)
            );
        this.subscriptions.push(sub$);
    }

    /**
     * @description load workproducts, setup this components datasource
     * @param {string} threatReportId
     * @returns {void}
     */
    public load(threatReportId: string): void {
        this.loading = true;
        // this may be an unsaved threat report
        this.service.load(threatReportId)
            .subscribe(
                (data) => {
                    this.threatReport = data as ThreatReport;
                    this.threatReport.boundaries.targets = this.threatReport.boundaries.targets || new Set<string>();
                    this.threatReport.boundaries.malware = this.threatReport.boundaries.malware || new Set<any>();
                    this.threatReport.boundaries.intrusions = this.threatReport.boundaries.intrusions || new Set<any>();
                    this.threatReport.boundaries.targets.forEach((target) => this.target = target);
                    this.threatReport.boundaries.intrusions =
                        new Set(Array.from(this.threatReport.boundaries.intrusions.values()).sort(SortHelper.sortDescByField<any, any>('displayValue')));
                    this.threatReport.boundaries.malware =
                        new Set(Array.from(this.threatReport.boundaries.malware.values()).sort(SortHelper.sortDescByField<any, any>('displayValue')));
                    this.reportsDataSource = new MatTableDataSource(this.threatReport.reports);
                    this.title = 'Modify';
                    if (this.threatReport.description) {
                        this.threatReportDescriptionFormControl.setValue(this.threatReport.description);
                    }
                    // removing spinner
                    this.loading = false;
                }
            );
    }

    /**
     * @description initialized the malware and intrustions selects
     */
    public initSelects(): void {
        const intrusionFilter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
        const instrusionUrl = `${Constance.INTRUSION_SET_URL}?${intrusionFilter}`;
        const o1$ = this.genericApi.get(instrusionUrl);

        const malwareFilter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
        const malwareUrl = `${Constance.MALWARE_URL}?${malwareFilter}`;
        const o2$ = this.genericApi.get(malwareUrl);

        const sub1$ = forkJoin(o1$, o2$, (s1, s2) => [s1, s2])
            .subscribe(
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
                () => {
                    this.loading = false;
                });
        this.subscriptions.push(sub1$);
    }

    /**
     * @description clean up component
     */
    public ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
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

    /**
     * @description Determine if the current end date is invalid against the current start date.
     */
    public isEndDateSameOrBeforeStartDate(value: any): void {
        const dateValue = moment(value, this.dateFormat);
        const endDate = moment(this.threatReport.boundaries.endDate, this.dateFormat);
        const startDate = moment(this.threatReport.boundaries.startDate, this.dateFormat);
        if (dateValue.isValid() && endDate.isSameOrBefore(startDate)) {
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
            // case 'target':
            //     chips = this.threatReport.boundaries.targets;
            //     break;
        }

        chips = chips || new Set();
        if (typeof value === 'string') {
            chips = chips.add(value);
        } else if (value.value) {
            if (!this.hasValue(chips, value)) {
                chips = chips.add(value);
            }
        }
        const sortedChips = Array.from(chips.values()).sort(SortHelper.sortDescByField<any, any>('displayValue'));
        chips = new Set(sortedChips);
        switch (stixType) {
            case 'intrusion-set':
                this.threatReport.boundaries.intrusions = chips;
                break;
            case 'malware':
                this.threatReport.boundaries.malware = chips;
                break;
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
            // case 'target':
            //     chips = this.threatReport.boundaries.targets;
            //     break;
        }
        chips.delete(stixName);
    }

    /**
     * @return true is string and true or boolean and true, otherwise false
     */
    public isTruthy(val: boolean | string = false): boolean {
        const isBool = typeof val === 'boolean';
        const isString = typeof val === 'string';
        return (isBool && val === true) || (isString && val === 'true');
    }

    /**
     * @return true is string and false or boolean and false, otherwise true
     */
    public isFalsey(val: boolean | string | Partial<Report> | Array<Partial<Report>> | undefined): boolean {
        const isUndefined = typeof val === 'undefined';
        const isBool = typeof val === 'boolean';
        const isString = typeof val === 'string';
        const isArray = Array.isArray(val);
        return isUndefined || (isBool && val === false) || (isString && val === 'false')
            || (isArray && (val as Array<any>).length === 0);
    }

    /**
     * @description determines if the form is safe for submitting
     */
    public isValid(): boolean {
        return !!this.threatReport.name && (this.threatReport.reports.length > 0) && !this.dateError.startDate.isError
            && !this.dateError.endDate.isError && !this.dateError.endDate.isSameOrBefore;
    }

    /**
     * @description Create a new report to be added to this work product.
     * @param {UIEvent} event optional
     */
    public onCreateReport(event?: UIEvent): void {
        this.openReportDialog(event);
    }

    /**
     * @description Edit the given report's information.
     * @param {report} Report the name of a report on the work product that the user wants to change
     * @param {UIEvent} event optional
     */
    public onModifyReport(report: Report, event?: UIEvent): void {
        this.openReportDialog(event, report);
    }

    /**
     * @description open report dialog
     * @param {UIEvent} event optional
     * @param {Report} report - report which to modify, undefined if you wish to create a new report
     */
    private openReportDialog(event?: UIEvent, report?: Report): void {
        const opts = this.generateDialogOptions();
        if (report) {
            opts.data = report;
        }

        this.dialog
            .open(ReportEditorComponent, opts)
            .afterClosed()
            .subscribe(
                (result: Partial<Report> | boolean) => this.insertReport(result),
                (err) => console.log(err)
            );
    }

    /**
     * @description Add an existing report to this work product.
     * @param {UIEvent} event optional
     */
    public onImportReport(event?: UIEvent): void {
        const opts = this.generateDialogOptions();
        if (this.reportsDataSource.data) {
            opts.data = this.reportsDataSource.data;
        }

        this.dialog
            .open(ReportImporterComponent, opts)
            .afterClosed()
            .subscribe(
                (result: Array<Partial<Report>> | boolean) => {
                    if (this.isFalsey(result)) {
                        return;
                    }
                    (result as Array<Partial<Report>>).forEach(report => this.insertReport(report));
                },
                (err) => console.log(err)
            );
    }

    /**
     * @description add the given report to this work product, preventing duplications
     */
    public insertReport(report: Partial<Report> | boolean): void {
        if (this.isFalsey(report)) {
            return;
        }
        const modified = this.fixReportDateBeforeSave(report as Report);
        let index = this.threatReport.reports.findIndex((rep) => this.areSameReport(rep, modified));
        if (index >= 0) {
            this.threatReport.reports[index] = modified;
        } else {
            this.threatReport.reports.push(modified);
        }
        this.reportsDataSource.data = this.threatReport.reports; // update the table
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

        if (report.attributes.id) {
            this.reportRemovals.add(report);
        }

        this.threatReport.reports = this.threatReport.reports.filter((el) => !this.areSameReport(el, report));
        this.reportsDataSource.data = this.threatReport.reports; // update the table
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

    private areSameReport(report1: Partial<Report>, report2: Partial<Report>): boolean {
        if (report1 === report2) {
            return true;
        }
        if (report1.attributes.id) {
            return report1.attributes.id === report2.attributes.id;
        }
        /*
         * If the report has no ID, it is brand new. If we delete all the reports with no ID, as would happen
         * in the previous condition, then we would remove all the brand new reports, instead of just the one
         * the user clicked on. So now we count on all the required data matching instead.
         */
        return report1.attributes.name === report2.attributes.name &&
            report1.attributes.external_references[0].url ===
            report2.attributes.external_references[0].url &&
            report1.attributes.external_references[0].source_name ===
            report2.attributes.external_references[0].source_name
    }

    /**
     * @description go back to list view
     * @param {UIEvent} event optional
     */
    public onCancel(event?: UIEvent): void {
        if (this.title === 'Modify') {
            this.router.navigate([`/${this.viewPath}/${this.id}`]);
        } else {
            this.location.back();
        }
    }

    /**
     * @description Save the threat report and then route to the dashboard view.
     * @param {UIEvent} event optional
     */
    public onSave(event?: UIEvent): void {
        if (this.threatReport.reports.length === 0) {
            console.log('A threat report with no reports cannot be persisted.');
            return;
        }
        this.threatReport.boundaries.targets.clear();
        this.threatReport.boundaries.targets.add(this.target);
        const saveSub$ = this.service.saveThreatReport(this.threatReport)
            .subscribe(
                (reports) => {
                    console.log('saved ', reports);
                    this.router.navigate([`/${this.viewPath}/${reports.id}`]);
                },
                (err) => console.log(err),
        );
        this.subscriptions.push(saveSub$);

        this.reportRemovals.forEach(report => {
            const sub$ = this.service.removeReport(report as Report, this.threatReport)
                .subscribe(
                    (tro) => console.log(tro),
                    (err) => console.log(err),
                    () => sub$.unsubscribe());
        });
    }

    /**
     * @returns MatDialogConfig
     */
    public generateDialogOptions(): MatDialogConfig {
        const opts = new MatDialogConfig();
        opts.maxWidth = '1024px';
        opts.width = '70vw';
        opts.height = '85vh';
        return opts;
    }

}
