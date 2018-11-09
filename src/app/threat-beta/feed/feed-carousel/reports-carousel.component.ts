import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { ThreatBoard } from 'stix/unfetter/index';

import { FeedCarouselComponent } from './feed-carousel.component';
import { ThreatDashboardBetaService } from '../../threat-beta.service';
import { ThreatFeatureState } from '../../store/threat.reducers';
import { getThreatBoardReports } from '../../store/threat.selectors';

/**
 * Displays reports, both vetted and potential, belonging to the given threatboard in a carousel. Vetted reports are
 * potential reports that a user confirmed are valid for this board. Potential reports will be flagged in the interface
 * to show they need someone to approve them.
 */
@Component({
    selector: 'reports-carousel',
    templateUrl: './reports-carousel.component.html',
    styleUrls: ['./reports-carousel.component.scss']
})
export class ReportsCarouselComponent implements OnInit, OnChanges {

    @Input() threatBoard: ThreatBoard;

    /**
     * The loaded list of vetted and potential reports.
     */
    private _reports: any[] = [];

    private _loaded: boolean = false;

    @ViewChild('carousel') carousel: FeedCarouselComponent;

    constructor(
        private threatboardService: ThreatDashboardBetaService,
        private boardStore: Store<ThreatFeatureState>,
        private sanitizer: DomSanitizer,
    ) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.threatBoard) {
            this.loadReports();
        }
    }

    public get reports() { return this._reports; }

    public get loaded() { return this._loaded; }

    /**
     * Grab all reports identified in this board, weeding out the one the user is currently viewing.
     */
    private loadReports() {
        this.boardStore.select(getThreatBoardReports)
            .subscribe(
                (reports: any[]) => {
                    this._reports = reports
                        .map(report => ({ ...report, vetted: this.threatBoard.reports.includes(report.id) }))
                        .sort((a, b) => b.modified.localeCompare(a.modified));
                    console['debug'](`(${new Date().toISOString()}) reports list`, this._reports);
                    this.carousel.calculateWindow();
                    this._loaded = true;
                },
                (err) => console.log(`(${new Date().toISOString()}) Error loading reports:`, err)
            );
    }

    public getReportBackground(item: any): string {
        const colors = [
            ['darkred', 'rosybrown'],
            ['lightblue', 'darkblue'],
            ['lightgreen', 'darkgreen'],
            ['orchid', 'darkorchid'],
            ['palevioletred', 'mediumvioletred'],
        ];
        const n = item.name.charCodeAt(0) % colors.length;
        return `linear-gradient(${colors[n][0]}, ${colors[n][1]})`;
    }

    public getReportBackgroundImage(item: any) {
        return this.sanitizer.bypassSecurityTrustStyle(
                (item.metaProperties.image ? `url(${item.metaProperties.image}), ` : '') +
                'linear-gradient(transparent, transparent)');
    }

    /**
     * Vet the given potential report by its id. If we are "accidentally" given a vetted report to begin with, this
     * function will have no effect (although the button should be disabled on the UI).
     */
    public approveReport(id: string) {
        const report = this.reports.find(r => r.id === id);
        if (report) {
            report.vetted = true;
        }
        if (this.threatBoard) {
            if (this.threatBoard.metaProperties && this.threatBoard.metaProperties.potentials) {
                const index = this.threatBoard.metaProperties.potentials.indexOf(id);
                if (index >= 0) {
                    this.threatBoard.metaProperties.potentials.splice(index, 1);                    
                }
            }
            if (!this.threatBoard.reports) {
                this.threatBoard.reports = [];
            }
            this.threatBoard.reports.push(id);
            this.threatboardService.updateBoard(this.threatBoard)
                .subscribe(
                    (response) => console['debug'](`(${new Date().toISOString()}) board updated`),
                    (err) => console.log(`(${new Date().toISOString()}) error updating board`, err)
                );
        }
    }

    /**
     * Remove the report by the given id from this threatboard, whether it's a vetted or potential report.
     */
    public rejectReport(id: string) {
        const report = this.reports.findIndex(r => r.id === id);
        if (report >= 0) {
            this.reports.splice(report, 1);
            requestAnimationFrame(() => this.carousel.calculateWindow());
            if (this.threatBoard) {
                if (this.threatBoard.metaProperties && this.threatBoard.metaProperties.potentials) {
                    const index = this.threatBoard.metaProperties.potentials.indexOf(id);
                    if (index >= 0) {
                        this.threatBoard.metaProperties.potentials.splice(index, 1);                    
                    }
                }
                if (this.threatBoard.reports) {
                    const index = this.threatBoard.reports.indexOf(id);
                    if (index >= 0) {
                        this.threatBoard.reports.splice(index, 1);                    
                    }
                }
                this.threatboardService.updateBoard(this.threatBoard)
                    .subscribe(
                        (response) => console['debug'](`(${new Date().toISOString()}) board updated`),
                        (err) => console.log(`(${new Date().toISOString()}) error updating board`, err)
                    );
            }
        }
    }

    /**
     * The user wants to "view" the report by the given id.
     * 
     * TODO Our expectation here is to display a large modal with the report displayed within it. The problem we may
     *      have with this is that the contents of a report are almost always offsite. Displaying the content will
     *      hit security issues, unless we properly frame the modal...
     */
    public viewReport(id: string) {
        console.log(`Request to view report '${id}' received`);
    }

    /**
     * The user wants to "share" the report by the given id. We currently have no definition for what "sharing" anything
     * means, so the button is currently disabled, and this function does nothing.
     */
    public shareReport(id: string) {
        console.log(`Request to share report '${id}' received`);
    }

}
