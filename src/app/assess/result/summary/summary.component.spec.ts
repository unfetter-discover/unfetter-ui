import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { AssessmentSummaryService } from '../../services/assessment-summary.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import { SummaryComponent } from './summary.component';
import { summaryReducer } from '../store/summary.reducers';
import { MatDialogModule } from '@angular/material';
import { AssessService } from '../../services/assess.service';
import { SummaryCalculationService } from './summary-calculation.service';

fdescribe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  // TODO verify this mocking strategy works
  let mockReducer: ActionReducerMap<any> = {
    summary: summaryReducer
  };

  const mockService = {};

  beforeEach(async(() => {
    const matModules = [
      MatDialogModule,
    ];

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SummaryComponent],

      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ...matModules,
        StoreModule.forRoot(mockReducer),
      ],
      providers: [GenericApi, AssessService,
        {
          provide: SummaryCalculationService,
          use: mockService
        }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
