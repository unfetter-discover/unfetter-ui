import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule, MatCardModule, MatIconModule, MatOptionModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MarkdownComponent } from 'ngx-markdown';
import { Carousel } from 'primeng/primeng';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../../../../../core/services/auth.service';
import { HeatmapComponent } from '../../../../../global/components/heatmap/heatmap.component';
import { MarkdownEditorComponent } from '../../../../../global/components/markdown-editor/markdown-editor.component';
import { TacticsCarouselControlComponent } from '../../../../../global/components/tactics-pane/tactics-carousel/tactics-carousel-control.component';
import { TacticsCarouselComponent } from '../../../../../global/components/tactics-pane/tactics-carousel/tactics-carousel.component';
import { TacticsControlService } from '../../../../../global/components/tactics-pane/tactics-control.service';
import { TacticsHeatmapComponent } from '../../../../../global/components/tactics-pane/tactics-heatmap/tactics-heatmap.component';
import { TacticsPaneComponent } from '../../../../../global/components/tactics-pane/tactics-pane.component';
import { TacticsTooltipComponent } from '../../../../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.component';
import { TacticsTooltipService } from '../../../../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.service';
import { TacticsTreemapComponent } from '../../../../../global/components/tactics-pane/tactics-treemap/tactics-treemap.component';
import { mockTactics, mockUser } from '../../../../../global/components/tactics-pane/tactics.model.test';
import { TreemapComponent } from '../../../../../global/components/treemap/treemap.component';
import { CapitalizePipe } from '../../../../../global/pipes/capitalize.pipe';
import { AppState, reducers } from '../../../../../root-store/app.reducers';
import * as configActions from '../../../../../root-store/config/config.actions';
import * as userActions from '../../../../../root-store/users/user.actions';
import { SummaryTacticsComponent } from './summary-tactics.component';

describe('SummaryTacticsComponent', () => {

    let fixture: ComponentFixture<SummaryTacticsComponent>;
    let component: SummaryTacticsComponent;
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
                    HttpClientTestingModule,
                    StoreModule.forRoot(reducers),
                ],
                declarations: [
                    SummaryTacticsComponent,
                    TacticsPaneComponent,
                    TacticsHeatmapComponent,
                    TacticsTreemapComponent,
                    TacticsCarouselComponent,
                    TacticsCarouselControlComponent,
                    TacticsTooltipComponent,
                    HeatmapComponent,
                    TreemapComponent,
                    Carousel,
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
        fixture = TestBed.createComponent(SummaryTacticsComponent);
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
        component['capabilities'] = [{id: 'C1'}];
        // component.ngOnChanges({
        //     capabilities: new SimpleChange(null, component['capabilities'], false)
        // });
        expect(component).toBeTruthy();
    });

});
