import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { AddIndicatorComponent } from './add-indicator.component';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { FieldSortPipe } from '../../global/pipes/field-sort.pipe';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/services/auth.service';

describe('AddIndicatorComponent', () => {
    let component: AddIndicatorComponent;
    let fixture: ComponentFixture<AddIndicatorComponent>;

    const mockIndService = {
        getIdentities: () => {
            return Observable.of([
                {
                    attributes: {
                        id: 'identity-1234',
                        name: 'test org'
                    }
                }
            ]);
        },
        getUserProfileById: (userId) => {
            return Observable.of({
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
            return Observable.of([
                {
                    attributes: {
                        id: 'attack-pattern-1234',
                        name: 'test ap'
                    }
                }
            ]);
        }
    };

    const mockAuthService = {
        getUser: () => {
            return {
                _id: '1234'
            };
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
                RouterTestingModule
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
                }
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
});
