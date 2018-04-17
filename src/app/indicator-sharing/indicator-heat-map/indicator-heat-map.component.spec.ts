import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { MatCardModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

import { IndicatorHeatMapComponent } from './indicator-heat-map.component';
import { HeatmapComponent } from '../../global/components/heatmap/heatmap.component';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { mockAttackPatterns } from '../../testing/mock-store';

describe('IndicatorHeatMapComponent', () => {

    let fixture: ComponentFixture<IndicatorHeatMapComponent>;
    let component: IndicatorHeatMapComponent;

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
                    IndicatorHeatMapComponent,
                    HeatmapComponent,
                    CapitalizePipe,
                ],
                providers: [
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
        fixture = TestBed.createComponent(IndicatorHeatMapComponent);
        let heatmap = fixture.debugElement.query(By.css('div#indicator-analytic-heat-map'));
        heatmap.nativeElement.style.width = '300px';
        heatmap.nativeElement.style.height = '500px';
        component = fixture.componentInstance;
        let store = component.store;
        store.dispatch(new indicatorSharingActions.SetAttackPatterns(mockAttackPatternData));
    });

    it('should initialize', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
            expect(component.heatmap.length).toBe(2);
            component['heatmapView'].heatMapData = component.heatmap.slice(0);
            component['heatmapView']['createHeatMap']();
        });
    }));

    it('should show hover tooltips, and handle cell clicks', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component.heatmapOptions.hover = {hoverDelay: 2};
            component['heatmapView'].heatMapData = component.heatmap.slice(0);
            component['heatmapView']['createHeatMap']();

            expect(component.attackPattern).toBeNull();
            component['changeDetector'].detach(); // NOTE: prevents view from being destroyed ahead of other tests

            const first = fixture.nativeElement.querySelector('g.heat-map-cell');
            expect(first).not.toBeNull();

            component.onTooltip({
                row: component.heatmap[0].cells[0],
                event: {target: first}
            });
            setTimeout(() => {
                fixture.detectChanges();
                expect(component.attackPattern).not.toBeNull();
                expect(component.attackPattern.id).toEqual(component.heatmap[0].cells[0].id);

                // now simulate moving off the attack pattern
                component.onTooltip({
                    row: null,
                    event: {target: first}
                });
                setTimeout(() => {
                    fixture.detectChanges();
                    expect(component.attackPattern).toBeNull();

                    const spy = spyOn(component, 'toggleAttackPattern').and.callThrough();
                    first.dispatchEvent(new Event('click'));
                    expect(spy).toHaveBeenCalled();
                }, 5);
            }, 5);
        });
    }));

});
