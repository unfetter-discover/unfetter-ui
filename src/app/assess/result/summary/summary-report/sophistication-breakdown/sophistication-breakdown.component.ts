import { Component, OnInit, Input } from '@angular/core';
import { AssessAttackPatternCount } from '../../../../../models/assess/assess-attack-pattern-count';
import { ChartData } from '../chart-data';
import { SummaryCalculationService } from '../../summary-calculation.service';

@Component({
  selector: 'sophistication-breakdown',
  templateUrl: './sophistication-breakdown.component.html',
  styleUrls: ['./sophistication-breakdown.component.scss']
})
export class SophisticationBreakdownComponent implements OnInit {
  @Input('assessedAttackPatterns') public assessedAttackPatterns: AssessAttackPatternCount;
  @Input('allAttackPatterns') public allAttackPatterns: AssessAttackPatternCount;
  public readonly barChartData: ChartData[];
  public barChartLabels: string[];
  public barChartOptions: any;
  public barChartLegend: any;
  public readonly barChartType: string;
  public colors: any;
  constructor(private summaryCalculationService: SummaryCalculationService) {
    this.barChartData = [
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
    ]
    this.barChartType = 'bar';
  }

  ngOnInit() {
    this.barChartLabels = [];
    this.barChartOptions = {
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
      tooltips: {
        mode: 'index',
        callbacks: {
          label: (tooltipItem, data) => {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            return dataset.data[tooltipItem.index] || 0;
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
    this.barChartLegend = true;
    this.colors = this.summaryCalculationService.barColors;
    this.barChartLabels = Object.keys(this.allAttackPatterns)
      .map((level) => this.summaryCalculationService.sophisticationNumberToWord(level));

    for (const prop in Object.keys(this.assessedAttackPatterns)) {
      this.barChartData[0].data.push(this.assessedAttackPatterns[prop]);
    }

    for (const prop in Object.keys(this.allAttackPatterns)) {
      this.barChartData[1].data.push(this.allAttackPatterns[prop]);
    }
  }

}
