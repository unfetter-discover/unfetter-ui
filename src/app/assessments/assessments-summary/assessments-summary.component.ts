import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'assessments-summary',
    templateUrl: './assessments-summary.component.html',
    styleUrls: ['./assessments-summary.component.css']
})
export class AssessmentsSummaryComponent implements OnInit, AfterViewInit {
    @ViewChildren('assessmentChart')
    public assessmentChartComponents: QueryList<AssessmentChartComponent>;
    public assessmentChart: AssessmentChartComponent;

    @ViewChildren('techniquesChart')
    public techniquesChartComponents: QueryList<TechniquesChartComponent>;
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
    public riskByAttackPattern: RiskByAttackPattern;
    public assessmentsGroupingTotal: any;
    public assessmentsGroupingFiltered: any;

    public readonly topNRisks = 3;
    public readonly riskLevel = 0.50;
    public totalRiskValue: any;

    private readonly subscriptions: Subscription[] = [];

    constructor(
        private assessmentsSummaryService: AssessmentsSummaryService,
        private assessmentsCalculationService: AssessmentsCalculationService,
        private route: ActivatedRoute
    ) { }

    /**
     * @description
     *  initialize this component, fetching data from backend
     */
    public ngOnInit() {
        this.id = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : '';

        const getById$ = this.assessmentsSummaryService.getById(this.id);
        const summaryAggregation$ = this.assessmentsSummaryService.getSummaryAggregation(this.id);
        const killChain$ = this.assessmentsSummaryService.getRiskPerKillChain(this.id);
        const attackPattern$ = this.assessmentsSummaryService.getRiskPerAttackPattern(this.id);
        const sub = Observable.combineLatest(getById$, summaryAggregation$, killChain$, attackPattern$)
            .subscribe((val) => {
                const [getByIdResp, summaryAggregationResp, killChainResp, attackPatternResp ] = val;
                this.getByIdRespHandler(getByIdResp);
                this.summaryAggregationRespHandler(summaryAggregationResp);
                this.killChainRespHandler(killChainResp);
                this.attackPatternResponseHandler(attackPatternResp);
                this.populateAssessmentsGrouping();
                this.populateTechniqueBreakdown();
            },
            (err) => console.log(err));
        this.subscriptions.push(sub);
    }

    /**
     * @description initialize childern
     */
    public ngAfterViewInit(): void {
        const sub1 = Observable
            .combineLatest(this.assessmentChartComponents.changes, this.techniquesChartComponents.changes)
            .subscribe(
                (val: any[]) => {
                    const [ assessmentCharts, techniqueCharts ] = val;
                    this.assessmentChart = assessmentCharts.first;
                    this.techniquesChart = techniqueCharts.first;
                    console.log(this.assessmentChart, this.techniquesChart);
            },
            (err) => console.log(err)
            );
        this.subscriptions.push(sub1);
    }

    /**
     * @description clean up subscription on destroy of this component
     */
    public ngDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    /**
     * @description
     *  populate grouping and assessment object tallies for technique by skill chart
     * @returns {void}
     */
    public populateTechniqueBreakdown(): void {
        // Total assessed objects to calculated risk
        const assessedRiskMapping = this.summaryAggregation.assessedAttackPatternCountBySophisicationLevel;

        const includedIds = this.filterOnRisk();
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

    /**
     * @description
     *  populate kill chain grouping and assessment object tallies for assessment grouping chart
     * @returns {void}
     */
    public populateAssessmentsGrouping(): void {
        const includedIds = this.filterOnRisk();
        const killChainTotal = {};
        const killChainFiltered = {};

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

        this.assessmentsGroupingTotal = killChainTotal;
        this.assessmentsGroupingFiltered = killChainFiltered;
    }

    /**
     * @description
     *  regenerate grouping and counts then tell charts to refresh. called on threshold change
     * @returns {void}
     */
    public redrawCharts(): void {
        console.log('request to redraw charts with threshold', this.selectedRisk, this.thresholdOptions);
        // need to set this now, this change method doesnt seem to propogate the new value to the child until after this method
        this.populateAssessmentsGrouping();
        this.assessmentChart.riskThreshold = this.selectedRisk;
        this.assessmentChart.assessmentsGroupingFiltered = this.assessmentsGroupingFiltered;
        this.assessmentChart.assessmentsGroupingTotal = this.assessmentsGroupingTotal;
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

    public getThresholdOptionName(optionNumber) {
        const curOpt = this.thresholdOptions.find((opt) => opt.risk === optionNumber);
        if (curOpt) {
            return curOpt.name;
        } else {
            return 'N/A';
        }
    }

    public getByIdRespHandler(res): void {
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
    }

    public summaryAggregationRespHandler(res): void {
        this.summaryAggregation = res;
    }

    public killChainRespHandler(res): void {
        this.riskPerKillChain = res;
        const risks: Risk[] = this.retrieveAssessmentRisks(this.riskPerKillChain);
        this.sortedRisks = risks.sort(SortHelper.sortByRiskDesc());
        this.sortedRisks = this.sortedRisks.slice(0, this.topNRisks);
        this.sortedRisks.forEach((el) => {
            const objects = el.objects || [];
            el.objects = objects.sort(SortHelper.sortByRiskDesc());
            el.objects = el.objects.slice(0, this.topNRisks);
        });
    }

    public attackPatternResponseHandler(res): void {
        this.riskByAttackPattern = res;
        const phases: AverageRisk[] = this.riskByAttackPattern.phases;
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

    /**
     * @description
     *  Find IDs that meet risk threshold
     *  TODO should be <= risk or < risk?
     * @returns {string[]}
     */
    private filterOnRisk(): string[] {
        const includedIds: string[] = this.summary.attributes.assessment_objects
            .filter((ao) => ao.risk <= this.selectedRisk)
            .map((ao) => ao.stix.id);
        return includedIds;
    }

}

interface RiskByAttackPattern {
    assessedByAttackPattern: any[];
    attackPatternsByKillChain: any[];
    phases: any[];

    links: { 'self': string } | any;
}
