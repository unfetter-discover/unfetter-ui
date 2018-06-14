
import {fromEvent as observableFromEvent, combineLatest as observableCombineLatest,  Observable } from 'rxjs';

import {distinctUntilChanged, debounceTime, withLatestFrom, tap} from 'rxjs/operators';
import { Component,
         OnInit,
         AfterViewInit,
         OnDestroy,
         Inject,
         EventEmitter,
         ChangeDetectionStrategy,
         ViewChild,
         ViewChildren,
         ElementRef,
         QueryList,
         Output } from '@angular/core';
import { MatDialogRef,
         MAT_DIALOG_DATA,
         MatTableDataSource,
         MatPaginator,
         PageEvent,
         MatSnackBar } from '@angular/material';

import { Report } from '../../../models/report';
import { GenericApi } from '../../../core/services/genericapi.service';
import { ThreatReportOverviewService } from '../../../threat-dashboard/services/threat-report-overview.service';
import { ReportUploadService } from './report-upload.service';
import { ReportsDataSource } from './reports.datasource';

@Component({
    selector: 'report-importer',
    templateUrl: './report-importer.component.html',
    styleUrls: ['./report-importer.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ReportImporterComponent implements OnInit, AfterViewInit, OnDestroy {

    public reportsLoading = true;

    public imports = new MatTableDataSource<Partial<Report>>();

    public currents: ReportsDataSource;

    public selections = new Set<Partial<Report>>();

    public readonly displayColumns = ['title', 'author', 'date', 'actions'];

    public fName = '';

    @ViewChild('fileUpload') public fileUpload: ElementRef;

    public curDisplayLen: Observable<number>;

    @ViewChildren('filter') public filters: QueryList<ElementRef>;
    public filter: ElementRef;

    private readonly subscriptions = [];

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        protected service: ThreatReportOverviewService,
        protected uploadService: ReportUploadService,
        protected snackBar: MatSnackBar,
        protected genericApiService: GenericApi,
    ) { }

    ngOnInit() {
        this.load();
    }

    /**
     * @description load workproducts, setup this components datasource
     * @param {string} optional threat report id
     */
    public load(threatReportId?: string): Observable<Report[]> {
        this.reportsLoading = true;

        const loadReports$ = this.service.loadAllReports();
        let loadAll$ = observableCombineLatest(loadReports$).pipe(
            withLatestFrom((results) => {
                let filter = [];
                if (this.data && this.data.reports) {
                    filter = this.data.reports;
                }
                return results[0].filter(report => !filter.some(have => this.areSameReport(have, report)));
            }));
        loadAll$ = loadAll$.pipe(
            tap(() => {
                // removing spinner, put on change queue
                requestAnimationFrame(() => {
                    this.reportsLoading = false;
                });
            }),
            tap(() => {
                // trigger change detection, to connect number of reports show needed or get expression changed error
                requestAnimationFrame(() => {
                    this.curDisplayLen = this.currents.curDisplayLen$;
                });
            }));

        this.currents = new ReportsDataSource(loadAll$);
        return loadReports$;
    }

    /**
     * @description initalization after view children are set
     */
    public ngAfterViewInit(): void {
        if (this.data && this.data.reports) {
            this.data.reports.forEach((report) => this.onSelectReport(report));
        }

        const sub$ = this.filters.changes.subscribe(
            (comps) => this.initFilter(comps.first),
            (err) => console.log(err));
        this.subscriptions.push(sub$);
    }

    /**
     * @description initialize the filter input box
     */
    public initFilter(filter: ElementRef): void {
        if (!filter || !filter.nativeElement) {
            console.log('filter nativeElement is not initialized, cannot setup observable, moving on...')
            return;
        }

        this.filter = filter;
        const sub$ = observableFromEvent(this.filter.nativeElement, 'keyup').pipe(
            debounceTime(150),
            distinctUntilChanged())
            .subscribe(() => {
                if (!this.currents) {
                    return;
                }
                this.currents.nextFilter(this.filter.nativeElement.value);
            });
        this.subscriptions.push(sub$);
    }

    /**
     * @description clean up this component
     */
    public ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((sub) => sub.unsubscribe());
        }
    }

    /**
     * @description opens the file upload dialog
     */
    public openFileUpload(event: UIEvent): void {
        this.fileUpload.nativeElement.click();
    }

    /**
     * @description upload a file
     */
    public fileChanged(event?: UIEvent): void {
        const files: FileList = this.fileUpload.nativeElement.files;
        if (!event || !files || files.length < 1) {
            console.log('no files to upload, moving on...');
            return;
        }
        this.uploadFile(files[0]);
    }

    public uploadFile(file: File): void {
        const s$ = this.uploadService.post(file)
            .subscribe((response: any) => {
                if (response && response.length > 0) {
                    const el = response[0];
                    if (el && el.error) {
                        this.setErrorState(el.error);
                        return;
                    } else {
                        this.imports.data.push(el);
                    }
                }
            },
            (err) => this.setErrorState(err),
            () => {});
        this.subscriptions.push(s$);
    }

    public onDropReport(report: any, event?: UIEvent): void {
        this.imports.data = this.imports.data.filter(rep => report.attributes.name !== rep.attributes.name);
    }

    public onSelectReport(report: any, event?: UIEvent): void {
        let alreadySelected;
        this.selections.forEach((selected) => {
            if (this.areSameReport(report, selected)) {
                alreadySelected = selected;
            }
        });
        if (!alreadySelected) {
            this.selections.add(report);
        }
    }

    public onDeselectReport(report: any, event?: UIEvent): void {
        let alreadySelected;
        this.selections.forEach((selected) => {
            if (this.areSameReport(report, selected)) {
                alreadySelected = selected;
            }
        });
        if (alreadySelected) {
            this.selections.delete(alreadySelected);
        }
    }

    public isReportSelected(report: any): boolean {
        let result = false;
        this.selections.forEach((selection) => {
            if (this.areSameReport(report, selection)) {
                result = true;
            }
        });
        return result;
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

    public onPage(event?: PageEvent): void {
        this.currents.nextPageChange(event);
    }

    /**
     * @description a form was submitted, close the dialog
     */
    public onCancel(event?: UIEvent): void {
        this.dialogRef.close(false);
    }

    /**
     * @description a form was submitted, close the dialog
     */
    public onSave(event?: UIEvent): void {
        const reports = this.imports.data.concat(Array.from(this.selections));
        this.dialogRef.close(reports);
    }

    public setErrorState(err: string): void {
        this.snackBar.open(err, 'File Upload Failed', {
            duration: 3400,
        });
        this.fName = undefined;
    }

}
