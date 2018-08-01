import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material';

import { TacticsTreemapComponent } from './tactics-treemap.component';
import { TacticsControlService } from '../tactics-control.service';
import { TacticsTooltipService, TooltipEvent } from '../tactics-tooltip/tactics-tooltip.service';
import { TreemapComponent } from '../../treemap/treemap.component';
import { TreemapOptions } from '../../treemap/treemap.data';
import { ResizeDirective } from '../../../directives/resize.directive';
import { GenericApi } from '../../../../core/services/genericapi.service';
import { mockUser, mockTactics, mockAttackPatterns, mockTargets } from '../tactics.model.test';
import * as stixActions from '../../../../root-store/stix/stix.actions';
import * as userActions from '../../../../root-store/users/user.actions';
import { reducers, AppState } from '../../../../root-store/app.reducers';

describe('TacticsTreemapComponent', () => {

    let fixture: ComponentFixture<TacticsTreemapComponent>;
    let component: TacticsTreemapComponent;
    let treemap: DebugElement;
    let store: Store<AppState>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    MatCardModule,
                    OverlayModule,
                    HttpClientTestingModule,
                    StoreModule.forRoot(reducers),
                ],
                declarations: [
                    TacticsTreemapComponent,
                    TreemapComponent,
                    ResizeDirective,
                ],
                providers: [
                    TacticsControlService,
                    TacticsTooltipService,
                    GenericApi
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticsTreemapComponent);
        treemap = fixture.debugElement.query(By.css('div.tree-map'));
        expect(treemap).toBeTruthy();
        treemap.nativeElement.style.width = '400px';
        treemap.nativeElement.style.height = '400px';
        component = fixture.componentInstance;
        component.options = new TreemapOptions();
        component.data = [
            ['Attack Patterns Used', 'Attack Phase', '# times used'],
            ['Attack Patterns', null, 0],
            ['Loading...', 'Attack Patterns', 1],
        ];
        store = component['store'];
        store.dispatch(new userActions.LoginUser(mockUser));
        store.dispatch(new stixActions.SetAttackPatterns(mockTactics));
    });
    
    it('should create', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component['view'].data = component.data;
            component['view'].ngOnInit();
            fixture.detectChanges();
        });
    }));

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
