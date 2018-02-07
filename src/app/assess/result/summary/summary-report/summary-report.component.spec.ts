import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';

import { SummaryReportComponent } from './summary-report.component';
import { SummaryCalculationService } from '../summary-calculation.service';

describe('SummaryReportComponent', () => {
  let component: SummaryReportComponent;
  let fixture: ComponentFixture<SummaryReportComponent>;

  const serviceMock = {weakness: 'weeeeeeeak', getRiskText: string => 'risk'};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SummaryReportComponent],
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
});
