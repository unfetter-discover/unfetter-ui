import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MatCardModule, MatIconModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

import { IndicatorHeatMapComponent } from './indicator-heat-map.component';
import {
    TacticsHeatmapComponent
} from '../../global/components/tactics-pane/tactics-heatmap/tactics-heatmap.component';
import { HeatmapComponent } from '../../global/components/heatmap/heatmap.component';
import { makeMockIndicatorSharingStore, mockIndicators, mockAttackPatterns } from '../../testing/mock-store';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { GenericApi } from '../../core/services/genericapi.service';
import { AuthService } from '../../core/services/auth.service';

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
                    MatIconModule,
                    OverlayModule,
                    RouterTestingModule,
                    HttpClientTestingModule,
                    StoreModule.forRoot(mockReducer),
                ],
                declarations: [
                    IndicatorHeatMapComponent,
                    TacticsHeatmapComponent,
                    HeatmapComponent,
                    CapitalizePipe,
                ],
                providers: [
                    GenericApi,
                    AuthService,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndicatorHeatMapComponent);
        let heatmap = fixture.debugElement.query(By.css('div#indicator-heat-map'));
        heatmap.nativeElement.style.width = '300px';
        heatmap.nativeElement.style.height = '500px';
        component = fixture.componentInstance;
        store = component['indicatorsStore'];
        makeMockIndicatorSharingStore(store);
        let mockApi = spyOn(component['genericApi'], 'get').and.returnValue(Observable.of(mockAttackPatternData));
        fixture.detectChanges();
    });

    it('should initialize', async(() => {
        expect(component).toBeTruthy();
    }));

});
