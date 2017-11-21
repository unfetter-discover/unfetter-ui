import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { MatButtonModule, MatInputModule, MatIconModule, MatSelectModule, MatTooltipModule, MatFormFieldModule, MatListModule, MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AddExternalReportComponent } from '../add-external-report/add-external-report.component';
import { ModifyReportDialogComponent } from './modify-report-dialog.component';
import { ModifyIntrusionsComponent } from './modify-intrusions/modify-intrusions.component';
import { ModifyMalwaresComponent } from './modify-malwares/modify-malwares.component';
import { GenericApi } from '../../core/services/genericapi.service';

describe('Modify Report Dialog Component', () => {

    let comp: ModifyReportDialogComponent;
    let fixture: ComponentFixture<ModifyReportDialogComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        const materialModules = [
            MatButtonModule,
            MatDialogModule,
            MatInputModule,
            MatIconModule,
            MatListModule,
            MatSelectModule,
            MatFormFieldModule,
            MatTooltipModule,
        ];

        TestBed.configureTestingModule({
            declarations: [ModifyReportDialogComponent, AddExternalReportComponent, ModifyIntrusionsComponent, ModifyMalwaresComponent],
            imports: [RouterTestingModule, HttpModule, ReactiveFormsModule, FormsModule, ...materialModules],
            providers: [
                GenericApi, 
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
                { provide: Http, useValue: { } }
            ]
        });

        fixture = TestBed.createComponent(ModifyReportDialogComponent);
        comp = fixture.componentInstance;

    });

    it('canary test', () => {
        expect(comp).toBeDefined();
    });
});
