import { Component, OnInit, Input } from '@angular/core';
import { ChartData } from '../../../../../global/models/chart-data';
import { SummaryCalculationService } from '../../summary-calculation.service';
import { SummarySortHelper } from '../../summary-sort-helper';

@Component({
  selector: 'assessment-chart',
  templateUrl: './assessment-chart.component.html',
  styleUrls: ['./assessment-chart.component.scss']
})
export class AssessmentChartComponent implements OnInit {
  @Input()
  public showLegend: boolean;
  public readonly showLegendDefault = true;

  @Input()
  public riskThreshold: number;
  public readonly riskThresholdDefault = 0.0;

  @Input()
  public showLabels: boolean;
  public readonly showLabelsDefault = true;

  @Input()
  public riskLabelOptions;

  public readonly barChartData: ChartData[];

  public readonly barChartType: string;

  public barChartLabels: string[];

  public colors: any[];

  public barChartOptions: any;

  constructor(private summaryCalculationService: SummaryCalculationService) {
    this.barChartData = [
      { data: [], label: '', borderWidth: 0 }

    ];
    this.barChartType = 'bar';
  }

  ngOnInit() {
    this.barChartLabels = [];
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            minRotation: 90,
          }
        }],
        yAxes: [{
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
          label: this.getPercentageString,
        }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          fontSize: 10,
        }
      }
    };
    this.colors = this.summaryCalculationService.barColors;
    this.showLabels = this.showLabels || this.showLabelsDefault;
    this.showLegend = this.showLegend || this.showLegendDefault;
    this.riskThreshold = this.riskThresholdDefault
    this.summaryCalculationService.riskSub.subscribe((value: number) => this.renderChart());
    this.barChartData[0].label = 'At Or Above Mitigation Threshold';
    this.renderChart();
  }


  public getPercentageString(tooltipItem, data) {
    let percentage = 0;
    if (data && tooltipItem && data.datasets) {
      const dataset = data.datasets[tooltipItem.datasetIndex];
      if (dataset && (tooltipItem.index === 0 || tooltipItem.index)) {
        const val = dataset.data[tooltipItem.index];
        if (val && Number.isFinite(val)) {
          percentage = val;
        }
      }
    }
    return `${percentage}%`;
  }

  public calculateData(assessmentGroupingFilteredCount: number, assessmentsGroupingTotal: number): number {
    let data: number = 0;
    if (assessmentsGroupingTotal) {
      data = Math.round((assessmentGroupingFilteredCount / assessmentsGroupingTotal) * 100);
    }
    return data;
  }

  public renderChart(): boolean {
    let successfulRender = false;

    if (this.summaryCalculationService.assessmentsGroupingFiltered && this.summaryCalculationService.assessmentsGroupingTotal) {
      // generate uniq grouping
      const uniqueGroups = Array.from(new Set(
        Array.from(Object.keys(this.summaryCalculationService.assessmentsGroupingTotal))
          .map((el) => el.toLowerCase())))
        .sort(SummarySortHelper.sortDesc());

      // init data array
      const size = uniqueGroups.length;
      this.barChartData[0].data = [];

      let index = 0;
      // assign data array
      uniqueGroups
        .forEach((key) => {
          this.barChartData[0].data[index] = this.calculateData(this.summaryCalculationService.assessmentsGroupingFiltered[key], this.summaryCalculationService.assessmentsGroupingTotal[key]);
          index = index + 1;
        });

      // build labels based on root label
      this.barChartLabels = this.convertLabels(uniqueGroups, this.showLabels);

      this.barChartData[0].label = this.summaryCalculationService.renderLegend();

      successfulRender = true;
    }
    return successfulRender;
  }

  public convertLabels(unconvertedLabels: string[], needToConvert: boolean): string[] {
    let convertedLabels: string[] = [];
    if (needToConvert) {
      convertedLabels = this.summaryCalculationService.convertLabels(unconvertedLabels);
    }
    return convertedLabels;
  }
}
