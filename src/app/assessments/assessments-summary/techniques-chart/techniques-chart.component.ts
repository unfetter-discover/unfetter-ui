import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constance } from '../../../utils/constance';
import { SortHelper } from '../sort-helper';
import { AssessmentsCalculationService } from '../assessments-calculation.service';
import { ChartData } from '../chart-data';

@Component({
    selector: 'techniques-chart',
    templateUrl: './techniques-chart.component.html',
    styleUrls: ['./techniques-chart.component.scss']
})
export class TechniquesChartComponent implements OnInit {
    @Input()
    public techniqueBreakdown: SophisticationKeys;

    @Input()
    public showLabels: boolean;
    public readonly showLabelsDefault = true;

    @Input()
    public showLegand: boolean;
    public readonly showLegandDefault = true;

    @Input()
    public riskThreshold: number;
    public readonly riskThresholdDefault = 0.0;

    @Input()
    public riskLabelOptions;

    public readonly barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                    stepSize: 10
                }
            }]
        },
        tooltips: {
            mode: 'index',
            callbacks: {
                label: (tooltipItem, data) => {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const val = dataset.data[tooltipItem.index] || 0;
                    const percentage = val;
                    return `${percentage}%`;
                }
            }
        }
    };
    public barChartLabels: string[] = [];
    public readonly barChartType: string = 'bar';
    public barChartData: ChartData[] = [
        { data: [], label: '', borderWidth: 0 },
        { data: [], label: '', borderWidth: 0 }
    ];
    public colors: any[];

    // tslint:disable-next-line:no-empty
    public constructor(private assessmentsCalculationService: AssessmentsCalculationService) {}

    /**
     * @description
     *  initialize this class member, calls render when finished
     */
    public ngOnInit(): void {
        this.colors = this.assessmentsCalculationService.barColors;
        this.showLabels = this.showLabels || this.showLabelsDefault;
        this.showLegand = this.showLegand || this.showLegandDefault;
        this.riskThreshold = this.riskThreshold || this.riskThresholdDefault;
        this.renderChart();
    }

    /**
     * @description
     *  renders the chart components, based on applied threshold
     */
    public renderChart(selectedRisk?: number): void {
        if (selectedRisk) {
            this.riskThreshold = selectedRisk;
        }
        this.renderLabels();
        this.renderLegend();
        this.initDataArray();

        const breakdown = Object.keys(this.techniqueBreakdown);
        let index = 0;
        breakdown.forEach((key) => {
            const val = this.techniqueBreakdown[key];
            const complement = 1.0  - val;
            this.barChartData[0].data[index] = Math.round(val * 100);
            this.barChartData[1].data[index] = Math.round(complement * 100);
            index = index + 1;
        });
    }

    public renderLabels(): void {
        this.barChartLabels = Object.keys(this.techniqueBreakdown)
            .map((level) => this.assessmentsCalculationService.sophisicationNumberToWord(level));
    }

    /**
     * @description
     *  render legend at top of graph
     * @returns {void}
     */
    public renderLegend(): void {
        if (this.riskLabelOptions) {
            const option = this.riskLabelOptions.find((opt) => opt.risk === this.riskThreshold);
            const name = option.name;
            this.barChartData[0].label = 'At Or Above ' + name;
            this.barChartData[1].label = 'Below ' + name;
        }
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    protected initDataArray(): void {
        const size = this.barChartLabels.length || 0;
        // init data array
        this.barChartData[0].data = [];
        this.barChartData[1].data = [];
        for (let i = 0; i < size; i++) {
            this.barChartData[0].data[i] = 0;
            this.barChartData[1].data[i] = 0;
        }
    }

}

interface SophisticationKeys {
    0: number; 1: number; 2: number; 3: number;
}
