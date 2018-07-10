import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of as observableOf, Observable } from 'rxjs';
import { compile } from 'handlebars';
import * as UUID from 'uuid';

import { FormsModule } from '@angular/forms';
import {
        MatDialogModule,
        MatDialogRef,
        MAT_DIALOG_DATA,
        MatIconModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTableModule,
    } from '@angular/material';

import { Report } from '../../../models/report';
import { ThreatReport } from '../../models/threat-report.model';
import { ExternalReference } from '../../../models/stix/external_reference';
import { GenericApi } from '../../../core/services/genericapi.service';
import { ReportImporterComponent } from './report-importer.component';
import { LoadingSpinnerComponent } from '../../../global/components/loading-spinner/loading-spinner.component';
import { ThreatReportOverviewService } from '../../../threat-dashboard/services/threat-report-overview.service';
import { ReportUploadService } from './report-upload.service';

describe('ReportImporterComponent', () => {

    let component: ReportImporterComponent;
    let fixture: ComponentFixture<ReportImporterComponent>;

    const goodReportID = UUID.v4();
    const badReportID = UUID.v4();

    const loadReport = function(id: string) {
        const ref = new ExternalReference();
        ref.source_name = Math.random().toString(36).substring(2, 5);
        ref.url = `https://${Math.random().toString(36).substring(2, 5)}.com/report.pdf`;

        const report = new Report();
        report.id = id;
        report.attributes.id = id;
        report.attributes.name = Math.random().toString(36).substring(2, 5);
        report.attributes.external_references = [ref];
        return report;
    }

    const mockReportService = {
        load: (id: string): Observable<ThreatReport> => {
            const workProduct = new ThreatReport();
            workProduct.reports = [loadReport(goodReportID)];
            return observableOf(workProduct);
        },

        loadAllReports(): Observable<Report[]> {
            const reports = new Array<Report>();
            const array = [UUID.v4(), UUID.v4(), UUID.v4(), UUID.v4()];
            array.concat(goodReportID, badReportID).forEach(id => reports.push(loadReport(id)));
            return observableOf(reports);
        }
    }

    const mockUploadService = {
        post: (file: File): Observable<Report[]> => {
            return observableOf([loadReport(UUID.v4())]);
        }
    };

    beforeEach(() => {
        const materialModules = [
            MatDialogModule,
            MatIconModule,
            MatPaginatorModule,
            MatProgressSpinnerModule,
            MatSnackBarModule,
            MatTableModule,
        ];

        TestBed.configureTestingModule({
            declarations: [ ReportImporterComponent, LoadingSpinnerComponent ],
            imports: [ HttpClientTestingModule, FormsModule, ...materialModules ],
            providers: [
                GenericApi,
                { provide: MAT_DIALOG_DATA, useValue: {} },
                {
                    provide: MatDialogRef,
                    useValue: {
                        close: function() {}
                    }
                },
                {
                    provide: ThreatReportOverviewService,
                    useValue: mockReportService
                },
                {
                    provide: ReportUploadService,
                    useValue: mockUploadService
                },
            ]
        });

        fixture = TestBed.createComponent(ReportImporterComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should upload and drop reports', () => {
        // upload a file, confirm it is imported
        component.uploadFile(new File(['test report file'], 'sample.csv'));
        expect(component.imports.data.length).toBe(1);
        const import1 = component.imports.data[0];

        // upload another
        component.uploadFile(new File(['test report file'], 'report.json'));
        expect(component.imports.data.length).toBe(2);
        const import2 = component.imports.data[1];

        // drop the first one
        component.onDropReport(import1);
        expect(component.imports.data.length).toBe(1);
        expect(component.imports.data[0]).toBe(import2);
    });

    it('should load, select, and deselect existing reports', () => {
        let goodReport, badReport;
        component.load(goodReportID);
        component.currents.reports$.subscribe((reports) => {
            expect(reports.length).toBe(6);
            goodReport = reports.find(report => report.id === goodReportID);
            badReport = reports.find(report => report.id === badReportID);
        });

        // select a report
        expect(component.isReportSelected(goodReport)).toBeFalsy();
        expect(component.isReportSelected(badReport)).toBeFalsy();
        expect(component.selections.size).toBe(0);
        component.onSelectReport(goodReport);
        expect(component.selections.size).toBe(1);
        expect(component.isReportSelected(goodReport)).toBeTruthy();
        expect(component.isReportSelected(badReport)).toBeFalsy();

        // try to select it again
        component.onSelectReport(goodReport);
        expect(component.selections.size).toBe(1);
        expect(component.isReportSelected(goodReport)).toBeTruthy();
        expect(component.isReportSelected(badReport)).toBeFalsy();

        // select another one
        component.onSelectReport(badReport);
        expect(component.selections.size).toBe(2);
        expect(component.isReportSelected(goodReport)).toBeTruthy();
        expect(component.isReportSelected(badReport)).toBeTruthy();

        // deselect the first report
        component.onDeselectReport(goodReport);
        expect(component.selections.size).toBe(1);
        expect(component.isReportSelected(goodReport)).toBeFalsy();
        expect(component.isReportSelected(badReport)).toBeTruthy();
    });

});
