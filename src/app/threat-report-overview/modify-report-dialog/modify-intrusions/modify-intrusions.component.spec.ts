import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModifyIntrusionsComponent } from './modify-intrusions.component';
import { MatButtonModule, MatInputModule, MatIconModule, MatSelectModule, MatTooltipModule, MatFormFieldModule } from '@angular/material';
import { GenericApi } from '../../../core/services/genericapi.service';
import { HttpModule } from '@angular/http';

describe('Modify Intrusions Component', () => {

    let comp: ModifyIntrusionsComponent;
    let fixture: ComponentFixture<ModifyIntrusionsComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        const materialModules = [
            MatButtonModule,
            MatInputModule,
            MatIconModule,
            MatSelectModule,
            MatFormFieldModule,
            MatTooltipModule,
        ];

        TestBed.configureTestingModule({
            declarations: [ModifyIntrusionsComponent],
            imports: [ReactiveFormsModule, FormsModule, HttpModule, ...materialModules],
            providers: [GenericApi]
        });

        fixture = TestBed.createComponent(ModifyIntrusionsComponent);
        comp = fixture.componentInstance;

    });

    it('canary test', () => {
        expect(comp).toBeDefined();
    });
});
