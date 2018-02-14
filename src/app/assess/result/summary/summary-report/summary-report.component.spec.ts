import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';

import { CapitalizePipe } from '../../../../global/pipes/capitalize.pipe';
import { SummaryReportComponent } from './summary-report.component';
import { SummaryCalculationService } from '../summary-calculation.service';

fdescribe('SummaryReportComponent', () => {
  let component: SummaryReportComponent;
  let fixture: ComponentFixture<SummaryReportComponent>;

  const serviceMock = { weakness: 'weeeeeeeak', getRiskText: string => 'risk', calculateAvgRiskPerAssessedObject: number => .33,
                        summaryAggregation: { assessedAttackPatternCountBySophisicationLevel: {0: 16, 1: 13, 2: 16, 3: 2},
                        totalAttackPatternCountBySophisicationLevel: {0: 29, 1: 30, 2: 34, 3: 4} },
                        techniqueBreakdown: {},
                        isSummaryAggregationValid: boolean => true};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SummaryReportComponent, CapitalizePipe],
      imports: [MatTableModule],
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
    fixture = TestBed.createComponent(SummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format a risk value appropriately for the summary report component', () => {
    expect(component.formatRisk(null)).toBe('0.00');
    expect(component.formatRisk(undefined)).toBe('0.00');
    expect(component.formatRisk(3 / 0)).toBe('100.00');
  });

  it('should calculate average risk per object and format the result', () => {
    expect(component.calculateRisk(null)).toBe('0.00');
    expect(component.calculateRisk([{ risk: .33 }, { risk: .33 }, { risk: .33 }])).toBe('33.00');
  });
});
