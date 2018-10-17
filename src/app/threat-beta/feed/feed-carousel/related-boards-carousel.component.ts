import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { forkJoin } from 'rxjs';
import { pluck, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ThreatBoard } from 'stix/unfetter/index';

import { FeedCarouselComponent } from './feed-carousel.component';
import { ThreatFeatureState } from '../../store/threat.reducers';
import { AppState } from '../../../root-store/app.reducers';
import { getOrganizations } from '../../../root-store/stix/stix.selectors';

/**
 * Displays related boards to the given threatboard in a carousel.
 */
@Component({
    selector: 'related-boards',
    templateUrl: './related-boards-carousel.component.html',
    styleUrls: ['./related-boards-carousel.component.scss']
})
export class RelatedBoardsCarouselComponent implements OnInit, OnChanges {

    @Input() threatBoard: ThreatBoard;

    /**
     * The loaded list of related threatboards.
     */
    private _boards = [];

    private _loaded = false;

    /**
     * Used to provide the identity of each threatboard owner.
     */
    private users: any[] = [];

    @ViewChild('carousel') carousel: FeedCarouselComponent;

    constructor(
        private boardStore: Store<ThreatFeatureState>,
        private appStore: Store<AppState>,
    ) { }

    ngOnInit() {
        if (this.threatBoard) {
            this.loadBoards();
        }

        /*
         * Grab both users and organizations.
         *
         * Threatboards should probably be owned by organizations, not individual users. We currently have no concept
         * for a user, when creating a threatboard, to assign it to a particular organization.
         */
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

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.threatBoard) {
            this.loadBoards();
        }
    }

    /**
     * Load all threatboards, weeding out the one the user is currently viewing.
     */
    private loadBoards() {
        this.boardStore.select('threat')
        .pipe(
            pluck('boardList')
        )
        .subscribe(
            (boards: any[]) => {
                this._boards = boards.filter(b => b.id !== this.threatBoard.id);
                console.log(`(${new Date().toISOString()}) board list`, this._boards);
                this.carousel.calculateWindow();
                this._loaded = true;
            },
            (err) => console.log(`(${new Date().toISOString()}) Error loading boards:`, err)
        );
    }

    public get boards() { return this._boards; }

    public get loaded() { return this._loaded; }

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

    /**
     * Determine who the owner of the board is. All of these checks should probably be reduced to grabbing the
     * created_by_ref from the board (which should, in fact, be what is passed in), then matching it against an
     * organizations list, rather than both organizations and users. Then we should just return the identity.name
     * of that organization. Instead, this method tries to grab both user identity and organization name, not
     * knowing which one will be given.
     * 
     * TODO If we resolve to go with organizations only in the created_by_ref, or perhaps a metaProperties field,
     *      we should rename the method getBoardOwner(board), and change the logic to be more efficient.
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
        }
        return name.join(' ');
    }

    /**
     * The user wishes to "follow" a selected board by its id. There is no definition for what that even means, so this
     * function currently does nothing.
     */
    public followBoard(id: string) {
        console.log(`Request to follow board '${id}' received`);
    }

}
