import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { MatButtonModule } from '@angular/material';

import { IndicatorFormComponent } from './indicator-form.component';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { FieldSortPipe } from '../../global/pipes/field-sort.pipe';
import { AuthService } from '../../core/services/auth.service';
import { GenericApi } from '../../core/services/genericapi.service';
import * as fromRoot from '../../root-store/app.reducers';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import * as stixActions from '../../root-store/stix/stix.actions';
import { makeMockIndicatorSharingStore } from '../../testing/mock-store';
import { Identity } from 'stix';
import { SigmaToolPipe } from '../../global/pipes/sigma-tool.pipe';

describe('IndicatorFormComponent', () => {

    let fixture: ComponentFixture<IndicatorFormComponent>;
    let component: IndicatorFormComponent;

    const mockReducer: ActionReducerMap<any> = {
        ...fromRoot.reducers,
        indicatorSharing: indicatorSharingReducer
    };

    const mockIdentity = new Identity({
        id: 'identity-1234',
        name: 'test org'
    });

    const mockUserProfile = {
        attributes: {
            organizations: [
                {
                    approved: true,
                    id: 'identity-1234',
                    role: 'STANDARD_USER'
                }
            ]
        }
    };

    const mockIndService = {
        getIdentities: () => observableOf([mockIdentity]),
        getUserProfileById: (userId) => observableOf(mockUserProfile),
        translateAllPatterns: (pattern) => observableOf({
            attributes: {
                'car-elastic': 'test',
                'car-splunk': 'test',
                'cim-elastic': 'test',
                pattern,
                validated: true
            }
        }),
        patternHandlerObjects: (pattern) => observableOf({
            attributes: {
                object: [
                    {
                        name: 'process',
                        property: 'pid'
                    }
                ],
                pattern,
                validated: true
            }
        }),
        addIndicator: (indicator) => observableOf({ attributes: indicator })
    };

    const mockAuthService = {
        getUser: () => ({ _id: '1234' })
    };

    const mockGenericApi = {
        uploadAttachments: (files, cb) => observableOf([
            {
                _id: '1234',
                filename: 'bob.txt'
            }
        ])
    };

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    MatButtonModule,
                    RouterTestingModule,
                    StoreModule.forRoot(mockReducer)
                ],
                declarations: [
                    IndicatorFormComponent,
                    CapitalizePipe,
                    FieldSortPipe,
                    SigmaToolPipe
                ],
                schemas: [NO_ERRORS_SCHEMA],
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
                        provide: GenericApi,
                        useValue: mockGenericApi
                    },
                    { 
                        provide: ChangeDetectorRef, 
                        useValue: {} 
                    },
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndicatorFormComponent);
        component = fixture.componentInstance;
        component.store.dispatch(new stixActions.SetIdentities([mockIdentity]));
        makeMockIndicatorSharingStore(component.store);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('should pattern translate and get objects', (done) => {
        component.form.get('pattern').setValue('testpattern');
        component.form.get('metaProperties').get('patternSyntax').setValue('stix-pattern');
        // NOTE this is a hack to be sure the subcribe block is actually called
        component.patternObjSubject
            .pipe(take(1))
            .subscribe((_) => {
                expect(component.patternObjs[0].name).toBe('process');
                expect(component.patternObjs[0].property).toBe('pid');
                expect(component.showPatternTranslations).toBeTruthy();
                done();
            });
    });

});
