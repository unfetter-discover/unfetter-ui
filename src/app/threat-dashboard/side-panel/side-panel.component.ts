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
import { Report } from '../../models/report';

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
    public modifiedBoundries: EventEmitter<ThreatReport> = new EventEmitter();

    @ViewChild('menu')
    public menu: MatMenu;

    public selectedExternalRef: Partial<Report>;
    public showMinimizeBtn = false;
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
            data: this.selectedExternalRef
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
                    .removeReport(this.selectedExternalRef as Report, this.threatReport);
                const load$ = this.load(workProductId).do((val) => this.threatReport = val as ThreatReport);
                const sub$ = Observable.concat(delete$, load$)
                    .subscribe(
                    (val) => this.modifiedBoundries.emit(this.threatReport),
                    (err) => console.log(err));
                this.subscriptions.push(sub$);
            });
    }

    /**
     * @description open a report from the side nav
     * @param {any} externalRef
     * @param {UIEvent} event optional 
     */
    public onOpenExternalRef(event?: UIEvent): void {
        const ref = this.selectedExternalRef;
        const externalRefs = ref.attributes.external_references;
        if (ref && externalRefs && externalRefs.length > 0) {
            const url = externalRefs[0].url;
            window.open(url, '_blank');
        }
    }

    /**
     * @description on open menu event, remember the selected row
     * @param {Partial<Report>} selected 
     * @param {UIEvent} event optional 
     */
    public onOpenMenu(selected: Partial<Report>, event?: UIEvent): void {
        if (!selected) {
            return;
        }

        if (event) {
            event.stopImmediatePropagation();
            event.preventDefault();
        }

        this.selectedExternalRef = selected;
    }

    /**
     * @description load the overview workproduct with the given id, or return an empty Observable
     * @param workProductId
     * @return {Observable<ThreatReport>}
     */
    public load(workProductId: string): Observable<Partial<ThreatReport>> {
        if (!workProductId || workProductId.trim().length === 0) {
            return Observable.empty();
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
            .subscribe(
            this.addReport.bind(this),
            (err) => console.log(err));
    }

    /**
     * @description add new report
     */
    public addReport(result: Partial<ThreatReport> | Partial<Report> | boolean): void {
        const isBool = typeof result === 'boolean';
        const isUndefined = typeof result === 'undefined';
        if (isUndefined || isBool && !!result) {
            return;
        }

        // add new report
        let tro = new ThreatReport();
        tro.boundries = this.threatReport.boundries;
        tro.name = this.threatReport.name;
        tro.date = this.threatReport.date;
        tro.author = this.threatReport.author;
        tro.id = this.threatReport.id;
        tro.published = this.threatReport.published;
        tro.reports = this.threatReport.reports || [];
        const threatReport = result as Partial<ThreatReport>;
        if (threatReport && !isBool && threatReport.boundries) {
            // this is a boundries update,
            //  copy over boundries to save to db
            const boundries = threatReport.boundries;
            Object.keys(boundries)
                .filter((key) => boundries[key] !== undefined)
                .forEach((key) => tro.boundries[key] = boundries[key]);
        } else if (result) {
            // TODO: more efficiently, save this report and update the page
            // this is an update single report operation
            const report = new Report();
            report.attributes = (result as any).attributes;
            tro.reports = tro.reports.concat(report);
        }

        this.saveAndLoadThreatReport(tro);
    }

    /**
     * @description save a threat report and reload this components data
     * @param threatReport
     */
    public saveAndLoadThreatReport(threatReport: ThreatReport): void {
        if (!threatReport) {
            return;
        }
        
        const self = this;
        const add$ = this.threatReportOverviewService
            .saveThreatReport(threatReport)
            .subscribe(
            (resp) => {
                console.log(`saved report ${resp}`);
                // TODO: fix this, the resp does not have the id of the newly save report,
                //   thus a delete operation will fail if the page is not refreshed first
                self.threatReport = resp as ThreatReport;
                self.modifiedBoundries.emit(self.threatReport);
                // const innerSub$ = this.threatReportOverviewService
                //     .load(resp.id)
                //     .subscribe((innerThreatReport) => {
                //         self.threatReport = innerThreatReport as ThreatReport;
                //         self.modifiedBoundries.emit(self.threatReport);
                //     },
                //     (err) => console.log(err),
                //     () => innerSub$.unsubscribe());
            },
            (err) => console.log(err),
            () => add$.unsubscribe());
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

    /**
     * @description
     */
    public toggleLock(event?: UIEvent): void {
        if (event) {
            console.log(event);
        }
        this.threatReport.published = !this.threatReport.published;
        this.saveAndLoadThreatReport(this.threatReport);
    }
}
