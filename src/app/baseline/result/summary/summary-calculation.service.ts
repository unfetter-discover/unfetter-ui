import { Injectable } from '@angular/core';
import { BaselineObject } from '../../../models/baseline/baseline-object';
import { RiskByAttack3 } from '../../../models/baseline/risk-by-attack3';
import { Phase3 } from '../../../models/baseline/phase3';
import { AttackPattern } from '../../../models/attack-pattern';
import { AssessAttackPattern } from '../../../models/baseline/assess-attack-pattern';
import { SummarySortHelper } from './summary-sort-helper';
import { Stix } from '../../../models/stix/stix';
import { RiskByKillChain } from '../../../models/assess/risk-by-kill-chain';
import { AssessKillChainType } from '../../../models/assess/assess-kill-chain-type';
import { SummaryAggregation } from '../../../models/assess/summary-aggregation';
import { Constance } from '../../../utils/constance';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ThresholdOption } from '../../models/threshold-option';
import { BaselineQuestion } from '../../../models/baseline/baseline-question';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';

@Injectable()
export class SummaryCalculationService {
  public readonly topNRisks: number;
  public readonly riskSub: BehaviorSubject<number>;
  // Combine with riskSub??
  selectedRiskValue: number;
  numericRiskValue: number;
  weaknessValue: string;
  topRisksValue: AssessKillChainType[];
  summaryAggregationValue: SummaryAggregation;
  barColorsValue: any[];

  baselinesGroupingTotalValue: any;
  baselinesGroupingFilteredValue: any;
  techniqueBreakdownValue: any;
  baselineObjects: BaselineObject[];
  thresholdOptionsValue: ThresholdOption[];

