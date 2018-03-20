import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatExpansionModule, MatProgressBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from 'app/root-store/app.reducers';
import { assessmentReducer } from '../store/assess.reducers';

import { WizardComponent } from './wizard.component';
import { ComponentModule } from '../../components/component.module';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../../pipes/pipes.module';
import { GlobalModule } from '../../global/global.module';
import { GenericApi } from '../../core/services/genericapi.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Indicator } from '../../models/stix/indicator';
import { Observable } from 'rxjs/Observable';
import { CourseOfAction } from '../../models/stix/course-of-action';
import { Sensor } from '../../models/unfetter/sensor';
import { AssessmentMeta } from '../../models/assess/assessment-meta';
import { Assessment } from '../../models/assess/assessment';
import { AssessmentObject } from '../../models/assess/assessment-object';
import { Stix } from '../../models/stix/stix';
import { StixLabelEnum } from '../../models/stix/stix-label.enum';

describe('WizardComponent', () => {
  let component: WizardComponent;
  let fixture: ComponentFixture<WizardComponent>;

  beforeEach(async(() => {
    const matModules = [
      MatButtonModule,
      MatCardModule,
      MatDatepickerModule,
      MatDialogModule,
      MatExpansionModule,
      MatSnackBarModule,
      MatSelectModule,
      MatInputModule,
      MatProgressBarModule
    ];

    TestBed.configureTestingModule({
      declarations: [WizardComponent],
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        ...matModules,
        ComponentModule,
        ChartsModule,
        PipesModule,
        GlobalModule,
        FormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'assessment': combineReducers(assessmentReducer)
        }),
      ],
      providers: [GenericApi],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should know the first side panel with data, if it is indicators', () => {
    const indicators = [new Indicator()];
    const coa = [new CourseOfAction()];
    component.indicators = indicators;
    component.mitigations = coa;
    expect(component).toBeTruthy();
    const firstPanel = component.determineFirstOpenSidePanel();
    expect(firstPanel).toBeDefined();
    expect(firstPanel).toEqual('indicators');
  });

  it('should know the first side panel with data, if it is mitigations', () => {
    const coa = [new CourseOfAction()];
    component.mitigations = coa;
    expect(component).toBeTruthy();
    const firstPanel = component.determineFirstOpenSidePanel();
    expect(firstPanel).toBeDefined();
    expect(firstPanel).toEqual('mitigations');
  });

  it('should know the next side panel with data, case 1', () => {
    const indicators = [new Indicator()];
    const coa = [new CourseOfAction()];
    component.indicators = indicators;
    component.mitigations = coa;
    component.openedSidePanel = 'indicators';
    expect(component).toBeTruthy();
    const nextPanel = component.determineNextSidePanel();
    expect(nextPanel).toBeDefined();
    expect(nextPanel).toEqual('mitigations');
  });

  it('should know the next side panel with data, case 2', () => {
    const indicators = [new Indicator()];
    const sensors = [new Sensor()];
    component.indicators = indicators;
    component.sensors = sensors;
    component.openedSidePanel = 'indicators';
    expect(component).toBeTruthy();
    const nextPanel = component.determineNextSidePanel();
    expect(nextPanel).toBeDefined();
    expect(nextPanel).toEqual('sensors');
  });

  it('should know the next side panel with data, case 3', () => {
    const indicators = [new Indicator()];
    const sensors = [new Sensor()];
    component.indicators = indicators;
    component.sensors = sensors;
    component.openedSidePanel = 'sensors';
    expect(component).toBeTruthy();
    const nextPanel = component.determineNextSidePanel();
    expect(nextPanel).toBeDefined();
    expect(nextPanel).toEqual('summary');
  });

  it('should calculate risk robustly', () => {
    component.currentAssessmentGroup = null;
    expect(component.calculateGroupRisk()).toBe(0);

    component.currentAssessmentGroup = {};
    expect(component.calculateGroupRisk()).toBe(0);

    component.currentAssessmentGroup = { assessments: null };
    expect(component.calculateGroupRisk()).toBe(0);

    component.currentAssessmentGroup = { assessments: [] };
    expect(component.calculateGroupRisk()).toBe(0);

    component.currentAssessmentGroup = { assessments: [{}] };
    expect(component.calculateGroupRisk()).toBe(0);

    component.currentAssessmentGroup = { assessments: [{ risk: null }] };
    expect(component.calculateGroupRisk()).toBe(0);

    component.currentAssessmentGroup = { assessments: [{ risk: 0 }] };
    expect(component.calculateGroupRisk()).toBe(0);

    component.currentAssessmentGroup = { assessments: [{ risk: 1 }] };
    expect(component.calculateGroupRisk()).toBe(1);

    component.currentAssessmentGroup = { assessments: [{ risk: 1 }, { risk: 1 }] };
    expect(component.calculateGroupRisk()).toBe(1);

    component.currentAssessmentGroup = { assessments: [{ risk: 1 }, { risk: .5 }] };
    expect(component.calculateGroupRisk()).toBe(.75);

  });

  it('should have an appropriate button label when a heading on the left nav bar is opened', () => {
    component.buttonLabel = 'SAVE';
    component.onOpenSidePanel(null);
    expect(component.buttonLabel).toEqual('CONTINUE');

    component.buttonLabel = 'SAVE';
    component.onOpenSidePanel('sensors');
    expect(component.buttonLabel).toEqual('CONTINUE');

    component.buttonLabel = 'SAVE';
    component.onOpenSidePanel('summary');
    component.showSummarySavePage();
    expect(component.buttonLabel).toEqual('SAVE');
  });

  it('should have a summary rollup chart when on the summary page', () => {
    component.onOpenSidePanel('summary');
    component.showSummarySavePage();
    fixture.detectChanges();
    let title = fixture.debugElement.query(By.css('#summary-chart-title'));
    let chart = fixture.debugElement.query(By.css('#summary-chart'));
    expect(title).toBeTruthy();
    expect(chart).toBeTruthy();

    component.onOpenSidePanel('sensors');
    fixture.detectChanges();
    title = fixture.debugElement.query(By.css('#summary-chart-title'));
    expect(title).toBeFalsy();

  });

  fit('should add each element in a risk array to current value at corresponding location in a total risk array', () => {
    expect(component.riskReduction(null, null)).toEqual([]);
  });

  fit('should update the summary chart appropriately', () => {
    component.summaryDoughnutChartData = null;
    component.setAssessmentGroups(null);
    component.updateSummaryChart();
    expect(component.summaryDoughnutChartData[0].data).toEqual([]);

    component.summaryDoughnutChartData = [{data: null, backgroundColor: null, hoverBackgroundColor: null}];
    component.updateSummaryChart();
    expect(component.summaryDoughnutChartData[0].data).toEqual([]);

    component.summaryDoughnutChartData = [{data: [1, 3, 5], backgroundColor: null, hoverBackgroundColor: null}];
    component.updateSummaryChart();
    expect(component.summaryDoughnutChartData[0].data).toEqual([1, 3, 5]);

    component.setAssessmentGroups([]);
    component.updateSummaryChart();
    expect(component.summaryDoughnutChartData[0].data).toEqual([1, 3, 5]);

    component.setAssessmentGroups([{}]);
    component.updateSummaryChart();
    expect(component.summaryDoughnutChartData[0].data).toEqual([1, 3, 5]);

    component.setAssessmentGroups([{assessments: null}]);
    component.updateSummaryChart();
    expect(component.summaryDoughnutChartData[0].data).toEqual([1, 3, 5]);

    component.setAssessmentGroups([{assessments: []}]);
    component.updateSummaryChart();
    expect(component.summaryDoughnutChartData[0].data).toEqual([1, 3, 5]);
  });

  it(`can load existing data`, () => {
    const meta: Partial<AssessmentMeta> = {
      includesIndicators: false,
      includesMitigations: false,
      includesSensors: false,
    };

    const id = '0123456789abcdef', rollup = 'fedcba9876543210', name = 'Test Assessment';
    const desc = 'This is a test. This is only a test.';
    const time = Date.now().toString();

    const indicators = new Assessment();
    indicators.id = id + '-1';
    indicators.type = StixLabelEnum.ASSESSMENT;
    indicators.metaProperties = { rollupId: rollup };
    indicators.name = name;
    indicators.description = desc;
    indicators.created = indicators.modified = time;
    indicators.assessment_objects.push({ risk: -1, stix: { type: 'indicator' } } as AssessmentObject<Stix>);

    const mitigations = new Assessment();
    mitigations.id = id + '-2';
    mitigations.type = StixLabelEnum.ASSESSMENT;
    mitigations.metaProperties = { rollupId: rollup };
    mitigations.name = name;
    mitigations.description = desc;
    mitigations.created = indicators.modified = time;
    mitigations.assessment_objects.push({ risk: -1, stix: { type: 'course-of-action' } } as AssessmentObject<Stix>);

    const sensors = new Assessment();
    sensors.id = id + '-3';
    sensors.type = StixLabelEnum.ASSESSMENT;
    sensors.metaProperties = { rollupId: rollup };
    sensors.name = name;
    sensors.description = desc;
    sensors.created = indicators.modified = time;
    sensors.assessment_objects.push({ risk: -1, stix: { type: 'x-unfetter-sensor' } } as AssessmentObject<Stix>);

    component.loadAssessments('0123456789abcdef', [indicators, mitigations, sensors], meta);

    expect(meta.title).toEqual(name);
    expect(meta.description).toEqual(desc);
    expect(meta.includesIndicators).toBeTruthy();
    expect(meta.includesMitigations).toBeTruthy();
    expect(meta.includesSensors).toBeTruthy();
    expect(component.model.attributes.assessment_objects.length).toEqual(3);
    expect(component.model.relationships.indicators).toEqual(indicators);
    expect(component.model.relationships.mitigations).toEqual(mitigations);
    expect(component.model.relationships.sensors).toEqual(sensors);
  });

});
