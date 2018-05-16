import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material';

import { TacticsHeatmapComponent } from './tactics-heatmap.component';
import { TacticsControlService } from '../tactics-control.service';
import { TacticsTooltipService } from '../tactics-tooltip/tactics-tooltip.service';
import { HeatmapComponent } from '../../heatmap/heatmap.component';
import { AuthService } from '../../../../core/services/auth.service';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { reducers } from '../../../../root-store/app.reducers';

describe('TacticsHeatmapComponent', () => {

    let component: TacticsHeatmapComponent;
    let fixture: ComponentFixture<TacticsHeatmapComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                OverlayModule,
                RouterTestingModule,
                StoreModule.forRoot(reducers),
            ],
            declarations: [
                TacticsHeatmapComponent,
                HeatmapComponent,
                CapitalizePipe,
            ],
            providers: [
                AuthService,
                TacticsControlService,
                TacticsTooltipService,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticsHeatmapComponent);
        component = fixture.componentInstance;
        component.targets = [];
        component.options = {};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
