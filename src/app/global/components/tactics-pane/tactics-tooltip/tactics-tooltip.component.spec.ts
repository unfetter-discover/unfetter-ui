import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material';

import { TacticsTooltipComponent } from './tactics-tooltip.component';
import { TacticsTooltipService } from './tactics-tooltip.service';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../../root-store/app.reducers';
import { mockAttackPatterns } from '../tactics.model.test';

describe('TacticsTooltipComponent should', () => {

    let fixture: ComponentFixture<TacticsTooltipComponent>;
    let component: TacticsTooltipComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                OverlayModule,
                RouterTestingModule,
                StoreModule.forRoot(reducers),
            ],
            declarations: [
                TacticsTooltipComponent,
                CapitalizePipe,
            ],
            providers: [
                AuthService,
                TacticsTooltipService,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticsTooltipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle events', () => {
        const showSpy = spyOn(component, 'showTacticTooltip').and.callThrough();
        component['tooltips'].onHover({
            data: mockAttackPatterns[0],
            source: { target: component } as any
        });
        expect(showSpy).toHaveBeenCalled();
        expect(component['backdropped']).toBeFalsy();

        const hideSpy = spyOn(component, 'hideTacticTooltip').and.callFake(() => {});
        component['tooltips'].onHover({
            data: null,
            source: { target: component } as any
        });
        expect(hideSpy).toHaveBeenCalled();

        showSpy.calls.reset();
        component['tooltips'].onClick({
            data: mockAttackPatterns[1],
            source: { target: component } as any
        });
        expect(showSpy).toHaveBeenCalled();
        expect(component['backdropped']).toBeTruthy();

        showSpy.calls.reset();
        component['tooltips'].onHover({
            data: mockAttackPatterns[0],
            source: { target: component } as any
        });
        expect(showSpy).not.toHaveBeenCalled();
    });

});
