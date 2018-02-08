import { TestBed, inject } from '@angular/core/testing';

import { SummaryCalculationService } from './summary-calculation.service';

fdescribe('SummaryCalculationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummaryCalculationService]
    });
  });

  it('should be created', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service).toBeTruthy();
  }));

  it('should return default numeric risk', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.numericRisk).toEqual(0);
  }));

  it('should return default risk text', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.getRiskText()).toEqual('0');
  }));

  it('should return set numeric risk', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    service.numericRisk = 1;
    expect(service.numericRisk).toEqual(1);
  }));

  it('should return set risk text', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    service.numericRisk = 1;
    expect(service.getRiskText()).toEqual('100');
  }));

  it('should set default average risk per assessed object', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    service.setAverageRiskPerAssessedObject(null);
    expect(service.numericRisk).toEqual(0);
    service.setAverageRiskPerAssessedObject([]);
    expect(service.numericRisk).toEqual(0);
  }));

  it('should set average risk per assessed object', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    service.setAverageRiskPerAssessedObject([{ risk: 3, questions: null }]);
    expect(service.numericRisk).toEqual(3);
    service.setAverageRiskPerAssessedObject([{ risk: 3, questions: null }, { risk: 0, questions: null }]);
    expect(service.numericRisk).toEqual(1.5);
  }));

  it('should calculate default weakness', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    service.calculateWeakness(null);
    expect(service.weakness).toEqual('');
    service.calculateWeakness(undefined);
    expect(service.weakness).toEqual('');
  }));

  it('should calculate correct weakness', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    service.calculateWeakness({ assessedByAttackPattern: null, attackPatternsByKillChain: null, phases: null});
    expect(service.weakness).toEqual('');
    service.calculateWeakness(undefined);
    expect(service.weakness).toEqual('');
    service.calculateWeakness({ assessedByAttackPattern: [], attackPatternsByKillChain: [], phases: []});
    expect(service.weakness).toEqual('');
    service.calculateWeakness({ assessedByAttackPattern: null, attackPatternsByKillChain: [], phases: [{assessedObjects: null, attackPatterns: null, _id: null}]});
    expect(service.weakness).toEqual('');
    service.calculateWeakness({ assessedByAttackPattern: null, attackPatternsByKillChain: [{attackPatterns: null, _id: 'description'}], phases: [{assessedObjects: null, attackPatterns: null, _id: 'description'}]});
    expect(service.weakness).toEqual('');
    service.calculateWeakness({ assessedByAttackPattern: null, attackPatternsByKillChain: [{attackPatterns: [], _id: 'description'}], phases: [{assessedObjects: null, attackPatterns: null, _id: 'description'}]});
    expect(service.weakness).toEqual('');
    service.calculateWeakness({ assessedByAttackPattern: null, attackPatternsByKillChain: [{attackPatterns: [{description: null, external_references: null, id: null, kill_chain_phases: null, name: null}],
      _id: 'description'}], phases: [{assessedObjects: null, attackPatterns: null, _id: 'description'}]});
    expect(service.weakness).toEqual('');
    service.calculateWeakness({ assessedByAttackPattern: null, attackPatternsByKillChain: [{attackPatterns: [{description: null, external_references: null, id: null, kill_chain_phases: null, name: null}],
      _id: 'description'}], phases: [{assessedObjects: null, attackPatterns: null, _id: 'description'}]});
    expect(service.weakness).toEqual('');
    service.calculateWeakness({ assessedByAttackPattern: null, attackPatternsByKillChain: [{attackPatterns: [{description: undefined, external_references: null, id: null, kill_chain_phases: null, name: null}],
      _id: 'description'}], phases: [{assessedObjects: null, attackPatterns: null, _id: 'description'}]});
    expect(service.weakness).toEqual('');
    service.calculateWeakness({ assessedByAttackPattern: null, attackPatternsByKillChain: [{attackPatterns: [{description: '', external_references: null, id: null, kill_chain_phases: null, name: null}],
      _id: 'description'}], phases: [{assessedObjects: null, attackPatterns: null, _id: 'description'}]});
    expect(service.weakness).toEqual('');
    service.calculateWeakness({ assessedByAttackPattern: null, attackPatternsByKillChain: [{attackPatterns: [{description: 'apple', external_references: null, id: null, kill_chain_phases: null, name: null}],
      _id: 'description'}], phases: [{assessedObjects: null, attackPatterns: null, _id: 'description'}]});
    expect(service.weakness).toEqual('apple');

  }));

  it('should calculate default average risk for a phase', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.calculateAvgRiskPerPhase(null)).toEqual(0);
    expect(service.calculateAvgRiskPerPhase(undefined)).toEqual(0);
    expect(service.calculateAvgRiskPerPhase({assessedObjects: null, attackPatterns: null, _id: null})).toEqual(0);
    expect(service.calculateAvgRiskPerPhase({assessedObjects: [], attackPatterns: null, _id: null})).toEqual(0);
  }));

  it('should calculate average risk for a phase', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.calculateAvgRiskPerPhase({assessedObjects: [{questions: null, risk: 0}], attackPatterns: null, _id: null})).toEqual(0);
    expect(service.calculateAvgRiskPerPhase({assessedObjects: [{questions: null, risk: 1}], attackPatterns: null, _id: null})).toEqual(1);
  }));
});
