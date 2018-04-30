import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { SummaryCalculationService } from '../../summary-calculation.service';
import { SophisticationBreakdownComponent } from './sophistication-breakdown.component';

@Component({
  template: '<sophistication-breakdown [assessedAttackPatterns]="assessedAttackPatternCountBySophisticationLevel"' +
    '[allAttackPatterns]="totalAttackPatternCountBySophisticationLevel"></sophistication-breakdown>'
})
class TestHostComponent {
  assessedAttackPatternCountBySophisticationLevel = { 0: 16, 1: 13, 2: 16, 3: 2 };
  totalAttackPatternCountBySophisticationLevel = { 0: 29, 1: 30, 2: 34, 3: 4 };
}

describe('SophisticationBreakdownComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;

  const serviceMock = { barColors: ['color'], sophisticationNumberToWord: number => 'word' };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SophisticationBreakdownComponent, TestHostComponent],
      imports: [ChartsModule],
      providers: [
        {
          provide: SummaryCalculationService,
          useValue: serviceMock
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should generate appropriate values', () => {
    let component = hostFixture.debugElement.query(By.directive(SophisticationBreakdownComponent)).componentInstance;
    // how many assessed phases for first sophistication level
    expect(component.barChartData[0].data[0]).toBe(16);

    // how many unassessed phases for first sophistication level (total - assessed)
    expect(component.barChartData[1].data[0]).toBe(29 - 16);

    component.assessedAttackPatterns = { 0: 1, 3: 2 };
    component.allAttackPatterns = { 0: 3, 1: 3, 2: 5, 3: 6 }
    component.calculateData();
    expect(component.barChartData[1].data[1]).toBe(3 - 0);

    component.assessedAttackPatterns = { 1: 2 };
    component.allAttackPatterns = { 0: 29, 1: 30, 2: 34, 3: 4 }
    component.calculateData();
    expect(component.barChartData[1].data[1]).toBe(30 - 2);

  });

  it('should generate a relevant tooltip', () => {
    expect(SophisticationBreakdownComponent.generateTooltipLabel(null, null)).toBe(0);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({}, null)).toBe(0);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({}, {})).toBe(0);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({ datasetIndex: null }, {})).toBe(0);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({ datasetIndex: '' }, {})).toBe(0);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({ datasetIndex: 0 }, {})).toBe(0);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({ datasetIndex: 0 }, { datasets: null })).toBe(0);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({ datasetIndex: 0 }, { datasets: [] })).toBe(0);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({ datasetIndex: 0 }, { datasets: [{ data: null }] })).toBe(0);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({ datasetIndex: 0, index: 0 }, { datasets: [{ data: null }] })).toBe(0);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({ datasetIndex: 0, index: 0 }, { datasets: [{ data: [] }] })).toBe(0);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({ datasetIndex: 0, index: 0 }, { datasets: [{ data: [null] }] })).toBe(0);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({ datasetIndex: 0, index: 0 }, { datasets: [{ data: [0] }] })).toBe(0);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({ datasetIndex: 0, index: 0 }, { datasets: [{ data: [1] }] })).toBe(1);
    expect(SophisticationBreakdownComponent.generateTooltipLabel({ datasetIndex: 2, index: 2 }, { datasets: [{ data: null }, { data: null }, { data: [1, 2, 3] }] })).toBe(3);
  })

});
