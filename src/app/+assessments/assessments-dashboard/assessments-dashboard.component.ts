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
            '#F44336',
            '#4CAF50',
        ],
        hoverBackgroundColor: [
            '#C62828',
            '#2E7D32',
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
                    console.log(this.riskByAttackPattern);
                    this.doughnutChartData[0].data = [this.riskByAttackPattern.totalRisk, (1 - this.riskByAttackPattern.totalRisk)];

                    this.populateUnassessedPhases();
                },
                (err) => console.log(err)
            );
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
