import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatInputModule, MatProgressBarModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from 'app/root-store/app.reducers';
import { ChartsModule } from 'ng2-charts';
import { ComponentModule } from '../../components/component.module';
import { GenericApi } from '../../core/services/genericapi.service';
import { GlobalModule } from '../../global/global.module';
import { BaselineMeta } from '../../models/baseline/baseline-meta';
import { PipesModule } from '../../pipes';
import { baselineReducer } from '../store/baseline.reducers';
import { CapabilitySelectorComponent } from './capability-selector/capability-selector.component';
import { CapabilityComponent } from './capability/capability.component';
import { CategoryComponent } from './category/category.component';
import { WizardComponent } from './wizard.component';
import { ReactiveFormsModule } from '@angular/forms';

class MockModel {
  attributes: any;
  type: any;
  links: any;

  constructor() {
    // this.attributes = {
    //   baselineMeta: new BaselineMeta(), baseline_objects: [
    //     {
    //       stix:
    //         {
    //           version: null, external_references: null, granular_markings: null, name: null,
    //           description: null, pattern: null, kill_chain_phases: null, created_by_ref: null,
    //           type: null, valid_from: null, labels: null, modified: null, created: null,
    //           metaProperties: null, id: 'gogogadget'
    //         },
    //       questions: [{ name: 'eringobragh', score: 'L' }, { name: 'gobragherin', score: 'M' }, { name: 'bragheringo', score: 'S' }]
    //     },
    //     {
    //       stix:
    //         {
    //           version: null, external_references: null, granular_markings: null, name: null,
    //           description: null, pattern: null, kill_chain_phases: null, created_by_ref: null,
    //           type: null, valid_from: null, labels: null, modified: null, created: null,
    //           metaProperties: null, id: 'gogadgetgo'
    //         },
    //       questions: [{ name: 'eringobragh', score: 'N/A' }, { name: 'gobragherin', score: 'L' }, { name: 'bragheringo', score: 'M' }]
    //     },
    //     {
    //       stix:
    //         {
    //           version: null, external_references: null, granular_markings: null, name: null,
    //           description: null, pattern: null, kill_chain_phases: null, created_by_ref: null,
    //           type: null, valid_from: null, labels: null, modified: null, created: null,
    //           metaProperties: null, id: 'gadgetgogo'
    //         },
    //       questions: [{ name: 'eringobragh', score: 'N/A' }, { name: 'gobragherin', score: 'N/A' }, { name: 'bragheringo', score: 'N/A' }]
    //     }],
    //   created: null,
    //   description: null, modified: null, name: null, type: null, version: null,
    //   external_references: null, granular_markings: null, pattern: null, kill_chain_phases: null,
    //   created_by_ref: null, valid_from: null, labels: null, metaProperties: null
    // }
    // this.type = null;
    // this.links = null;
  }
}

