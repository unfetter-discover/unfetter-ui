import { Component, OnInit, Input, OnDestroy, ViewChild, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Constance } from '../../utils/constance';
import { GenericApi } from '../../global/services/genericapi.service';
import { ThreatReport } from '../../threat-report-overview/models/threat-report.model';
import { SortHelper } from '../../assessments/assessments-summary/sort-helper';
import { ConfirmationDialogComponent } from '../../components/dialogs/confirmation/confirmation-dialog.component';
import { MatDialog, MatMenu } from '@angular/material';
import { ThreatReportOverviewService } from '../services/threat-report-overview.service';

@Component({
    selector: 'unf-side-panel',
    templateUrl: 'side-panel.component.html',
    styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit, OnDestroy {

    @Input('threatReport')
    public threatReport: ThreatReport;

    @ViewChild('menu')
    public menu: MatMenu;

    public selectedExternalRef: ThreatReport;

    public readonly subscriptions: Subscription[] = [];

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected genericApiService: GenericApi,
        protected threatReportOverviewService: ThreatReportOverviewService,
        protected dialog: MatDialog,
        protected renderer: Renderer2,
    ) { }

    /**
     * @description init this component
     */
    public ngOnInit() {

    }

    /**
     * @description 
     */
    public ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        }
    }

    /**
     * @description delete a report from the side nav
     * @param {any} externalRef
     * @param {UIEvent} event optional 
     */
    public onDeleteExternalRef(event?: UIEvent): void {
        console.log(event);
        console.log(this.selectedExternalRef);
        if (!this.selectedExternalRef || !this.selectedExternalRef.id) {
            console.log(`I do not know which external ref to delete, moving on...`);
        }

        const reportId = this.selectedExternalRef.id;
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                attributes: this.selectedExternalRef
            }
        });
        const workProductId = this.threatReport.id;

        dialogRef.afterClosed().subscribe(
            (result) => {
                const isBool = typeof result === 'boolean';
                const isString = typeof result === 'string';
                if (!result ||
                    (isBool && result !== true) ||
                    (isString && result !== 'true')) {
                    return;
                }

                const delete$ = this.threatReportOverviewService
                    .deleteThreatReport(reportId);
                const load$ = this.load(workProductId).do((val) => this.threatReport = val);
                const sub$ = Observable.concat(delete$, load$)
                    .subscribe(
                        (val) => {
                            console.log(val);
                        },
                        (err) => console.log(err)
                    );
                this.subscriptions.push(sub$);
            });
    }

    /**
     * @description on open menu event, remember the selected row
     * @param selected 
     * @param event 
     */
    public onOpenMenu(selected: ThreatReport, event?: UIEvent): void {
        if (!selected) {
            return;
        }
        this.selectedExternalRef = selected;
    }

    /**
     * @description load the overview workproduct with the given id, or return an empty Observable
     * @param workProductId
     * @return {Observable<ThreatReport>}
     */
    public load(workProductId: string): Observable<ThreatReport> {
        if (!workProductId || workProductId.trim().length === 0) {
            return Observable.of();
        }

        return this.threatReportOverviewService.load(workProductId);
    }

    /**
     * @description navigate to the stix page relating to the given id, or noop for no id
     * @param {string} intrustionId uuid
     * @param {UIEvent} event optional
     * @returns {Promise<boolean>}
     */
    public onNavigateToIntrusion(intrusionId: string = '', event?: UIEvent): Promise<boolean> {
        if (!intrusionId || intrusionId.trim().length === 0) {
            return;
        }

        const url = `/stix/intrusion-sets/`;
        return this.router.navigate([url, intrusionId]);
    }

    /**
     * @description navigate to the stix page relating to the given id, or noop for no id
     * @param {string} intrustionId uuid
     * @param {UIEvent} event optional
     * @returns {Promise<boolean>}
     */
    public onNavigateToMalware(malwareId: string = '', event?: UIEvent): Promise<boolean> {
        if (!malwareId || malwareId.trim().length === 0) {
            return;
        }

        const url = `/stix/malwares/`;
        return this.router.navigate([url, malwareId]);
    }

    /**
     * @description highlight background on hover, using a class
     * @param {UIEvent} event optional
     * @return {void}
     */
    public listItemMouseEnter(event: UIEvent): void {
        if (!event) {
            return;
        }

        const el = event.currentTarget;
        this.renderer.addClass(el, 'list-item-hover');
    }

    /**
     * @description remove highlight background on hover, using a class
     * @param {UIEvent} event optional
     * @return {void}
     */
    public listItemMouseLeave(event: UIEvent): void {
        if (!event) {
            return;
        }

        const el = event.currentTarget;
        this.renderer.removeClass(el, 'list-item-hover');
    }

}
