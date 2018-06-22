import { TestBed, ComponentFixture, async, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { FormsModule } from '@angular/forms';
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

import { IntrusionSetsTacticsComponent } from './intrusion-sets-tactics.component';
import { IntrusionSetHighlighterService } from '../intrusion-set-highlighter.service';
import { TacticsPaneComponent } from '../../global/components/tactics-pane/tactics-pane.component';
import { TacticsCarouselComponent } from '../../global/components/tactics-pane/tactics-carousel/tactics-carousel.component';
import { TacticsCarouselControlComponent } from '../../global/components/tactics-pane/tactics-carousel/tactics-carousel-control.component';
import { TacticsTreemapComponent } from '../../global/components/tactics-pane/tactics-treemap/tactics-treemap.component';
import { TacticsHeatmapComponent } from '../../global/components/tactics-pane/tactics-heatmap/tactics-heatmap.component';
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

describe('IntrusionSetsTacticsComponent', () => {

    let fixture: ComponentFixture<IntrusionSetsTacticsComponent>;
    let component: IntrusionSetsTacticsComponent;
    let store: Store<AppState>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    FormsModule,
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
                    IntrusionSetsTacticsComponent,
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
                    IntrusionSetHighlighterService,
                    TacticsControlService,
                    TacticsTooltipService,
                    AuthService,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IntrusionSetsTacticsComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
        store.dispatch(new userActions.LoginUser(mockUser));
        store.dispatch(new configActions.LoadTactics(mockTactics));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('(with input data)', () => {

        beforeEach(() => {
            component.intrusionSets = [
                {
                    name: 'IS-1',
                    color: '#ff6666',
                    attack_patterns: [{ id: mockAttackPatternData[0].id }]
                },
            ];
            component.attackPatterns = mockAttackPatternData.reduce((ptns, ap) => {
                ptns[ap.id] = ap;
                return ptns;
            }, {});
            component.targets = mockTargets;
            component.ngOnChanges();
            fixture.detectChanges();
        });

        it('should handle input data', () => {
            expect(component).toBeTruthy();
        });

        it('should highlight patterns', () => {
            const spy = spyOn(component['highlighter'], 'highlightIntrusionSets').and.callThrough();

            component.highlightAttackPattern(null);
            expect(spy).toHaveBeenCalledWith(null);

            component.highlightAttackPattern({});
            expect(spy).toHaveBeenCalledWith(null);

            component.highlightAttackPattern({data: null});
            expect(spy).toHaveBeenCalledWith(null);

            component.highlightAttackPattern({data: {name: 'AP-IDK'}});
            expect(spy).toHaveBeenCalledWith(null);

            component.highlightAttackPattern({data: mockAttackPatternData[1]});
            expect(spy).toHaveBeenCalledWith(component.attackPatterns[mockAttackPatternData[1].id]);
        });

    });

});
