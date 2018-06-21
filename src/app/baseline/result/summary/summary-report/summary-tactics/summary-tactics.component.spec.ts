import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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

import { SummaryTacticsComponent } from './summary-tactics.component';
import { TacticsPaneComponent } from '../../../../../global/components/tactics-pane/tactics-pane.component';
import { TacticsHeatmapComponent } from '../../../../../global/components/tactics-pane/tactics-heatmap/tactics-heatmap.component';
import { TacticsTreemapComponent } from '../../../../../global/components/tactics-pane/tactics-treemap/tactics-treemap.component';
import { TacticsCarouselComponent } from '../../../../../global/components/tactics-pane/tactics-carousel/tactics-carousel.component';
import { TacticsCarouselControlComponent } from '../../../../../global/components/tactics-pane/tactics-carousel/tactics-carousel-control.component';
import { TacticsTooltipComponent } from '../../../../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.component';
import { TacticsTooltipService } from '../../../../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.service';
import { TacticsControlService } from '../../../../../global/components/tactics-pane/tactics-control.service';
import { HeatmapComponent } from '../../../../../global/components/heatmap/heatmap.component';
import { TreemapComponent } from '../../../../../global/components/treemap/treemap.component';
import { MarkdownEditorComponent } from '../../../../../global/components/markdown-editor/markdown-editor.component';
import { CapitalizePipe } from '../../../../../global/pipes/capitalize.pipe';
import { mockUser, mockTactics } from '../../../../../global/components/tactics-pane/tactics.model.test';
import * as configActions from '../../../../../root-store/config/config.actions';
import * as userActions from '../../../../../root-store/users/user.actions';
import { reducers, AppState } from '../../../../../root-store/app.reducers';
import { AuthService } from '../../../../../core/services/auth.service';

describe('SummaryTacticsComponent', () => {

    let fixture: ComponentFixture<SummaryTacticsComponent>;
    let component: SummaryTacticsComponent;
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
        component.ngOnChanges({
            capabilities: new SimpleChange(null, component['capabilities'], false)
        });
        expect(component).toBeTruthy();
    });

    it('should expand and collapse', () => {
        expect(component.collapseContents).toBeFalsy();

        component.collapseSubject = new BehaviorSubject(false);
        component.ngOnChanges(null);
        expect(component.collapseContents).toBeFalsy();

        component.collapseSubject.next(true);
        expect(component.collapseContents).toBeTruthy()

        component.collapseSubject.next(false);
        expect(component.collapseContents).toBeFalsy();
    });

});
