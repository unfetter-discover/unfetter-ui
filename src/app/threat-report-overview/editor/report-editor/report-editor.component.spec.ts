import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormsModule } from '@angular/forms';
import {
        MatChipsModule,
        MatDialogModule,
        MatDialogRef,
        MAT_DIALOG_DATA,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
    } from '@angular/material';

import { GenericApi } from '../../../core/services/genericapi.service';
import { ReportEditorComponent } from './report-editor.component';

describe('ReportEditorComponent', () => {
    let component: ReportEditorComponent;
    let fixture: ComponentFixture<ReportEditorComponent>;

    beforeEach(() => {
        const materialModules = [
            MatChipsModule,
            MatDialogModule,
            MatFormFieldModule,
            MatIconModule,
            MatOptionModule,
            MatSelectModule,
        ];

        TestBed.configureTestingModule({
            declarations: [ ReportEditorComponent ],
            imports: [ HttpClientTestingModule, FormsModule, ...materialModules ],
            providers: [
                GenericApi,
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
            ]
        });

        fixture = TestBed.createComponent(ReportEditorComponent);
        component = fixture.componentInstance;
    });

    it('canary test', () => {
        expect(component).toBeDefined();
    });
});
