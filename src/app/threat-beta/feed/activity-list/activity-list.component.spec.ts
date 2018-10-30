import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { FormsModule } from '@angular/forms';
import {
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
} from '@angular/material';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { SimplemdeModule } from 'ng2-simplemde';

import { Article, ThreatBoard } from 'stix/unfetter/index';

import { ActivityListComponent } from './activity-list.component';
import { CommentInputComponent } from './comment-input.component';
import { ThreatDashboardBetaService } from '../../threat-beta.service';
import MockThreatDashboardBetaService from '../../testing/mock-threat.service';
import { LoadingSpinnerComponent } from '../../../global/components/loading-spinner/loading-spinner.component';
import { FieldSortPipe } from '../../../global/pipes/field-sort.pipe';
import { TimeAgoPipe } from '../../../global/pipes/time-ago.pipe';
import { AppState, reducers } from '../../../root-store/app.reducers';
import * as userActions from '../../../root-store/users/user.actions';
import * as boardActions from '../../store/threat.actions';
import { threatReducer } from '../../store/threat.reducers';
import { StixCoreEnum } from 'stix';
import { DisplayCommentComponent } from '../../display-comment/display-comment.component';

describe('ActivityListComponent', () => {

    let fixture: ComponentFixture<ActivityListComponent>;
    let component: ActivityListComponent;
    let appStore: Store<AppState>;

    const mockUser = {
        userData: {
            _id: '1234',
            email: 'fake@fake.com',
            userName: 'fake',
            lastName: 'fakey',
            firstName: 'faker',
            created: '2017-11-24T17:52:13.032Z',
            identity: {
                name: 'afake',
                id: 'identity--1234',
                type: 'identity'
            },
            role: 'STANDARD_USER',
            locked: false,
            approved: true,
            registered: true,
            auth: {
                service: 'gitbub',
                id: '1234',
                userName: 'fake',
                avatar_url: 'https://avatars2.githubusercontent.com/u/1234?v=4'
            }
        },
        token: 'Bearer 123',
        authenticated: true,
        approved: true,
        role: 'STANDARD_USER'
    };

    const mockArticles = [
        new Article({
            id: 'x-unfetter-article--1',
            name: 'Latin',
            content: 'Lorem ipsum dolor sit amet ...',
            created_by_ref: '1234',
            created: new Date(),
            modified: new Date(),
            metaProperties: {
                comments: [],
                likes: [],
            }
        }),
    ];

    const mockThreatBoard = new ThreatBoard({
        id: 'tb1',
        type: StixCoreEnum.REPORT, // <-- this is BS
        name: 'Empty Threats',
        created: new Date(),
        modified: new Date().toISOString(), // <-- this is BS
        metaProperties: {
            published: false,
            comments: [
                {
                    submitted: new Date(),
                    user: {
                        id: '1234',
                        userName: 'fake',
                        avatar_url: 'https://avatars2.githubusercontent.com/u/1234?v=4'
                    },
                    comment: {
                        content: 'Comment on the board',
                        replies: [],
                        likes: []
                    }
                },
            ],
        },
        articles: ['x-unfetter-article--1'],
        boundaries: {
            start_date: new Date(),
            end_date: new Date(),
            intrusion_sets: [],
            malware: [],
            targets: [],
        },
        reports: [],
        toJson: null // <-- this is BS
    });

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    FormsModule,
                    MatCardModule,
                    MatRadioModule,
                    MatInputModule,
                    MatProgressSpinnerModule,
                    MarkdownModule.forRoot(),
                    SimplemdeModule,
                    StoreModule.forRoot(reducers),
                ],
                declarations: [
                    ActivityListComponent,
                    CommentInputComponent,
                    DisplayCommentComponent,
                    LoadingSpinnerComponent,
                    FieldSortPipe,
                    TimeAgoPipe,
                ],
                providers: [
                    MarkdownService,
                    { provide: ThreatDashboardBetaService, useValue: MockThreatDashboardBetaService },
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityListComponent);
        component = fixture.componentInstance;
        component.threatBoard = mockThreatBoard;
        appStore = TestBed.get(Store);
        appStore.addReducer('threat', threatReducer);
        appStore.dispatch(new userActions.LoginUser(mockUser));
        appStore.dispatch(new userActions.SetUserList([mockUser.userData])); // not working
        appStore.dispatch(new boardActions.SetArticles(mockArticles));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /*
     * TODO:
     * - add store for users, make a lot of threatboard comments
     * - check user identities on feed items
     * - sort feed by newest, oldest, most likes and most comments
     * - click add comment; confirm changed display
     * - insert comment; conifrm new comment is on feed, confirm persistence
     */

});
