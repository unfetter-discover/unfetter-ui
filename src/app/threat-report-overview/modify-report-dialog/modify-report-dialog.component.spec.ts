import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatStepperModule } from '@angular/material';

import { AddExternalReportComponent } from './add-external-report/add-external-report.component';
import { ModifyReportDialogComponent } from './modify-report-dialog.component';
import { ModifyIntrusionsComponent } from './modify-intrusions/modify-intrusions.component';
import { ModifyMalwaresComponent } from './modify-malwares/modify-malwares.component';
import { GenericApi } from '../../core/services/genericapi.service';
import { ReportTranslationService } from '../../threat-dashboard/services/report-translation.service';
import { ConfigService } from '../../core/services/config.service';

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
            MatStepperModule,
            MatFormFieldModule,
            MatTooltipModule,
        ];

        TestBed.configureTestingModule({
            declarations: [ModifyReportDialogComponent, AddExternalReportComponent, ModifyIntrusionsComponent, ModifyMalwaresComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule, ...materialModules],
            providers: [
                ConfigService,
                GenericApi,
                ReportTranslationService,
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
            ]
        });

        fixture = TestBed.createComponent(ModifyReportDialogComponent);
        comp = fixture.componentInstance;

    });

    it('canary test', () => {
        expect(comp).toBeDefined();
    });
});
