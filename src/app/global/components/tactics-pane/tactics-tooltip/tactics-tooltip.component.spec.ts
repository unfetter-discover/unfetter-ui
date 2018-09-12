import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule, MatFormFieldModule } from '@angular/material';
import { MarkdownComponent } from 'ngx-markdown';

import { TacticsTooltipComponent } from './tactics-tooltip.component';
import { TacticsTooltipService } from './tactics-tooltip.service';
import { MarkdownEditorComponent } from '../../markdown-editor/markdown-editor.component';
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
                FormsModule,
                ReactiveFormsModule,
                OverlayModule,
                MatCardModule,
                MatFormFieldModule,
                RouterTestingModule,
                StoreModule.forRoot(reducers),
            ],
            declarations: [
                TacticsTooltipComponent,
                MarkdownEditorComponent,
                MarkdownComponent,
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
        component['tooltips'].onHover({
            data: mockAttackPatterns[0],
            source: { target: component } as any
        });
        expect(showSpy).toHaveBeenCalledTimes(2);

        const hideSpy = spyOn(component, 'hideTacticTooltip').and.callThrough();
        component['tooltips'].onHover({
            data: null,
            source: { target: component } as any
        });
        expect(hideSpy).toHaveBeenCalled();
        component['tooltips'].onHover({
            data: null
        });
        expect(hideSpy).toHaveBeenCalledTimes(1);

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

    it('should emit events', () => {
        const observer = {
            next: ev => console.log('next', ev),
            error: err => console.log('error', err),
            complete: () => {}
        };
        component.hover.observers.push(observer);
        component.click.observers.push(observer);

        const emitSpy = spyOn(component.hover, 'emit').and.callThrough();
        component['tooltips'].onHover({
            data: mockAttackPatterns[0],
            source: { target: component } as any
        });
        expect(emitSpy).toHaveBeenCalled();

        emitSpy.calls.reset();
        component['tooltips'].onClick({
            data: mockAttackPatterns[1],
            source: { target: component } as any
        });
        expect(emitSpy).toHaveBeenCalled();

        emitSpy.calls.reset();
        component['tooltips'].onHover({
            data: mockAttackPatterns[0],
            observed: true,
            source: { target: component } as any
        });
        expect(emitSpy).not.toHaveBeenCalled();
    });

});
