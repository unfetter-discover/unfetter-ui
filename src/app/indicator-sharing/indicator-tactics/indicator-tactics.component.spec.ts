import { TestBed, ComponentFixture, async, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
} from '@angular/material';
import { MarkdownComponent } from 'ngx-markdown';
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
import { MarkdownEditorComponent } from '../../global/components/markdown-editor/markdown-editor.component';
import { HeatmapComponent } from '../../global/components/heatmap/heatmap.component';
import { TreemapComponent } from '../../global/components/treemap/treemap.component';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { AuthService } from '../../core/services/auth.service';
import {
    mockUser,
    mockTactics,
    mockTargets,
    mockAttackPatternData
} from '../../global/components/tactics-pane/tactics.model.test';
import * as configActions from '../../root-store/config/config.actions';
import * as userActions from '../../root-store/users/user.actions';
import { reducers, AppState } from '../../root-store/app.reducers';

describe('IndicatorTacticsComponent', () => {

    let fixture: ComponentFixture<IndicatorTacticsComponent>;
    let component: IndicatorTacticsComponent;
    let store: Store<AppState>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
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
                    MarkdownEditorComponent,
                    MarkdownComponent,
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
        store = TestBed.get(Store);
        store.dispatch(new userActions.LoginUser(mockUser));
        store.dispatch(new configActions.LoadTactics(mockTactics));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle input data', () => {
        component.indicators = [0, 1, 2, 3].map(i => ({id: `A${i}`}));
        component.mappings = [0, 1, 2].reduce((maps, i) => {
            maps[`A${i}`] = [mockAttackPatternData[i]];
            return maps;
        }, {});
        component.targets = mockTargets;
        component.ngOnChanges();
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

});
