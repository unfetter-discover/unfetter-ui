import { Component, OnInit, Input } from '@angular/core';
import { Constance } from '../../../utils/constance';
import { AssessmentsCalculationService } from '../assessments-calculation.service';

@Component({
    selector: 'sophistication-breakdown',
    templateUrl: './sophistication-breakdown.component.html',
    styleUrls: ['./sophistication-breakdown.component.css']
})
export class SophisticationBreakdownComponent implements OnInit {
    @Input('assessedAttackPatterns') private assessedAttackPatterns: any;
    @Input('allAttackPatterns') private allAttackPatterns: any;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        },
    };
    public barChartLabels: string[] = [];
    public barChartType: string = 'horizontalBar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { 
            data: [], 
            label: 'Assessed Attack Patterns',
            borderWidth: 0,
        },
        { 
            data: [], 
            label: 'Unassessed Attack Patterns',
            borderWidth: 0,
        }
    ];

    constructor(private assessmentsCalculationService: AssessmentsCalculationService){}

    ngOnInit() {
        this.barChartLabels = Object.keys(this.allAttackPatterns)
            .map(level => this.assessmentsCalculationService.sophisicationNumberToWord(level));

        for (let prop in this.assessedAttackPatterns) {
            this.barChartData[0].data.push(this.assessedAttackPatterns[prop]);
        }

        for (let prop in this.allAttackPatterns) {
            this.barChartData[1].data.push(this.allAttackPatterns[prop]);
        }   
    }
}