import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output, Inject } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatDialogRef, MatSelectionList, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Constance } from '../../utils/constance';
import { ThreatReport } from '../models/threat-report.model';

@Component({
    selector: 'unf-threat-report-dialog',
    templateUrl: 'modify-report-dialog.component.html',
    styleUrls: ['modify-report-dialog.component.scss']
})
export class ModifyReportDialogComponent implements OnInit, OnDestroy {

    public attackPatterns;
    public threatReport: ThreatReport;
    public showReportStep = true;
    public showMalwareStep = false;
    public showIntrusionStep = false;
    private readonly subscriptions: Subscription[] = [];

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
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
    public onFormSubmit(event: any): void {
        this.dialogRef.close(event);
    }

}
