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

import { Report } from '../../../models/report';
import { ExternalReference } from '../../../models/stix/external_reference';
import { AttackPattern } from '../../../models/attack-pattern';
import { ReportEditorComponent } from './report-editor.component';
import { GenericApi } from '../../../core/services/genericapi.service';

describe('ReportEditorComponent', () => {

    let component: ReportEditorComponent;
    let fixture: ComponentFixture<ReportEditorComponent>;

    const extRef = new ExternalReference();
    extRef.source_name = 'An X Report';
    extRef.external_id = 'X.123.456';
    extRef.url = 'https:x.x.x/evil.pdf';

    const reportX = new Report();
    reportX.id = reportX.attributes.id = '20180101abcdefg';
    reportX.attributes.name = 'The X File';
    reportX.attributes.object_refs = ['Bad Person Action'];
    reportX.attributes.external_references = [extRef];
    reportX.attributes.metaProperties = {};

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
                {
                    provide: MatDialogRef,
                    useValue: {
                        close: function() {}
                    }
                },
            ]
        });

        fixture = TestBed.createComponent(ReportEditorComponent);
        component = fixture.componentInstance;
    });

    it('should be readily initialized', () => {
        expect(component).toBeTruthy();
    });

    it('should load dialog data', () => {
        component.initializeReport(undefined);
        expect(component.report.attributes.id).toBeUndefined();
        expect(component.report.attributes.object_refs.length).toBe(0);
        expect(component.editing).toBeFalsy();

        component.initializeReport({report: reportX});
        expect(component.report.attributes.id).toBe(reportX.attributes.id);
        expect(component.report.attributes.name).toBe(reportX.attributes.name);
        expect(component.report.attributes.object_refs.length).toBe(1);
        expect(component.editing).toBeTruthy();
    });

    it('should add and remove attack patterns', () => {
        expect(component.reportPatterns.length).toBe(0);

        // add a pattern
        const ap1 = new AttackPattern();
        ap1.id = 'a1';
        ap1.attributes.name = 'AP1';
        component.addAttackPattern(ap1);
        expect(component.reportPatterns.length).toBe(1);
        expect(component.reportPatterns[0].id).toBe(ap1.id);
        expect(component.reportPatterns[0].name).toBe(ap1.attributes.name);

        // attempt to add it again
        component.addAttackPattern(ap1);
        expect(component.reportPatterns.length).toBe(1);

        // attempt to delete nothing, and prove it
        component.removeAttackPattern(undefined);
        expect(component.reportPatterns.length).toBe(1);

        // now attempt to really delete it
        component.removeAttackPattern(ap1.id);
        expect(component.reportPatterns.length).toBe(0);
    });

    it('should know if a created report is valid or invalid', () => {
        // confirm this is a report we are creating
        expect(component.editing).toBeFalsy();
        expect(component.report.id).toBeUndefined();
        component.report.attributes.modified = undefined; // so we can see if it gets set on save

        // test its validity, should fail
        expect(component.isValid()).toBeFalsy();

        // try to save it anyway
        component.onSave();
        expect(component.report.attributes.modified).toBeUndefined();

        // try setting the name and checking again
        component.report.attributes.name = 'The Name of a Report';
        expect(component.isValid()).toBeFalsy();

        // okay, add an external reference
        component.references.source_name = 'The Source';
        component.references.url = 'https://fbi.gov/source.rpt';
        expect(component.isValid()).toBeTruthy();

        // now try to save it
        component.onSave();
        expect(component.report.attributes.modified).toBeTruthy();
    });

    it('should know if an existing report is valid or invalid', () => {
        component.initializeReport({report: reportX});

        // confirm this is a report we are editing, and it is already valid
        expect(component.editing).toBeTruthy();
        expect(component.report.attributes.id).toBeTruthy();
        expect(component.isValid()).toBeTruthy();

        // let's edit something and save
        component.report.attributes.modified = undefined;
        component.report.attributes.labels.push('X');
        component.onSave();
        expect(component.report.attributes.modified).toBeTruthy();

        // let's save it as a new report
        component.reportPatterns.push({id: 'X2', name: 'X-Squared'});
        component.report.id = component.report.attributes.id;
        component.report.attributes.modified = undefined;
        component.report.attributes.name = 'Clone of The X File';
        component.onSaveAs();
        expect(component.report.id).toBeUndefined();
        expect(component.report.attributes.modified).toBeTruthy();
    });

});
