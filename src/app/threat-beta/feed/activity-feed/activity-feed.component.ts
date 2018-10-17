import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { pluck, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ThreatBoard } from 'stix/unfetter/index';

import { ThreatFeatureState } from '../../store/threat.reducers';
import { AppState } from '../../../root-store/app.reducers';
import { getOrganizations } from '../../../root-store/stix/stix.selectors';

/**
 * Lists the comments and article on a threatboard. Potentially will also list comments on a report that is a part of
 * this threatboard.
 * 
 * TODO This component should have some parts broken out into smaller components. There should be a component for
 *      adding a comment/reply. There should be one for a comment thread. And a third for an article thread (which
 *      is just the article with a comment thread component built within it).
 */
@Component({
    selector: 'activity-feed',
    templateUrl: './activity-feed.component.html',
    styleUrls: ['./activity-feed.component.scss']
})
export class ActivityFeedComponent implements OnInit {

    /**
     * The threatboard the feed belongs to. We only use this when persisting comments added to the threatboard itself.
     */
    @Input() threatBoard: ThreatBoard;

    /**
     * The current user. Needed for when they add
     */
    private user: any;

    /**
     * The full list of users and organizations for displaying the name of the writer of a comment or article.
     */
    private users: any[];

    /**
     * The full list of comments (with replies) and threatboard article (with comments and replies). Should also list
     * comments made on reports that are a part of the threatboard.
     */
    private _activity = [];

    private _loaded = false;

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

        // TODO we shouldn't be grabbing organizations here; articles and comments should be written by users, not orgs
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

        // TODO need both article(s?) and comments
        this.boardStore.select('threat')
            .pipe(
                pluck('articles')
            )
            .subscribe(
                (articles: any[]) => {
                    console.log(`(${new Date().toISOString()}) Got article:`, articles);
                    this._activity = articles;
                    this._loaded = true;
                },
                (err) => console.log(`(${new Date().toISOString()}) Error loading board article:`, err)
            );
    }

    public get loaded() { return this._loaded; }

    public get sorts() { return Object.keys(this.activitySorts); }

    public get activity() { return this._activity.sort(this.activitySorts[this.activeSort].sorter); }

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

    /**
     * Attempts to grab a displayable name (rather than the UUID) of the person or organization that wrote a given
     * activity feed item. This code is checking for organizations, too, which it shouldn't need to do. :/
     */
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
            if ((name.length === 0) && user.id) {
                const refuser = this.users.find(u => u.id === user.id);
                if (refuser) {
                    return this.getUserName({...refuser, created_by_ref: undefined, id: undefined});
                } else {
                    name = [user.created_by_ref];
                }
            }
        }
        return name.join(' ');
    }

}
