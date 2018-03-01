import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ChartsModule } from 'ng2-charts';

import { AssessmentChartComponent } from './assessment-chart.component';
import { SummaryCalculationService } from '../../summary-calculation.service';

describe('AssessmentChartComponent', () => {
  let component: AssessmentChartComponent;
  let fixture: ComponentFixture<AssessmentChartComponent>;

  let serviceMock;

  beforeEach(async(() => {
    serviceMock = { barColors: ['color'], assessmentsGroupingFiltered: { a: 'be' }, assessmentsGroupingTotal: { a: 'be' } };

    TestBed.configureTestingModule({

      declarations: [AssessmentChartComponent],
      imports: [ChartsModule],
      providers: [{
        provide: SummaryCalculationService,
        useValue: serviceMock
      }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render a chart', () => {
    let service = TestBed.get(SummaryCalculationService);
    let temp = service.assessmentsGroupingFiltered;
    service.assessmentsGroupingFiltered = null;
    expect(component.renderChart()).toBeFalsy();
    service.assessmentsGroupingFiltered = temp;

    service.assessmentsGroupingTotal = null;
    expect(component.renderChart()).toBeFalsy();
  });

  it('should create a percentage string', () => {
    expect(component.getPercentageString(null, null)).toBe('0%');
    expect(component.getPercentageString(null, {})).toBe('0%');
    expect(component.getPercentageString({}, {})).toBe('0%');
    expect(component.getPercentageString({}, { datasets: null })).toBe('0%');
    expect(component.getPercentageString({}, { datasets: [] })).toBe('0%');
    expect(component.getPercentageString({ datasetIndex: null }, { datasets: [] })).toBe('0%');
    expect(component.getPercentageString({ datasetIndex: 0 }, { datasets: [] })).toBe('0%');
    expect(component.getPercentageString({ datasetIndex: 0 }, { datasets: [{ data: ['a'] }] })).toBe('0%');
    expect(component.getPercentageString({ datasetIndex: 0, index: null }, { datasets: [{ data: ['a'] }] })).toBe('0%');
    expect(component.getPercentageString({ datasetIndex: 0, index: 'a' }, { datasets: [{ data: ['a'] }] })).toBe('0%');
    expect(component.getPercentageString({ datasetIndex: 0, index: 0 }, { datasets: [{ data: ['a'] }] })).toBe('0%');
    expect(component.getPercentageString({ datasetIndex: 0, index: 0 }, { datasets: [{ data: [0] }] })).toBe('0%');
    expect(component.getPercentageString({ datasetIndex: 0, index: 0 }, { datasets: [{ data: [1] }] })).toBe('1%');
    expect(component.getPercentageString({ datasetIndex: null, index: 0 }, { datasets: [{ data: [1] }] })).toBe('0%');
    expect(component.getPercentageString({ datasetIndex: 1, index: 0 }, { datasets: [{ data: [1] }] })).toBe('0%');
    expect(component.getPercentageString({ datasetIndex: 1, index: 0 }, { datasets: [{ data: [80] }, { data: [1] }] })).toBe('1%');
    expect(component.getPercentageString({ datasetIndex: 1, index: 0 }, { datasets: [{ data: [1] }, { data: [80] }] })).toBe('80%');
    expect(component.getPercentageString({ datasetIndex: 1, index: 0 }, { datasets: [{ data: [1] }, { data: [null] }] })).toBe('0%');
    expect(component.getPercentageString({ datasetIndex: 1, index: 1 }, { datasets: [{ data: [1] }, { data: [null, 80] }] })).toBe('80%');
  });

  it('should capitalize all words except for and, or, and the', () => {
    expect(component.capitalizeWithExceptions(null, null, null)).toBe(null);
    expect(component.capitalizeWithExceptions('and', null, null)).toBe('and');
    expect(component.capitalizeWithExceptions('', null, null)).toBe('');
    expect(component.capitalizeWithExceptions('apple', null, null)).toBe('apple');
    expect(component.capitalizeWithExceptions(null, null, 'apple')).toBe(null);
    expect(component.capitalizeWithExceptions(null, 'a', null)).toBe('A');
    expect(component.capitalizeWithExceptions('the', 'a', null)).toBe('the');
    expect(component.capitalizeWithExceptions(null, 'a', 'pple')).toBe('Apple');
    expect(component.capitalizeWithExceptions('or', 'a', 'pple')).toBe('or');
    expect(component.capitalizeWithExceptions('apple', 'a', 'pple')).toBe('Apple');
  });

  it('should calculate data for the chart', () => {
    expect(component.calculateData(null, null)).toBe(0);
    expect(component.calculateData(null, 1)).toBe(0);
    expect(component.calculateData(1, null)).toBe(0);
    expect(component.calculateData(1, 1)).toBe(100);
    expect(component.calculateData(5, 10)).toBe(50);
  });

  it('should convert labels to formatted text for display', () => {
    expect(component.convertLabels(null, null)).toEqual([]);
    expect(component.convertLabels(null, false)).toEqual([]);
    expect(component.convertLabels(['apple-jacks'], false)).toEqual([]);
    expect(component.convertLabels(['apple-jacks'], true)).toEqual(['Apple Jacks']);
    expect(component.convertLabels(['apple-jacks', null, ''], true)).toEqual(['Apple Jacks', '', '']);
  });

});
