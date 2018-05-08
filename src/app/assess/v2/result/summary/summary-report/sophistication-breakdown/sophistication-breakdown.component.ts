import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from '../../../../../../global/models/chart-data';
import { AssessAttackPatternCount } from 'stix/assess/v2/assess-attack-pattern-count';
import { SummaryCalculationService } from '../../summary-calculation.service';

@Component({
  selector: 'sophistication-breakdown',
  templateUrl: './sophistication-breakdown.component.html',
  styleUrls: ['./sophistication-breakdown.component.scss']
})
export class SophisticationBreakdownComponent implements OnInit {
  @Input() public assessedAttackPatterns: AssessAttackPatternCount;
  @Input() public allAttackPatterns: AssessAttackPatternCount;
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

  public static generateTooltipLabel(tooltipItem, data) {
    let label = 0;
    if (tooltipItem && data && data.datasets && (tooltipItem.datasetIndex || tooltipItem.datasetIndex === 0)) {
      const dataset = data.datasets[tooltipItem.datasetIndex];
      if (dataset && dataset.data && (tooltipItem.index || tooltipItem.index === 0)) {
        let value = dataset.data[tooltipItem.index];
        if (value || value === 0) {
          label = value;
        }
      }
    }
    return label;
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
          label: SophisticationBreakdownComponent.generateTooltipLabel,
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
    this.calculateData();
  }

  public calculateData() {
    let assessedAttackPatternKeys = Object.keys(this.assessedAttackPatterns);
    let allAttackPatternKeys = Object.keys(this.allAttackPatterns);

    this.barChartData[0].data = [];
    this.barChartData[1].data = [];
    for (let index = 0; index < allAttackPatternKeys.length; index++) {
      let assessed = 0;
      if (assessedAttackPatternKeys.includes(index.toString())) {
        assessed = this.assessedAttackPatterns[index];
      }
      this.barChartData[0].data.push(assessed);
      this.barChartData[1].data.push(this.allAttackPatterns[index] - assessed);
    }
  }
}
