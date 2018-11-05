import { TestBed, ComponentFixture, async, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { of as observableOf } from 'rxjs';

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
    mockAttackPatternData,
    mockTacticsConfig
} from '../../global/components/tactics-pane/tactics.model.test';
import * as stixActions from '../../root-store/stix/stix.actions';
import * as userActions from '../../root-store/users/user.actions';
import { reducers, AppState } from '../../root-store/app.reducers';
import { UnfetterCarouselComponent } from '../../global/components/tactics-pane/tactics-carousel/unf-carousel.component';
import { AddConfig } from '../../root-store/config/config.actions';

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
                    UnfetterCarouselComponent,
                    TacticsCarouselControlComponent,
                    TacticsTooltipComponent,
                    HeatmapComponent,
                    TreemapComponent,
                    MarkdownEditorComponent,
                    MarkdownComponent,
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
        store.dispatch(new AddConfig(mockTacticsConfig));
        store.dispatch(new userActions.LoginUser(mockUser));
        store.dispatch(new stixActions.SetAttackPatterns(mockAttackPatternData as any));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle input data', () => {
        component.indicators = observableOf([0, 1, 2, 3].map(i => ({id: `A${i}`}))) as any;
        component.mappings = observableOf([0, 1].reduce((maps, i) => {
            maps[`A${i}`] = [mockAttackPatternData[i], mockAttackPatternData[i + 1]];
            return maps;
        }, {})) as any;
        component.targets = mockTargets;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

});
