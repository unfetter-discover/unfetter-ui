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
import { SummaryAggregation } from '../../../models/assess/summary-aggregation';
import { Constance } from '../../../utils/constance';

@Injectable()
export class SummaryCalculationService {
  public readonly topNRisks: number;
  numericRiskValue: number;
  weaknessValue: string;
  topRisksValue: AssessKillChainType[];
  summaryAggregationValue: SummaryAggregation;
  barColorsValue: any[];
  selectedRiskValue: number;
  assessmentsGroupingTotalValue: any; // TODO specify
  assessmentsGroupingFilteredValue: any; // TODO specify
  techniqueBreakdownValue: any; // TODO specify

  constructor() {
    this.numericRisk = 0;
    this.weakness = '';
    this.topNRisks = 3;
    this.barColors = [
      {
        backgroundColor: Constance.MAT_COLORS['lightblue']['800']
      },
      {
        backgroundColor: Constance.MAT_COLORS['lightblue']['100']
      }
    ];
    this.selectedRisk = 0.5;
  }

  public set numericRisk(newRisk: number) {
    this.numericRiskValue = newRisk;
  }

  public set weakness(newWeakness: string) {
    this.weaknessValue = newWeakness;
  }

  public set topRisks(newTopRisks: AssessKillChainType[]) {
    this.topRisksValue = newTopRisks;
  }

  public set summaryAggregation(newSummaryAggregation: SummaryAggregation) {
    this.summaryAggregationValue = newSummaryAggregation;
  }

  public set barColors(newBarColors: any[]) {
    this.barColorsValue = newBarColors;
  }

  public set selectedRisk(newSelectedRisk: number) {
    this.selectedRiskValue = newSelectedRisk;
  }

  public set assessmentsGroupingTotal(newAssessmentsGroupingTotal: any) {
    this.assessmentsGroupingTotalValue = newAssessmentsGroupingTotal;
  }

  public set assessmentsGroupingFiltered(newAssessmentsGroupingFiltered: any) {
    this.assessmentsGroupingFilteredValue = newAssessmentsGroupingFiltered;
  }

  public set techniqueBreakdown(newTechniqueBreakdown: any) {
    this.techniqueBreakdownValue = newTechniqueBreakdown;
  }

  public get numericRisk(): number {
    return this.numericRiskValue;
  }

  public get weakness(): string {
    return this.weaknessValue;
  }

  public get topRisks(): AssessKillChainType[] {
    return this.topRisksValue;
  }
  public get barColors(): any[] {
    return this.barColorsValue;
  }

  public get summaryAggregation() {
    return this.summaryAggregationValue;
  }

  public get selectedRisk() {
    return this.selectedRiskValue;
  }

  public get assessmentsGroupingTotal(): any {
    return this.assessmentsGroupingTotalValue;
  }

  public get assessmentsGroupingFiltered(): any {
    return this.assessmentsGroupingFilteredValue;
  }

  public get techniqueBreakdown(): any {
    return this.techniqueBreakdownValue;
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
    let topRisks: AssessKillChainType[] = [];
    const risks: AssessKillChainType[] = this.retrieveAssessmentRisks(riskByKillChain);
    risks.sort(SummarySortHelper.sortByRiskDesc())
    topRisks = risks.slice(0, this.topNRisks);
    topRisks.forEach((el) => {
      const objects = el.objects || [];
      el.objects = objects.sort(SummarySortHelper.sortByRiskDesc());
      el.objects = el.objects.slice(0, this.topNRisks);
    });

    this.topRisks = topRisks;
  }

  public retrieveAssessmentRisks(riskByKillChain: RiskByKillChain): AssessKillChainType[] {
    let risks: AssessKillChainType[] = [];
    if (riskByKillChain) {
      if (riskByKillChain.courseOfActions && riskByKillChain.courseOfActions.length > 0) {
        risks = risks.concat(riskByKillChain.courseOfActions);
      }
      if (riskByKillChain.indicators && riskByKillChain.indicators.length > 0) {
        risks = risks.concat(riskByKillChain.indicators);
      }
      if (riskByKillChain.sensors && riskByKillChain.sensors.length > 0) {
        risks = risks.concat(riskByKillChain.sensors);
      }
    }
    return risks;
  }

