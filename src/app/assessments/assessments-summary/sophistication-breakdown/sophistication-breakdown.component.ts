import { Component, OnInit, Input } from '@angular/core';
import { Constance } from '../../../utils/constance';
import { AssessmentsCalculationService } from '../assessments-calculation.service';
import { ChartData } from '../chart-data';

@Component({
    selector: 'sophistication-breakdown',
    templateUrl: './sophistication-breakdown.component.html',
    styleUrls: ['./sophistication-breakdown.component.css']
})
export class SophisticationBreakdownComponent implements OnInit {
    @Input('assessedAttackPatterns') public assessedAttackPatterns: any;
    @Input('allAttackPatterns') public allAttackPatterns: any;

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
    public colors;
    public barChartLabels: string[] = [];
    public readonly barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public readonly barChartData: ChartData[] = [
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

    constructor(private assessmentsCalculationService: AssessmentsCalculationService) {}

    /**
     * @description
     *  initialize this class members and chart data, without making a network call
     */
    public ngOnInit() {
        this.colors = this.assessmentsCalculationService.barColors;

        this.barChartLabels = Object.keys(this.allAttackPatterns)
            .map((level) => this.assessmentsCalculationService.sophisicationNumberToWord(level));

        for (const prop in Object.keys(this.assessedAttackPatterns)) {
            this.barChartData[0].data.push(this.assessedAttackPatterns[prop]);
        }

        for (const prop in Object.keys(this.allAttackPatterns)) {
            this.barChartData[1].data.push(this.allAttackPatterns[prop]);
        }
    }
}
