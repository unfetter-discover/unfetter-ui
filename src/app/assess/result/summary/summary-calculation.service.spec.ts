import { TestBed, inject } from '@angular/core/testing';

import { SummaryCalculationService } from './summary-calculation.service';

describe('SummaryCalculationService', () => {
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

  it('should call recalculateDependents when selectedRisk changes', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    spyOn(service, 'recalculateDependents');
    service.selectedRisk = .75;
    expect(service.recalculateDependents).toHaveBeenCalled();
  }));

  it('should calculate correct weakness', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    service.calculateWeakness({ assessedByAttackPattern: null, attackPatternsByKillChain: null, phases: null });
    expect(service.weakness).toEqual('');
    service.calculateWeakness(undefined);
    expect(service.weakness).toEqual('');
    service.calculateWeakness({ assessedByAttackPattern: [], attackPatternsByKillChain: [], phases: [] });
    expect(service.weakness).toEqual('');
    service.calculateWeakness({ assessedByAttackPattern: null, attackPatternsByKillChain: [], phases: [{ assessedObjects: null, attackPatterns: null, _id: null }] });
    expect(service.weakness).toEqual('');
    service.calculateWeakness({ assessedByAttackPattern: null, attackPatternsByKillChain: [{ attackPatterns: null, _id: 'description' }], phases: [{ assessedObjects: null, attackPatterns: null, _id: 'description' }] });
    expect(service.weakness).toEqual('');
    service.calculateWeakness({ assessedByAttackPattern: null, attackPatternsByKillChain: [{ attackPatterns: [], _id: 'description' }], phases: [{ assessedObjects: null, attackPatterns: null, _id: 'description' }] });
    expect(service.weakness).toEqual('');
    service.calculateWeakness({
      assessedByAttackPattern: null, attackPatternsByKillChain: [{
        attackPatterns: [{ description: null, external_references: null, id: null, kill_chain_phases: null, name: null }],
        _id: 'description'
      }], phases: [{ assessedObjects: null, attackPatterns: null, _id: 'description' }]
    });
    expect(service.weakness).toEqual('');
    service.calculateWeakness({
      assessedByAttackPattern: null, attackPatternsByKillChain: [{
        attackPatterns: [{ description: null, external_references: null, id: null, kill_chain_phases: null, name: null }],
        _id: 'description'
      }], phases: [{ assessedObjects: null, attackPatterns: null, _id: 'description' }]
    });
    expect(service.weakness).toEqual('');
    service.calculateWeakness({
      assessedByAttackPattern: null, attackPatternsByKillChain: [{
        attackPatterns: [{ description: undefined, external_references: null, id: null, kill_chain_phases: null, name: null }],
        _id: 'description'
      }], phases: [{ assessedObjects: null, attackPatterns: null, _id: 'description' }]
    });
    expect(service.weakness).toEqual('');
    service.calculateWeakness({
      assessedByAttackPattern: null, attackPatternsByKillChain: [{
        attackPatterns: [{ description: '', external_references: null, id: null, kill_chain_phases: null, name: null }],
        _id: 'description'
      }], phases: [{ assessedObjects: null, attackPatterns: null, _id: 'description' }]
    });
    expect(service.weakness).toEqual('');
    service.calculateWeakness({
      assessedByAttackPattern: null, attackPatternsByKillChain: [{
        attackPatterns: [{ description: 'apple', external_references: null, id: null, kill_chain_phases: null, name: null }],
        _id: 'description'
      }], phases: [{ assessedObjects: null, attackPatterns: null, _id: 'description' }]
    });
    expect(service.weakness).toEqual('apple');

  }));

  it('should calculate default average risk for a phase', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.calculateAvgRiskPerPhase(null)).toEqual(0);
    expect(service.calculateAvgRiskPerPhase(undefined)).toEqual(0);
    expect(service.calculateAvgRiskPerPhase({ assessedObjects: null, attackPatterns: null, _id: null })).toEqual(0);
    expect(service.calculateAvgRiskPerPhase({ assessedObjects: [], attackPatterns: null, _id: null })).toEqual(0);
  }));

  it('should calculate average risk for a phase', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.calculateAvgRiskPerPhase({ assessedObjects: [{ questions: null, risk: 0 }], attackPatterns: null, _id: null })).toEqual(0);
    expect(service.calculateAvgRiskPerPhase({ assessedObjects: [{ questions: null, risk: 1 }], attackPatterns: null, _id: null })).toEqual(1);
  }));

  it('should calculate default top risks for kill chains', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    service.calculateTopRisks(null);
    expect(service.topRisks).toEqual([]);
    service.calculateTopRisks(undefined)
    expect(service.topRisks).toEqual([]);
    service.calculateTopRisks({ courseOfActions: null, indicators: null, sensors: null });
    expect(service.topRisks).toEqual([]);
    service.calculateTopRisks({ courseOfActions: [], indicators: [], sensors: [] });
    expect(service.topRisks).toEqual([]);
  }));

  it('should calculate top risks for kill chains', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    service.calculateTopRisks({ courseOfActions: [{ risk: null, questions: null, objects: null, phaseName: null }], indicators: null, sensors: null });
    expect(service.topRisks).toEqual([{ risk: null, questions: null, objects: [], phaseName: null }]);
    service.calculateTopRisks({ courseOfActions: [{ risk: .7324, questions: null, objects: null, phaseName: null }], indicators: null, sensors: null });
    expect(service.topRisks).toEqual([{ risk: .7324, questions: null, objects: [], phaseName: null }]);
    service.calculateTopRisks({ courseOfActions: [{ risk: .7324, questions: null, objects: [], phaseName: null }], indicators: null, sensors: null });
    expect(service.topRisks).toEqual([{ risk: .7324, questions: null, objects: [], phaseName: null }]);
    service.calculateTopRisks({ courseOfActions: [{ risk: .7324, questions: null, objects: [{}], phaseName: null }], indicators: null, sensors: null });
    expect(service.topRisks).toEqual([{ risk: .7324, questions: null, objects: [{}], phaseName: null }]);
    service.calculateTopRisks({ courseOfActions: [{ risk: .7324, questions: null, objects: [{ risk: null }], phaseName: null }], indicators: null, sensors: null });
    expect(service.topRisks).toEqual([{ risk: .7324, questions: null, objects: [{ risk: null }], phaseName: null }]);
    service.calculateTopRisks({ courseOfActions: [{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null }], indicators: null, sensors: null });
    expect(service.topRisks).toEqual([{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null }]);
    service.calculateTopRisks({ courseOfActions: [{ risk: .7324, questions: null, objects: [{ risk: 1 }, { risk: null }], phaseName: null }], indicators: null, sensors: null });
    expect(service.topRisks).toEqual([{ risk: .7324, questions: null, objects: [{ risk: 1 }, { risk: null }], phaseName: null }]);
    service.calculateTopRisks({ courseOfActions: [{ risk: .7324, questions: null, objects: [{ risk: null }, { risk: 1 }], phaseName: null }], indicators: null, sensors: null });
    expect(service.topRisks).toEqual([{ risk: .7324, questions: null, objects: [{ risk: 1 }, { risk: null }], phaseName: null }]);
    service.calculateTopRisks({ courseOfActions: [{ risk: .7324, questions: null, objects: [{ risk: 1 }, { risk: 0 }, {}], phaseName: null }], indicators: null, sensors: null });
    expect(service.topRisks).toEqual([{ risk: .7324, questions: null, objects: [{ risk: 1 }, { risk: 0 }, {}], phaseName: null }]);
    service.calculateTopRisks({ courseOfActions: [{ risk: .7324, questions: null, objects: [{ risk: 1 }, { risk: 0 }, { risk: 2 }], phaseName: null }], indicators: null, sensors: null });
    expect(service.topRisks).toEqual([{ risk: .7324, questions: null, objects: [{ risk: 2 }, { risk: 1 }, { risk: 0 }], phaseName: null }]);
    service.calculateTopRisks({ courseOfActions: [{ risk: .7324, questions: null, objects: [{ risk: 1 }, { risk: 5 }, { risk: 2 }, { risk: 0 }, { risk: 1 }], phaseName: null }], indicators: null, sensors: null });
    expect(service.topRisks).toEqual([{ risk: .7324, questions: null, objects: [{ risk: 5 }, { risk: 2 }, { risk: 1 }], phaseName: null }]);
    service.calculateTopRisks({ courseOfActions: null, indicators: [{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null }], sensors: null });
    expect(service.topRisks).toEqual([{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null }]);
    service.calculateTopRisks({ courseOfActions: null, indicators: null, sensors: [{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null }] });
    expect(service.topRisks).toEqual([{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null }]);
    service.calculateTopRisks(
      {
        courseOfActions: [{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null }],
        indicators: [{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null }],
        sensors: [{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null }]
      }
    );
    expect(service.topRisks).toEqual(
      [{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null },
      { risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null },
      { risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null }]);
    service.calculateTopRisks(
      {
        courseOfActions:
          [{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null },
          { risk: .32, questions: null, objects: [{ risk: 1 }], phaseName: null }],
        indicators: [{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null }],
        sensors: [{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null }]
      }
    );
    expect(service.topRisks).toEqual(
      [{ risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null },
      { risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null },
      { risk: .7324, questions: null, objects: [{ risk: 1 }], phaseName: null }]);
    service.calculateTopRisks(
      {
        courseOfActions:
          [{ risk: .7324, questions: null, objects: [{ risk: 1 }, { risk: .3 }, { risk: .2 }, { risk: 0 }], phaseName: null },
          { risk: .32, questions: null, objects: [{ risk: 1 }], phaseName: null }],
        indicators: [{ risk: .7321, questions: null, objects: [{ risk: 1 }], phaseName: null }],
        sensors: [{ risk: .7320, questions: null, objects: [{ risk: 1 }], phaseName: null }]
      }
    );
    expect(service.topRisks).toEqual(
      [{ risk: .7324, questions: null, objects: [{ risk: 1 }, { risk: .3 }, { risk: .2 }], phaseName: null },
      { risk: .7321, questions: null, objects: [{ risk: 1 }], phaseName: null },
      { risk: .7320, questions: null, objects: [{ risk: 1 }], phaseName: null }]);
    service.calculateTopRisks(
      {
        courseOfActions:
          [{ risk: .7324, questions: null, objects: [{ risk: 1 }, { risk: .3 }, { risk: .2 }, { risk: 0 }], phaseName: null },
          { risk: .32, questions: null, objects: [{ risk: 1 }], phaseName: null }],
        indicators: [{ risk: .7321, questions: null, objects: [{ risk: .1 }, { risk: .2 }, { risk: 0 }, { risk: .3 }], phaseName: null }],
        sensors: [{ risk: .7320, questions: null, objects: [{ risk: 1 }, { risk: .3 }, { risk: .2 }, { risk: 0 }], phaseName: null }]
      }
    );
    expect(service.topRisks).toEqual(
      [{ risk: .7324, questions: null, objects: [{ risk: 1 }, { risk: .3 }, { risk: .2 }], phaseName: null },
      { risk: .7321, questions: null, objects: [{ risk: .3 }, { risk: .2 }, { risk: .1 }], phaseName: null },
      { risk: .7320, questions: null, objects: [{ risk: 1 }, { risk: .3 }, { risk: .2 }], phaseName: null }]);
  }));

  it('should retrieve default risk objects from a kill chain object', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.retrieveAssessmentRisks(null)).toEqual([]);
    expect(service.retrieveAssessmentRisks(undefined)).toEqual([]);
    expect(service.retrieveAssessmentRisks({ courseOfActions: null, indicators: null, sensors: null })).toEqual([]);
    expect(service.retrieveAssessmentRisks({ courseOfActions: [], indicators: [], sensors: [] })).toEqual([]);
  }));

  it('should retrieve calculated risk objects from a kill chain object', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.retrieveAssessmentRisks({ courseOfActions: [{ risk: null, questions: null, objects: null, phaseName: null }], indicators: [], sensors: [] }))
      .toEqual([{ risk: null, questions: null, objects: null, phaseName: null }]);
    expect(service.retrieveAssessmentRisks({ courseOfActions: [{ risk: .7324, questions: null, objects: null, phaseName: null }], indicators: [], sensors: [] }))
      .toEqual([{ risk: .7324, questions: null, objects: null, phaseName: null }]);
    expect(service.retrieveAssessmentRisks({
      courseOfActions: [{ risk: .7324, questions: null, objects: null, phaseName: null }],
      indicators: [{ risk: .7324, questions: null, objects: null, phaseName: null }],
      sensors: [{ risk: .7324, questions: null, objects: null, phaseName: null }]
    }))
      .toEqual([{ risk: .7324, questions: null, objects: null, phaseName: null },
      { risk: .7324, questions: null, objects: null, phaseName: null },
      { risk: .7324, questions: null, objects: null, phaseName: null }]);
    expect(service.retrieveAssessmentRisks({
      courseOfActions: [{ risk: .7324, questions: null, objects: null, phaseName: null }, { risk: .1224, questions: null, objects: null, phaseName: null }],
      indicators: [{ risk: .7324, questions: null, objects: null, phaseName: null }, { risk: .1224, questions: null, objects: null, phaseName: null }],
      sensors: [{ risk: .7324, questions: null, objects: null, phaseName: null }, { risk: .1224, questions: null, objects: null, phaseName: null }]
    }))
      .toEqual([{ risk: .7324, questions: null, objects: null, phaseName: null }, { risk: .1224, questions: null, objects: null, phaseName: null },
      { risk: .7324, questions: null, objects: null, phaseName: null }, { risk: .1224, questions: null, objects: null, phaseName: null },
      { risk: .7324, questions: null, objects: null, phaseName: null }, { risk: .1224, questions: null, objects: null, phaseName: null }]);
    expect(service.retrieveAssessmentRisks({
      courseOfActions: [{ risk: .1, questions: null, objects: null, phaseName: null }, { risk: .2, questions: null, objects: null, phaseName: null }],
      indicators: [{ risk: .3, questions: null, objects: null, phaseName: null }, { risk: .4, questions: null, objects: null, phaseName: null }],
      sensors: [{ risk: .5, questions: null, objects: null, phaseName: null }, { risk: .6, questions: null, objects: null, phaseName: null }]
    }))
      .toEqual([{ risk: .1, questions: null, objects: null, phaseName: null }, { risk: .2, questions: null, objects: null, phaseName: null },
      { risk: .3, questions: null, objects: null, phaseName: null }, { risk: .4, questions: null, objects: null, phaseName: null },
      { risk: .5, questions: null, objects: null, phaseName: null }, { risk: .6, questions: null, objects: null, phaseName: null }]);
  }));

  it('should filter assessment objects based on selected risk', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    service.selectedRisk = 0.5;
    expect(service.filterOnRisk(null)).toEqual([]);
    expect(service.filterOnRisk([])).toEqual([]);
    expect(service.filterOnRisk([{ risk: null, questions: null, stix: null }])).toEqual([]);
    expect(service.filterOnRisk([{
      risk: .25, questions: null, stix: {
        id: null, metaProperties: null, created: null, modified: null, version: null, external_references: null,
        granular_markings: null, name: null, description: null, pattern: null, kill_chain_phases: null, created_by_ref: null, type: null, valid_from: null, labels: null
      }
    }])).toEqual([]);
    expect(service.filterOnRisk([{
      risk: .25, questions: null, stix: {
        id: null, metaProperties: null, created: null, modified: null, version: null, external_references: null,
        granular_markings: null, name: null, description: null, pattern: null, kill_chain_phases: null, created_by_ref: null, type: null, valid_from: null, labels: null
      }
    }])).toEqual([]);
    expect(service.filterOnRisk([{
      risk: .25, questions: null, stix: {
        id: 'ididid', metaProperties: null, created: null, modified: null, version: null, external_references: null,
        granular_markings: null, name: null, description: null, pattern: null, kill_chain_phases: null, created_by_ref: null, type: null, valid_from: null, labels: null
      }
    }])).toEqual(['ididid']);
    expect(service.filterOnRisk([
      {
        risk: .25, questions: null, stix: {
          id: 'ididid', metaProperties: null, created: null, modified: null, version: null, external_references: null,
          granular_markings: null, name: null, description: null, pattern: null, kill_chain_phases: null, created_by_ref: null, type: null, valid_from: null, labels: null
        },
      },
      {
        risk: .75, questions: null, stix: {
          id: 'nope', metaProperties: null, created: null, modified: null, version: null, external_references: null,
          granular_markings: null, name: null, description: null, pattern: null, kill_chain_phases: null, created_by_ref: null, type: null, valid_from: null, labels: null
        }
      }])).toEqual(['ididid']);
  }));

  it('should populate assessments grouping given an array of asssesment objects', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    service.summaryAggregation = null;
    service.populateAssessmentsGrouping(null);
    expect(service.assessmentsGroupingTotal).toEqual({});
    service.summaryAggregation = { assessedAttackPatternCountBySophisicationLevel: null, attackPatternsByAssessedObject: null, totalAttackPatternCountBySophisicationLevel: null };
    service.populateAssessmentsGrouping(null);
    expect(service.assessmentsGroupingTotal).toEqual({});
    service.summaryAggregation = { assessedAttackPatternCountBySophisicationLevel: null, attackPatternsByAssessedObject: [{ _id: null, attackPatterns: null }], totalAttackPatternCountBySophisicationLevel: null };
    service.populateAssessmentsGrouping([]);
    expect(service.assessmentsGroupingTotal).toEqual({});
    service.summaryAggregation = { assessedAttackPatternCountBySophisicationLevel: null, attackPatternsByAssessedObject: [{ _id: 'an id', attackPatterns: null }], totalAttackPatternCountBySophisicationLevel: null };
    service.populateAssessmentsGrouping([{ risk: null, questions: null }]);
    expect(service.assessmentsGroupingTotal).toEqual({});
    service.summaryAggregation = { assessedAttackPatternCountBySophisicationLevel: null, attackPatternsByAssessedObject: [{ _id: 'an id', attackPatterns: null }], totalAttackPatternCountBySophisicationLevel: null };
    service.populateAssessmentsGrouping([{
      risk: .25, questions: null, stix: {
        id: 'an id', metaProperties: null, created: null, modified: null, version: null, external_references: null,
        granular_markings: null, name: null, description: null, pattern: null, kill_chain_phases: null, created_by_ref: null, type: null, valid_from: null, labels: null
      }
    }]);
    expect(service.assessmentsGroupingTotal).toEqual({});
    service.summaryAggregation = { assessedAttackPatternCountBySophisicationLevel: null, attackPatternsByAssessedObject: [{ _id: 'an id', attackPatterns: [] }], totalAttackPatternCountBySophisicationLevel: null };
    service.populateAssessmentsGrouping([{
      risk: .25, questions: null, stix: {
        id: 'an id', metaProperties: null, created: null, modified: null, version: null, external_references: null,
        granular_markings: null, name: null, description: null, pattern: null, kill_chain_phases: null, created_by_ref: null, type: null, valid_from: null, labels: null
      }
    }]);
    expect(service.assessmentsGroupingTotal).toEqual({});
    service.summaryAggregation = {
      assessedAttackPatternCountBySophisicationLevel: null,
      attackPatternsByAssessedObject: [{ _id: 'an id', attackPatterns: [{ kill_chain_phases: null }] }], totalAttackPatternCountBySophisicationLevel: null
    };
    service.populateAssessmentsGrouping([{
      risk: .25, questions: null, stix: {
        id: 'an id', metaProperties: null, created: null, modified: null, version: null, external_references: null,
        granular_markings: null, name: null, description: null, pattern: null, kill_chain_phases: null, created_by_ref: null, type: null, valid_from: null, labels: null
      }
    }]);
    expect(service.assessmentsGroupingTotal).toEqual({ '': 1 });
    service.summaryAggregation = {
      assessedAttackPatternCountBySophisicationLevel: null,
      attackPatternsByAssessedObject: [{ _id: 'an id', attackPatterns: [{ kill_chain_phases: [{ kill_chain_name: null, phase_name: 'happy camper' }] }] }], totalAttackPatternCountBySophisicationLevel: null
    };
    service.populateAssessmentsGrouping([{
      risk: .25, questions: null, stix: {
        id: 'an id', metaProperties: null, created: null, modified: null, version: null, external_references: null,
        granular_markings: null, name: null, description: null, pattern: null, kill_chain_phases: [{ kill_chain_name: null, phase_name: 'happy camper' }], created_by_ref: null, type: null, valid_from: null, labels: null
      }
    }]);
    expect(service.assessmentsGroupingTotal).toEqual({ 'happy camper': 1 });
    service.summaryAggregation = {
      assessedAttackPatternCountBySophisicationLevel: null,
      attackPatternsByAssessedObject: [{ _id: 'an id', attackPatterns: [{ kill_chain_phases: [{ kill_chain_name: null, phase_name: 'happy camper' }, { kill_chain_name: null, phase_name: 'happy camper' }] }] }], totalAttackPatternCountBySophisicationLevel: null
    };
    service.populateAssessmentsGrouping([{
      risk: .25, questions: null, stix: {
        id: 'an id', metaProperties: null, created: null, modified: null, version: null, external_references: null,
        granular_markings: null, name: null, description: null, pattern: null, kill_chain_phases: [{ kill_chain_name: null, phase_name: 'happy camper' }], created_by_ref: null, type: null, valid_from: null, labels: null
      }
    }]);
    expect(service.assessmentsGroupingTotal).toEqual({ 'happy camper': 2 });
  }));

  it('should capitalize all words except for and, or, of, on, and the', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.capitalizeWithExceptions(null, null, null)).toBe(null);
    expect(service.capitalizeWithExceptions('and', null, null)).toBe('and');
    expect(service.capitalizeWithExceptions('', null, null)).toBe('');
    expect(service.capitalizeWithExceptions('apple', null, null)).toBe('apple');
    expect(service.capitalizeWithExceptions(null, null, 'apple')).toBe(null);
    expect(service.capitalizeWithExceptions(null, 'a', null)).toBe(null);
    expect(service.capitalizeWithExceptions('cymbolic', 'a', null)).toBe('A');
    expect(service.capitalizeWithExceptions('the', 'a', null)).toBe('the');
    expect(service.capitalizeWithExceptions('chestnut', 'a', 'pple')).toBe('Apple');
    expect(service.capitalizeWithExceptions('or', 'a', 'pple')).toBe('or');
    expect(service.capitalizeWithExceptions('apple', 'a', 'pple')).toBe('Apple');
    expect(service.capitalizeWithExceptions('of', 'o', 'f')).toBe('of');
    expect(service.capitalizeWithExceptions('on', 'o', 'n')).toBe('on');
    expect(service.capitalizeWithExceptions('On', 'O', 'n')).toBe('on');
    expect(service.capitalizeWithExceptions('KAPTAIN', 'K', 'APTAIN')).toBe('Kaptain');
    expect(service.capitalizeWithExceptions('BUT', 'B', 'BUT')).toBe('but');
    expect(service.capitalizeWithExceptions('BUT', 'A', 'PPLE')).toBe('but');
  }));

  it('should capitalize individual single letters in a string', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.capitalizeSingleLetter(null)).toEqual('');
    expect(service.capitalizeSingleLetter('')).toEqual('');
    expect(service.capitalizeSingleLetter('1')).toEqual('1');
    expect(service.capitalizeSingleLetter('a')).toEqual('A');
    expect(service.capitalizeSingleLetter('a b')).toEqual('a b');
    expect(service.capitalizeSingleLetter('ab')).toEqual('ab');
  }));

  it('should convert labels to formatted text for display', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.convertLabels(null)).toEqual([]);
    expect(service.convertLabels(null)).toEqual([]);
    expect(service.convertLabels(['apple-jacks'])).toEqual(['Apple Jacks']);
    expect(service.convertLabels(['apple-jacks', null, ''])).toEqual(['Apple Jacks', '', '']);
    expect(service.convertLabels(['a-b'])).toEqual(['A B']);
  }));

  it('should render a legend appropriate for a threshold graph and the current selected threshold', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    service.thresholdOptions = null;
    service.selectedRisk = 3;
    expect(service.renderLegend()).toEqual(`At or Above 'Mitigation Threshold'`);
    service.thresholdOptions = [];
    expect(service.renderLegend()).toEqual(`At or Above 'Mitigation Threshold'`);
    service.thresholdOptions = [{ name: null, risk: null }];
    expect(service.renderLegend()).toEqual(`At or Above 'Mitigation Threshold'`);
    service.thresholdOptions = [{ name: null, risk: 3 }];
    expect(service.renderLegend()).toEqual(`At or Above 'Mitigation Threshold'`);
    service.thresholdOptions = [{ name: '', risk: 3 }];
    expect(service.renderLegend()).toEqual(`At or Above 'Mitigation Threshold'`);
    service.thresholdOptions = [{ name: 'bob', risk: 3 }];
    expect(service.renderLegend()).toEqual(`At or Above 'bob'`);
    service.thresholdOptions = [{ name: 'bob', risk: 1 }];
    expect(service.renderLegend()).toEqual(`At or Above 'Mitigation Threshold'`);
    service.thresholdOptions = [{ name: 'bob', risk: 1 }, { name: 'steve', risk: 3 }];
    expect(service.renderLegend()).toEqual(`At or Above 'steve'`);
    service.thresholdOptions = [{ name: 'bob', risk: 1 }, { name: 'steve', risk: 3 }];
    service.selectedRisk = 0;
    expect(service.renderLegend()).toEqual(`At or Above 'Mitigation Threshold'`);
    service.thresholdOptions = [{ name: 'bob', risk: 0 }, { name: 'steve', risk: 3 }];
    service.selectedRisk = 0;
    expect(service.renderLegend()).toEqual(`At or Above 'bob'`);
    service.thresholdOptions = [{ name: 'bob', risk: 0 }, { name: 'steve', risk: 0.25 }];
    service.selectedRisk = .25;
    expect(service.renderLegend()).toEqual(`At or Above 'steve'`);
  }));

  it('should convert a single label to formatted text for display', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.convertLabel(null)).toEqual('');
    expect(service.convertLabel('')).toEqual('');
    expect(service.convertLabel('a-b')).toEqual('A B');
  }));

  it('should detect valid summary aggregations', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    service.summaryAggregation = null;
    expect(service.isSummaryAggregationValid()).toBe(false);
    service.summaryAggregation = { assessedAttackPatternCountBySophisicationLevel: null, totalAttackPatternCountBySophisicationLevel: null, attackPatternsByAssessedObject: null };
    expect(service.isSummaryAggregationValid()).toBe(false);
    service.summaryAggregation = { assessedAttackPatternCountBySophisicationLevel: { index: null, count: null }, totalAttackPatternCountBySophisicationLevel: null, attackPatternsByAssessedObject: null };
    expect(service.isSummaryAggregationValid()).toBe(false);
    service.summaryAggregation = {
      assessedAttackPatternCountBySophisicationLevel: { index: null, count: null },
      totalAttackPatternCountBySophisicationLevel: { index: null, count: null }, attackPatternsByAssessedObject: null
    };
    expect(service.isSummaryAggregationValid()).toBe(true);
    service.summaryAggregation = {
      assessedAttackPatternCountBySophisicationLevel: null,
      totalAttackPatternCountBySophisicationLevel: { index: null, count: null }, attackPatternsByAssessedObject: null
    };
    expect(service.isSummaryAggregationValid()).toBe(false);
  }));

  it('calculate option names for threshold graphs based on question data', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    const defaultOptions = [
      { name: 'Mitigation Threshold', risk: 0 },
      { name: 'Mitigation Threshold', risk: .25 },
      { name: 'Mitigation Threshold', risk: .5 },
      { name: 'Mitigation Threshold', risk: .75 },
      { name: 'Mitigation Threshold', risk: 1 }];
    service.calculateThresholdOptionNames(null);
    expect(service.thresholdOptions).toEqual(defaultOptions);
    service.calculateThresholdOptionNames({ name: null, risk: null, options: null, selected_value: null });
    expect(service.thresholdOptions).toEqual(defaultOptions);
    service.calculateThresholdOptionNames({ name: null, risk: null, options: [], selected_value: null });
    expect(service.thresholdOptions).toEqual(defaultOptions);
    service.calculateThresholdOptionNames({ name: null, risk: null, options: [{ name: null, risk: 0 }], selected_value: null });
    expect(service.thresholdOptions).toEqual([{ name: '', risk: 0 }]);
    service.calculateThresholdOptionNames({ name: null, risk: null, options: [{ name: ' ', risk: 0 }], selected_value: null });
    expect(service.thresholdOptions).toEqual([{ name: ' ', risk: 0 }]);
    service.calculateThresholdOptionNames({ name: null, risk: null, options: [{ name: 'abbas', risk: 0 }], selected_value: null });
    expect(service.thresholdOptions).toEqual([{ name: 'Abbas', risk: 0 }]);
    service.calculateThresholdOptionNames({ name: null, risk: null, options: [{ name: 'abbas', risk: 0 }, { name: 'brian', risk: 0 }, { name: 'chris columbus and son', risk: 0 }], selected_value: null });
    expect(service.thresholdOptions).toEqual([{ name: 'Abbas', risk: 0 }, { name: 'Brian', risk: 0 }, { name: 'Chris Columbus and Son', risk: 0 }]);
  }));

  it('convert a number to a sophistication value', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.sophisticationValueToWord(null)).toBe('Unknown');
    expect(service.sophisticationValueToWord(0)).toBe('Novice');
    expect(service.sophisticationValueToWord(1)).toBe('Practitioner');
    expect(service.sophisticationValueToWord(2)).toBe('Expert');
    expect(service.sophisticationValueToWord(3)).toBe('Innovator');
    expect(service.sophisticationValueToWord(4)).toBe('4');
  }));

  it('convert a number string to a sophistication value', inject([SummaryCalculationService], (service: SummaryCalculationService) => {
    expect(service.sophisticationNumberToWord(null)).toBe('Unknown');
    expect(service.sophisticationNumberToWord('1')).toBe('Practitioner');
    expect(service.sophisticationNumberToWord('20')).toBe('20');
  }));

});
