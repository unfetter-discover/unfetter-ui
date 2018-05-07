import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../core/services/auth.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import { StoreModule, Store } from '@ngrx/store';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatCardModule } from '@angular/material';

import { AttackPatternChooserComponent } from './attack-pattern-chooser.component';
import { AttackPatternsHeatmapComponent } from '../../../global/components/heatmap/attack-patterns-heatmap.component';
import { HeatmapComponent } from '../../../global/components/heatmap/heatmap.component';
import { CapitalizePipe } from '../../../global/pipes/capitalize.pipe';
import { reducers } from '../../../root-store/app.reducers';
import { mockAttackPatterns } from '../../../testing/mock-store';

describe('AttackPatternChooserComponent', () => {

    let component: AttackPatternChooserComponent;
    let fixture: ComponentFixture<AttackPatternChooserComponent>;
    let store: Store<any>;

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
                AttackPatternsHeatmapComponent,
                HeatmapComponent,
                CapitalizePipe,
            ],
            providers: [
                GenericApi,
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
        fixture = TestBed.createComponent(AttackPatternChooserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
