import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

import { ThreatTacticsComponent } from './threat-tactics.component';
import { TacticsPaneComponent } from '../../global/components/tactics-pane/tactics-pane.component';
import { TacticsHeatmapComponent } from '../../global/components/tactics-pane/tactics-heatmap/tactics-heatmap.component';
import { TacticsTreemapComponent } from '../../global/components/tactics-pane/tactics-treemap/tactics-treemap.component';
import { TacticsCarouselComponent } from '../../global/components/tactics-pane/tactics-carousel/tactics-carousel.component';
import { UnfetterCarouselComponent } from '../../global/components/tactics-pane/tactics-carousel/unf-carousel.component';
import { TacticsCarouselControlComponent } from '../../global/components/tactics-pane/tactics-carousel/tactics-carousel-control.component';
import { TacticsTooltipComponent } from '../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.component';
import { TacticsTooltipService } from '../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.service';
import { TacticsControlService } from '../../global/components/tactics-pane/tactics-control.service';
import { MarkdownEditorComponent } from '../../global/components/markdown-editor/markdown-editor.component';
import { HeatmapComponent } from '../../global/components/heatmap/heatmap.component';
import { TreemapComponent } from '../../global/components/treemap/treemap.component';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { AuthService } from '../../core/services/auth.service';
import { mockUser, mockTactics } from '../../global/components/tactics-pane/tactics.model.test';
import * as stixActions from '../../root-store/stix/stix.actions';
import * as userActions from '../../root-store/users/user.actions';
import { reducers, AppState } from '../../root-store/app.reducers';
import { AttackPattern } from '../../models';

describe('ThreatTacticsComponent', () => {

    let fixture: ComponentFixture<ThreatTacticsComponent>;
    let component: ThreatTacticsComponent;
    let store: Store<AppState>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
                ThreatTacticsComponent,
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
        store = TestBed.get(Store);
        store.dispatch(new userActions.LoginUser(mockUser));
        store.dispatch(new stixActions.SetAttackPatterns(mockTactics));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle input targets', () => {
        component.attackPatterns = [new AttackPattern()];
        component.ngOnChanges();
    });

});
