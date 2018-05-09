import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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
import { CarouselModule } from 'primeng/primeng';

import { TacticsPaneComponent } from './tactics-pane.component';
import { TacticsControlService } from './tactics-control.service';
import { TacticsCarouselComponent } from './tactics-carousel/tactics-carousel.component';
import { TacticsCarouselControlComponent } from './tactics-carousel/tactics-carousel-control.component';
import { TacticsHeatmapComponent } from './tactics-heatmap/tactics-heatmap.component';
import { TacticsTreemapComponent } from './tactics-treemap/tactics-treemap.component';
import { TacticsTooltipComponent } from './tactics-tooltip/tactics-tooltip.component';
import { TacticsTooltipService } from './tactics-tooltip/tactics-tooltip.service';
import { HeatmapComponent } from '../heatmap/heatmap.component';
import { TreemapComponent } from '../treemap/treemap.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import { reducers } from '../../../root-store/app.reducers';

describe('TacticsPaneComponent', () => {

    let component: TacticsPaneComponent;
    let fixture: ComponentFixture<TacticsPaneComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CarouselModule,
                MatButtonToggleModule,
                MatCardModule,
                MatIconModule,
                MatOptionModule,
                MatSelectModule,
                MatToolbarModule,
                RouterTestingModule,
                HttpClientTestingModule,
                StoreModule.forRoot(reducers),
            ],
            declarations: [
                TacticsPaneComponent,
                TacticsCarouselComponent,
                TacticsCarouselControlComponent,
                TacticsHeatmapComponent,
                TacticsTreemapComponent,
                TacticsTooltipComponent,
                HeatmapComponent,
                TreemapComponent,
                CapitalizePipe,
            ],
            providers: [
                AuthService,
                GenericApi,
                TacticsControlService,
                TacticsTooltipService,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticsPaneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
