import { Component, OnInit, Input, OnDestroy, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatMenu } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { parentFadeIn, slideInOutAnimation } from '../../global/animations/animations';

import { AttackPattern } from '../../models/attack-pattern';
import { Constance } from '../../utils/constance';
import { ConfirmationDialogComponent } from '../../components/dialogs/confirmation/confirmation-dialog.component';
import { GenericApi } from '../../core/services/genericapi.service';
import { ThreatReport } from '../../threat-report-overview/models/threat-report.model';
import { SortHelper } from '../../assessments/assessments-summary/sort-helper';
import { ModifyReportDialogComponent } from '../../threat-report-overview/modify-report-dialog/modify-report-dialog.component';
import { ThreatReportOverviewService } from '../services/threat-report-overview.service';

@Component({
    selector: 'unf-side-panel',
    templateUrl: 'side-panel.component.html',
    styleUrls: ['./side-panel.component.scss'],
    animations: [parentFadeIn, slideInOutAnimation]
})
export class SidePanelComponent implements OnInit, OnDestroy {

    @Input('threatReport')
    public threatReport: ThreatReport;

    @Input('attackPatterns')
    public attackPatterns: AttackPattern[];

    @Output()
    public modifiedBoundries: EventEmitter<any> = new EventEmitter();

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
     * @description clean up this component
     */
    public ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        }
        this.dialog.closeAll();
    }

    /**
     * @description delete a report from the side nav
     * @param {any} externalRef
     * @param {UIEvent} event optional 
     */
    public onDeleteExternalRef(event?: UIEvent): void {
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
                        this.modifiedBoundries.emit(val);
                    },
                    (err) => console.log(err)
                    );
                this.subscriptions.push(sub$);
            });
    }

    /**
     * @description open a report from the side nav
     * @param {any} externalRef
     * @param {UIEvent} event optional 
     */
    public onOpenExternalRef(event?: UIEvent): void {
        const ref: any = this.selectedExternalRef;
        const externalRefs: any[] = ref.external_references;
        if (ref && externalRefs && externalRefs.length > 0) {
            const url = externalRefs[0].external_url;
            window.open(url, '_blank');
        }
    }

    /**
     * @description on open menu event, remember the selected row
     * @param selected 
     * @param {UIEvent} event optional 
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

    /**
     * @description open add external report dialog
     * @param {UIEvent} event optional
     * @return {void}
     */
    public openAddReportDialog(event?: UIEvent): void {
        const config = {
            width: '800px',
            height: 'calc(100vh - 140px)',
            data: {} as { 
                attackPatterns: any, 
                threatReport: any,
                showMalwareStep: boolean,
                showIntrusionStep: boolean,
            },
        };

        if (this.attackPatterns) {
            config.data.attackPatterns = this.attackPatterns;
        }
        config.data.threatReport = this.threatReport;
        config.data.showMalwareStep = true;
        config.data.showIntrusionStep = true;

        this.dialog.open(ModifyReportDialogComponent, config)
            .afterClosed()
            .subscribe((result: Partial<ThreatReport> | boolean) => {
                const isBool = typeof result === 'boolean';
                const isUndefined = typeof result === 'undefined';
                if (isUndefined || isBool && !result) {
                    return;
                }

                // add new report
                let tro = new ThreatReport();
                tro.boundries = this.threatReport.boundries;
                tro.name = this.threatReport.name;
                tro.date = this.threatReport.date;
                tro.author = this.threatReport.author;
                tro.id = this.threatReport.id;
                result = result as Partial<ThreatReport>;
                if (result && !isBool && !result.reports) {
                    // if this is not a report update, 
                    //      grab the existing reports and prepare them for the save to db operation
                    tro.reports = this.threatReport.reports || [];
                    tro.reports = tro.reports.map((report) => {
                        return {
                            data: {
                                attributes: report
                            },
                        };
                    });
                    // check if we have any boundries copy them over to save to db
                    if (result.boundries) {
                        const boundries = result.boundries;
                        Object.keys(boundries)
                            .filter((key) => boundries[key] !== undefined)
                            .forEach((key) => tro.boundries[key] = boundries[key]);
                    }
                } else if (result && result.reports) {
                    // this is an update single report operation
                    tro.reports = result.reports;
                }

                const add$ = this.threatReportOverviewService
                    .saveThreatReport(tro)
                    .subscribe(
                    (resp) => {
                        console.log(`saved report ${resp}`);
                        const innerSub$ = this.threatReportOverviewService
                            .load(this.threatReport.id)
                            .subscribe((threatReport) => {
                                this.threatReport = threatReport;
                                this.modifiedBoundries.emit(this.threatReport);
                            },
                            (err) => console.log(err),
                            () => innerSub$.unsubscribe());
                    },
                    (err) => console.log(err),
                    () => add$.unsubscribe());

            },
            (err) => console.log(err));
    }

    /**
     * @description angular track by list function, uses the items id if
     *  it exists, otherwise uses the index
     * @param {number} index
     * @param {item}
     * @return {number}
     */
    public trackByFn(index: number, item: any): number {
        return item.id || index;
    }
}
