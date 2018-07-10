import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from '../../../../../../global/models/chart-data';
import { SummaryCalculationService } from '../../summary-calculation.service';

@Component({
  selector: 'techniques-chart',
  templateUrl: './techniques-chart.component.html',
  styleUrls: ['./techniques-chart.component.scss']
})
export class TechniquesChartComponent implements OnInit {
  @Input()
  public showLabels: boolean;
  public readonly showLabelsDefault = true;

  @Input()
  public showLegend: boolean;
  public readonly showLegendDefault = true;

  @Input()
  public riskThreshold: number;
  public readonly riskThresholdDefault = 0.0;

  @Input()
  public riskLabelOptions = '';

  public readonly barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true
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
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const val = dataset.data[tooltipItem.index] || 0;
          const percentage = val;
          return `${percentage}%`;
        }
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
  public barChartLabels: string[] = [];
  public readonly barChartType: string = 'bar';
  public barChartData: ChartData[] = [
    { data: [], label: '', borderWidth: 0 }
  ];
  public colors: any[];

  public constructor(public summaryCalculationService: SummaryCalculationService) { }
  /**
   * @description
   *  initialize this class member, calls render when finished
   */
  public ngOnInit(): void {
    this.colors = this.summaryCalculationService.barColors;
    this.showLabels = this.showLabels || this.showLabelsDefault;
    this.showLegend = this.showLegend || this.showLegendDefault;
    this.riskThreshold = this.riskThresholdDefault
    this.summaryCalculationService.riskSub.subscribe((value: number) => this.renderChart());
    this.barChartData[0].label = 'At Or Above Mitigation Threshold';
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
    this.barChartData[0].label = this.summaryCalculationService.renderLegend();
    this.initDataArray();
    const breakdown = Object.keys(this.summaryCalculationService.techniqueBreakdown);
    let index = 0;
    breakdown.forEach((key) => {
      const val: number = this.summaryCalculationService.techniqueBreakdown[key];
      this.barChartData[0].data[index] = Math.round(val * 100);
      index = index + 1;
    });
  }

  public renderLabels(): void {
    this.barChartLabels = Object.keys(this.summaryCalculationService.techniqueBreakdown)
      .map((level) => this.summaryCalculationService.sophisticationNumberToWord(level));
  }

  protected initDataArray(): void {
    const size = this.barChartLabels.length || 0;
    // init data array
    this.barChartData[0].data = [];
    for (let i = 0; i < size; i++) {
      this.barChartData[0].data[i] = 0;
    }
  }
}
