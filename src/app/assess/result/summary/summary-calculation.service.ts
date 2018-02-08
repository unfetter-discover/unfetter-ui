import { Injectable } from '@angular/core';
import { AssessmentObject } from '../../../models/assess/assessment-object';
import { RiskByAttack } from '../../../models/assess/risk-by-attack';
import { Phase } from '../../../models/assess/phase';
import { AttackPattern } from '../../../models/attack-pattern';
import { AssessAttackPattern } from '../../../models/assess/assess-attack-pattern';
import { SummarySortHelper } from './summary-sort-helper';
import { Stix } from '../../../models/stix/stix';
import { RiskByKillChain } from '../../../models/assess/risk-by-kill-chain';
import { AssessKillChainType } from '../../../models/assess/assess-kill-chain-type';

@Injectable()
export class SummaryCalculationService {
  public readonly topNRisks: number;
  numericRiskValue: number;
  weaknessValue: string;
  topRisksValue: AssessKillChainType [];

  constructor() {
    this.numericRisk = 0;
    this.weakness = '';
    this.topNRisks = 3;
  }

  public set numericRisk(newRisk: number) {
    this.numericRiskValue = newRisk;
  }

  public set weakness(newWeakness: string) {
    this.weaknessValue = newWeakness;
  }

  public set topRisks(newTopRisks: AssessKillChainType []) {
    this.topRisksValue = newTopRisks;
  }

  public get numericRisk(): number {
    return this.numericRiskValue;
  }

  public get weakness(): string {
    return this.weaknessValue;
  }

  public get topRisks(): AssessKillChainType [] {
    return this.topRisksValue;
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

  public calculateWeakness(riskByAttackPattern: RiskByAttack): void {
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

  public calculateTopRisks(riskByKillChain: RiskByKillChain): void {
    let topRisks: AssessKillChainType [] = [];
    const risks: AssessKillChainType [] = this.retrieveAssessmentRisks(riskByKillChain);
    this.topRisks = risks; // .sort(SummarySortHelper.sortByRiskDesc());
    this.topRisks = this.topRisks.slice(0, this.topNRisks);
    this.topRisks.forEach((el) => {
        const objects = el.objects || [];
        el.objects = objects; // .sort(SummarySortHelper.sortByRiskDesc());
        el.objects = el.objects.slice(0, this.topNRisks);
    });

    this.topRisks = topRisks;
  }

  public retrieveAssessmentRisks(riskByKillChain: RiskByKillChain[]): AssessKillChainType[] {
    let risks: AssessKillChainType [] = [];
    

    return risks;
  }
}
