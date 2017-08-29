import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'assessment-chart',
    templateUrl: './assessment-chart.component.html',
    styleUrls: ['./assessment-chart.component.css']
})
export class AssessmentChartComponent implements OnInit {

    @Input()
    public assessmentObjects: any[];

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
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    };

    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';

    public barChartData: any[] = [
        { data: [], label: '' },
        { data: [], label: '' }
    ];

    protected readonly rootLabelRegex = /(\w+\s+\d+).(\d+)*/;

    /**
     * @description
     *  initialize this class memebers, calls render when finished
     */
    public ngOnInit(): void {
        this.showLabels = this.showLabels || this.showLabelsDefault;
        this.showLegand = this.showLegand || this.showLegandDefault;
        this.riskThreshold = this.riskThreshold || this.riskThresholdDefault;
        this.renderChart();
    }

    /**
     * @description
     *  renders the chart components, based on applied threshold
     */
    public renderChart(): void {
        this.renderLabels();

        const rootLabelGrouping = {};
        this.assessmentObjects
            .forEach((el) => {
                const fullLabel = el.stix.name;
                const label = this.parseToRootLabel(el.stix.name);
                const data: number[] = [];
                let risk;

                const questions = el.questions;
                const question = questions[0];

                if (!question) {
                    console.log('missing policy question!  moving on...');
                    return;
                }

                risk = question.risk;
                const obj = {
                    label,
                    fullLabel,
                    data,
                    risk
                } as ChartData;

                const arr = rootLabelGrouping[label];
                if (arr) {
                    arr.push(obj);
                } else {
                    rootLabelGrouping[label] = [obj];
                }
            });

        // build x plane labels
        const uniqGroups = new Set(Array.from(Object.keys(rootLabelGrouping)));

        // init data array
        const size = uniqGroups.size;
        this.barChartData[0].data = [];
        this.barChartData[1].data = [];
        for (let i = 0; i < size; i++) {
            this.barChartData[0].data[i] = 0;
            this.barChartData[1].data[i] = 0;
        }

        // for every group, find the data array index and manipulate counts based on drop down threshold
        let index = 0;
        uniqGroups.forEach((key) => {
            const policyQuestions = rootLabelGrouping[key];
            policyQuestions.forEach((policy) => {
                if (policy.risk < this.riskThreshold) {
                    this.barChartData[1].data[index] = this.barChartData[1].data[index] + 1;
                } else {
                    this.barChartData[0].data[index] = this.barChartData[0].data[index] + 1;
                }
            });
            index = index + 1;
        });

        // build labels based on root label
        this.barChartLabels = this.showLabels ? Array.from(uniqGroups.keys()) : [];
    }

    public renderLabels(): void {
        if (this.riskLabelOptions) {
            const option = this.riskLabelOptions.find((opt) => opt.risk === this.riskThreshold);
            const name = option.name;
            this.barChartData[0].label = 'Below ' + name;
            this.barChartData[1].label = 'At Or Above ' + name;
        }
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    /**
     * @description
     *  take el.stix.name, and truncate the last 5.3 to just 5, and roll up a count on every first numeric level
     * @param {string} label
     * @returns {string}
     */
    protected parseToRootLabel(label: string): string {
        const arr = this.rootLabelRegex.exec(label);
        return (arr && arr.length > 1) ? arr[1] : label;
    }
}

interface ChartData {
    label: string;
    fullLabel: string;
    data: number[];
    risk: number;
}
