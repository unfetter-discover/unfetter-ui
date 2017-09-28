import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentsDashboardService } from './assessments-dashboard.service';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'assessments-dashboard',
    templateUrl: './assessments-dashboard.component.html',
    styleUrls: ['./assessments-dashboard.component.scss']
})

export class AssessmentsDashboardComponent implements OnInit {
    public doughnutChartLabels: string[] = ['Risk Accepted', 'Risk Addressed', ];
    public doughnutChartData: any[] = [{
        data: [],
        backgroundColor: [
            Constance.COLORS.red,
            Constance.COLORS.green,
        ],
        hoverBackgroundColor: [
            Constance.COLORS.darkRed,
            Constance.COLORS.darkGreen,
        ]
    }];
    public riskBreakdownChartLabels: string[] = [];
    public riskBreakdownChartData: any[] = [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
    }];

    public doughnutChartType: string = 'doughnut';
    public doughnutChartColors = [{}];
    public chartOptions: object = {
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const allData = data.datasets[tooltipItem.datasetIndex].data;
                    const tooltipLabel = data.labels[tooltipItem.index];
                    const tooltipData = allData[tooltipItem.index];
                    let total = 0;
                    allData.forEach(
                        (d) => {
                         total += d;
                    });
                    const tooltipPercentage = Math.round((tooltipData / total) * 100);
                    return `${tooltipLabel}: ${tooltipPercentage}%`;
                }
            }
        },
        legend: {
            position: 'bottom',
        },
    };

    public assessment: any;
    public riskByAttackPattern: any;
    public unassessedPhases: any[];
    public riskBreakdown: any;
    public processingComplete: boolean = false;

    constructor(
        private assessmentsDashboardService: AssessmentsDashboardService,
        private route: ActivatedRoute
    ) {}

    public ngOnInit() {
        const id = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : ''; this.assessment = {};
        this.assessment['attributes'] = {};
        this.assessmentsDashboardService.getById(id).subscribe(
            (res) => {
                this.assessment = res ? res : {};
            },
            (err) => console.log(err)
        );

        this.assessmentsDashboardService.getRiskByAttackPattern(id)
            .subscribe(
                (res) => {
                    this.riskByAttackPattern = res ? res : {};
                    // TODO this doesn't work
                    // this.doughnutChartData[0].data = [this.riskByAttackPattern.totalRisk, (1 - this.riskByAttackPattern.totalRisk)];
                    this.populateUnassessedPhases();
                    this.calculateRiskBreakdown();
                    this.processingComplete = true;
                },
                (err) => console.log(err)
            );
    }

    public calculateRiskBreakdown() {
        const phases = this.riskByAttackPattern.phases;
        const assessedByAttackPattern = this.riskByAttackPattern.assessedByAttackPattern;

        const riskTree = {};

        if (phases !== undefined && assessedByAttackPattern !== undefined) {

            // Group data by kill chain phase, then question => set value array of risk values
            phases.forEach((phase) => {
                riskTree[phase._id] = {};

                // Assessed Objects per phase
                phase.assessedObjects.forEach((assessedObject) => {
                    // Questions per assessed object
                    assessedObject.questions.forEach((question) => {
                        if (riskTree[phase._id][question.name] === undefined) {
                            riskTree[phase._id][question.name] = [];
                        }
                        riskTree[phase._id][question.name].push(question.risk);
                    });
                });
            });

            // Calcuate average risk per question
            // TODO delete this
            const questionSet: any = new Set();
            this.riskBreakdown = {};
            for (let phase in riskTree) {
                this.riskBreakdown[phase] = {};
                for (let question in riskTree[phase]) {
                    questionSet.add(question);
                    /* Average risk for each question-category,
                     then multiply it by 1 / the number of question-categories.
                     This will show how much each question contributes to absolute overall risk. */
                    this.riskBreakdown[phase][question] = (riskTree[phase][question]
                        .reduce((prev, cur) => prev += cur, 0)
                        / riskTree[phase][question].length) * (1 / Object.keys(riskTree[phase]).length);
                }
            }

            const riskBreakdownTemp = {};

            for (let assessedObject of this.assessment.attributes.assessment_objects) {
                for (let question of assessedObject.questions) {
                    questionSet.add(question.name);
                    if (riskBreakdownTemp[question.name] === undefined) {
                        riskBreakdownTemp[question.name] = [];
                    }

                    riskBreakdownTemp[question.name].push(question.risk);
                }
            }

            let totalRisk = 0;
            const riskBreakdownAvg = {};

            for (let question in riskBreakdownTemp) {
                riskBreakdownAvg[question] = (riskBreakdownTemp[question]
                    .reduce((prev, cur) => prev += cur, 0)
                    / riskBreakdownTemp[question].length) * (1 / questionSet.size);
                totalRisk += riskBreakdownAvg[question];
            }

            this.doughnutChartData[0].data = [totalRisk, 1 - totalRisk];

            // Setup riskBreakdownChart & calculate average risk per question regardless of phase
            // let count;
            // let sum;
            let i = 0;
            questionSet.forEach((question) => {
                this.riskBreakdownChartLabels.push(question.charAt(0).toUpperCase() + question.slice(1));

                this.riskBreakdownChartData[0].backgroundColor.push(Constance.MAT_COLORS[Constance.MAT_GRAPH_COLORS[i]][500]);
                this.riskBreakdownChartData[0].hoverBackgroundColor.push(Constance.MAT_COLORS[Constance.MAT_GRAPH_COLORS[i]][800]);
                // sum = count = 0;
                // for (let phase in riskTree) {
                //     if (this.riskBreakdown[phase][question] !== undefined) {
                //         sum += this.riskBreakdown[phase][question];
                //         count++;
                //     }
                // }
                // this.riskBreakdownChartData[0].data.push(sum / count);
                this.riskBreakdownChartData[0].data.push(riskBreakdownAvg[question]);
                i++;
            });
            const riskAccepted = 1 - this.riskBreakdownChartData[0].data.reduce((prev, cur) => prev += cur, 0);
            this.riskBreakdownChartData[0].data.push(riskAccepted);
            this.riskBreakdownChartData[0].backgroundColor.push(Constance.COLORS.green);
            this.riskBreakdownChartData[0].hoverBackgroundColor.push(Constance.COLORS.darkGreen);
            this.riskBreakdownChartLabels.push('Risk Addressed');
        }

    }

    public getNumAttackPatterns(phaseName) {
        const attackPatternsByKillChain = this.riskByAttackPattern.attackPatternsByKillChain;
        for (const killPhase of attackPatternsByKillChain) {
            if (killPhase._id === phaseName && killPhase.attackPatterns !== undefined) {
                return killPhase.attackPatterns.length;
            }
        }
        return 0;
    }

    public populateUnassessedPhases() {
        const assessedPhases = this.riskByAttackPattern.phases.map((phase) => phase._id);
        this.unassessedPhases = Constance.KILL_CHAIN_PHASES
            .filter((phase) => assessedPhases.indexOf(phase) < 0);
    }
}
