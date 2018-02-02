import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { FormsModule } from '@angular/forms';
import {
        MatChipsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
    } from '@angular/material';

import { ThreatReportEditorComponent } from './threat-report-editor.component';
import { ThreatReportOverviewService } from '../../threat-dashboard/services/threat-report-overview.service';
import { ThreatReportSharedService } from '../services/threat-report-shared.service';
import { LoadingSpinnerComponent } from '../../global/components/loading-spinner/loading-spinner.component';
import { GenericApi } from '../../core/services/genericapi.service';

describe('ThreatReportEditorComponent', () => {
    let component: ThreatReportEditorComponent;
    let fixture: ComponentFixture<ThreatReportEditorComponent>;

    beforeEach(() => {
        const materialModules = [
            MatChipsModule,
            MatDatepickerModule,
            MatFormFieldModule,
            MatIconModule,
            MatOptionModule,
            MatProgressSpinnerModule,
            MatSelectModule,
            MatSnackBarModule,
            MatTableModule,
        ];

        TestBed.configureTestingModule({
            declarations: [ ThreatReportEditorComponent, LoadingSpinnerComponent ],
            imports: [ HttpClientTestingModule, FormsModule, ...materialModules ],
            providers: [
                GenericApi,
                ThreatReportOverviewService,
                ThreatReportSharedService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { params: { id: 'test_id' } }
                    }
                },
                { provide: Router, useValue: {} },
                { provide: Location, useValue: { back: (): void => { } } },
            ]
        })

        fixture = TestBed.createComponent(ThreatReportEditorComponent);
        component = fixture.componentInstance;
    });

    it('canary test', () => {
        expect(component).toBeDefined();
    });
});
