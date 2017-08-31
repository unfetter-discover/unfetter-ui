import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttackPattern } from '../../models/attack-pattern';
import { Constance } from '../../utils/constance';
import { AssessmentChartComponent } from './assessment-chart/assessment-chart.component';
import { AssessmentsCalculationService } from './assessments-calculation.service';
import { AssessmentsSummaryService } from './assessments-summary.service';
import { AverageRisk } from './average-risk';
import { Risk } from './risk';
import { SortHelper } from './sort-helper';
import { ThresholdOption } from './threshold-option';
import { TechniquesChartComponent } from './techniques-chart/techniques-chart.component';

@Component({
    selector: 'assessments-summary',
    templateUrl: './assessments-summary.component.html',
    styleUrls: ['./assessments-summary.component.css']
})
export class AssessmentsSummaryComponent implements OnInit {
    @ViewChild('assessmentChart')
    public assessmentChart: AssessmentChartComponent;

    @ViewChild('techniquesChart')
    public techniquesChart: TechniquesChartComponent;

    public summary: any;
    public summaryDate: Date;
    public thresholdOptions: ThresholdOption[];
    public selectedRisk: number = 0.5;
    public id: string;
    public phaseNameGroups: any[];
    public riskLabelClass = 'label-info';
    public riskPerKillChain;
    public sortedRisks;
    public weakestAttackPatterns: AttackPattern[];
    public summaryAggregation: any;
    public techniqueBreakdown: any;

    public readonly topNRisks = 3;
    public readonly riskLevel = 0.50;
    public totalRiskValue: any;

    constructor(
        private assessmentsSummaryService: AssessmentsSummaryService,
        private assessmentsCalculationService: AssessmentsCalculationService,
        private route: ActivatedRoute
    ) {}

    public ngOnInit() {
        this.id = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : '';
        const getById$ = this.assessmentsSummaryService.getById(this.id).subscribe(
            (res) => {
                this.summary = res;
                const assessments = this.summary.attributes['assessment_objects'];
                if (assessments) {
                    const risk = this.assessmentsCalculationService.calculateRisk(assessments);
                    this.totalRiskValue = this.assessmentsCalculationService.formatRisk(risk);
                    this.riskLabelClass = risk > this.riskLevel ? 'label-warning' : 'label-default';

                    // set threshold dropdown options
                    const question = assessments[0].questions[0];
                    if (question) {
                        this.thresholdOptions = question.options;
                    }
                }

                this.summaryDate = new Date(this.summary.attributes.modified);
            },
            (err) => console.log(err),
            () => getById$.unsubscribe()
        );

        const summaryAggregation$ = this.assessmentsSummaryService.getSummaryAggregation(this.id).subscribe(
            (res) => {
                this.summaryAggregation = res;
                this.populateTechniqueBreakdown();
            },
            (err) => console.log(err),
            () => summaryAggregation$.unsubscribe()
        );

        const killChain$ = this.assessmentsSummaryService.getRiskPerKillChain(this.id).subscribe(
            (res) => {
                this.riskPerKillChain = res;
                const risks: Risk[] = this.retrieveAssessmentRisks(this.riskPerKillChain);
                this.sortedRisks = risks.sort(SortHelper.sortByRiskDesc());
                this.sortedRisks = this.sortedRisks.slice(0, this.topNRisks);
                this.sortedRisks.forEach((el) => {
                    const objects = el.objects || [];
                    el.objects = objects.sort(SortHelper.sortByRiskDesc());
                    el.objects = el.objects.slice(0, this.topNRisks);
                });
            },
            (err) => console.log(err),
            () => killChain$.unsubscribe());

        const attackPattern$ = this.assessmentsSummaryService.getRiskPerAttackPattern(this.id).subscribe(
            (res) => {
                const phases: AverageRisk[] = res.phases;
                const weakestPhaseId = phases.sort(SortHelper.sortByAvgRiskDesc())[0]._id || '';

                const attackPatternsByKillChain = res.attackPatternsByKillChain;
                const riskiestAttackPattern = attackPatternsByKillChain.find((el) => el._id === weakestPhaseId);

                if (!riskiestAttackPattern) {
                    console.error('did not find the riskiest attack pattern! attempting to move on...');
                    return;
                }

                const attackPatterns = riskiestAttackPattern.attackPatterns;
                this.weakestAttackPatterns = attackPatterns.sort(SortHelper.sortBySophisticationLevelAsc()) || [];
                this.weakestAttackPatterns = this.weakestAttackPatterns.slice(0, 1);
            },
            (err) => console.log(err),
            () => attackPattern$.unsubscribe());
    }

    public populateTechniqueBreakdown(): void {
        // Total assessed objects to calculated risk
        const assessedRiskMapping = this.summaryAggregation.assessedAttackPatternCountBySophisicationLevel;

        // Find IDs that meet risk threshold
        // TODO should be <= risk or < risk?
        const includedIds: any = this.summary.attributes.assessment_objects
            .filter((ao) => ao.risk <= this.selectedRisk)
            .map((ao) => ao.stix.id);

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
                this.techniqueBreakdown[prop] = attackPatternSetMap[prop] / assessedRiskMapping[prop];
            }
        }

        console.log('current assessment summary techinque breakdown', this.techniqueBreakdown);
    }

    public redrawCharts(): void {
        console.log('request to redraw charts with threshold', this.selectedRisk, this.thresholdOptions);
        // need to set this now, this change method doesnt seem to propogate the new value to the child until after this method
        this.assessmentChart.riskThreshold = this.selectedRisk;
        this.assessmentChart.renderChart();

        this.populateTechniqueBreakdown();
        this.techniquesChart.riskThreshold = this.selectedRisk;
        this.techniquesChart.techniqueBreakdown = this.techniqueBreakdown;
        this.techniquesChart.renderChart();
    }

    public calculateRisk(riskArr: Risk[]): string {
        const risk = this.assessmentsCalculationService.calculateRisk(riskArr);
        return this.assessmentsCalculationService.formatRisk(risk);
    }

    private getThresholdOptionName(optionNumber) {
        const curOpt = this.thresholdOptions.find((opt) => opt.risk === optionNumber);
        if (curOpt) {
            return curOpt.name;
        } else {
            return 'N/A';
        }
    }

    private retrieveAssessmentRisks(assessment): Risk[] {
        if (assessment.courseOfActions && assessment.courseOfActions.length > 0) {
            return assessment.courseOfActions;
        } else if (assessment.indicators && assessment.indicators.length > 0) {
            return assessment.indicators;
        } else if (assessment.sensors && assessment.sensors.length > 0) {
            return assessment.sensors;
        } else {
            console.error('could not find assessment type and thier risks!');
            return [];
        }
    }
}
