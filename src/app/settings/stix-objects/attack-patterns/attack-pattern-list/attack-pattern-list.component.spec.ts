import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf, Observable } from 'rxjs';
import { StoreModule } from '@ngrx/store';

import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatChipsModule,
    MatDialog,
    MatPaginatorModule,
    MatSnackBar,
    MatTableModule,
    MatTooltipModule,
} from '@angular/material';

import { CoreModule } from '../../../../core/core.module';
import { GlobalModule } from '../../../../global/global.module';
import { reducers } from '../../../../root-store/app.reducers';
import * as userActions from '../../../../root-store/users/user.actions';
import { StixService } from '../../../stix.service';

// Load the implementations that should be tested
import { AttackPatternListComponent } from './attack-pattern-list.component';

describe(`AttackPatternListComponent`, () => {

    let fixture: ComponentFixture<AttackPatternListComponent>;
    let component: AttackPatternListComponent;

    const mockUser = {
        userData: {
            _id: '1234',
            email: 'fake@fake.com',
            userName: 'fake',
            lastName: 'fakey',
            firstName: 'faker',
            created: '2017-11-24T17:52:13.032Z',
            identity: {
                name: 'a',
                id: 'identity--1234',
                type: 'identity',
                sectors: [],
                identity_class: 'individual'
            },
            role: 'STANDARD_USER',
            locked: false,
            approved: true,
            registered: true,
            organizations: [{
                    id: 'The Org',
                    subscribed: true,
                    approved: true,
                    role: 'STANDARD_USER'
            }],
            preferences: {
                killchain: 'Unspecified'
            }
        },
        token: 'Bearer 123',
        authenticated: true,
        approved: true,
        role: 'STANDARD_USER'
    };

    const patterns = [];
    const serviceMock = {
        url: '',
        load: (filter?: any): Observable<any[]> => {
            return observableOf(patterns);
        }
    };

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MatChipsModule,
                MatPaginatorModule,
                MatTableModule,
                MatTooltipModule,
                GlobalModule,
                CoreModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
                StoreModule.forRoot(reducers),
            ],
            declarations: [
                AttackPatternListComponent,
            ],
            providers: [
                { provide: StixService, useValue: serviceMock },
                { provide: MatDialog, useValue: {} },
                { provide: MatSnackBar, useValue: {} },
                { provide: ChangeDetectorRef, useValue: {} },
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AttackPatternListComponent);
        component = fixture.componentInstance; // AttackPatternListComponent test instance
        component['userStore'].dispatch(new userActions.LoginUser(mockUser));
        spyOn(component, 'load').and.returnValue(observableOf([]));
    });

    it('should display one attack pattern', () => {
        // query for the title <h1> by CSS element selector
        const attackPatternId = 'abcd-123';
        const data = createData(attackPatternId, 'One');
        patterns.push(data);
        patterns.push(createData('efgh-456', 'Two'));
        fixture.detectChanges();
        expect(component.attackPatterns.length).toEqual(2);
        const phaseExpander = fixture.debugElement.query(By.css('mat-expansion-panel-header'));
        expect(phaseExpander).toBeDefined();
        phaseExpander.triggerEventHandler('click', null);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const apNode = fixture.debugElement.query(By.css(`[href="/${attackPatternId}"]`));
            expect(apNode).toBeDefined();
            expect(apNode.nativeElement.textContent).toEqual(data.attributes.name);
        });
    });

    const createData = (dataId: string, name: string) => ({
        id: dataId,
        attributes: {
            id: dataId,
            name: `Attack Pattern ${name}`,
            kill_chain_phases: [
                { phase_name: 'phase-x' }
            ],
        }
    });

});