  /**
 * @description
 *  populate kill chain grouping and assessment object tallies for assessment grouping chart
 * @returns {void}
 */
  public populateAssessmentsGrouping(assessmentObjects: AssessmentObject[]): void {
    const includedIds = this.filterOnRisk(assessmentObjects);
    const killChainTotal = {};
    const killChainFiltered = {};

    if (this.summaryAggregation) {
      const tally = (tallyObject: object) => {
        return (assessedObject) => {
          // flat map kill chain names
          const killChainNames = assessedObject.attackPatterns
            .reduce((memo, pattern) => memo.concat(pattern['kill_chain_phases']), []);
          const names: string[] = killChainNames.map((chain) => chain['phase_name'].toLowerCase() as string);
          const uniqNames: string[] = Array.from(new Set(names));
          names.forEach((name) => tallyObject[name] = tallyObject[name] ? tallyObject[name] + 1 : 1);
          return assessedObject;
        };
      };

      // Find assessed-objects to kill chain maps grouping
      this.summaryAggregation.attackPatternsByAssessedObject
        // tally totals
        .map(tally(killChainTotal))
        .filter((aoToApMap) => includedIds.includes(aoToApMap._id))
        // tally filtered objects
        .map(tally(killChainFiltered));
    }

    this.assessmentsGroupingTotal = killChainTotal;
    this.assessmentsGroupingFiltered = killChainFiltered;
  }

  /**
   * @description
   *  populate grouping and assessment object tallies for technique by skill chart
   * @returns {void}
   */
  public populateTechniqueBreakdown(assessmentObjects: AssessmentObject[]): void {
    // Total assessed objects to calculated risk
    const assessedRiskMapping = this.summaryAggregation.assessedAttackPatternCountBySophisicationLevel;
    const includedIds = this.filterOnRisk(assessmentObjects);
    const attackPatternSet = new Set();
    // Find assessed-objects-to-attack-patterns maps that meet those Ids
    this.summaryAggregation.attackPatternsByAssessedObject
      .filter((aoToApMap) => includedIds.includes(aoToApMap._id))
      .forEach((aoToApMap) => {
        aoToApMap.attackPatterns.forEach((ap) => {
          attackPatternSet.add(JSON.stringify(ap));
        });
      });

    const attackPatternSetMap = {};
    attackPatternSet.forEach((ap) => {
      const curAp = JSON.parse(ap);
      if (attackPatternSetMap[curAp['x_unfetter_sophistication_level']] === undefined) {
        attackPatternSetMap[curAp['x_unfetter_sophistication_level']] = 0;
      }
      ++attackPatternSetMap[curAp['x_unfetter_sophistication_level']];
    });

    this.techniqueBreakdown = {};
    for (const prop in Object.keys(assessedRiskMapping)) {
      if (attackPatternSetMap[prop] === undefined) {
        this.techniqueBreakdown[prop] = 0;
      } else {
        this.techniqueBreakdown[prop] = attackPatternSetMap[prop] / (assessedRiskMapping[prop]);
      }
    }
  }

  /**
   * @description
   *  Find IDs that meet risk threshold
   *  TODO should be <= risk or < risk?
   * @returns {string[]}
   */
  public filterOnRisk(assessment_objects: AssessmentObject[]): string[] {
    let filteredIds: string[] = [];
    if (assessment_objects) {
      const includedIds: string[] = assessment_objects // TODO fix...or active...or this is a roll-up?
        .filter((ao) => ao.risk <= this.selectedRisk)
        .map((ao) => ao.stix.id);
      filteredIds = includedIds;
    }
    return filteredIds;
  }

  public sophisticationNumberToWord(num: string): string {
    const val = parseInt(num, 10);
    return this.sophisticationValueToWord(val);
  }

  public sophisticationValueToWord(num: number): string {
    switch (num) {
      case 0:
        return 'Novice';
      case 1:
        return 'Practitioner';
      case 2:
        return 'Expert';
      case 3:
        return 'Innovator';
      default:
        return num.toString();
    }
  }

  public isSummaryAggregationValid(): boolean {
    let valid = false;
    if (this.summaryAggregation &&
      this.summaryAggregation.assessedAttackPatternCountBySophisicationLevel &&
      this.summaryAggregation.totalAttackPatternCountBySophisicationLevel) {
      valid = true;
    }
    return valid;
  }
}
