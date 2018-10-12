import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { pluck, map, filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Report } from 'stix';
import { ThreatBoard } from 'stix/unfetter/index';

import { ThreatFeatureState } from '../store/threat.reducers';
import { getSelectedBoard } from '../store/threat.selectors';
import * as fromThreat from '../store/threat.actions';
import { AppState } from '../../root-store/app.reducers';

@Component({
    selector: 'feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

    public threatBoard: ThreatBoard;
    private _threatboardLoaded = false;
    private user;

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

    public activity = [];
    private _activityLoaded = false;
    private readonly sorts = [
        { name: 'Newest', enabled: true, sorter: this.sortByLastModified, },
        { name: 'Oldest', enabled: true, sorter: this.sortByFirstCreated, },
        { name: 'Likes', enabled: false, sorter: this.sortByMostLikes, },
        { name: 'Comments', enabled: false, sorter: this.sortByMostComments, },
    ];
    public activitySort = 0;
    public addNewComment = false;
    public commentData = {
        text: '',
        source: null,
    };

    constructor(
        private boardStore: Store<ThreatFeatureState>,
        private appStore: Store<AppState>,
        private sanitizer: DomSanitizer,
    ) {
    }

    public get threatboardLoaded() { return this._threatboardLoaded; }

    public get reportsLoaded() { return this._reportsLoaded; }

    public get boardsLoaded() { return this._boardsLoaded; }

    public get activityLoaded() { return this._activityLoaded; }

    public get activitySorts() { return this.sorts.map(sort => sort.name) }

    ngOnInit() {
        this.appStore.select('users')
            .pipe(
                pluck('userProfile'),
                take(1)
            )
            .subscribe(
                user => this.user = user,
                err => console.log('could not load user', err)
            );

        this.boardStore.select(getSelectedBoard)
            .subscribe(
                (board) => {
                    console.log('retrieved threat board:', board);
                    this.threatBoard = board;
                    this._threatboardLoaded = true;

                    this.boardStore.select('threat')
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

                    this.boardStore.select('threat')
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

                    this.boardStore.select('threat')
                        .pipe(
                            pluck('articles')
                        )
                        .subscribe(
                            (articles: any[]) => {
                                this.activity = articles.sort(this.sorts[this.activitySort].sorter);
                                console.log(`(${new Date().toISOString()}) Complete board feed:`, articles);
                                this._activityLoaded = true;
                            },
                            (err) => console.log(`(${new Date().toISOString()}) Error loading board article:`, err)
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
        const report = this.reports.find(r => r.id === id);
        if (report) {
            report.vetted = true;
            // TODO persist!
        }
    }

    public rejectReport(id: string) {
        const report = this.reports.findIndex(r => r.id === id);
        if (report >= 0) {
            this.reports.splice(report, 1);
            // TODO persist!
        }
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
                (report.metaProperties.image ? `url(${report.metaProperties.image}), ` : '') +
                'linear-gradient(transparent, transparent)');
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

    public wrap(item) {
        return { item };
    }

    public getActivityAvatar(feedItem: any) {
        return this.sanitizer.bypassSecurityTrustStyle(
            `url('/assets/icon/dashboard-logos/icon-admin.png')`);
    }

    public getActivityImage(feedItem: any) {
        return this.sanitizer.bypassSecurityTrustStyle(
            `url('assets/images/backgrounds/unfetter_header3_sm_bkgd.png')`);
    }

    public hasActivityComments(feedItem: any) {
        if (!feedItem || !feedItem.type) {
            return false;
        }
        if (feedItem.type === 'x-unfetter-article') {
            return feedItem.metaProperties && feedItem.metaProperties.comments
                    && (feedItem.metaProperties.comments.length > 0);
        }
        return feedItem.replies && (feedItem.replies.length > 0);
    }

    public startActivityComment(comment: string = '', source: any = null) {
        this.commentData = { text: comment, source };
        this.addNewComment = (source && source.id) ? source.id : true;
    }

    public submitActivityComment(comment: string, source: any) {
        const date = new Date();
        const newComment = {
            id: `comment--${date.getTime()}`,
            type: 'x-unfetter-comment',
            user: {
                id: 'need user id',
                userName: 'new user name',
                avatar_url: null,
            },
            content: comment,
            submitted: date,
            created: date.toUTCString(),
            modified: date.toUTCString(),
            source: source ? source.id : this.threatBoard.id,
            replies: null,
        };
        if (source) {
            if (source.type === 'x-unfetter-article') {
                newComment.replies = [];
                if (!source.metaProperties.comments) {
                    source.metaProperties.comments = [];
                }
                source.metaProperties.comments.push(newComment);
            } else if (source.replies) {
                source.replies.push(newComment);
            }
        } else {
            newComment.replies = [];
            this.activity = [...this.activity, newComment].sort(this.sorts[this.activitySort].sorter);
        }
        // TODO persist both comment and source (if not null)
        this.addNewComment = false;
    }

    public get boardUpdateTime() {
        return new Date(this.threatBoard.modified).toUTCString();
    }

}
