import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MatTableDataSource, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { forkJoin, Observable } from 'rxjs';
import { delay, finalize, map, switchMap, tap } from 'rxjs/operators';
import { Identity } from 'stix/stix/identity';
import { BaseComponentService } from '../../../components/base-service.component';
import { GenericApi } from '../../../core/services/genericapi.service';
import { heightCollapse } from '../../../global/animations/height-collapse';
import { RxjsHelpers } from '../../../global/static/rxjs-helpers';
import { Report } from '../../../models/report';
import { ThreatReportOverviewService } from '../../../threat-dashboard/services/threat-report-overview.service';
import { Constance } from '../../../utils/constance';
import { ExternalDataTranslationRequest } from '../../models/adapter/external-data-translation-request';
import { ReportTranslationService } from '../../services/report-translation.service';
import { ReportUploadService } from './report-upload.service';
import { ReportsDataSource } from './reports.datasource';

@Component({
    selector: 'report-importer',
    templateUrl: './report-importer.component.html',
    styleUrls: ['./report-importer.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    animations: [heightCollapse],
})
export class ReportImporterComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('fileUpload') public fileUpload: ElementRef;
    public currents: ReportsDataSource;
    public identities: Identity[];
    public reports$: Observable<Report[]>;
    public fName = '';
    public imports = new MatTableDataSource<Partial<Report>>();
    public urlImports = new MatTableDataSource<Partial<Report>>();
    public readonly displayColumns = ['title', 'author', 'date', 'actions'];
    public reportsLoading = true;
    public selections = new Set<Partial<Report>>();
    public shouldShowUrlInput: boolean = false;
    public loadReportByUrlForm: FormGroup;
    public loadReportByUrlFormResetComplete = true;
    private readonly subscriptions = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        protected changeDetectorRef: ChangeDetectorRef,
        protected dialogRef: MatDialogRef<any>,
        protected externalReportTranslationService: ReportTranslationService,
        protected formBuilder: FormBuilder,
        protected genericApiService: GenericApi,
        protected service: ThreatReportOverviewService,
        protected snackBar: MatSnackBar,
        protected uploadService: ReportUploadService,
    ) { }

    public ngOnInit(): void {
        this.reports$ = this.load();
    }

    /**
     * @description load workproducts, setup this components datasource
     * @param {string} optional threat report id
     */
    public load(threatReportId?: string): Observable<Report[]> {
        this.resetLoadReportByUrlForm();
        const loadIdentities$ = this.fetchSystemIdentities();
        const loadReports$ = this.service.loadAllReports();
        const loadAll$ = forkJoin(loadReports$, loadIdentities$)
            .pipe(
                tap(() => this.reportsLoading = true),
                map(([results, idents]) => {
                    this.identities = idents;
                    const filter = (this.data && this.data.reports) ? this.data.reports : [];
                    return results.filter((report) => !filter.some((have) => this.areSameReport(have, report)));
                }),
                finalize(() => {
                    // removing spinner
                    this.reportsLoading = false;
                }),
                // change detection
                delay(0),
        );
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
     * @description fetch system identities so we can resolve the name in the table
     * @returns Observable
     */
    public fetchSystemIdentities(): Observable<Identity[]> {
        const identityFilter = encodeURI(JSON.stringify({ 'stix.identity_class': 'organization' }));
        return this.genericApiService
            .get(`${Constance.IDENTITIES_URL}?filter=${identityFilter}`)
            .pipe(RxjsHelpers.unwrapJsonApi()) as Observable<Identity[]>;
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

    /**
     * @description uploads a csv file to the unfetter backend
     * CSV rows in, Stix reports come out
     * @param  {File} file
     * @returns void
     */
    public uploadFile(file: File): void {
        const s$ = this.uploadService.post(file)
            .subscribe(
                (response: any) => {
                    if (response && response.length > 0) {
                        const el = response[0];
                        if (el && el.error) {
                            this.setErrorState(el.error);
                            return;
                        } else {
                            // convert the created by ref to the open group
                            const reports = response.map((report) => {
                                report.attributes.created_by_ref = this.lookupSystemIdentityId() || report.created_by_ref;
                                return report;
                            })
                            // add to the material table
                            this.imports.data.push(...reports);
                        }
                    }
                },
                (err) => this.setErrorState(err)
            );
        this.subscriptions.push(s$);
    }

    /**
     * @description remove the given report from the list of csv imported reports
     * @param  {any} report
     * @param  {UIEvent} event?
     * @returns void
     */
    public onDropReport(report: any, event?: UIEvent): void {
        this.imports.data = this.imports.data.filter((rep) => report.attributes.name !== rep.attributes.name);
    }

    /**
     * @param  {any} report
     * @param  {UIEvent} event?
     * @returns void
     */
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

    /**
     * @param  {any} report
     * @param  {UIEvent} event?
     * @returns void
     */
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

    public areSameReport(report1: Partial<Report>, report2: Partial<Report>): boolean {
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

    /**
     * @returns any
     */
    public resetLoadReportByUrlForm(): void {
        this.loadReportByUrlForm = this.formBuilder.group({
            url: ['', Validators.required],
        });
    }

    /**
     * @returns void
     */
    public onLoadReportByUrlSubmit(): void {
        const form = this.loadReportByUrlForm.value;
        console.log('requesting ', form.url);
        const fetchReport$ = this.externalReportTranslationService.fetchExternalReport(form.url);
        const sub$ = fetchReport$
            .pipe(
                switchMap((externalReport: any) => {
                    console.log('translating external report', externalReport);
                    const req = new ExternalDataTranslationRequest();
                    req.payload = externalReport;
                    return this.externalReportTranslationService.translateData(req);
                }),
                map((resp) => {
                    console.log('translation success flag is', resp.translated.success);
                    return resp.translated.payload;
                }),
                map((wrappedStix) => wrappedStix.stix),
                map((stix: any) => {
                    stix.created_by_ref = this.lookupSystemIdentityId() || stix.created_by_ref;
                    return stix;
                }),
                map((stix: any) => {
                    const report = new Report();
                    report.attributes = stix;
                    return report;
                }),
                map((report: Report) => {
                    console.log('adding report', report);
                    this.urlImports.data.push(report);
                    return report;
                }),
                map((report: Report) => {
                    this.loadReportByUrlFormResetComplete = false;
                    this.resetLoadReportByUrlForm();
                    this.changeDetectorRef.detectChanges(); // To force rerender of angular material inputs
                    this.loadReportByUrlFormResetComplete = true;
                    return report;
                })
            )
            .subscribe(
                (report) => { },
                (err) => {
                    console.log('loading a report by url failed, perhaps CORS needs to be enabled on the external servers?');
                    console.log(err);
                }
            );

        this.subscriptions.push(sub$);

    }

    /**
     * @description look for system identity and reeturn its id
     * @returns string
     */
    public lookupSystemIdentityId(): string {
        const unfetter = 'Unfetter Open';
        if (this.identities) {
            return this.identities.find((ident) => ident.name === unfetter).id;
        } else {
            return '';
        }
    }

    /**
     * @description take an id and return its human readable name
     * @param  {string} identityId
     * @returns string
     */
    public resolveIdentityIdToName(identId: string): string {
        if (!identId) {
            return identId;
        }

        const ident = this.identities.find((cur) => cur.id === identId);
        if (ident && ident.name) {
            return ident.name;
        }
        return identId;
    }

}