describe('WizardComponent', () => {
  // let component: WizardComponent;
  // let fixture: ComponentFixture<WizardComponent>;

  // beforeEach(async(() => {
  //   const matModules = [
  //     MatButtonModule,
  //     MatCardModule,
  //     MatDatepickerModule,
  //     MatDialogModule,
  //     MatExpansionModule,
  //     MatSnackBarModule,
  //     MatSelectModule,
  //     MatInputModule,
  //     MatProgressBarModule
  //   ];

  //   TestBed.configureTestingModule({
  //     declarations: [
  //       CapabilityComponent,
  //       CapabilitySelectorComponent,
  //       CategoryComponent,
  //       WizardComponent,
  //     ],
  //     imports: [
  //       NoopAnimationsModule,
  //       HttpClientModule,
  //       ...matModules,
  //       ComponentModule,
  //       ChartsModule,
  //       PipesModule,
  //       GlobalModule,
  //       FormsModule,
  //       RouterTestingModule,
  //       ReactiveFormsModule,
  //       StoreModule.forRoot({
  //         ...fromRoot.reducers,
  //         'baseline': combineReducers(baselineReducer),
  //       }),
  //     ],
  //     providers: [GenericApi],
  //   })
  //     .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(WizardComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // TODO: Once categories are defined, include tests 
  //       check that sidebar has entries for each category
  // it('should know the first side panel with data', () => {
  //   expect(component).toBeTruthy();
  //   const firstPanel = component.determineFirstOpenSidePanel();
  //   expect(firstPanel).toBeDefined();
  //   expect(firstPanel).toEqual('categories');
  // });

  // it('should know the next side panel with data, case 1', () => {
  //   const indicators = [new Indicator()];
  //   const coa = [new CourseOfAction()];
  //   component.indicators = indicators;
  //   component.mitigations = coa;
  //   component.openedSidePanel = 'indicators';
  //   expect(component).toBeTruthy();
  //   const nextPanel = component.determineNextSidePanel();
  //   expect(nextPanel).toBeDefined();
  //   expect(nextPanel).toEqual('mitigations');
  // });

  // it('should know the next side panel with data, case 2', () => {
  //   const indicators = [new Indicator()];
  //   const sensors = [new Sensor()];
  //   component.indicators = indicators;
  //   component.sensors = sensors;
  //   component.openedSidePanel = 'indicators';
  //   expect(component).toBeTruthy();
  //   const nextPanel = component.determineNextSidePanel();
  //   expect(nextPanel).toBeDefined();
  //   expect(nextPanel).toEqual('sensors');
  // });


  // TODO: And check for capability sub-nodes in the sidebar
  //       under each category

  // TODO: Once we have capabilities have been scored, test them

  // TODO: As wizard panels are introduced, verify buttons on each panel
  // it('should have an appropriate button label when a heading on the left nav bar is opened', () => {
  //   component.buttonLabel = 'SAVE';
  //   component.onOpenSidePanel(null);
  //   expect(component.buttonLabel).toEqual('CONTINUE');

  //   component.buttonLabel = 'SAVE';
  //   component.onOpenSidePanel('sensors');
  //   expect(component.buttonLabel).toEqual('CONTINUE');

  //   component.buttonLabel = 'SAVE';
  //   component.onOpenSidePanel('summary');
  //   component.showSummarySavePage();
  //   expect(component.buttonLabel).toEqual('SAVE');
  // });

  // TODO: Add tests for the summary page once it is available

  // TODO: Add more generic tests once we have a working wizard
  // it('should add each element in a risk array to current value at corresponding location in a total risk array', () => {
  //   expect(component.riskReduction(null, null)).toEqual([]);
  // });

  // it('should generate summary data for a single baseline type', () => {
  //   expect(component.generateSummaryChartDataForAnAssessmentType(null)).toEqual([]);

  //   expect(component.generateSummaryChartDataForAnAssessmentType([])).toEqual([]);

  //   expect(component.generateSummaryChartDataForAnAssessmentType([{}])).toEqual([]);

  //   expect(component.generateSummaryChartDataForAnAssessmentType([{ baselines: null }])).toEqual([]);

  //   expect(component.generateSummaryChartDataForAnAssessmentType([{ baselines: [] }])).toEqual([]);

  //   expect(component.generateSummaryChartDataForAnAssessmentType([{ baselines: [{ id: null }] }])).toEqual([]);

  //   expect(component.generateSummaryChartDataForAnAssessmentType([{ baselines: [{ id: null }, { id: null }, { id: null }] }, { baselines: [{ id: null }] }])).toEqual([]);
  // });

  // TODO: Create tests which work the structure of the baseline
  // it('should create baseline groups robustly', () => {
  //   let baseline = {
  //     version: null, external_references: null, granular_markings: null, name: null, description: null, pattern: null, kill_chain_phases: null,
  //     created_by_ref: null, type: null, valid_from: null, labels: null, modified: null, created: null, metaProperties: null
  //   };
  //   expect(component.createAssessmentGroups(null)).toEqual([]);
  //   expect(component.createAssessmentGroups([])).toEqual([]);
  //   expect(component.createAssessmentGroups([baseline])).toEqual([]);
  //   baseline.metaProperties = {};
  //   expect(component.createAssessmentGroups([baseline])).toEqual([]);
  //   baseline.metaProperties = { groupings: null };
  //   expect(component.createAssessmentGroups([baseline])).toEqual([]);
  //   baseline.metaProperties = { groupings: [] };
  //   expect(component.createAssessmentGroups([baseline])).toEqual([]);
  //   baseline.metaProperties = { groupings: [{ groupingValue: 'group1' }] };
  //   expect(component.createAssessmentGroups([baseline]).length).toEqual(1);
  //   baseline.metaProperties = { groupings: [{ groupingValue: 'group1' }, { groupingValue: 'group2' }] };
  //   expect(component.createAssessmentGroups([baseline]).length).toEqual(2);
  // });

  // it('should collect model baselines robustly', () => {
  //   component.model = null;
  //   spyOn(console, 'warn');
  //   let baseline: any = null;
  //   component.collectModelAssessments(baseline);
  //   expect(console.warn).toHaveBeenCalledTimes(1);

  //   component.model = { attributes: null, type: null, relationships: null, links: null };
  //   component.collectModelAssessments(baseline);
  //   expect(console.warn).toHaveBeenCalledTimes(2);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects = null;
  //   component.collectModelAssessments(baseline);
  //   expect(console.warn).toHaveBeenCalledTimes(3);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects = [];
  //   component.collectModelAssessments(baseline);
  //   expect(console.warn).toHaveBeenCalledTimes(4);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects = [{ risk: null, questions: null }];
  //   component.collectModelAssessments(baseline);
  //   expect(console.warn).toHaveBeenCalledTimes(5);

  //   component.model = new MockModel();
  //   baseline = {};
  //   component.collectModelAssessments(baseline);
  //   expect(console.warn).toHaveBeenCalledTimes(6);

  //   component.model = new MockModel();
  //   baseline = { id: null };
  //   component.collectModelAssessments(baseline);
  //   expect(console.warn).toHaveBeenCalledTimes(7);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects = [{ stix: null, risk: null, questions: null }];
  //   baseline = { id: 'happyjack' };
  //   component.collectModelAssessments(baseline);
  //   expect(console.warn).toHaveBeenCalledTimes(8);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects[0] = {
  //     stix: {
  //       version: null, external_references: null, granular_markings: null, name: null, description: null,
  //       pattern: null, kill_chain_phases: null, created_by_ref: null, type: null, valid_from: null, labels: null,
  //       modified: null, created: null, metaProperties: null
  //     }, risk: null, questions: null
  //   };
  //   component.collectModelAssessments(baseline);
  //   expect(console.warn).toHaveBeenCalledTimes(9);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects[0] = {
  //     stix: {
  //       version: null, external_references: null, granular_markings: null, name: null, description: null,
  //       pattern: null, kill_chain_phases: null, created_by_ref: null, type: null, valid_from: null, labels: null,
  //       modified: null, created: null, metaProperties: null, id: null
  //     }, risk: null, questions: null
  //   };
  //   component.collectModelAssessments(baseline);
  //   expect(console.warn).toHaveBeenCalledTimes(10);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects[0].risk = null;
  //   component.model.attributes.baseline_objects[0].questions = null;
  //   component.collectModelAssessments(baseline);
  //   expect(baseline.risk).toEqual(0);
  //   expect(console.warn).toHaveBeenCalledTimes(10);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects[0].questions = null;
  //   component.collectModelAssessments(baseline);
  //   expect(baseline.risk).toEqual(.25);

  //   component.model = new MockModel();
  //   baseline = { id: 'happyjack', measurements: null };
  //   component.collectModelAssessments(baseline);
  //   expect(baseline.measurements).toEqual(null);

  //   component.model = new MockModel();
  //   baseline = { id: 'happyjack', measurements: [] };
  //   component.collectModelAssessments(baseline);
  //   expect(baseline.measurements).toEqual([]);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects[0].questions = null;
  //   baseline = { id: 'happyjack', measurements: [{}] };
  //   component.collectModelAssessments(baseline);
  //   expect(baseline.measurements).toEqual([{}]);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects[0].questions = [{ name: null, risk: null, options: null, selected_value: null }];
  //   component.collectModelAssessments(baseline);
  //   expect(baseline.measurements).toEqual([{}]);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects[0].questions = [{ name: null, risk: null, options: null, selected_value: null }];
  //   baseline = { id: 'happyjack', measurements: [{ name: null }] };
  //   component.collectModelAssessments(baseline);
  //   expect(baseline.measurements[0].name).toEqual(null);
  //   expect(baseline.measurements[0].risk).toEqual(0);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects[0].questions = [{ name: 'sandychapsticks', risk: null, options: null, selected_value: null }];
  //   baseline = { id: 'happyjack', measurements: [{ name: null }] };
  //   component.collectModelAssessments(baseline);
  //   expect(baseline.measurements[0].name).toEqual(null);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects[0].questions = [{ name: 'sandychapsticks', risk: null, options: null, selected_value: null }];
  //   baseline = { id: 'happyjack', measurements: [{ name: 'applesauce' }] };
  //   component.collectModelAssessments(baseline);
  //   expect(baseline.measurements[0].name).toEqual('applesauce');
  //   expect(baseline.measurements[0].risk).toBe(undefined);

  //   component.model = new MockModel();
  //   component.model.attributes.baseline_objects[0].questions = [{ name: 'sandychapsticks', risk: null, options: null, selected_value: null }];
  //   baseline = { id: 'happyjack', measurements: [{ name: 'sandychapsticks' }] };
  //   component.collectModelAssessments(baseline);
  //   expect(baseline.measurements[0].name).toEqual('sandychapsticks');
  //   expect(baseline.measurements[0].risk).toBe(0);

  //   component.model = new MockModel();
  //   baseline = { id: 'happyjack', measurements: [{ name: 'sandychapsticks' }] };
  //   component.collectModelAssessments(baseline);
  //   expect(baseline.measurements[0].risk).toBe(3);

  // });

  // it('should update the summary chart appropriately', () => {
  //   component.model = null;
  //   component.summaryDoughnutChartData = null;
  //   component.mitigations = null;
  //   component.indicators = null;
  //   component.sensors = null;
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([]);

  //   component.summaryDoughnutChartData = [{ data: null, backgroundColor: null, hoverBackgroundColor: null }];
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([]);

  //   component.summaryDoughnutChartData = [{ data: [1, 3, 5], backgroundColor: null, hoverBackgroundColor: null }];
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([1, 3, 5]);

  //   component.mitigations = [];
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([1, 3, 5]);

  //   component.mitigations = [{
  //     metaProperties: null, created: null, modified: null, labels: null, valid_from: null, type: null, created_by_ref: null,
  //     kill_chain_phases: null, pattern: null, description: null, version: null, external_references: null,
  //     granular_markings: null, name: null
  //   }];
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([1, 3, 5]);

  //   component.mitigations[0].metaProperties = { groupings: [{ groupingValue: 'group1' }] };
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([1, 0]);

  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([1, 0]);

  //   component.model = new MockModel();
  //   component.mitigations[0].id = null;
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([1, 0]);

  //   component.mitigations = [{
  //     metaProperties: null, created: null, modified: null, labels: null, valid_from: null, type: null, created_by_ref: null,
  //     kill_chain_phases: null, pattern: null, description: null, version: null, external_references: null,
  //     granular_markings: null, name: null, id: null
  //   }, {
  //     metaProperties: null, created: null, modified: null, labels: null, valid_from: null, type: null, created_by_ref: null,
  //     kill_chain_phases: null, pattern: null, description: null, version: null, external_references: null,
  //     granular_markings: null, name: null, id: null
  //   }, {
  //     metaProperties: null, created: null, modified: null, labels: null, valid_from: null, type: null, created_by_ref: null,
  //     kill_chain_phases: null, pattern: null, description: null, version: null, external_references: null,
  //     granular_markings: null, name: null, id: null
  //   }];
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([1, 0]);

  //   component.mitigations = [{
  //     metaProperties: null, created: null, modified: null, labels: null, valid_from: null, type: null, created_by_ref: null,
  //     kill_chain_phases: null, pattern: null, description: null, version: null, external_references: null,
  //     granular_markings: null, name: null, id: 'happyjack',
  //   }];
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([1, 0]);

  //   component.mitigations[0].metaProperties = { groupings: [{ groupingValue: 'group1' }] };
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([.25, .75]);

  //   component.indicators = [{
  //     metaProperties: { groupings: [{ groupingValue: 'group1' }] }, created: null, modified: null, labels: null, valid_from: null, type: null, created_by_ref: null,
  //     kill_chain_phases: null, pattern: null, description: null, version: null, external_references: null,
  //     granular_markings: null, name: null, id: 'happyjack', pattern_lang: null, valid_until: null, formatDate: null
  //   }];
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([.25, .75]);

  //   component.sensors = [{
  //     metaProperties: { groupings: [{ groupingValue: 'group1' }] }, created: null, modified: null, labels: null, valid_from: null, type: null, created_by_ref: null,
  //     kill_chain_phases: null, pattern: null, description: null, version: null, external_references: null,
  //     granular_markings: null, name: null, id: 'happyjack',
  //   }];
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([.25, .75]);

  //   component.indicators[0].id = 'bellystaple';
  //   component.sensors[0].id = 'jumpyflashpan';
  //   component.model.attributes.baseline_objects.push({
  //     stix:
  //       {
  //         version: null, external_references: null, granular_markings: null, name: null,
  //         description: null, pattern: null, kill_chain_phases: null, created_by_ref: null,
  //         type: null, valid_from: null, labels: null, modified: null, created: null,
  //         metaProperties: null, id: 'bellystaple'
  //       },
  //     risk: 0, questions: [{ name: 'sandychapsticks', risk: 3, options: null, selected_value: null }]
  //   });
  //   component.model.attributes.baseline_objects.push({
  //     stix:
  //       {
  //         version: null, external_references: null, granular_markings: null, name: null,
  //         description: null, pattern: null, kill_chain_phases: null, created_by_ref: null,
  //         type: null, valid_from: null, labels: null, modified: null, created: null,
  //         metaProperties: null, id: 'jumpyflashpan'
  //       },
  //     risk: .75, questions: [{ name: 'sandychapsticks', risk: 3, options: null, selected_value: null }]
  //   });
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([(.25 + 0 + .75) / 3, (.75 + 1 + .25) / 3]);

  //   component.model.attributes.baseline_objects[1].risk = .25;
  //   component.model.attributes.baseline_objects[2].risk = .25;
  //   component.updateSummaryChart();
  //   expect(component.summaryDoughnutChartData[0].data).toEqual([(.25 + .25 + .25) / 3, (.75 + .75 + .75) / 3]);
  // });

  // TODO: Test data structures
  // it(`can load existing data`, () => {
  //   const meta: Partial<AssessmentMeta> = {
  //     includesIndicators: false,
  //     includesMitigations: false,
  //     includesSensors: false,
  //   };

  //   const id = '0123456789abcdef', rollup = 'fedcba9876543210', name = 'Test Assessment';
  //   const desc = 'This is a test. This is only a test.';
  //   const time = Date.now().toString();

  //   const indicators = new Assessment();
  //   indicators.id = id + '-1';
  //   indicators.type = StixLabelEnum.ASSESSMENT;
  //   indicators.metaProperties = { rollupId: rollup };
  //   indicators.name = name;
  //   indicators.description = desc;
  //   indicators.created = indicators.modified = time;
  //   indicators.baseline_objects.push({ risk: -1, stix: { type: 'indicator' } } as AssessmentObject<Stix>);

  //   const mitigations = new Assessment();
  //   mitigations.id = id + '-2';
  //   mitigations.type = StixLabelEnum.ASSESSMENT;
  //   mitigations.metaProperties = { rollupId: rollup };
  //   mitigations.name = name;
  //   mitigations.description = desc;
  //   mitigations.created = indicators.modified = time;
  //   mitigations.baseline_objects.push({ risk: -1, stix: { type: 'course-of-action' } } as AssessmentObject<Stix>);

  //   const sensors = new Assessment();
  //   sensors.id = id + '-3';
  //   sensors.type = StixLabelEnum.ASSESSMENT;
  //   sensors.metaProperties = { rollupId: rollup };
  //   sensors.name = name;
  //   sensors.description = desc;
  //   sensors.created = indicators.modified = time;
  //   sensors.baseline_objects.push({ risk: -1, stix: { type: 'x-unfetter-sensor' } } as AssessmentObject<Stix>);

  //   component.loadAssessments('0123456789abcdef', [indicators, mitigations, sensors], meta);

  //   expect(meta.title).toEqual(name);
  //   expect(meta.description).toEqual(desc);
  //   expect(meta.includesIndicators).toBeTruthy();
  //   expect(meta.includesMitigations).toBeTruthy();
  //   expect(meta.includesSensors).toBeTruthy();
  //   expect(component.model.attributes.baseline_objects.length).toEqual(3);
  //   expect(component.model.relationships.indicators).toEqual(indicators);
  //   expect(component.model.relationships.mitigations).toEqual(mitigations);
  //   expect(component.model.relationships.sensors).toEqual(sensors);
  // });

});
