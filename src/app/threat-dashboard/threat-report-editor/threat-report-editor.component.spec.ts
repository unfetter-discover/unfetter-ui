import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatOptionModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule, MatTableDataSource, MatTableModule } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, from as observableFrom, Observable, of as observableOf } from 'rxjs';
import * as UUID from 'uuid';
import { GenericApi } from '../../core/services/genericapi.service';
import { GlobalModule } from '../../global/global.module';
import { Report } from '../../models/report';
import { ExternalReference } from '../../models/stix/external_reference';
import { ThreatReportOverviewService } from '../../threat-dashboard/services/threat-report-overview.service';
import { SelectOption } from '../models/select-option';
import { ThreatReport } from '../models/threat-report.model';
import { ThreatReportEditorComponent } from './threat-report-editor.component';

class MockThreatReport {
    public static empty(): ThreatReport {
        return new ThreatReport();
    }

    public static byId(id: string): ThreatReport {
        const report = new ThreatReport();
        report.id = id;
        return report;
    }
}

xdescribe('ThreatReportEditorComponent', () => {

    let component: ThreatReportEditorComponent;
    let fixture: ComponentFixture<ThreatReportEditorComponent>;

    const mockThreatReportService = {
        load: (id: string): Observable<any> => {
            return observableOf(MockThreatReport.byId(id));
        },

        saveThreatReport(report: ThreatReport): Observable<ThreatReport> {
            if (!report) {
                return EMPTY;
            }
            report.id = report.id || UUID.v4();
            const saveReports$ = this.upsertReports(report.reports as Report[], report)
                .reduce((acc, val) => acc.concat(val), [])
                .map((el) => report);
            return saveReports$;
        },

        upsertReports(reports: Array<Report>, threatReport?: ThreatReport): Observable<Report> {
            if (threatReport) {
                let id = threatReport.id;
                reports.map((report) => {
                    report.attributes.metaProperties = report.attributes.metaProperties || {};
                    report.attributes.metaProperties.work_products =
                        report.attributes.metaProperties.work_products || [];
                    report.attributes.metaProperties.work_products =
                        report.attributes.metaProperties.work_products.concat({ ...threatReport });
                });
            }
            return observableFrom(reports);
        },

        removeReport(report: Report, threatReport?: ThreatReport): Observable<Report> {
            if (!report || !threatReport) {
                return observableFrom([]);
            }
            const id = threatReport.id;
            const attributes = Object.assign({}, report.attributes);
            const meta = {
                work_products: []
            };
            if (report.attributes.metaProperties && report.attributes.metaProperties.work_products) {
                const associatedWorkProducts =
                    report.attributes.metaProperties.work_products.filter((wp) => wp.id !== id);
                meta.work_products = [...associatedWorkProducts];
            }
            attributes.metaProperties = meta;
            return observableFrom([report]);
        },
    };

    const mockReference = new ExternalReference();
    mockReference.url = 'https://www.hotoffthepress.com/fakenews.tv';
    mockReference.source_name = 'The Fake News Network';

    const mockReport = new Report();
    mockReport.id = mockReport.attributes.id = UUID.v4();
    mockReport.url = 'https://www.hotoffthepress.com/fakenews.tv';
    mockReport.attributes.name = 'Bad Thing Happened';
    mockReport.attributes.external_references.push(mockReference);

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
            declarations: [
                ThreatReportEditorComponent,
            ],
            imports: [
                HttpClientTestingModule,
                FormsModule,
                ReactiveFormsModule,
                GlobalModule,
                ...materialModules
            ],
            providers: [
                GenericApi,
                {
                    provide: ThreatReportOverviewService,
                    useValue: mockThreatReportService
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { params: { id: 'test_id' } }
                    }
                },
                { provide: Router, useValue: {} },
                { provide: Location, useValue: { back: (): void => { } } },
            ]
        });

        fixture = TestBed.createComponent(ThreatReportEditorComponent);
        component = fixture.componentInstance;
    });

    it('should be readily initialized', () => {
        expect(component).toBeTruthy();
    });

    it('should load a work product', () => {
        const id = 'workproduct--123';
        component.load('workproduct--123');
        expect(component.threatReport).toBeDefined();
        expect(component.threatReport.id).toBe(id);
        component.threatReport = new ThreatReport();
        expect(component.threatReport.id).toBeFalsy();
    });

    it('should change start date', () => {
        // First, try no start date
        {
            component.startDateChanged(undefined);
            expect(component.minEndDate).toBeNull();
            expect(component.dateError.startDate.isError).toBeFalsy();
            expect(component.dateError.endDate.isSameOrBefore).toBeFalsy();
            expect(component.threatReport.boundaries.startDate).toBeNull();
        }

        // Next, try an invalid start date
        {
            component.startDateChanged('not a date string');
            expect(component.dateError.startDate.isError).toBeTruthy();
            expect(component.threatReport.boundaries.startDate).toBeNull();
        }

        // Finally, try a valid start date
        {
            const goodDate = '1/1/2018';
            const date = moment(goodDate, component.dateFormat);
            component.startDateChanged(goodDate);
            expect(component.dateError.startDate.isError).toBeFalsy();
            expect(component.threatReport.boundaries.startDate.getTime()).toBe(date.toDate().getTime());
            expect(component.minEndDate.getTime()).toBe(date.add(1, 'd').toDate().getTime());
        }
    });

    it('should change end date', () => {
        const startDate = '1/1/2018';
        component.startDateChanged(startDate);

        // First, try no end date
        {
            component.endDateChanged(undefined);
            expect(component.dateError.endDate.isError).toBeFalsy();
            expect(component.dateError.endDate.isSameOrBefore).toBeFalsy();
            expect(component.threatReport.boundaries.endDate).toBeNull();
        }

        // Next, try an invalid end date
        {
            component.endDateChanged('not a date string');
            expect(component.dateError.endDate.isError).toBeTruthy();
            expect(component.dateError.endDate.isSameOrBefore).toBeFalsy();
            expect(component.threatReport.boundaries.endDate).toBeNull();
        }

        // Now, try an older end date
        {
            const badDate = '1/2/2017';
            const date = moment(badDate, component.dateFormat);
            component.endDateChanged(badDate);
            expect(component.dateError.endDate.isError).toBeFalsy();
            expect(component.dateError.endDate.isSameOrBefore).toBeTruthy();
            expect(component.threatReport.boundaries.endDate.getTime()).toBe(date.toDate().getTime());
        }

        // Finally, try a valid end date
        {
            const goodDate = '1/2/2018';
            const date = moment(goodDate, component.dateFormat);
            component.endDateChanged(goodDate);
            expect(component.dateError.endDate.isError).toBeFalsy();
            expect(component.dateError.endDate.isSameOrBefore).toBeFalsy();
            expect(component.threatReport.boundaries.endDate.getTime()).toBe(date.toDate().getTime());
        }
    });

    it('should add and remove instrusion set chips', () => {
        // First, let's ensure there are no current intrusion sets
        expect(component.threatReport.boundaries.intrusions.size).toBe(0);

        // Add nothing, expect no change
        const intrusions = 'intrusion-set';
        component.addChip('intrusion', undefined);
        expect(component.threatReport.boundaries.intrusions.size).toBe(0);
        component.addChip(undefined, intrusions);
        expect(component.threatReport.boundaries.intrusions.size).toBe(0);

        // Add one
        const i1 = 'intrusion1';
        const intrusion1 = {
            value: i1,
            displayValue: i1,
        } as SelectOption;
        component.addChip(intrusion1, intrusions);
        expect(component.threatReport.boundaries.intrusions.size).toBe(1);

        // Add another
        const i2 = 'intrusion2';
        const intrusion2 = {
            value: i2,
            displayValue: i2,
        } as SelectOption;
        component.addChip(intrusion2, intrusions);
        expect(component.threatReport.boundaries.intrusions.size).toBe(2);

        // Try adding it again
        component.addChip(intrusion2, intrusions);
        expect(component.threatReport.boundaries.intrusions.size).toBe(2);

        // Remove nothing, and prove it
        component.removeChip(intrusion2, undefined);
        expect(component.threatReport.boundaries.intrusions.size).toBe(2);
        component.removeChip(undefined, intrusions);
        expect(component.threatReport.boundaries.intrusions.size).toBe(2);

        // Add a third
        const i3 = 'intrusion3';
        const intrusion3 = {
            value: i3,
            displayValue: i3,
        } as SelectOption;
        component.addChip(intrusion3, intrusions);
        expect(component.threatReport.boundaries.intrusions.size).toBe(3);

        // Remove the middle one
        component.removeChip(intrusion2, intrusions);
        expect(component.threatReport.boundaries.intrusions.size).toBe(2);

        // Remove the last one
        component.removeChip(intrusion3, intrusions);
        expect(component.threatReport.boundaries.intrusions.size).toBe(1);

        // And a fourth
        const i4 = 'intrusion4';
        const intrusion4 = {
            value: i4,
            displayValue: i4,
        } as SelectOption;
        component.addChip(intrusion4, intrusions);
        expect(component.threatReport.boundaries.intrusions.size).toBe(2);

        // Remove the first
        component.removeChip(intrusion1, intrusions);
        expect(component.threatReport.boundaries.intrusions.size).toBe(1);

        // Remove them all
        component.removeChip(intrusion4, intrusions);
        expect(component.threatReport.boundaries.intrusions.size).toBe(0);
    });

    it('should add and remove malware chips', () => {
        // First, let's ensure there are no current malware
        expect(component.threatReport.boundaries.malware.size).toBe(0);

        // Add nothing, expect no change
        const malwares = 'malware';
        component.addChip('malware', undefined);
        expect(component.threatReport.boundaries.intrusions.size).toBe(0);
        component.addChip(undefined, malwares);
        expect(component.threatReport.boundaries.intrusions.size).toBe(0);

        // Add one
        const m1 = 'malware1';
        const malware1 = {
            value: m1,
            displayValue: m1,
        } as SelectOption;
        component.addChip(malware1, malwares);
        expect(component.threatReport.boundaries.malware.size).toBe(1);

        // Add another
        const m2 = 'malware2';
        const malware2 = {
            value: m2,
            displayValue: m2,
        } as SelectOption;
        component.addChip(malware2, malwares);
        expect(component.threatReport.boundaries.malware.size).toBe(2);

        // Try adding it again
        component.addChip(malware2, malwares);
        expect(component.threatReport.boundaries.malware.size).toBe(2);

        // Remove nothing, and prove it
        component.removeChip(malware2, undefined);
        expect(component.threatReport.boundaries.malware.size).toBe(2);
        component.removeChip(undefined, malwares);
        expect(component.threatReport.boundaries.malware.size).toBe(2);

        // Add a third
        const m3 = 'malware3';
        const malware3 = {
            value: m3,
            displayValue: m3,
        } as SelectOption;
        component.addChip(malware3, malwares);
        expect(component.threatReport.boundaries.malware.size).toBe(3);

        // Remove the middle one
        component.removeChip(malware2, malwares);
        expect(component.threatReport.boundaries.malware.size).toBe(2);

        // Remove the last one
        component.removeChip(malware3, malwares);
        expect(component.threatReport.boundaries.malware.size).toBe(1);

        // And a fourth
        const m4 = 'malware4';
        const malware4 = {
            value: m4,
            displayValue: m4,
        } as SelectOption;
        component.addChip(malware4, malwares);
        expect(component.threatReport.boundaries.malware.size).toBe(2);

        // Remove the first
        component.removeChip(malware1, malwares);
        expect(component.threatReport.boundaries.malware.size).toBe(1);

        // Remove them all
        component.removeChip(malware4, malwares);
        expect(component.threatReport.boundaries.malware.size).toBe(0);
    });

    it('should add, modify and remove reports', () => {
        component.threatReport.id = 'abcdef0123456789';
        if (!component.reportsDataSource) {
            component.reportsDataSource = new MatTableDataSource([]);
            component.reportsDataSource.data = [];
        }

        // First, what if we add nothing?
        component.insertReport(undefined);
        expect(component.threatReport.reports.length).toBe(0);

        // add an "existing" report
        const newReport = new Report();
        newReport.attributes.id = '1';
        newReport.attributes.name = 'new report';
        component.insertReport(newReport);
        expect(newReport.attributes.created).toBeTruthy();
        expect(component.threatReport.reports.length).toBe(1);
        expect(component.threatReport.reports[0]).toBe(newReport);

        // add a "new" report
        const newerReport = new Report();
        newerReport.attributes.name = 'newer report';
        component.insertReport(newerReport);
        expect(newReport.attributes.created).toBeTruthy();
        expect(component.threatReport.reports.length).toBe(2);
        expect(component.threatReport.reports[1]).toBe(newerReport);

        // now change the first report
        newReport.attributes.external_references = [{
            source_name: 'ref',
            external_id: 'id',
            description: '',
            url: 'http://x.y.z/report.pdf'
        }];
        component.insertReport(newReport);
        expect(component.threatReport.reports.length).toBe(2);
        expect(component.threatReport.reports[0]).toBe(newReport);
        expect(component.threatReport.reports[0].attributes.external_references.length).toBe(1);
        expect(component.threatReport.reports[0].attributes.external_references[0].external_id).toBe('id');

        // and change the second report
        newerReport.attributes.external_references = [{
            source_name: 'ref2',
            external_id: 'idx',
            description: '',
            url: 'http://a.b.c/report.pdf'
        }];
        component.insertReport(newerReport);
        expect(component.threatReport.reports.length).toBe(2);
        expect(component.threatReport.reports[1]).toBe(newerReport);
        expect(component.threatReport.reports[1].attributes.external_references.length).toBe(1);
        expect(component.threatReport.reports[1].attributes.external_references[0].external_id).toBe('idx');

        // remove nothing, and prove it
        component.onRemoveReport(undefined);
        expect(component.threatReport.reports.length).toBe(2);

        // remove the 2nd report
        component.onRemoveReport(newerReport);
        expect(component.threatReport.reports.length).toBe(1);
        expect(component.threatReport.reports[0]).toBe(newReport);
    });

    it('should know valid from invalid', () => {
        // initially, should be invalid
        expect(component.isValid()).toBeFalsy();

        // add a name, should still be invalid
        component.threatReport.name = 'Some Work Product';
        expect(component.isValid()).toBeFalsy();

        // add invalid dates, and check again
        component.startDateChanged('not a real date');
        expect(component.isValid()).toBeFalsy();
        component.startDateChanged('1/1/2018');
        component.endDateChanged('not a real date');
        expect(component.isValid()).toBeFalsy();

        // add valid dates, and check again
        component.endDateChanged('1/2/2018');
        expect(component.isValid()).toBeFalsy();

        // finally, add a report and check again
        component.threatReport.reports.push(new Report());
        expect(component.isValid()).toBeTruthy();
    });

});
