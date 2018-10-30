import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SimpleChange } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material';

import { TacticsHeatmapComponent } from './tactics-heatmap.component';
import { TacticsControlService } from '../tactics-control.service';
import { TacticsTooltipService, TooltipEvent } from '../tactics-tooltip/tactics-tooltip.service';
import { HeatmapComponent } from '../../heatmap/heatmap.component';
import { ResizeDirective } from '../../../directives/resize.directive';
import { AuthService } from '../../../../core/services/auth.service';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { mockUser, mockTactics, mockAttackPatterns, mockTargets, mockTacticsConfig } from '../tactics.model.test';
import * as stixActions from '../../../../root-store/stix/stix.actions';
import * as userActions from '../../../../root-store/users/user.actions';
import { reducers, AppState } from '../../../../root-store/app.reducers';
import { AddConfig } from '../../../../root-store/config/config.actions';

describe('TacticsHeatmapComponent', () => {

    let fixture: ComponentFixture<TacticsHeatmapComponent>;
    let component: TacticsHeatmapComponent;
    let store: Store<AppState>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    MatCardModule,
                    OverlayModule,
                    RouterTestingModule,
                    StoreModule.forRoot(reducers),
                ],
                declarations: [
                    TacticsHeatmapComponent,
                    HeatmapComponent,
                    ResizeDirective,
                    CapitalizePipe,
                ],
                providers: [
                    AuthService,
                    TacticsControlService,
                    TacticsTooltipService,
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticsHeatmapComponent);
        component = fixture.componentInstance;
        component.targets = [];
        component.options = {};
        store = component['store'];
        store.dispatch(new AddConfig(mockTacticsConfig));
        store.dispatch(new userActions.LoginUser(mockUser));
        store.dispatch(new stixActions.SetAttackPatterns(mockAttackPatterns as any));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('[base view testing]', () => {

        it('should accept input frameworks', () => {
            component.frameworks = ['the_org'];
            component.ngOnChanges({
                frameworks: new SimpleChange(null, component.frameworks, false)
            });
        });

        it('should accept input targets', () => {
            component.targets = mockTargets;
            component.ngOnChanges({
                targets: new SimpleChange(null, component.targets, false)
            });
    
            component.targets[0].framework = 'the_org';
            component.ngOnChanges({
                targets: new SimpleChange(null, component.targets, false)
            });
        });

        it('should lookup tactics', () => {
            const lookup = component['lookupTactic'](mockTargets[0]);
            expect(lookup).toBeDefined();
            expect(lookup.id).toEqual(mockAttackPatterns[0].id);
            expect(component['hasHighlights'](mockTargets[0])).toBeTruthy();
        });

        it('should handle hover events', () => {
            const spy = spyOn(component['tooltips'], 'onHover').and.callThrough();
            component.onHover({data: mockAttackPatterns[0]} as TooltipEvent);
            expect(spy).toHaveBeenCalled();
        });

        it('should handle click events', () => {
            const spy = spyOn(component['tooltips'], 'onClick').and.callThrough();
            component.onClick({data: mockAttackPatterns[0]} as TooltipEvent);
            expect(spy).toHaveBeenCalled();
        });

    });

});
