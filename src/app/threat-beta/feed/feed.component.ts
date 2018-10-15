import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, forkJoin } from 'rxjs';
import { pluck, map, filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Report } from 'stix';
import { ThreatBoard } from 'stix/unfetter/index';

import { ThreatFeatureState } from '../store/threat.reducers';
import { getSelectedBoard, getThreatBoardReports } from '../store/threat.selectors';
import * as fromThreat from '../store/threat.actions';
import { AppState } from '../../root-store/app.reducers';
import { getOrganizations } from '../../root-store/stix/stix.selectors';

// TODO make generic carousel component
// TODO apply search filter

@Component({
    selector: 'feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

    public threatBoard: ThreatBoard;
    private _threatboardLoaded = false;

    private user: any;
    private users: any[];

    public readonly carouselItemWidth = 200;
    public readonly carouselItemPadding = 20;

    // TODO make reports-specific carousel component
    public reports = [];
    private _reportsLoaded = false;
    public reportHoverIndex = -1;
    public reportsHover = false;
    public reportsPage = 0;
    private _reportsPerPage: number;
    private _reportsPages: number;
    @ViewChild('reportsView') reportsView: ElementRef;

    // TODO make related boards-specific carousel component
    public boards = [];
    private _boardsLoaded = false;
    public boardHoverIndex = -1;
    public boardsHover = false;
    public boardsPage = 0;
    private _boardsPerPage: number;
    private _boardsPages: number;
    @ViewChild('boardsView') boardsView: ElementRef;

    // TODO make activity feed component
    // TODO make comment-chain component
    public _activity = [];
    private _activityLoaded = false;
    private readonly sorts = {
        'Newest': { enabled: true, sorter: this.sortByLastModified, },
        'Oldest': { enabled: true, sorter: this.sortByFirstCreated, },
        'Likes': { enabled: true, sorter: this.sortByMostLikes, },
        'Comments': { enabled: true, sorter: this.sortByMostComments, },
    };
    public activitySort = Object.keys(this.sorts)[0];
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

    public get activitySorts() { return Object.keys(this.sorts); }

    public get activity() { return this._activity.sort(this.sorts[this.activitySort].sorter); }

    ngOnInit() {
        this.appStore.select('users')
            .pipe(
                pluck('userProfile'),
                take(1),
            )
            .subscribe(
                user => {
                    console.log(`(${new Date().toISOString()}) got user info:`, user);
                    this.user = user;
                },
                err => console.log('could not load user', err)
            );

        forkJoin(
                this.appStore.select(getOrganizations).pipe(take(1)),
                this.appStore.select('users').pipe(pluck('userList'), take(1))
            )
            .subscribe(
                ([orgs, users]) => {
                    const morgs = orgs.map(org => ({...org, userName: org.name}));
                    this.users = [...morgs, ...users as any[]];
                    console.log(`(${new Date().toISOString()}) got user and orgs lists:`, this.users);
                },
                err => console.log('could not load users', err)
            );

        this.boardStore.select(getSelectedBoard)
            .subscribe(
                (board) => {
                    console.log(`(${new Date().toISOString()}) retrieved threat board:`, board);
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

                    // TODO this is incorrect; this is the list of most recent reports, which may have nothing to do
                    //      with the current board; need the fully-normalized reports in the board, both vetted and
                    //      potential
                    this.boardStore.select(getThreatBoardReports)
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

                    // TODO need both article(s?) and comments
                    this.boardStore.select('threat')
                        .pipe(
                            pluck('articles')
                        )
                        .subscribe(
                            (articles: any[]) => {
                                this._activity = articles;
                                console.log(`(${new Date().toISOString()}) Got article:`, articles);
                                this._activityLoaded = true;
                            },
                            (err) => console.log(`(${new Date().toISOString()}) Error loading board article:`, err)
                        );
                },
                (err) => console.log(`(${new Date().toISOString()}) Error loading threat board:`, err)
            )
    }

    public recalculateWindows() {
        this.calculateReportsWindow();
        this.calculateBoardsWindow();
        if (this.reportsPage > this._reportsPages) {
            this.reportsPage = this._reportsPages - 1;
        }
        if (this.boardsPage > this._boardsPages) {
            this.boardsPage = this._boardsPages - 1;
        }
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
            this.recalculateWindows();
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
        return (b.metaProperties.likes || []).length - (a.metaProperties.likes || []).length;
    }

    public sortByMostComments(a: any, b: any) {
        return (b.replies || b.metaProperties.comments || []).length -
                (a.replies || a.metaProperties.comments || []).length;
    }

    public wrap(item) {
        return { item };
    }

    public getActivityAvatar(feedItem: any) {
        if (feedItem) {
            if (feedItem.user && feedItem.user.avatar_url) {
                return this.sanitizer.bypassSecurityTrustStyle(`url('${feedItem.user.avatar_url}')`);
            } else if (feedItem.created_by_ref) {
                const user = this.users.find(u => u.id === feedItem.created_by_ref);
                if (user && user.avatar_url) {
                    return this.sanitizer.bypassSecurityTrustStyle(`url('${user.avatar_url}')`);
                }
            }
        }
        return '';
    }

    public getActivityImage(feedItem: any) {
        return this.sanitizer.bypassSecurityTrustStyle(`url('${feedItem.image}')`);
    }

    public hasActivityLikes(feedItem: any) {
        if (!feedItem) {
            return false;
        }
        if (feedItem.type === 'x-unfetter-article') {
            return feedItem.metaProperties && feedItem.metaProperties.likes
                    && (feedItem.metaProperties.likes.length > 0);
        }
        return feedItem && feedItem.likes && feedItem.likes.length;
    }

    public hasLikedActivity(feedItem: any) {
        return this.hasActivityLikes(feedItem) &&
                (feedItem.likes || feedItem.metaProperties.likes).some(user => this.user.identity.id);
    }

    public clickActivityLike(feedItem: any) {
        if (!feedItem) {
            return;
        }
        let likes = feedItem.likes;
        if (feedItem.type === 'x-unfetter-article') {
            if (!feedItem.metaProperties) {
                feedItem.metaProperties = {};
            }
            if (!feedItem.metaProperties.likes) {
                feedItem.metaProperties.likes = [];
            }
            likes = feedItem.metaProperties.likes;
        }
        const liked = likes.findIndex(user => user === this.user.identity.id);
        if (liked < 0) {
            likes.push(this.user.identity.id);
        } else {
            likes.splice(liked, 1);
        }
        // TODO persist
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
            id: `comment--${date.getTime()}`, // TODO should be uuid
            type: 'x-unfetter-comment',
            user: {
                id: this.user.identity.id,
                avatar_url: this.user.auth.avatar_url,
            },
            content: comment,
            submitted: date,
            created: date.toUTCString(),
            modified: date.toUTCString(),
            source: source ? source.id : this.threatBoard.id,
            likes: [],
            replies: null,
        };
        if (source) {
            if (source.type === 'x-unfetter-article') {
                newComment.replies = [];
                if (!source.metaProperties.comments) {
                    source.metaProperties.comments = [];
                }
                source.metaProperties.comments.push(newComment);
            } else {
                source.replies.push(newComment);
            }
        } else {
            newComment.replies = [];
            this._activity = [...this.activity, newComment];
        }
        // TODO persist both comment and source (if not null)
        this.addNewComment = false;
    }

    public getUserName(user: any) {
        let name = [];
        if (user) {
            if (user.user) {
                user = user.user;
            }
            name = [user.firstName, user.lastName].filter(n => !!n);
            if (name.length === 0) {
                name = [user.userName].filter(n => !!n);
            }
            if ((name.length === 0) && user.identity) {
                name = [user.identity.name].filter(n => !!n);
            }
            if ((name.length === 0) && user.created_by_ref) {
                const refuser = this.users.find(u => u.id === user.created_by_ref);
                if (refuser) {
                    return this.getUserName({...refuser, created_by_ref: undefined});
                } else {
                    name = [user.created_by_ref];
                }
            }
        }
        return name.join(' ');
    }

    public get boardUpdateTime() {
        return new Date(this.threatBoard.modified).toUTCString();
    }

}
