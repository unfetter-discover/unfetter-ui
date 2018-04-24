import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ChartsModule } from 'ng2-charts';

import { BaselineChartComponent } from './baseline-chart.component';
import { SummaryCalculationService } from '../../summary-calculation.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('BaselineChartComponent', () => {
  let component: BaselineChartComponent;
  let fixture: ComponentFixture<BaselineChartComponent>;

  let serviceMock;

  beforeEach(async(() => {
    serviceMock = {
      barColors: ['color'], baselinesGroupingFiltered: { a: 'be' }, baselinesGroupingTotal: { a: 'be' }, riskSub: new BehaviorSubject<number>(null),
      convertLabels: (unconvertedLabels: string[]) => { return unconvertedLabels; }, renderLegend: () => 'legend here',
    };

    TestBed.configureTestingModule({

      declarations: [BaselineChartComponent],
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
    fixture = TestBed.createComponent(BaselineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render a chart', () => {
    let service = TestBed.get(SummaryCalculationService);
    let temp = service.baselinesGroupingFiltered;
    service.baselinesGroupingFiltered = null;
    expect(component.renderChart()).toBeFalsy();
    service.baselinesGroupingFiltered = temp;

    service.baselinesGroupingTotal = null;
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

  it('should calculate data for the chart', () => {
    expect(component.calculateData(null, null)).toBe(0);
    expect(component.calculateData(null, 1)).toBe(0);
    expect(component.calculateData(1, null)).toBe(0);
    expect(component.calculateData(1, 1)).toBe(100);
    expect(component.calculateData(5, 10)).toBe(50);
  });

  it('should convert labels to formatted text for display', () => {
    expect(component.convertLabels(['apple-jacks'], false)).toEqual([]);
    expect(component.convertLabels(['apple-jacks'], true)).toEqual(['apple-jacks']); // mock value;this is truly tested in the calculate service
  });

});
