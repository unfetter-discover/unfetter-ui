import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatDialogModule, MatDialogRef, MatFormFieldModule, MatIconModule, MatOptionModule, MatSelectModule, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { BaseComponentService } from '../../../components/base-service.component';
import { AttackPatternService } from '../../../core/services/attack-pattern.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import { GlobalModule } from '../../../global/global.module';
import { AttackPattern } from '../../../models/attack-pattern';
import { Report } from '../../../models/report';
import { ExternalReference } from '../../../models/stix/external_reference';
import * as fromRoot from '../../../root-store/app.reducers';
import { ReportEditorComponent } from './report-editor.component';

describe('ReportEditorComponent', () => {

    let component: ReportEditorComponent;
    let fixture: ComponentFixture<ReportEditorComponent>;

    const extRef = new ExternalReference();
    extRef.source_name = 'An X Report';
    extRef.external_id = 'X.123.456';
    extRef.url = 'https://x/evil.pdf';

    const reportX = new Report();
    reportX.id = reportX.attributes.id = '20180101abcdefg';
    reportX.attributes.name = 'The X File';
    reportX.attributes.object_refs = ['Bad Person Action'];
    reportX.attributes.external_references = [extRef];
    reportX.attributes.metaProperties = {};
    reportX.attributes.labels = [];

    beforeEach(async(() => {
        const materialModules = [
            MatChipsModule,
            MatDialogModule,
            MatFormFieldModule,
            MatIconModule,
            MatOptionModule,
            MatSelectModule,
        ];

        TestBed
            .configureTestingModule({
                declarations: [
                    ReportEditorComponent,
                ],
                imports: [
                    NoopAnimationsModule,
                    HttpClientTestingModule,
                    FormsModule,
                    ReactiveFormsModule,
                    GlobalModule,
                    ...materialModules,
                    StoreModule.forRoot(fromRoot.reducers),
                ],
                providers: [
                    AttackPatternService,
                    BaseComponentService,
                    GenericApi,
                    { provide: MAT_DIALOG_DATA, useValue: {} },
                    {
                        provide: MatDialogRef,
                        useValue: {
                            close: function () { }
                        }
                    },
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportEditorComponent);
        component = fixture.componentInstance;
        // tick forward for the asynchronous reactive forms element
        fixture.detectChanges();
    })

    it('should be readily initialized', () => {
        expect(component).toBeTruthy();
    });

    it('should load dialog data', () => {
        component.initializeReport(undefined);
        expect(component.report.attributes.id).toBeUndefined();
        expect(component.report.attributes.object_refs.length).toBe(0);
        expect(component.editing).toBeFalsy();

        component.initializeReport(reportX);
        expect(component.report.attributes.id).toBe(reportX.attributes.id);
        expect(component.report.attributes.name).toBe(reportX.attributes.name);
        expect(component.report.attributes.object_refs.length).toBe(1);
        expect(component.editing).toBeTruthy();
    });

    it('should add attack patterns', async(() => {
        fixture.whenStable().then(() => {
            expect(component.selectedPatternsFormControl).toBeDefined();
            expect(component.selectedPatternsFormControl.value.length).toBe(0);
    
            // add a pattern
            const ap1 = new AttackPattern();
            ap1.id = 'a1';
            ap1.attributes.name = 'AP1';
            component.selectedPatternsFormControl.setValue([ap1]);
    
            component.report.attributes.name = 'test report';
            component.references.source_name = 'source1';
            component.references.url = 'url1';
            // build the form
            component.onSave();
    
            // get the components report
            const report = component.report;
            expect(report).toBeDefined();
            expect(report.attributes).toBeDefined();
            expect(report.attributes.object_refs).toBeDefined();
            expect(report.attributes.object_refs.length).toBe(1);
            expect(report.attributes.object_refs[0]).toEqual('a1');
        });
    }));

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
        component.initializeReport(reportX);

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
        component.selectedPatternsFormControl.value.push({ id: 'X2', name: 'X-Squared' });
        component.report.id = component.report.attributes.id;
        component.report.attributes.modified = undefined;
        component.report.attributes.name = 'Clone of The X File';
        component.onSaveAs();
        expect(component.report.id).toBeUndefined();
        expect(component.report.attributes.modified).toBeTruthy();
    });

    it('should know how to sort attack patterns', () => {
        const sorter = component.genAttackPatternSorter();

        const attackPattern1 = new AttackPattern();
        attackPattern1.attributes.name = 'attack pattern 1';
        const attackPattern2 = new AttackPattern();
        attackPattern2.attributes.name = 'attack pattern 2';

        const arr = [attackPattern2, attackPattern1];
        const sorted = arr.sort(sorter);
        expect(sorted).toBeDefined();
        expect(sorted.length).toBe(2);
        expect(sorted[0].attributes.name).toEqual('attack pattern 1');
        expect(sorted[1].attributes.name).toEqual('attack pattern 2');
    });

});
