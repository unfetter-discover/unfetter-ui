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
import { TacticsCarouselComponent } from './tactics-carousel/tactics-carousel.component';
import { TacticsCarouselControlComponent } from './tactics-carousel/tactics-carousel-control.component';
import { AttackPatternsHeatmapComponent } from '../heatmap/attack-patterns-heatmap.component';
import { HeatmapComponent } from '../heatmap/heatmap.component';
import { TreemapComponent } from '../treemap/treemap.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import { reducers } from '../../../root-store/app.reducers';
import { TacticControlService } from './tactic-control.service';

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
                AttackPatternsHeatmapComponent,
                HeatmapComponent,
                TreemapComponent,
                CapitalizePipe,
            ],
            providers: [
                AuthService,
                GenericApi,
                TacticControlService,
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
