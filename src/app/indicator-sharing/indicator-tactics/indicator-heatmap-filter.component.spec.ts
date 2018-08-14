import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of as observableOf, Observable } from 'rxjs';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { MatCardModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

import { IndicatorHeatMapFilterComponent } from './indicator-heatmap-filter.component';
import {
    TacticsHeatmapComponent
} from '../../global/components/tactics-pane/tactics-heatmap/tactics-heatmap.component';
import { TacticsControlService } from '../../global/components/tactics-pane/tactics-control.service';
import { TacticsTooltipService } from '../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.service';
import { HeatmapComponent } from '../../global/components/heatmap/heatmap.component';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { AuthService } from '../../core/services/auth.service';
import { reducers } from '../../root-store/app.reducers';
import * as stixActions from '../../root-store/stix/stix.actions';
import * as userActions from '../../root-store/users/user.actions';
import { mockAttackPatterns } from '../../testing/mock-store';
import { Dictionary } from '../../models/json/dictionary';
import { TacticChain } from '../../global/components/tactics-pane/tactics.model';
import { ResizeDirective } from '../../global/directives/resize.directive';

describe('IndicatorHeatMapFilterComponent', () => {

    let fixture: ComponentFixture<IndicatorHeatMapFilterComponent>;
    let component: IndicatorHeatMapFilterComponent;

    let mockReducer: ActionReducerMap<any> = {
        indicatorSharing: indicatorSharingReducer
    };

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
        TestBed
            .configureTestingModule({
                imports: [
                    MatCardModule,
                    OverlayModule,
                    MatDialogModule,
                    HttpClientTestingModule,
                    RouterTestingModule,
                    StoreModule.forRoot({
                        ...mockReducer,
                        ...reducers,
                    }),
                ],
                declarations: [
                    IndicatorHeatMapFilterComponent,
                    TacticsHeatmapComponent,
                    HeatmapComponent,
                    ResizeDirective,
                    CapitalizePipe,
                ],
                providers: [
                    AuthService,
                    TacticsControlService,
                    TacticsTooltipService,
                    {
                        provide: MAT_DIALOG_DATA,
                        useValue: {active: [mockAttackPatterns[1].id]}
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
        fixture = TestBed.createComponent(IndicatorHeatMapFilterComponent);
        let heatmap = fixture.debugElement.query(By.css('div#indicator-heatmap-filter'));
        heatmap.nativeElement.style.width = '300px';
        heatmap.nativeElement.style.height = '500px';
        component = fixture.componentInstance;
        let store = component.store;
        store.dispatch(new userActions.LoginUser(testUser));
        store.dispatch(new stixActions.SetAttackPatterns(tactics));
        store.dispatch(new indicatorSharingActions.SetAttackPatterns(mockAttackPatternData));
        fixture.detectChanges();
    });

    it('should initialize', async(() => {
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
            expect(Object.values(component.attackPatterns).length).toBe(2);
            fixture.detectChanges();
        });
    }));

    it('should handle cell clicks', async(() => {
        fixture.whenStable().then(() => {
            component.heatmapOptions.hover = {delay: 2};
            fixture.detectChanges();

            const first = fixture.nativeElement.querySelector('g.heat-map-cell');
            expect(first).not.toBeNull();

            const spy = spyOn(component, 'toggleAttackPattern').and.callThrough();
            first.dispatchEvent(new Event('click'));
            expect(spy).toHaveBeenCalled();
            first.dispatchEvent(new Event('click'));
            expect(spy).toHaveBeenCalledTimes(2);
            first.dispatchEvent(new Event('click'));
            expect(spy).toHaveBeenCalledTimes(3);
            component.close();
            expect(component.selections.length).toBe(2);
        });
    }));

    it('should clear selections', async(() => {
        fixture.whenStable().then(() => {
            component.heatmapOptions.hover = {delay: 2};
            fixture.detectChanges();

            const first = fixture.nativeElement.querySelector('g.heat-map-cell');
            expect(first).not.toBeNull();
            first.dispatchEvent(new Event('click'));
            component.clearSelections();
            component.close();
            expect(component.selections.length).toBe(0);
        });
    }));

});
