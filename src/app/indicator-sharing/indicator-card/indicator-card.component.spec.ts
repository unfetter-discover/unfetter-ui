import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatChipsModule, MatSelectModule, MatMenuModule, MatIconModule, MatCardModule, MatTooltipModule, MatTabsModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { FieldSortPipe } from '../../global/pipes/field-sort.pipe';
import { IndicatorCardComponent } from './indicator-card.component';
import { TimeAgoPipe } from '../../global/pipes/time-ago.pipe';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { AddLabelReactiveComponent } from '../../global/components/add-label/add-label.component';
import { AddAttackPatternComponent } from '../add-attack-pattern/add-attack-pattern.component';
import { ChipLinksComponent } from '../../global/components/chip-links/chip-links.component';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { AuthService } from '../../core/services/auth.service';
import { Constance } from '../../utils/constance';
import { mockConfigService } from '../../testing/mock-config-service';
import { ConfigService } from '../../core/services/config.service';
import { SearchParameters } from '../models/search-parameters';
import { initialSearchParameters } from '../store/indicator-sharing.reducers';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

describe('IndicatorCardComponent', () => {
    let component: IndicatorCardComponent;
    let fixture: ComponentFixture<IndicatorCardComponent>;
    let store;

    const mockIndService = {
        addLabel: (label, indicatorId) => {
            return Observable.of({
                attributes: {
                    ...mockIndicator,
                    labels: [label]
                }
            });
        },
        addComment: (comment, indicatorId) => {
            return Observable.of({
                attributes: {
                    ...mockIndicator,
                    metaProperties: {
                        ...mockIndicator.metaProperties,
                        comments: [
                            {
                                comment: 'test',
                                user: {
                                    id: '1234'
                                }
                            }
                        ]
                    }
                }
            });
        },
        addLike: (indicatorId) => {
            return Observable.of({
                attributes: {
                    ...mockIndicator,
                    metaProperties: {
                        ...mockIndicator.metaProperties,
                        likes: [
                            {
                                user: {
                                    id: '1234'
                                }
                            }
                        ]
                    }
                }
            });
        }
    };

    const mockAuthService = {
        getUser: () => {
            return {
                _id: '1234',
                userName: 'Demo-User',
                firstName: 'Demo',
                lastName: 'User',
                organizations: [
                    {
                        'id': Constance.UNFETTER_OPEN_ID,
                        'approved': true,
                        'role': 'STANDARD_USER'
                    }
                ],
            };
        }
    };

    const mockIndicator = {
        name: 'test indicator',
        id: 'indicator-1234',
        kill_chain_phases: [
            {
                phase_name: 'test',
                kill_chain_name: 'test'
            }
        ],
        metaProperties: {           
            interactions: [
                {
                    user: {
                        id: '1234'
                    }
                }
            ]
        }
    };

    const mockSearchParams: SearchParameters = {
        ...initialSearchParameters,
        killChainPhases: ['test'],
        labels: ['test']
    };

    const mockCollapseAllCards = new BehaviorSubject(false);

    const mockRenderer = {
        listen: (target, event, callback) => {
            return () => {};
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [ NO_ERRORS_SCHEMA ],
            declarations: [
                IndicatorCardComponent,
                FieldSortPipe,
                TimeAgoPipe,
                CapitalizePipe,
                ChipLinksComponent,
            ],
            imports: [
                MatButtonModule,
                MatChipsModule,
                MatSelectModule,
                MatMenuModule,
                MatIconModule,
                MatCardModule,
                MatTooltipModule,
                MatTabsModule,
                MatAutocompleteModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                RouterTestingModule,
            ],
            providers: [
                {
                    provide: IndicatorSharingService,
                    useValue: mockIndService
                },
                {
                    provide: AuthService,
                    useValue: mockAuthService
                },
                {
                    provide: Renderer2,
                    useValue: mockRenderer
                },
                {
                    provide: ConfigService,
                    useValue: mockConfigService
                }
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndicatorCardComponent);
        component = fixture.componentInstance;

        // Input mocks
        component.indicator = { ...mockIndicator };
        component.searchParameters = { ...mockSearchParams };
        component.collapseAllCardsSubject = mockCollapseAllCards;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add label', () => {
        component.addLabel('test');
        expect(component.indicator.labels).toBeTruthy();
        expect(component.indicator.labels.includes('test')).toBeTruthy();        
    });

    it('should add comment', () => {
        component.commentText = 'test';
        component.submitComment();
        expect(component.indicator.metaProperties.comments).toBeTruthy();
        expect(component.indicator.metaProperties.comments.map((comObj) => comObj.comment).includes('test')).toBeTruthy();
    });

    it('should add like', () => {
        component.likeIndicator();
        expect(component.indicator.metaProperties.likes).toBeTruthy();
        expect(component.alreadyLiked).toBeTruthy();
    });
});
