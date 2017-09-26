import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constance } from '../../../utils/constance';
import { AssessmentsCalculationService } from '../assessments-calculation.service';
import { SortHelper } from '../sort-helper';
import { ChartData } from '../chart-data';

@Component({
    selector: 'assessment-chart',
    templateUrl: './assessment-chart.component.html',
    styleUrls: ['./assessment-chart.component.scss']
})
export class AssessmentChartComponent implements OnInit {

    @Input()
    public assessmentObjects: any[];

    @Input()
    public assessmentsGroupingTotal: any[];

    @Input()
    public assessmentsGroupingFiltered: any[];

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

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
                display: true,
                ticks: {
                    minRotation: 90,
                }
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
    public readonly barChartData: ChartData[] = [
        { data: [], label: '', borderWidth: 0 },
        { data: [], label: '', borderWidth: 0 }
    ];
    public colors: any[];

    protected readonly rootLabelRegex = /(\w+\s+\d+).(\d+)*/;

    // Hide label is one is longer than this
    private readonly longestLabelThreshold: number = 10;

    constructor(private assessmentsCalculationService: AssessmentsCalculationService) { }

    /**
     * @description
     *  initialize this class members, without making a network call, calls render when finished
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
     *  renders the chart, based on applied threshold
     * @returns {void}
     */
    public renderChart(): void {
        if (!this.assessmentsGroupingFiltered || !this.assessmentsGroupingTotal) {
            return;
        }

        this.renderLegend();

        // generate uniq grouping
        const uniqGroups = Array.from(new Set(
            Array.from(Object.keys(this.assessmentsGroupingTotal))
                .map((el) => el.toLowerCase())))
            .sort(SortHelper.sortDesc());

        // init data array
        const size = uniqGroups.length;
        this.barChartData[0].data = [];
        this.barChartData[1].data = [];

        let index = 0;
        // assign data array
        uniqGroups
            .forEach((key) => {
                const filterCount = this.assessmentsGroupingFiltered[key] ? this.assessmentsGroupingFiltered[key] : 0;
                this.barChartData[0].data[index] = filterCount;
                this.barChartData[1].data[index] = this.assessmentsGroupingTotal[key] - filterCount;
                index = index + 1;
            });

        // convert to percentages
        for (let i = 0; i < index; i++) {
            const val1 = this.barChartData[0].data[i];
            const val2 = this.barChartData[1].data[i];
            const total = val1 + val2;
            this.barChartData[0].data[i] = Math.round((val1 / total) * 100);
            this.barChartData[1].data[i] = Math.round((val2 / total) * 100);
        }

        const convertedLabels: any = uniqGroups.map((word) => {
            word = word.replace(/-/g, ' ');
            word = word.replace(/\b([a-z])(\w+)/g, (_, g1, g2) => {
                const replacement = g1.concat(g2);
                if (replacement === 'and' || replacement === 'or' || replacement === 'the') {
                    return replacement;
                }
                return g1.toUpperCase() + g2;
            });
            return word;
        });
        
        // build labels based on root label
        this.barChartLabels = this.showLabels ? convertedLabels : [];
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

}
