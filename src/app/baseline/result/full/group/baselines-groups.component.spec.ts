import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialogModule } from '@angular/material';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { GenericApi } from '../../../../core/services/genericapi.service';
import { GlobalModule } from '../../../../global/global.module';
import { FullBaselineResultState, fullAssessmentResultReducer, genState } from '../../store/full-result.reducers';

import { Baseline } from '../../../../models/baseline/baseline';
import { AssessAttackPatternMeta } from '../../../../models/baseline/assess-attack-pattern-meta';
import { AssessAttackPatternMetaMockFactory } from '../../../../models/baseline/assess-attack-pattern-meta.mock';
import { BaselineGroupComponent } from './baselines-group.component';
import { BaselineService } from '../../../services/baseline.service';
import { AddAssessedObjectComponent } from './add-assessed-object/add-assessed-object.component';
import { BaselineObjectMockFactory } from '../../../../models/baseline/baseline-object.mock';
import { Phase3 } from '../../../../models/baseline/phase3';
import { RiskByAttack3 } from '../../../../models/baseline/risk-by-attack3';
import { RiskByAttackPattern3MockFactory } from '../../../../models/baseline/risk-by-attack-pattern3.mock';
import { SummaryCalculationService } from '../../summary/summary-calculation.service';
import { FullAssessmentGroupMockFactory } from './models/full-baseline-group.mock';

describe('AssessGroupComponent', () => {
  let component: BaselineGroupComponent;
  let fixture: ComponentFixture<BaselineGroupComponent>;

  let mockReducer: ActionReducerMap<any> = {};

  const mockService = {};

  // TODO: Add in once 
  // beforeEach(async(() => {
  //   const matModules = [
  //     MatDialogModule,
  //   ];

  //   TestBed.configureTestingModule({
  //     schemas: [NO_ERRORS_SCHEMA],
  //     declarations: [
  //       AddAssessedObjectComponent,
  //       AssessGroupComponent
  //     ],
  //     imports: [
  //       RouterTestingModule,
  //       HttpClientTestingModule,
  //       GlobalModule,
  //       ...matModules,
  //       StoreModule.forRoot(mockReducer),
  //     ],
  //     providers: [
  //       AssessService,
  //       {
  //         provide: GenericApi,
  //         use: mockService
  //       }],
  //   })
  //     .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AssessGroupComponent);
  //   component = fixture.componentInstance;
  //   component.baseline = new Assessment3();
  //   component.baselineGroup = new BehaviorSubject(FullAssessmentGroupMockFactory.mockOne()).asObservable();
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should return risk by attack pattern id', () => {
  //   const riskByAttackPattern = RiskByAttackPattern3MockFactory.mockOne();
  //   component.riskByAttackPattern = riskByAttackPattern;
  //   const expectedId = riskByAttackPattern.assessed3ByAttackPattern[0]._id;
  //   const expectedRisk = riskByAttackPattern.assessed3ByAttackPattern[0].risk;
  //   const risk = component.getRiskByAttackPatternId(expectedId);
  //   expect(risk).toBeDefined();
  //   expect(risk).toEqual(expectedRisk);
  // });

  // it('should return default risk when attack pattern id not found', () => {
  //   const riskByAttackPattern = RiskByAttackPattern3MockFactory.mockOne();
  //   component.riskByAttackPattern = riskByAttackPattern;
  //   const risk = component.getRiskByAttackPatternId('nosuchid');
  //   expect(risk).toBeDefined();
  //   expect(risk).toEqual(1);
  // });

  // it('should return default risk when stix id not found', () => {
  //   const riskByAttackPattern = RiskByAttackPattern3MockFactory.mockOne();
  //   component.riskByAttackPattern = riskByAttackPattern;
  //   const risk = component.getRisk('nosuchid');
  //   expect(risk).toBeDefined();
  //   expect(risk).toEqual(-1);
  // });

  // it('should return attack patterns by phase id', () => {
  //   const riskByAttackPattern = RiskByAttackPattern3MockFactory.mockOne();
  //   component.riskByAttackPattern = riskByAttackPattern;
  //   const phase = riskByAttackPattern.phases[1];
  //   const phaseId = phase._id;
  //   const expectedLen = phase.attackPatterns.length;
  //   const arr = component.getAttackPatternsByPhase(phaseId);
  //   expect(arr).toBeDefined();
  //   expect(arr.length).toEqual(expectedLen);
  // });

  // it('should return attack patterns by phase id, ranked by risk', () => {
  //   const riskByAttackPattern = RiskByAttackPattern3MockFactory.mockOne();
  //   component.riskByAttackPattern = riskByAttackPattern;
  //   const phase = riskByAttackPattern.phases[1];
  //   const phaseId = phase._id;
  //   const expectedLen = phase.attackPatterns.length;
  //   const arr = component.getAttackPatternsByPhase(phaseId);
  //   expect(arr).toBeDefined();
  //   expect(arr.length).toEqual(expectedLen);
  //   expect(arr.length).toBeGreaterThanOrEqual(2);
  //   let prevRisk = -1;
  //   arr.forEach((el) => {
  //     const id = el.attackPatternId;
  //     const curRisk = component.getRiskByAttackPatternId(id);
  //     expect(prevRisk).toBeLessThanOrEqual(curRisk);
  //     prevRisk = curRisk;
  //   });

  // });

  // it('should return empty list on bad phase id', () => {
  //   const riskByAttackPattern = RiskByAttackPattern3MockFactory.mockOne();
  //   component.riskByAttackPattern = riskByAttackPattern;
  //   const arr = component.getAttackPatternsByPhase('nosuchid');
  //   expect(arr).toBeDefined();
  //   expect(arr.length).toEqual(0);
  // });

  // it('should return risk by phase', () => {
  //   const riskByAttackPattern = RiskByAttackPattern3MockFactory.mockOne();
  //   component.riskByAttackPattern = riskByAttackPattern;
  //   const phase = riskByAttackPattern.phases[1];
  //   const phaseId = phase._id;
  //   phase.assessedObjects = Assessment3ObjectMockFactory
  //     .mockMany(5)
  //     .map((ao) => {
  //       ao.risk = 50;
  //       return ao;
  //     });
  //   phase.assessedObjects[4].risk = 25;
  //   const risk = component.getRiskByPhase(phaseId);
  //   expect(risk).toBeDefined();
  //   expect(risk).toEqual(45);
  // });

  // it('should return risk by phase, edge case', () => {
  //   const riskByAttackPattern = RiskByAttackPattern3MockFactory.mockOne();
  //   component.riskByAttackPattern = riskByAttackPattern;
  //   const phase = riskByAttackPattern.phases[1];
  //   const phaseId = phase._id;
  //   phase.assessedObjects = Assessment3ObjectMockFactory
  //     .mockMany(5)
  //     .map((ao) => {
  //       ao.risk = 0;
  //       return ao;
  //     });
  //   const risk = component.getRiskByPhase(phaseId);
  //   expect(risk).toBeDefined();
  //   expect(risk).toEqual(0);
  // });

  // it('should return risk by phase, edge case', () => {
  //   const riskByAttackPattern = RiskByAttackPattern3MockFactory.mockOne();
  //   component.riskByAttackPattern = riskByAttackPattern;
  //   const phase = riskByAttackPattern.phases[1];
  //   const phaseId = phase._id;
  //   phase.assessedObjects = [];
  //   const risk = component.getRiskByPhase(phaseId);
  //   expect(risk).toBeDefined();
  //   expect(risk).toEqual(1);
  // });

});
