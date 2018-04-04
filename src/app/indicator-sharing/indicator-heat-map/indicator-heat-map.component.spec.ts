import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MatCardModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

import { IndicatorHeatMapComponent } from './indicator-heat-map.component';
import { HeatmapComponent } from '../../global/components/heatmap/heatmap.component';
import { makeMockIndicatorSharingStore, mockIndicators, mockAttackPatterns } from '../../testing/mock-store';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { GenericApi } from '../../core/services/genericapi.service';

describe('IndicatorHeatMapComponent', () => {

    let fixture: ComponentFixture<IndicatorHeatMapComponent>;
    let component: IndicatorHeatMapComponent;
    let store;

    let mockReducer: ActionReducerMap<any> = {
        indicatorSharing: indicatorSharingReducer
    };

    const mockAttackPatternData = [
        {
            type: 'attack-pattern',
            id: mockAttackPatterns[0].id,
            attributes: {
                id: mockAttackPatterns[0].id,
                name: mockAttackPatterns[0].name,
                description: 'Attack Pattern #1',
                kill_chain_phases: [{phase_name: 'Something'}],
                x_mitre_data_sources: ['The Source'],
                x_mitre_platforms: ['iOS', 'Android']
            }
        },
        {
            type: 'attack-pattern',
            id: mockAttackPatterns[1].id,
            attributes: {
                id: mockAttackPatterns[1].id,
                name: mockAttackPatterns[1].name,
                description: 'Attack Pattern #2',
                kill_chain_phases: [{phase_name: 'Something Else'}],
                x_mitre_data_sources: ['Another Source'],
                x_mitre_platforms: ['AppleDOS', 'MS-DOS']
            }
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
                    StoreModule.forRoot(mockReducer),
                ],
                declarations: [
                    IndicatorHeatMapComponent,
                    HeatmapComponent,
                    CapitalizePipe,
                ],
                providers: [
                    GenericApi,
                    {
                        provide: MAT_DIALOG_DATA,
                        useValue: {indicators: mockIndicators}
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
        store = component.store;
        makeMockIndicatorSharingStore(store);
        let mockApi = spyOn(component.genericApi, 'get').and.returnValue(Observable.of(mockAttackPatternData));
        fixture.detectChanges();
    });

    it('should initialize', async(() => {
        expect(component).toBeTruthy();
        expect(component.heatmap.length).toBe(2);
        expect(component.displayIndicators.length).toBe(3);
    }));

    it('should allow hover tooltips', fakeAsync(() => {
        expect(component.attackPattern).toBeNull();

        const first = fixture.nativeElement.querySelector('g.heat-map-cell');
        expect(first).not.toBeNull();
        component.onTooltip({
            row: component.heatmap[0].cells[0],
            event: {target: first}
        });
        tick(1000); // skip a second into the future to spawn the tooltip
        fixture.detectChanges();
        expect(component.attackPattern).not.toBeNull();
        expect(component.attackPattern.id).toEqual(component.heatmap[0].cells[0].id);

        // now simulate moving off the attack pattern
        component.onTooltip({
            row: null,
            event: {target: first}
        });
        tick(1000); // skip a second into the future to spawn the tooltip
        fixture.detectChanges();
        expect(component.attackPattern).toBeNull();
    }));

    it('should filter analytics', async(() => {
        const first = fixture.nativeElement.querySelector('g.heat-map-cell rect');
        expect(first).not.toBeNull();
        // TODO i'd rather invoke a mouseclick event on the above rect object, but can't seem to tell jasmine to do that
        component.highlightAttackPatternAnalytics({
            row: component.heatmap[0].cells[0],
            event: {path: [first]}
        });
        fixture.detectChanges();
        expect(component.selectedPatterns.length).toBe(1);
        expect(component.displayIndicators.length).toBe(2);

        // click it again to see that it handle deselects
        component.highlightAttackPatternAnalytics({
            row: component.heatmap[0].cells[0],
            event: {path: [first]}
        });
        fixture.detectChanges();
        expect(component.selectedPatterns.length).toBe(0);
        expect(component.displayIndicators.length).toBe(3);
    }));

});
