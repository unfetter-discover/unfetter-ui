import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { pluck, map, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Report } from 'stix';
import { ThreatBoard } from 'stix/unfetter/index';

import { ThreatFeatureState } from '../store/threat.reducers';
import { getSelectedBoard } from '../store/threat.selectors';
import * as fromThreat from '../store/threat.actions';

@Component({
    selector: 'feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

    public threatBoard: ThreatBoard;
    private _boardLoaded = false;

    public readonly carouselItemWidth = 200;
    public readonly carouselItemPadding = 20;

    public reports = [];
    private _reportsLoaded = false;
    public reportHoverIndex = -1;
    public reportsHover = false;
    public reportsPage = 0;
    @ViewChild('reportsView') reportsView: ElementRef;

    public boards = {};
    private _boardsLoaded = false;
    public boardHoverIndex = -1;
    public boardsHover = false;
    public boardsPage = 0;
    @ViewChild('boardsView') boardsView: ElementRef;

    public readonly sorts = [
        { name: 'Newest', sorter: this.sortByLastModified },
        { name: 'Oldest', sorter: this.sortByFirstCreated },
        { name: 'Likes', sorter: this.sortByMostLikes },
        { name: 'Comments', sorter: this.sortByMostComments },
    ];

    constructor(
        private store: Store<ThreatFeatureState>,
        private sanitizer: DomSanitizer,
    ) {
    }

    public get boardLoaded() { return this._boardLoaded; }

    public get reportsLoaded() { return this._reportsLoaded; }

    public get boardsLoaded() { return this._boardsLoaded; }

    ngOnInit() {
        this.store.select(getSelectedBoard)
            .subscribe(
                (board) => {
                    console.log('retrieved threat board:', board);
                    this.threatBoard = board;
                    this._boardLoaded = true;

                    this.store.select('threat')
                        .pipe(
                            pluck('boardList')
                        )
                        .subscribe(
                            (boards: any[]) => {
                                this.boards = boards.filter(b => b.id !== board.id);
                                console.log(`(${new Date().toISOString()}) board list`, this.boards);
                                this._boardsLoaded = true;
                            },
                            (err) => console.log(`(${new Date().toISOString()}) Error loading boards:`, err)
                        );

                    this.store.select('threat')
                        .pipe(
                            pluck('feedReports')
                        )
                        .subscribe(
                            (reports: any[]) => {
                                this.reports = reports
                                        .map(report => ({ ...report, vetted: board.reports.includes(report.id) }))
                                        .sort(this.sortByLastModified);
                                console.log('full reports', this.reports);
                                this._reportsLoaded = true;
                            },
                            (err) => console.log(`(${new Date().toISOString()}) Error loading reports:`, err)
                        );
                },
                (err) => console.log(`(${new Date().toISOString()}) Error loading threat board:`, err)
            )
    }

    public getReportBackground(report: any) {
        const colors = [
            ['darkred', 'rosybrown'],
            ['lightblue', 'darkblue'],
            ['lightgreen', 'darkgreen'],
            ['orchid', 'darkorchid'],
            ['palevioletred', 'mediumvioletred'],
        ];
        const n = report.name.charCodeAt(0) % colors.length;
        return `linear-gradient(${colors[n][0]}, ${colors[n][1]})`;
    }

    public getReportBackgroundImage(report: any) {
        return this.sanitizer.bypassSecurityTrustStyle(
                `url(${report.metaProperties.image}), linear-gradient(transparent, transparent)`);
    }

    public getBoardBackground(board: any) {
        const colors = [
            ['indianred', 'firebrick'],
            ['rebeccapurple', 'indigo'],
            ['olivedrab', 'olive'],
            ['slateblue', 'darkslateblue'],
            ['cadetblue', 'darkslategray'],
        ];
        const n = board.name.charCodeAt(0) % colors.length;
        return `linear-gradient(${colors[n][0]}, ${colors[n][1]})`;
    }

    public sortByFirstCreated(a: any, b: any) {
        return a.created.localeCompare(b.created);
    }

    public sortByLastModified(a: any, b: any) {
        return b.modified.localeCompare(a.modified);
    }

    public sortByMostLikes(a: any, b: any) {
        return b.modified.localeCompare(a.modified);
    }

    public sortByMostComments(a: any, b: any) {
        return b.modified.localeCompare(a.modified);
    }

    public isFirstReport() {
        return this.reportsPage === 0;
    }

    public isLastReport() {
        return this.reportsPage >= this.reportsPages - 1;
    }

    public scrollReportsLeft() {
        if (this.reportsPage > 0) {
            this.reportsPage--;
            if (this.reportsView) {
                this.reportsView.nativeElement.style['margin-left'] = `${this.reportsOffset}px`;
            }
        }
    }

    public scrollReportsRight() {
        if (this.reportsPage < this.reportsPages - 1) {
            this.reportsPage++;
            if (this.reportsView) {
                this.reportsView.nativeElement.style['margin-left'] = `${this.reportsOffset}px`;
            }
        }
    }

    private get reportsPerPage() {
        let perPage = 1;
        if (this.reportsView) {
            const itemWidth = this.carouselItemWidth + this.carouselItemPadding;
            const reportsWidth = this.reportsView.nativeElement.offsetWidth +
                    (Number.parseInt(this.reportsView.nativeElement.style['margin-left'] || 0, 10));
            perPage = Math.floor(reportsWidth / itemWidth);
            if (reportsWidth - perPage * itemWidth < this.carouselItemPadding) {
                perPage++;
            }
        }
        return Math.max(perPage, 1);
    }

    public get reportsPages() {
        return Math.ceil(this.reports.length / this.reportsPerPage);
    }

    public get reportsOffset() {
        return this.reportsPage * this.reportsPerPage * -220;
    }

    public get boardUpdateTime() {
        return new Date(this.threatBoard.modified).toUTCString();
    }

}
