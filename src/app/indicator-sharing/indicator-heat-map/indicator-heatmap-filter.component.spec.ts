import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { MatCardModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

import { IndicatorHeatMapFilterComponent } from './indicator-heatmap-filter.component';
import { AttackPatternsHeatmapComponent } from '../../global/components/heatmap/attack-patterns-heatmap.component';
import { HeatmapComponent } from '../../global/components/heatmap/heatmap.component';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { mockAttackPatterns } from '../../testing/mock-store';
import { AuthService } from '../../core/services/auth.service';

fdescribe('IndicatorHeatMapFilterComponent', () => {

    let fixture: ComponentFixture<IndicatorHeatMapFilterComponent>;
    let component: IndicatorHeatMapFilterComponent;

    let mockReducer: ActionReducerMap<any> = {
        indicatorSharing: indicatorSharingReducer
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

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    MatCardModule,
                    OverlayModule,
                    MatDialogModule,
                    HttpClientTestingModule,
                    RouterTestingModule,
                    StoreModule.forRoot(mockReducer),
                ],
                declarations: [
                    IndicatorHeatMapFilterComponent,
                    AttackPatternsHeatmapComponent,
                    HeatmapComponent,
                    CapitalizePipe,
                ],
                providers: [
                    AuthService,
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
        store.dispatch(new indicatorSharingActions.SetAttackPatterns(mockAttackPatternData));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component['view']['createAttackPatternHeatMap']();
            fixture.detectChanges();
        });
    });
    
    it('should initialize', async(() => {
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
            expect(Object.values(component.attackPatterns).length).toBe(2);
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const first = fixture.nativeElement.querySelector('g.heat-map-cell');
                expect(first).not.toBeNull();
            });
        });
    }));

    it('should handle cell clicks', async(() => {
        // fixture.detectChanges();
        fixture.whenStable().then(() => {
            component.heatmapOptions.hover = {hoverDelay: 2};
            component['view']['createAttackPatternHeatMap']();
            fixture.detectChanges();

            const first = fixture.nativeElement.querySelector('g.heat-map-cell');
            expect(first).not.toBeNull();

            const spy = spyOn(component, 'toggleAttackPattern').and.callThrough();
            first.dispatchEvent(new Event('click'));
            expect(spy).toHaveBeenCalled();
        });
    }));

});
