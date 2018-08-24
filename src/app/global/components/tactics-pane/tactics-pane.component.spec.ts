import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StoreModule, Store } from '@ngrx/store';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonToggleModule,
    MatButtonToggleChange,
    MatCardModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
} from '@angular/material';
import { MarkdownComponent } from 'ngx-markdown';

import { TacticsPaneComponent } from './tactics-pane.component';
import { TacticsControlService } from './tactics-control.service';
import { TacticsCarouselComponent } from './tactics-carousel/tactics-carousel.component';
import { UnfetterCarouselComponent } from './tactics-carousel/unf-carousel.component';
import { TacticsCarouselControlComponent } from './tactics-carousel/tactics-carousel-control.component';
import { TacticsHeatmapComponent } from './tactics-heatmap/tactics-heatmap.component';
import { TacticsTreemapComponent } from './tactics-treemap/tactics-treemap.component';
import { TacticsTooltipComponent } from './tactics-tooltip/tactics-tooltip.component';
import { TacticsTooltipService, TooltipEvent } from './tactics-tooltip/tactics-tooltip.service';
import { HeatmapComponent } from '../heatmap/heatmap.component';
import { TreemapComponent } from '../treemap/treemap.component';
import { ResizeDirective } from '../../directives/resize.directive';
import { MarkdownEditorComponent } from '../markdown-editor/markdown-editor.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import { mockUser, mockTactics, mockTargets } from './tactics.model.test';
import * as stixActions from '../../../root-store/stix/stix.actions';
import * as userActions from '../../../root-store/users/user.actions';
import { reducers, AppState } from '../../../root-store/app.reducers';

describe('TacticsPaneComponent', () => {

    let fixture: ComponentFixture<TacticsPaneComponent>;
    let component: TacticsPaneComponent;
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
                    TacticsPaneComponent,
                    TacticsCarouselComponent,
                    UnfetterCarouselComponent,
                    TacticsCarouselControlComponent,
                    TacticsHeatmapComponent,
                    TacticsTreemapComponent,
                    TacticsTooltipComponent,
                    HeatmapComponent,
                    TreemapComponent,
                    MarkdownEditorComponent,
                    MarkdownComponent,
                    ResizeDirective,
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
        store = component['store'];
        store.dispatch(new userActions.LoginUser(mockUser));
        store.dispatch(new stixActions.SetAttackPatterns(mockTactics));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should accept input frameworks', () => {
        component.frameworks = ['the_org'];
        component.ngOnInit();
    });

    it('should accept input targets', () => {
        component.targets = mockTargets;
        component.ngOnInit();

        component.targets[0].framework = 'the_org';
        component.ngOnInit();
    });

    it('should handle view changes', () => {
        ['heatmap', 'treemap', 'carousel'].forEach(view => {
            component.onViewChange({value: view} as MatButtonToggleChange);
            expect(component.view).toEqual(view);
        });
    });

    it('should pass hover events', () => {
        const passingSpy = spyOn(component.tooltips, 'handleTacticTooltip').and.callFake(() => {});
        component.onHover({type: 'hover'} as TooltipEvent);
        expect(passingSpy).toHaveBeenCalled();

        const emittingSpy = spyOn(component.hover, 'emit').and.callThrough();
        component.hover.observers.push({
            next: ev => console.log('next', ev),
            error: err => console.log('error', err),
            complete: () => {}
        });
        component.onHover({type: 'hover'} as TooltipEvent);
        expect(emittingSpy).toHaveBeenCalled();
    });

    it('should pass click events', () => {
        const passingSpy = spyOn(component.tooltips, 'handleTacticTooltip').and.callFake(() => {});
        component.onClick({type: 'click'} as TooltipEvent);
        expect(passingSpy).toHaveBeenCalled();

        const emittingSpy = spyOn(component.click, 'emit').and.callThrough();
        component.click.observers.push({
            next: ev => console.log('next', ev),
            error: err => console.log('error', err),
            complete: () => {}
        });
        component.onClick({type: 'click'} as TooltipEvent);
        expect(emittingSpy).toHaveBeenCalled();
    });

    it('should handle collapse events', () => {
        component.collapseSubject = new BehaviorSubject(false);
        component.ngOnInit();
        expect(component.collapsed).toBeFalsy();
        component.collapseSubject.next(true);
        expect(component.collapsed).toBeTruthy()
    });

});
