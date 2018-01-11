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
    public riskBreakdownTemp: any;
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

    public populatePhaseRiskTree(phase: any) {
        const riskTree = {};

        // Assessed Objects per phase
        if (phase !== undefined && phase.assessedObjects !== undefined) {
            phase.assessedObjects.forEach((assessedObject) => {
                // Questions per assessed object
                if (assessedObject.questions !== undefined) {
                    assessedObject.questions.forEach((question) => {
                        if (riskTree[question.name] === undefined) {
                            riskTree[question.name] = [];
                        }
                        riskTree[question.name].push(question.risk);
                    });
                }
            });
        }
        return riskTree;
    }

    public calculateRiskBreakdownByQuestionForPhase(phaseRiskTree: any, questions: Set<string>) {
        const riskBreakdownPhase = {};
        if (questions !== undefined && phaseRiskTree !== undefined) {
            for (let question in phaseRiskTree) {
                questions.add(question);
                /* Average risk for each question-category,
                then multiply it by 1 / the number of question-categories.
                This will show how much each question contributes to absolute overall risk. */
                riskBreakdownPhase[question] = (phaseRiskTree[question]
                    .reduce((prev, cur) => prev += cur, 0)
                    / phaseRiskTree[question].length) * (1 / Object.keys(phaseRiskTree).length);
            }
        }
        return riskBreakdownPhase;
    }

    public populateRiskBreakdownByQuestionForAssessedQuestions(assessment: any, existingQuestions: Set<string>) {
        if (existingQuestions !== undefined && assessment !== undefined && assessment.questions !== undefined) {
            for (let question of assessment.questions) {
                existingQuestions.add(question.name);
                if (this.riskBreakdownTemp[question.name] === undefined) {
                    this.riskBreakdownTemp[question.name] = [];
                }
                this.riskBreakdownTemp[question.name].push(question.risk);
            }
        }
    }

    public calculateAverageRiskBreakdownForQuestion(risks: ReadonlyArray<number>, totalNumberOfQuestions: number) {
        let averageRiskBreakdown = 0;
        
        if (risks !== undefined && risks.length > 0 && totalNumberOfQuestions > 0) {
            const aggregateRisk = risks.reduce((total, current) => total += current, 0);
            
            averageRiskBreakdown = aggregateRisk / risks.length * (1 / totalNumberOfQuestions);
        }

        return averageRiskBreakdown;
    }

    public calculateRiskBreakdown() {
        const phases = this.riskByAttackPattern.phases;
        const assessedByAttackPattern = this.riskByAttackPattern.assessedByAttackPattern;

        const riskTree = {};

        if (phases !== undefined && assessedByAttackPattern !== undefined) {

            // Group data by kill chain phase, then question => set value array of risk values
            phases.forEach((phase) => {
                riskTree[phase._id] = this.populatePhaseRiskTree(phase);
            });

            // Calculate average risk per question
            // TODO delete this
            const questionSet: any = new Set();
            this.riskBreakdown = {};
            for (let phase in riskTree) {
                this.riskBreakdown[phase] = this.calculateRiskBreakdownByQuestionForPhase(riskTree[phase], questionSet);
            }

            this.riskBreakdownTemp = {};

            for (let assessedObject of this.assessment.attributes.assessment_objects) {
                this.populateRiskBreakdownByQuestionForAssessedQuestions(assessedObject, questionSet);
            }

            let totalRisk = 0;
            const riskBreakdownAvg = {};

            for (let question in this.riskBreakdownTemp) {
                riskBreakdownAvg[question] = this.calculateAverageRiskBreakdownForQuestion(this.riskBreakdownTemp[question], questionSet.size);
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
