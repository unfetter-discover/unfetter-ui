import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentsDashboardService } from './assessments-dashboard.service';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'assessments-dashboard',
    templateUrl: './assessments-dashboard.component.html',
    styleUrls: ['./assessments-dashboard.component.css']
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
    public doughnutChartType: string = 'doughnut';
    public doughnutChartColors: Object[] = [{}];
    public chartOptions: Object = {
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    let allData = data.datasets[tooltipItem.datasetIndex].data;
                    let tooltipLabel = data.labels[tooltipItem.index];
                    let tooltipData = allData[tooltipItem.index];
                    let total = 0;
                    allData.forEach(
                        (d) => {
                         total += d;
                    });
                    let tooltipPercentage = Math.round((tooltipData / total) * 100);
                    return `${tooltipLabel}: ${tooltipPercentage}%`;
                }
            }
        }
    };

    private assessment: any;
    private riskByAttackPattern: any;
    private unassessedPhases: String;
    private riskBreakdown: any;
    private processingComplete: boolean = false;

    constructor(
        private assessmentsDashboardService: AssessmentsDashboardService,
        private route: ActivatedRoute
    ) {}

    public ngOnInit() {
        let id = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : ''; this.assessment = {};
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
                    this.doughnutChartData[0].data = [this.riskByAttackPattern.totalRisk, (1 - this.riskByAttackPattern.totalRisk)];
                    this.populateUnassessedPhases();
                    this.calculateRiskBreakdown();
                    this.processingComplete = true;
                },
                (err) => console.log(err)
            );
    }

    public calculateRiskBreakdown() {
        let phases = this.riskByAttackPattern.phases;        
        
        let riskTree = {};

        if (phases !== undefined) {            
            phases.forEach(phase => {                
                riskTree[phase._id] = {};

                phase.scores.forEach(score => {
                    score.questions.forEach(question => {
                        if (riskTree[phase._id][question.name] === undefined) {
                            riskTree[phase._id][question.name] = [];
                        }
                        riskTree[phase._id][question.name].push(question.risk);                       
                    });
                });
            });
        }               

        this.riskBreakdown = {};
        for(let phase in riskTree) {
            this.riskBreakdown[phase] = {};
            for(let question in riskTree[phase]) {                
                /* Average risk for each question-category, 
                 then multiply it by 1 / the number of question-categories.
                 This will show how much each question contributes to absolute overall risk. */
                this.riskBreakdown[phase][question] = (riskTree[phase][question]
                    .reduce((prev, cur) => prev += cur, 0)
                    / riskTree[phase][question].length) * (1 / Object.keys(riskTree[phase]).length);
            }            
        }        
    }

    public getNumAttackPatterns(phaseName) {
        let attackPatternsByKillChain = this.riskByAttackPattern.attackPatternsByKillChain;
        // console.log(attackPatternsByKillChain);
        // console.log(phaseName);

        for (let killPhase of attackPatternsByKillChain) {
            if (killPhase._id === phaseName && killPhase.attackPatterns !== undefined) {
                return killPhase.attackPatterns.length;
            }
        }
        return 0;
    }

    public populateUnassessedPhases() {
        let assessedPhases = this.riskByAttackPattern.phases.map((phase) => phase._id);
        this.unassessedPhases = Constance.KILL_CHAIN_PHASES
            .filter((phase) => assessedPhases.indexOf(phase) < 0)
            .reduce((prev, phase) => prev.concat(', '.concat(phase)), '')
            .slice(2);
    }

    public getQuestions(phaseName) {
        return 'stub';
    }
}
