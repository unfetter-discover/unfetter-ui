import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import {
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
} from '@angular/material';
import { Carousel } from 'primeng/primeng';

import { ThreatTacticsComponent } from './threat-tactics.component';
import { TacticsPaneComponent } from '../../global/components/tactics-pane/tactics-pane.component';
import { TacticsHeatmapComponent } from '../../global/components/tactics-pane/tactics-heatmap/tactics-heatmap.component';
import { TacticsTreemapComponent } from '../../global/components/tactics-pane/tactics-treemap/tactics-treemap.component';
import { TacticsCarouselComponent } from '../../global/components/tactics-pane/tactics-carousel/tactics-carousel.component';
import { TacticsCarouselControlComponent } from '../../global/components/tactics-pane/tactics-carousel/tactics-carousel-control.component';
import { TacticsTooltipComponent } from '../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.component';
import { TacticsTooltipService } from '../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.service';
import { TacticsControlService } from '../../global/components/tactics-pane/tactics-control.service';
import { HeatmapComponent } from '../../global/components/heatmap/heatmap.component';
import { TreemapComponent } from '../../global/components/treemap/treemap.component';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { AuthService } from '../../core/services/auth.service';
import { reducers } from '../../root-store/app.reducers';
import { RouterTestingModule } from '@angular/router/testing';

describe('ThreatTacticsComponent', () => {

    let component: ThreatTacticsComponent;
    let fixture: ComponentFixture<ThreatTacticsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatButtonToggleModule,
                MatCardModule,
                MatIconModule,
                MatOptionModule,
                MatSelectModule,
                MatToolbarModule,
                RouterTestingModule,
                StoreModule.forRoot(reducers),
            ],
            declarations: [
                ThreatTacticsComponent,
                TacticsPaneComponent,
                TacticsHeatmapComponent,
                TacticsTreemapComponent,
                TacticsCarouselComponent,
                TacticsCarouselControlComponent,
                TacticsTooltipComponent,
                HeatmapComponent,
                TreemapComponent,
                Carousel,
                CapitalizePipe,
            ],
            providers: [
                TacticsTooltipService,
                TacticsControlService,
                AuthService,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThreatTacticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
