import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StoreModule } from '@ngrx/store';

import { MatButtonModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { AddIndicatorComponent } from './add-indicator.component';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { FieldSortPipe } from '../../global/pipes/field-sort.pipe';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { AuthService } from '../../core/services/auth.service';
import { GenericApi } from '../../core/services/genericapi.service';
import * as fromRoot from '../../root-store/app.reducers';

describe('AddIndicatorComponent', () => {
    let component: AddIndicatorComponent;
    let fixture: ComponentFixture<AddIndicatorComponent>;

    const mockIndService = {
        getIdentities: () => {
            return observableOf([
                {
                    attributes: {
                        id: 'identity-1234',
                        name: 'test org'
                    }
                }
            ]);
        },
        getUserProfileById: (userId) => {
            return observableOf({
                attributes: {
                    organizations: [
                        {
                            approved: true,
                            id: 'identity-1234',
                            role: 'STANDARD_USER'
                        }
                    ]
                }
            });
        },
        getAttackPatterns: () => {
            return observableOf([
                {
                    attributes: {
                        id: 'attack-pattern-1234',
                        name: 'test ap'
                    }
                }
            ]);
        },
        translateAllPatterns: (pattern) => {
            return observableOf({
                attributes: {
                    'car-elastic': 'test',
                    'car-splunk': 'test',
                    'cim-elastic': 'test',
                    pattern,
                    validated: true
                }
            });
        },
        patternHandlerObjects: (pattern) => {
            return observableOf({
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
            });
        },
        addIndicator: (indicator) => {
            return observableOf({
                attributes: indicator
            });
        }
    };

    const mockAuthService = {
        getUser: () => {
            return {
                _id: '1234'
            };
        }
    };

    const mockGenericApi = {
        uploadAttachments: (files, cb) => {
            return observableOf([
                {
                    _id: '1234',
                    filename: 'bob.txt'
                }
            ]);
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AddIndicatorComponent,
                CapitalizePipe,
                FieldSortPipe
            ],
            imports: [
                MatButtonModule,
                MatDialogModule,
                RouterTestingModule,
                StoreModule.forRoot(fromRoot.reducers)
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: { }
                },
                {
                    provide: MatDialogRef,
                    useValue: {
                        close: function () { }
                    }
                },
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
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddIndicatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();        
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should pattern translate and get objects', (done) => {
        component.form.get('pattern').setValue('testpattern');
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

    it('should submit indicator', () => {
        component.form.patchValue({
            name: 'test',
            created_by_ref: '1234',
            pattern: 'test'
        });
        component.submitIndicator();
        expect(component).toBeTruthy();
    });
});
