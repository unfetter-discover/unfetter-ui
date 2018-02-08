import { Injectable } from '@angular/core';
import { AssessmentObject } from '../../../models/assess/assessment-object';
import { RiskByAttack } from '../../../models/assess/risk-by-attack';
import { Phase } from '../../../models/assess/phase';
import { AttackPattern } from '../../../models/attack-pattern';
import { AssessAttackPattern } from '../../../models/assess/assess-attack-pattern';
import { SummarySortHelper } from './summary-sort-helper';
import { Stix } from '../../../models/stix/stix';

@Injectable()
export class SummaryCalculationService {
  numericRiskValue: number;
  weaknessValue: string;

  constructor() {
    this.numericRisk = 0;
    this.weakness = '';
  }

  public set numericRisk(newRisk: number) {
    this.numericRiskValue = newRisk;
  }

  public set weakness(newWeakness: string) {
    this.weaknessValue = newWeakness;
  }

  public get numericRisk() {
    return this.numericRiskValue;
  }

  public get weakness() {
    return this.weaknessValue;
  }

  public getRiskText(): string {
    return Number((this.numericRisk) * 100).toFixed(0);
  }

  public setAverageRiskPerAssessedObject(assessments: Array<AssessmentObject>): void {
    this.numericRisk = this.calculateAvgRiskPerAssessedObject(assessments);
  }

  public calculateAvgRiskPerAssessedObject(assessments: Array<AssessmentObject<Stix>>): number {
    let aggregateRisk = 0;
    let length = 1;
    if (assessments) {
      assessments.forEach((assessment) => {
        if (assessment.risk && typeof assessment.risk === 'number') {
          aggregateRisk += assessment.risk;
        }
      });
      if (assessments.length > 0) {
        length = assessments.length;
      }
    }
    return aggregateRisk / length;
  }

  public calculateAvgRiskPerPhase(phase: Phase): number {
    let risk = 0;
    if (phase && phase.assessedObjects && phase.assessedObjects.length > 0) {
      risk = this.calculateAvgRiskPerAssessedObject(phase.assessedObjects);
    }
    return risk;
  }

  public calculateWeakness(riskByAttackPattern: RiskByAttack) {
    let weakness: string = '';
    if (riskByAttackPattern && riskByAttackPattern.phases && riskByAttackPattern.phases.length > 0) {
      const phases: Phase[] = riskByAttackPattern.phases;
      for (let phase of phases) {
        phase.avgRisk = this.calculateAvgRiskPerPhase(phase);
      }
      const weakestPhaseId = phases.sort(SummarySortHelper.sortByAvgRiskDesc())[0]._id || '';
      const attackPatternsByKillChain = riskByAttackPattern.attackPatternsByKillChain;
      const riskiestAttackPattern = attackPatternsByKillChain.find((el) => el._id === weakestPhaseId);
      if (riskiestAttackPattern && riskiestAttackPattern.attackPatterns && riskiestAttackPattern.attackPatterns.length > 0) {
        const attackPatterns = riskiestAttackPattern.attackPatterns;
        const weakestAttackPatternDescription: string = attackPatterns.sort(SummarySortHelper.sortBySophisticationAsc())[0].description || '';
        if (weakestAttackPatternDescription && weakestAttackPatternDescription.length > 0) {
          weakness = weakestAttackPatternDescription;
        }
      }
    }
    this.weakness = weakness;
  }
}