  baselineValue: AssessmentSet;

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
    this.riskSub = new BehaviorSubject<number>(null);
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
    this.recalculateDependents();
    // Allow subscribers to use the new data
    this.riskSub.next(newSelectedRisk);
  }

  public set baselinesGroupingTotal(newAssessmentsGroupingTotal: any) {
    this.baselinesGroupingTotalValue = newAssessmentsGroupingTotal;
  }

  public set baselinesGroupingFiltered(newAssessmentsGroupingFiltered: any) {
    this.baselinesGroupingFilteredValue = newAssessmentsGroupingFiltered;
  }

  public set techniqueBreakdown(newTechniqueBreakdown: any) {
    this.techniqueBreakdownValue = newTechniqueBreakdown;
  }

  public set thresholdOptions(newThresholdOptions: ThresholdOption[]) {
    this.thresholdOptionsValue = newThresholdOptions;
  }

  public set baseline(newBaseline: AssessmentSet) {
    this.baselineValue = newBaseline;
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

  public get selectedRisk(): number {
    return this.selectedRiskValue;
  }

  public getSelectedRiskSub() {
    return this.riskSub.subscribe((value: number) => this.riskSub.next(this.selectedRisk));
  }

  public get baselinesGroupingTotal(): any {
    return this.baselinesGroupingTotalValue;
  }

  public get baselinesGroupingFiltered(): any {
    return this.baselinesGroupingFilteredValue;
  }

  public get techniqueBreakdown(): any {
    return this.techniqueBreakdownValue;
  }

  public get thresholdOptions(): ThresholdOption[] {
    return this.thresholdOptionsValue;
  }

  public get baseline(): AssessmentSet {
    return this.baselineValue;
  }

  public getRiskText(): string {
    return Number((this.numericRisk) * 100).toFixed(0);
  }

  public setAverageRiskPerAssessedObject(baselines: Array<BaselineObject>): void {
    this.numericRisk = this.calculateAvgRiskPerAssessedObject(baselines);
  }

  public calculateAvgRiskPerAssessedObject(baselines: Array<BaselineObject<Stix>>): number {
    let aggregateRisk = 0;
    let length = 1;
    if (baselines) {
      baselines.forEach((baseline) => {
        // TODO: update for baselines 3.0
        // if (baseline.risk && typeof baseline.risk === 'number') {
        //   aggregateRisk += baseline.risk;
        // }
      });
      if (baselines.length > 0) {
        length = baselines.length;
      }
    }
    return aggregateRisk / length;
  }

  public calculateAvgRiskPerPhase(phase: Phase3): number {
    let risk = 0;
    if (phase && phase.assessedObjects && phase.assessedObjects.length > 0) {
      risk = this.calculateAvgRiskPerAssessedObject(phase.assessedObjects);
    }
    return risk;
  }

  public calculateWeakness(riskByAttackPattern: RiskByAttack3): void {
    let weakness: string = '';
    if (riskByAttackPattern && riskByAttackPattern.phases && riskByAttackPattern.phases.length > 0) {
      const phases: Phase3[] = riskByAttackPattern.phases;
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

  public recalculateDependents() {
    this.repopulateAssessmentsGrouping();
    this.repopulateTechniqueBreakdown();
  }

  public repopulateAssessmentsGrouping(): void {
    this.populateAssessmentsGrouping(this.baselineObjects);
  }

  /**
   * @description
   *  populate kill chain grouping and baseline object tallies for baseline grouping chart
   * @returns {void}
   */
  public populateAssessmentsGrouping(baselineObjects: BaselineObject[]): void {
    this.baselineObjects = baselineObjects;
    const includedIds = this.filterOnRisk(baselineObjects);
    const killChainTotal = {};
    const killChainFiltered = {};

    if (this.summaryAggregation && this.summaryAggregation.attackPatternsByAssessedObject) {
      const tally = (tallyObject: object) => {
        return (assessedObject) => {
          // flat map kill chain names
          let result = null;
          if (assessedObject && assessedObject.attackPatterns) {
            const killChainNames = assessedObject.attackPatterns
              .reduce((memo, pattern) => memo.concat(pattern['kill_chain_phases']), []);
            const names: string[] = killChainNames.map((chain) => chain ? chain['phase_name'].toLowerCase() as string : '');
            const uniqNames: string[] = Array.from(new Set(names));
            names.forEach((name) => tallyObject[name] = tallyObject[name] ? tallyObject[name] + 1 : 1);
            result = assessedObject;
          }
          return result;
        };
      };

      // Find assessed-objects to kill chain maps grouping
      this.summaryAggregation.attackPatternsByAssessedObject
        // tally totals
        .map(tally(killChainTotal))
        .filter((aoToApMap) => (aoToApMap && aoToApMap._id) ? includedIds.includes(aoToApMap._id) : null)
        // tally filtered objects
        .map(tally(killChainFiltered));
    }

    this.baselinesGroupingTotal = killChainTotal;
    this.baselinesGroupingFiltered = killChainFiltered;
  }

  public repopulateTechniqueBreakdown() {
    this.populateTechniqueBreakdown(this.baselineObjects);
  }

  /**
   * @description
   *  populate grouping and baseline object tallies for technique by skill chart
   * @returns {void}
   */
  public populateTechniqueBreakdown(baselineObjects: BaselineObject[]): void {

    this.techniqueBreakdown = {};
    if (baselineObjects && this.summaryAggregation && this.summaryAggregation.attackPatternsByAssessedObject && this.summaryAggregation.assessedAttackPatternCountBySophisicationLevel) {
      this.baselineObjects = baselineObjects;
      // Total assessed objects to calculated risk
      const assessedRiskMapping = this.summaryAggregation.assessedAttackPatternCountBySophisicationLevel;
      const includedIds = this.filterOnRisk(baselineObjects);
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

      for (const prop in Object.keys(assessedRiskMapping)) {
        if (attackPatternSetMap[prop] === undefined) {
          this.techniqueBreakdown[prop] = 0;
        } else {
          this.techniqueBreakdown[prop] = attackPatternSetMap[prop] / (assessedRiskMapping[prop]);
        }
      }
    }
  }

  /**
   * @description
   *  Find IDs that meet risk threshold
   * @returns {string[]}
   */
  public filterOnRisk(baseline_objects: BaselineObject[]): string[] {
    let filteredIds: string[] = [];
    if (baseline_objects) {
      const includedIds: string[] = baseline_objects
        // TODO: update for baselines 3.0
        // .filter((ao) => ((ao.risk || ao.risk === 0) && ao.risk <= this.selectedRisk && (ao.stix && ao.stix.id)))
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
    let value = '';
    switch (num) {
      case 0:
        value = 'Novice';
        break;
      case 1:
        value = 'Practitioner';
        break;
      case 2:
        value = 'Expert';
        break;
      case 3:
        value = 'Innovator';
        break;
      default:
        if (!num) {
          value = 'Unknown';
        } else {
          value = num.toString();
        }
    }
    return value;
  }

  public calculateThresholdOptionNames(questionData: BaselineQuestion) {
    // Default
    this.thresholdOptions = [
      { name: 'Mitigation Threshold', risk: 0 },
      { name: 'Mitigation Threshold', risk: .25 },
      { name: 'Mitigation Threshold', risk: .5 },
      { name: 'Mitigation Threshold', risk: .75 },
      { name: 'Mitigation Threshold', risk: 1 }];

    // TODO: Update for baselines 3.0
    return this.thresholdOptions[0];
    // if (questionData && questionData.options && questionData.options.length > 0) {
    //   this.thresholdOptions = questionData.options;
    //   this.thresholdOptions = this.thresholdOptions.map((option: ThresholdOption): ThresholdOption => {
    //     if (!option.name) {
    //       option.name = '';
    //     }
    //     option.name = option.name.replace(/\b([a-z])(\w+)/g, this.capitalizeWithExceptions);
    //     return option;
    //   });
    // } else {
    //   console.error('Failed to read question data for given baseline question; using default values.');
    // }
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

  public convertLabel(unconvertedLabel: string): string {
    let convertedLabel: string = '';
    if (unconvertedLabel) {
      convertedLabel = this.convertLabels([unconvertedLabel])[0];
    }
    return convertedLabel;
  }

  public convertLabels(unconvertedLabels: string[]): string[] {
    let convertedLabels: string[] = [];
    if (unconvertedLabels) {
      convertedLabels = unconvertedLabels.map((word) => {
        if (!word) {
          word = '';
        }
        word = word.replace(/-/g, ' ');
        const tempWord = word;
        word = word.replace(/\b([a-z])(\w+)/g, this.capitalizeWithExceptions);
        if (word === tempWord) {
          word = word.replace(/\b([a-z])/g, this.capitalizeSingleLetter);
        }
        return word;
      });
    }
    return convertedLabels;
  }

  public capitalizeSingleLetter(letter: string): string {
    let capitalizedValue = '';
    if (letter) {
      if (letter.length > 1) { // Not a single letter, return unchanged
        capitalizedValue = letter;
      } else {
        capitalizedValue = letter.toUpperCase();
      }
    }
    return capitalizedValue;
  }

  public capitalizeWithExceptions(fullString: string, firstLetter: string, restOfString: string): string {
    let capitalizedValue = fullString;
    if (fullString) {
      capitalizedValue = fullString.toLowerCase();
      if (capitalizedValue !== 'and' && capitalizedValue !== 'or' && capitalizedValue !== 'the'
        && capitalizedValue !== 'of' && capitalizedValue !== 'on' && capitalizedValue !== 'but' && firstLetter) {
        capitalizedValue = firstLetter.toUpperCase();
        if (restOfString) {
          capitalizedValue += restOfString.toLowerCase();
        }
      }
    }
    return capitalizedValue;
  }

  /**
 * @description
 *  render legend for top of threshold graphs
 * @returns {void}
 */
  public renderLegend(): string {
    let label = 'At or Above';
    let name = 'Mitigation Threshold'
    if (this.thresholdOptions) {
      const option = this.thresholdOptions.find((opt) => opt.risk === this.selectedRisk);
      if (option && option.name) {
        name = option.name;
      }
    }
    return `${label} '${name}'`;
  }
}
