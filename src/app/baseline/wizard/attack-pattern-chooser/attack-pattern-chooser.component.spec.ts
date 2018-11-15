import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../core/services/auth.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import { StoreModule, Store } from '@ngrx/store';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatCardModule } from '@angular/material';

import { AttackPatternChooserComponent } from './attack-pattern-chooser.component';
import {
    TacticsHeatmapComponent
} from '../../../global/components/tactics-pane/tactics-heatmap/tactics-heatmap.component';
import { HeatmapComponent } from '../../../global/components/heatmap/heatmap.component';
import { TacticChain } from '../../../global/components/tactics-pane/tactics.model';
import { TacticsControlService } from '../../../global/components/tactics-pane/tactics-control.service';
import { TacticsTooltipService } from '../../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.service';
import { CapitalizePipe } from '../../../global/pipes/capitalize.pipe';
import { reducers } from '../../../root-store/app.reducers';
import * as stixActions from '../../../root-store/stix/stix.actions';
import * as userActions from '../../../root-store/users/user.actions';
import { mockAttackPatterns } from '../../../testing/mock-store';
import { Dictionary } from '../../../models/json/dictionary';
import { AddConfig } from '../../../root-store/config/config.actions';
import { mockTacticsConfig } from '../../../global/components/tactics-pane/tactics.model.test';

describe('AttackPatternChooserComponent', () => {

    let component: AttackPatternChooserComponent;
    let fixture: ComponentFixture<AttackPatternChooserComponent>;
    let store: Store<any>;

    const testUser = {
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
            auth: {
                service: 'github',
                userName: 'fake',
                avatar_url: 'https://avatars2.githubusercontent.com/u/1234?v=4',
                id: '1234'
            },
            role: 'ADMIN',
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
                killchain: 'the_org'
            }
        },
        token: 'Bearer 123',
        authenticated: true,
        approved: true,
        role: 'ADMIN'
    };

    const mockAttackPatternData = [
        {
            type: 'attack-pattern',
            id: mockAttackPatterns[0].id,
            name: mockAttackPatterns[0].name,
            description: 'Attack Pattern #1',
            kill_chain_phases: [{phase_name: 'Something'}],
            x_mitre_data_sources: ['The Source'],
            x_mitre_platforms: ['iOS', 'Android'],
        },
        {
            type: 'attack-pattern',
            id: mockAttackPatterns[1].id,
            name: mockAttackPatterns[1].name,
            description: 'Attack Pattern #2',
            kill_chain_phases: [{phase_name: 'Something Else'}],
            x_mitre_data_sources: ['Another Source'],
            x_mitre_platforms: ['AppleDOS', 'MS-DOS'],
        },
    ];

    const tactics: Dictionary<TacticChain> = {
        'the_org': {
            id: '0001',
            name: 'the_org',
            phases: [
                {
                    id: '0002',
                    name: 'Something',
                    tactics: [
                        {
                            id: mockAttackPatternData[0].id,
                            name: mockAttackPatternData[0].name,
                            description: mockAttackPatternData[0].description,
                            phases: [mockAttackPatternData[0].kill_chain_phases[0].phase_name],
                        }
                    ],
                },
                {
                    id: '0003',
                    name: 'Something Else',
                    tactics: [
                        {
                            id: mockAttackPatternData[1].id,
                            name: mockAttackPatternData[1].name,
                            description: mockAttackPatternData[1].description,
                            phases: [mockAttackPatternData[1].kill_chain_phases[0].phase_name],
                        },
                    ],
                },
            ],
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                OverlayModule,
                MatDialogModule,
                RouterTestingModule,
                HttpClientTestingModule,
                StoreModule.forRoot(reducers),
            ],
            declarations: [
                AttackPatternChooserComponent,
                TacticsHeatmapComponent,
                HeatmapComponent,
                CapitalizePipe,
            ],
            providers: [
                TacticsControlService,
                TacticsTooltipService,
                GenericApi,
                AuthService,
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {active: [mockAttackPatternData[1].id]}
                },
                {
                    provide: MatDialogRef,
                    useValue: {
                        close: function() {}
                    }
                },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        
        fixture = TestBed.createComponent(AttackPatternChooserComponent);
        let heatmap = fixture.debugElement.query(By.css('div#attack-pattern-filter'));
        component = fixture.componentInstance;
        store = component['tacticsStore'];
        store.dispatch(new userActions.LoginUser(testUser));
        store.dispatch(new stixActions.SetAttackPatterns(mockAttackPatternData as any));
        store.dispatch(new AddConfig(mockTacticsConfig));
        heatmap.nativeElement.style.width = '300px';
        heatmap.nativeElement.style.height = '150px';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.attackPatterns.length).toBe(1);
    });

    it('should handle cell clicks', async(() => {
        fixture.whenStable().then(() => {
            const first = fixture.nativeElement.querySelector('g.heat-map-cell');
            expect(first).not.toBeNull();

            const spy = spyOn(component, 'toggleAttackPattern').and.callThrough();
            first.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(spy).toHaveBeenCalled();
                first.dispatchEvent(new Event('click'));
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(spy).toHaveBeenCalledTimes(2);
                    first.dispatchEvent(new Event('click'));
                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        expect(spy).toHaveBeenCalledTimes(3);
                        component.close();
                        fixture.detectChanges();
                    });
                });
            });
        });
    }));

    it('should clear selections', async(() => {
        fixture.whenStable().then(() => {
            const first = fixture.nativeElement.querySelector('g.heat-map-cell');
            expect(first).not.toBeNull();
            first.dispatchEvent(new Event('click'));
            component.clearSelections();
            component.close();
            expect(component.attackPatterns.length).toBe(0);
        });
    }));

});
