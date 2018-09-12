import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';

import { Tactic } from '../tactics.model';
import { TacticsCarouselComponent } from './tactics-carousel.component';
import { UnfetterCarouselComponent } from './unf-carousel.component';
import { TacticsControlService } from '../tactics-control.service';
import { TacticsTooltipService, TooltipEvent } from '../tactics-tooltip/tactics-tooltip.service';
import { ResizeDirective } from '../../../directives/resize.directive';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { mockUser, mockTactics, mockAttackPatterns, mockTargets } from '../tactics.model.test';
import * as stixActions from '../../../../root-store/stix/stix.actions';
import * as userActions from '../../../../root-store/users/user.actions';
import { reducers, AppState } from '../../../../root-store/app.reducers';

describe('TacticCarouselComponent', () => {

    const keyTactics = mockTactics['the_org'].phases[0].tactics;

    let fixture: ComponentFixture<TacticsCarouselComponent>;
    let component: TacticsCarouselComponent;
    let store: Store<AppState>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    StoreModule.forRoot(reducers),
                ],
                declarations: [
                    TacticsCarouselComponent,
                    UnfetterCarouselComponent,
                    ResizeDirective,
                    CapitalizePipe,
                ],
                providers: [
                    TacticsControlService,
                    TacticsTooltipService,
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticsCarouselComponent);
        component = fixture.componentInstance;
        store = component['store'];
        store.dispatch(new userActions.LoginUser(mockUser));
        store.dispatch(new stixActions.SetAttackPatterns(mockTactics));
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

    it('should display tactics', () => {
        // doing this manually because jasmine's not rendering the carousel
        component.targets = mockTargets;
        component.ngOnChanges({
            targets: new SimpleChange(null, component.targets, false)
        });
        fixture.detectChanges();
        expect(component.count(keyTactics)).toBe(1);
        expect(component.canShowTactic(keyTactics[0])).toBeTruthy();
        expect(component.getTacticBackground(keyTactics[0])).toEqual('blue');
        expect(component.getTacticForeground(keyTactics[0])).toEqual('white');
        expect(component.getTacticBackground(keyTactics[1])).toEqual('initial');
        expect(component.getTacticForeground(keyTactics[1])).toEqual('initial');
    });

    it('should handle filter events', fakeAsync(() => {
        expect(component.canShowTactic(keyTactics[1])).toBeTruthy();

        component.filters.rows = true;
        expect(component.canShowTactic(keyTactics[1])).toBeFalsy();
    }));

    it('should handle page events', () => {
        const spy = spyOn(component['view'], 'setPage').and.callThrough();
        component['controls'].onChange({page: 2});
        expect(spy).toHaveBeenCalled();
    });

});
