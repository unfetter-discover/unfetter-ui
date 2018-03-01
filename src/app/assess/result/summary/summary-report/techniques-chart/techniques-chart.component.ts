import { Component, OnInit, Input } from '@angular/core';
import { ChartData } from '../chart-data';
import { SummaryCalculationService } from '../../summary-calculation.service';

@Component({
  selector: 'techniques-chart',
  templateUrl: './techniques-chart.component.html',
  styleUrls: ['./techniques-chart.component.scss']
})
export class TechniquesChartComponent implements OnInit {
  @Input()
  public techniqueBreakdown: number[];

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

  public constructor(private summaryCalculationService: SummaryCalculationService) { }
  /**
   * @description
   *  initialize this class member, calls render when finished
   */
  public ngOnInit(): void {
    this.colors = this.summaryCalculationService.barColors;
    this.showLabels = this.showLabels || this.showLabelsDefault;
    this.showLegend = this.showLegend || this.showLegendDefault;
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
      this.barChartData[0].data[index] = Math.round(val * 100);
      index = index + 1;
    });
  }

  public renderLabels(): void {
    this.barChartLabels = Object.keys(this.techniqueBreakdown)
      .map((level) => this.summaryCalculationService.sophisticationNumberToWord(level));
  }

  /**
   * @description
   *  render legend at top of graph
   * @returns {void}
   */
  public renderLegend(): void {
    this.barChartData[0].label = 'At Or Above Mitigation Threshold';
    // TODO
    // if (this.riskLabelOptions) {
    //   const option = this.riskLabelOptions.find((opt) => opt.risk === this.riskThreshold);
    //   const name = option.name;
    //   this.barChartData[0].label = 'At Or Above ' + name;
    // }
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
