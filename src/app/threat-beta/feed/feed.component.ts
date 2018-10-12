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
    private _reportsPerPage: number;
    private _reportsPages: number;
    @ViewChild('reportsView') reportsView: ElementRef;

    public boards = [];
    private _boardsLoaded = false;
    public boardHoverIndex = -1;
    public boardsHover = false;
    public boardsPage = 0;
    private _boardsPerPage: number;
    private _boardsPages: number;
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
                                this.calculateBoardsWindow();
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
                                console.log(`(${new Date().toISOString()}) reports list`, this.reports);
                                this.calculateReportsWindow();
                                this._reportsLoaded = true;
                            },
                            (err) => console.log(`(${new Date().toISOString()}) Error loading reports:`, err)
                        );
                },
                (err) => console.log(`(${new Date().toISOString()}) Error loading threat board:`, err)
            )
    }

    private calculateReportsWindow() {
        if (!this.reportsView) {
            requestAnimationFrame(() => this.calculateReportsWindow());
        } else {
            let perPage = 1;
            const itemWidth = this.carouselItemWidth + this.carouselItemPadding;
            const reportsWidth = this.reportsView.nativeElement.offsetWidth +
                    (Number.parseInt(this.reportsView.nativeElement.style['margin-left'] || 0, 10));
            perPage = Math.floor(reportsWidth / itemWidth);
            if (reportsWidth - perPage * itemWidth < this.carouselItemPadding) {
                perPage++;
            }
            this._reportsPerPage = Math.max(perPage, 1);
            this._reportsPages = Math.ceil(this.reports.length / this._reportsPerPage);
        }
    }

    private get reportsPerPage() {
        return this._reportsPerPage;
    }

    public get reportsPages() {
        return this._reportsPages;
    }

    public get reportsOffset() {
        return this.reportsPage * this._reportsPerPage * -220;
    }

    public isFirstReport() {
        return this.reportsPage === 0;
    }

    public isLastReport() {
        return this.reportsPage >= this._reportsPages - 1;
    }

    public scrollReportsLeft() {
        if (this.reportsPage > 0) {
            this.reportsPage--;
        }
    }

    public scrollReportsRight() {
        if (this.reportsPage < this._reportsPages - 1) {
            this.reportsPage++;
        }
    }

    public scrollToReportsPage(page: number) {
        page = Math.max(0, Math.min(page, this._reportsPages - 1));
        if (this.reportsPage !== page) {
            this.reportsPage = page;
        }
    }

    public approveReport(id: string) {
        // We need to submit some kind of request to move a report from the "potentials" metaproperty to the
        // reports array inside the threatboard document.
        console.log(`Request to approve report '${id}' received`);
    }

    public rejectReport(id: string) {
        // We need to submit some kind of request to delete a report from the "potentials" metaproperty or from the
        // reports array inside the threatboard document.
        console.log(`Request to reject report '${id}' received`);
    }

    public viewReport(id: string) {
        console.log(`Request to view report '${id}' received`);
    }

    public shareReport(id: string) {
        console.log(`Request to share report '${id}' received`);
    }

    private calculateBoardsWindow() {
        if (!this.boardsView) {
            requestAnimationFrame(() => this.calculateBoardsWindow());
        } else {
            let perPage = 1;
            const itemWidth = this.carouselItemWidth + this.carouselItemPadding;
            const boardsWidth = this.boardsView.nativeElement.offsetWidth +
                    (Number.parseInt(this.boardsView.nativeElement.style['margin-left'] || 0, 10));
            perPage = Math.floor(boardsWidth / itemWidth);
            if (boardsWidth - perPage * itemWidth < this.carouselItemPadding) {
                perPage++;
            }
            this._boardsPerPage = Math.max(perPage, 1);
            this._boardsPages = Math.ceil(this.boards.length / this._boardsPerPage);
        }
    }

    private get boardsPerPage() {
        return this._boardsPerPage;
    }

    public get boardsPages() {
        return this._boardsPages;
    }

    public get boardsOffset() {
        return this.boardsPage * this._boardsPerPage * -220;
    }

    public isFirstBoard() {
        return this.boardsPage === 0;
    }

    public isLastBoard() {
        return this.boardsPage >= this._boardsPages - 1;
    }

    public scrollBoardsLeft() {
        if (this.boardsPage > 0) {
            this.boardsPage--;
        }
    }

    public scrollBoardsRight() {
        if (this.boardsPage < this._boardsPages - 1) {
            this.boardsPage++;
        }
    }

    public scrollToBoardsPage(page: number) {
        page = Math.max(0, Math.min(page, this._boardsPages - 1));
        if (this.boardsPage !== page) {
            this.boardsPage = page;
        }
    }

    public followBoard(id: string) {
        console.log(`Request to follow board '${id}' received`);
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

    public get boardUpdateTime() {
        return new Date(this.threatBoard.modified).toUTCString();
    }

}
