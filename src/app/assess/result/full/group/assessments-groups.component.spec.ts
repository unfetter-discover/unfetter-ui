import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatDialogModule } from '@angular/material';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { Assessment } from '../../../../models/assess/assessment';
import { AssessAttackPatternMeta } from '../../../../models/assess/assess-attack-pattern-meta';
import { AssessAttackPatternMetaMockFactory } from '../../../../models/assess/assess-attack-pattern-meta.mock';
import { AssessGroupComponent } from './assessments-group.component';
import { AssessService } from '../../../services/assess.service';

import { FullAssessmentResultState, fullAssessmentResultReducer, genState } from '../../store/full-result.reducers';
import { GenericApi } from '../../../../core/services/genericapi.service';
import { GlobalModule } from '../../../../global/global.module';
import { Phase } from '../../../../models/assess/phase';
import { RiskByAttack } from '../../../../models/assess/risk-by-attack';
import { RiskByAttackPatternMockFactory } from '../../../../models/assess/risk-by-attack-pattern.mock';
import { SummaryCalculationService } from '../../summary/summary-calculation.service';

fdescribe('AssessGroupComponent', () => {
  let component: AssessGroupComponent;
  let fixture: ComponentFixture<AssessGroupComponent>;

  let mockReducer: ActionReducerMap<any> = {};

  const mockService = {};

  beforeEach(async(() => {
    const matModules = [
      MatDialogModule,
    ];

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AssessGroupComponent],

      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        GlobalModule,
        ...matModules,
        StoreModule.forRoot(mockReducer),
      ],
      providers: [
        AssessService,
        {
          provide: GenericApi,
          use: mockService
        }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessGroupComponent);
    component = fixture.componentInstance;
    component.assessment = new Assessment();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return risk by attack pattern id', () => {
    const riskByAttackPattern = RiskByAttackPatternMockFactory.mockOne();
    component.riskByAttackPattern = riskByAttackPattern;
    const expectedId = riskByAttackPattern.assessedByAttackPattern[0]._id;
    const expectedRisk = riskByAttackPattern.assessedByAttackPattern[0].risk;
    const risk = component.getRiskByAttackPatternId(expectedId);
    expect(risk).toBeDefined();
    expect(risk).toEqual(expectedRisk);
  });

  it('should return default risk when attack pattern id not found', () => {
    const riskByAttackPattern = RiskByAttackPatternMockFactory.mockOne();
    component.riskByAttackPattern = riskByAttackPattern;
    const risk = component.getRiskByAttackPatternId('nosuchid');
    expect(risk).toBeDefined();
    expect(risk).toEqual(1);
  });


});
