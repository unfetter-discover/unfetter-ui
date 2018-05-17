import { TestBed, ComponentFixture, async, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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

import { IndicatorTacticsComponent } from './indicator-tactics.component';
import { TacticsPaneComponent } from '../../global/components/tactics-pane/tactics-pane.component';
import { TacticsHeatmapComponent } from '../../global/components/tactics-pane/tactics-heatmap/tactics-heatmap.component';
import { TacticsTreemapComponent } from '../../global/components/tactics-pane/tactics-treemap/tactics-treemap.component';
import { TacticsCarouselComponent } from '../../global/components/tactics-pane/tactics-carousel/tactics-carousel.component';
import { TacticsCarouselControlComponent } from '../../global/components/tactics-pane/tactics-carousel/tactics-carousel-control.component';
import { TacticsTooltipComponent } from '../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.component';
import { TacticsControlService } from '../../global/components/tactics-pane/tactics-control.service';
import { TacticsTooltipService } from '../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.service';
import { HeatmapComponent } from '../../global/components/heatmap/heatmap.component';
import { TreemapComponent } from '../../global/components/treemap/treemap.component';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { AuthService } from '../../core/services/auth.service';
import { reducers } from '../../root-store/app.reducers';

describe('IndicatorTacticsComponent', () => {

    let component: IndicatorTacticsComponent;
    let fixture: ComponentFixture<IndicatorTacticsComponent>;

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
                IndicatorTacticsComponent,
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
                TacticsControlService,
                TacticsTooltipService,
                AuthService,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndicatorTacticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
