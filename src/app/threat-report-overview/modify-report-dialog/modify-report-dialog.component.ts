import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output, Inject } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatDialogRef, MatSelectionList, MAT_DIALOG_DATA, MatButton, MatInput } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { AddExternalReportComponent } from './add-external-report/add-external-report.component';
import { Constance } from '../../utils/constance';
import { ConfigService } from '../../core/services/config.service';
import { ExternalDataTranslationResponse } from '../../threat-dashboard/models/adapter/external-data-translation-response';
import { UrlTranslationResponse } from '../../threat-dashboard/models/adapter/url-translation-response';
import { UrlTranslationRequest } from '../../threat-dashboard/models/adapter/url-translation-request';
import { JsonApiObject } from '../../threat-dashboard/models/adapter/json-api-object';
import { ReportTranslationService } from '../../threat-dashboard/services/report-translation.service';
import { Stix } from '../../threat-dashboard/models/adapter/stix';
import { ThreatReport } from '../models/threat-report.model';

@Component({
    selector: 'unf-threat-report-dialog',
    templateUrl: 'modify-report-dialog.component.html',
    styleUrls: ['modify-report-dialog.component.scss']
})
export class ModifyReportDialogComponent implements OnInit, OnDestroy {

    @ViewChild('nextToReportFormBtn')
    public nextToReportFormBtn: MatButton;
    @ViewChild('reportForm')
    public reportForm: AddExternalReportComponent;

    // configure what shows up in the dialog
    public showReportStep = true;
    public showReportByUrlStep = true;
    public showMalwareStep = false;
    public showIntrusionStep = false;

    public attackPatterns;
    public threatReport: ThreatReport;
    public stixReport: Stix;
    public urlTranslationError: string;

    private readonly subscriptions: Subscription[] = [];

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public reportTranslationService: ReportTranslationService,
        public configService: ConfigService,
    ) { }

    /**
     * @description
     * @returns {void}
     */
    public ngOnInit(): void {
        if (this.data) {
            if (this.data.attackPatterns) {
                this.attackPatterns = this.data.attackPatterns;
            }

            if (this.data.threatReport) {
                this.threatReport = this.data.threatReport;
            }

            this.showReportStep = this.data.showReportStep || this.showReportStep;
            this.showMalwareStep = this.data.showMalwareStep || this.showMalwareStep;
            this.showIntrusionStep = this.data.showIntrusionStep || this.showIntrusionStep;

            const configs = this.configService.getConfigPromise();
            configs.then((resp) => {
                console.log(resp);
                // TODO: filter out systemNames, distinct and sorted
            })

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
     * @description a form was submitted
     *  close the dialog
     * @param event
     * @return {void}
     */
    public closeDialog(event: any): void {
        this.dialogRef.close(event);
    }

    /**
     * @description read the text field for a url and fetch some data
     * @param {string} url optional
     */
    public onLoadReportByUrl(url: string, event: UIEvent): void {
        if (event) {
            event.preventDefault();
        }

        if (!url) {
            this.generateErrorMsg(url);
            return;
        }

        this.urlTranslationError = undefined;
        this.stixReport = undefined;
        this.reportForm.resetForm(this.stixReport);
        const fetchUrl$ = this.fetchTranslatedUrl(url);
        const sub1$ = fetchUrl$.subscribe(
            (resp) => {
                const urlTranslationResponse = resp.data;
                const o1$ = this.fetchReportJson(urlTranslationResponse);
                const sub2$ = o1$.subscribe(
                    (reportJson) => {
                        const report = reportJson.data || reportJson;
                        const sub3$ = this.translateReportJson(report).subscribe(
                            (stixReport) => {
                                if (stixReport && stixReport.data.translated.success === false) {
                                    this.generateErrorMsg(url);
                                    return;
                                }
                                this.stixReport = stixReport.data.translated.payload.stix;
                                this.reportForm.resetForm(this.stixReport);
                            },
                            (err) => this.generateErrorMsg(url, err),
                            () => sub3$.unsubscribe()
                        )
                    },
                    (err) => {
                        console.log(err);
                        this.generateErrorMsg(url);
                    },
                    () => sub2$.unsubscribe());
            },
            (err) => {
                this.generateErrorMsg(url, 'Error connecting to server.');
                console.log(err);
            },
            () => sub1$.unsubscribe());
    }

    /**
     * @description
     * @param url
     * @param prefix
     */
    protected generateErrorMsg(url: string, prefix?: string) {
        let msg = `Failed to lookup URL ${url}`;
        if (prefix) {
            msg = prefix + msg;
        }
        this.urlTranslationError = msg;
    }

    /**
     * 
     * @param url
     */
    protected fetchTranslatedUrl(url: string): Observable<JsonApiObject<UrlTranslationResponse>> {
        if (!url) {
            this.generateErrorMsg(url);
            return Observable.throw('url translation was not successful');
        }

        const req = new UrlTranslationRequest();
        req.systemName = 'sample-report-system';
        req.url = url;
        const o$ = this.reportTranslationService.translateUrl(req);
        return o$;
    }

    /**
     * @description
     * @param {UrlTranslationResponse}
     */
    protected fetchReportJson(urlTranslationResponse: UrlTranslationResponse): Observable<any> {
        const url = urlTranslationResponse.translated.url;
        if (urlTranslationResponse && urlTranslationResponse.translated.success === false) {
            this.generateErrorMsg(url);
            return Observable.throw('url translation was not successful');
        }

        const translatedUrl = urlTranslationResponse.translated.url;
        return this.reportTranslationService.fetchReport(translatedUrl, true)
    }

    /**
     * @description
     * @param {any} reportJson
     */
    protected translateReportJson(reportJson: any): Observable<JsonApiObject<ExternalDataTranslationResponse>> {
        return this.reportTranslationService.translateData(reportJson);
    }

}
