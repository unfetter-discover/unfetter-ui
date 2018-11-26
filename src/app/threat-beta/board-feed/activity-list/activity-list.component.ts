import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, pluck, take, finalize } from 'rxjs/operators';
import { ThreatBoard, Article } from 'stix/unfetter/index';
import { generateUUID } from '../../../global/static/generate-uuid';
import { AppState } from '../../../root-store/app.reducers';
import * as threatActions from '../../store/threat.actions';
import { ThreatFeatureState } from '../../store/threat.reducers';
import { ThreatDashboardBetaService } from '../../threat-beta.service';
import { UserCitationService } from '../user-citations.service';
import { AngularHelper } from '../../../global/static/angular-helper';



/**
 * Lists the comments and article on a threatboard. Potentially will also list comments on a report that is a part of
 * this threatboard.
 * 
 * TODO This component should have some parts broken out into smaller components. There should be a component for
 *      adding a comment/reply. There should be one for a comment thread. And a third for an article thread (which
 *      is just the article with a comment thread component built within it).
 */
@Component({
    selector: 'activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

    /**
     * The threatboard the feed belongs to. We only use this when persisting comments added to the threatboard itself.
     */
    @Input() threatBoard: ThreatBoard;

    /**
     * The current user. Needed for when they add a comment or reply.
     */
    public user: any;

    /**
     * The full list of comments (with replies) and threatboard article (with comments and replies). Should also list
     * comments made on reports that are a part of the threatboard.
     */
    public activity$: Observable<any>

    /**
     * The list of sorting algorithms for the feed display. The 'Newest' is the default sort, and the user can pick any.
     */
    public readonly activitySorts = {
        'Newest': { enabled: true, sorter: this.sortByLastModified, },
        'Oldest': { enabled: true, sorter: this.sortByFirstCreated, },
        'Likes': { enabled: true, sorter: this.sortByMostLikes, },
        'Comments': { enabled: true, sorter: this.sortByMostComments, },
    };
    public activeSort = Object.keys(this.activitySorts)[0];

    /**
     * Detects the user wishes to add a comment to a comment or article, pointing to the id of the object. They can
     * therefore only comment on one thing at a time.
     */
    public commentTarget: boolean | any = false;

    constructor(
        private threatboardService: ThreatDashboardBetaService,
        private boardStore: Store<ThreatFeatureState>,
        private appStore: Store<AppState>,
        private citations: UserCitationService,
        private router: Router,
        private sanitizer: DomSanitizer,
    ) {
    }

    ngOnInit() {
        this.appStore.select('users')
            .pipe(
                pluck('userProfile'),
                take(1),
            )
            .subscribe(
                user => {
                    console['debug'](`(${new Date().toISOString()}) got user info:`, user);
                    this.user = user;
                },
                err => console.log('could not load user', err)
            );

        const article$: Observable<any> = this.boardStore.select('threat')
            .pipe(pluck('articles'));

        let comment$: Observable<any> = new Observable();
        if (this.threatBoard && this.threatBoard.metaProperties
            && this.threatBoard.metaProperties.comments) {
            comment$ = of(this.threatBoard.metaProperties.comments);
        }
        this.activity$ = combineLatest(
            article$,
            comment$
        )
            .pipe(map((result) => {
                return [...result[0], ...result[1]].sort(this.activitySorts[this.activeSort].sorter);
            }));
    }

    public get sorts() { return Object.keys(this.activitySorts); }

    public sortByFirstCreated(a: any, b: any) {
        return (a.created || a.submitted).toString().localeCompare(b.created || b.submitted);
    }

    public sortByLastModified(a: any, b: any) {
        return (b.modified || b.submitted).toString().localeCompare(a.modified || a.submitted);
    }

    public sortByMostLikes(a: any, b: any) {
        return ((b.metaProperties || b.comment || {}).likes || []).length -
            ((a.metaProperties || a.comment || {}).likes || []).length;
    }

    public sortByMostComments(a: any, b: any) {
        let adata = (a && a.metaProperties && a.metaProperties.comments) ? a.metaProperties.comments : ((a.comment && a.comment.replies) ? a.comment.replies : []) || [];
        let bdata = (b && b.metaProperties && b.metaProperties.comments) ? b.metaProperties.comments : ((b.comment && b.comment.replies) ? b.comment.replies : []) || [];
        return bdata.length - adata.length;
    }

    public getActivityAvatar(feedItem: any) {
        return this.citations.getAvatar(feedItem);
    }

    public getActivityImage(feedItem: any) {
        return this.sanitizer.bypassSecurityTrustStyle(`url('${feedItem.image}')`);
    }

    public hasActivityLikes(feedItem: any) {
        return (this.getActivityLikes(feedItem) || []).length > 0;
    }

    public hasLikedActivity(feedItem: any) {
        return (this.getActivityLikes(feedItem) || []).some(user => this.user.identity.id);
    }

    private getActivityLikes(feedItem: any) {
        let likes = null;
        if (feedItem) {
            if ((feedItem.type === 'x-unfetter-article') || (feedItem.type === 'report')) {
                if (!feedItem.metaProperties) {
                    feedItem.metaProperties = {};
                }
                if (!feedItem.metaProperties.likes) {
                    feedItem.metaProperties.likes = [];
                }
                likes = feedItem.metaProperties.likes;
            } else if (feedItem.comment) {
                if (!feedItem.comment.likes) {
                    feedItem.comment.likes = [];
                }
                likes = feedItem.comment.likes;
            }
        }
        return likes;
    }

    private updateArticleAndStore(article: Article) {
        const updateArticle$ = this.threatboardService.updateArticle(article)
            .pipe(finalize(() => updateArticle$ && updateArticle$.unsubscribe()))
            .subscribe(
                (updatedArticle) => {
                    if (!updatedArticle.metaProperties) {
                        if (article.metaProperties) {
                            updatedArticle.metaProperties = article.metaProperties;
                        }
                    }
                    this.boardStore.dispatch(new threatActions.UpdateArticle(updatedArticle));
                    console['debug'](`(${new Date().toISOString()}) article updated`);
                },
                (err) => console.log(`(${new Date().toISOString()}) error updating article`, err)
            )
    }

    private updateBoardAndStore(board: ThreatBoard) {
        const updateBoard$ = this.threatboardService.updateBoard(board)
            .pipe(finalize(() => updateBoard$ && updateBoard$.unsubscribe()))
            .subscribe(
                (updatedBoard) => {
                    if (!updatedBoard.metaProperties) {
                        if (board.metaProperties) {
                            updatedBoard.metaProperties = board.metaProperties;
                        }
                    }
                    this.boardStore.dispatch(new threatActions.UpdateBoard(updatedBoard));
                    console['debug'](`(${new Date().toISOString()}) board updated`);
                },
                (err) => console.log(`(${new Date().toISOString()}) error updating board`, err)
            );
    }

    public clickActivityLike(feedItem: any) {
        const likes = this.getActivityLikes(feedItem);
        if (likes) {
            const liked = likes.findIndex(user => user === this.user.identity.id);
            if (liked < 0) {
                likes.push(this.user.identity.id);
            } else {
                likes.splice(liked, 1);
            }
            if (feedItem.type === 'x-unfetter-article') {
                this.updateArticleAndStore(feedItem);
            } else if (feedItem.type === 'report') {
                // TODO not yet implemented
            } else if (feedItem.comment) {
                // Covered in the comment displayer
            }
            return true;
        }
    };

    public hasActivityComments(feedItem: any) {
        if (!feedItem) {
            return false;
        }
        if ((feedItem.type === 'x-unfetter-article') || (feedItem.type === 'report')) {
            return feedItem.metaProperties && feedItem.metaProperties.comments
                && (feedItem.metaProperties.comments.length > 0);
        }
        return feedItem.comment && feedItem.comment.replies && (feedItem.comment.replies.length > 0);
    }

    public submitActivityComment(comment: string) {
        const date = new Date();
        let safe_avatar_url = '';
        if (this.user && this.user.auth && this.user.auth.avatar_url) {
            safe_avatar_url = this.user.auth.avatar_url;
        }
        const newComment = {
            id: `x-unfetter-comment--${generateUUID()}`,
            user: {
                id: this.user.identity.id,
                avatar_url: safe_avatar_url,
            },
            submitted: date,
            comment: {
                content: comment,
                likes: [],
                replies: undefined,
            }
        };
        if (this.commentTarget === true) {
            newComment.comment.replies = [];
            this.submitThreatBoardComment(newComment);
        } else {
            if (this.commentTarget.type === 'x-unfetter-article') {
                this.addArticleComment(this.commentTarget, newComment);
            } else if (this.commentTarget.type === 'report') {
                // TODO not yet implemented
            } else if (this.commentTarget.comment) {
                // Covered in display comment component
            }
            return true;
        }
        this.commentTarget = false;
    }

    private submitThreatBoardComment(comment: any) {
        if (this.threatBoard) {
            if (!this.threatBoard.metaProperties.comments) {
                this.threatBoard.metaProperties.comments = [];
            }
            this.threatBoard.metaProperties.comments.push(comment);
            this.updateBoardAndStore(this.threatBoard);
        }
    }

    private addArticleComment(article: any, comment: any) {
        if (this.commentTarget === article) {
            comment.comment.replies = [];
            if (!article.metaProperties.comments) {
                article.metaProperties.comments = [];
            }
            article.metaProperties.comments.push(comment);
        } else if (this.commentTarget.comment && this.commentTarget.comment.replies) {
            this.commentTarget.comment.replies.push(comment);
        }
        this.updateArticleAndStore(article);
    }

    public trackByFn(index: number, item: any): number {
        return AngularHelper.genericTrackBy(index, item);
    }

    /**
     * The user has selected to edit a specific article.
     */
    public editArticle(article: string) {
        if (article) {
            this.router.navigate([`/threat_beta/article/edit`, this.threatBoard.id, article]);
        }
    }

    /**
     * Attempts to grab a displayable name (rather than the UUID) of the person or organization that wrote a given
     * activity feed item. This code is checking for organizations, too, which it shouldn't need to do. :/
     */
    public getUserName(feedItem: any) {
        return this.citations.getUserName(feedItem);
    }

}
