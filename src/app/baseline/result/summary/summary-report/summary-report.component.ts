import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { SummaryCalculationService } from '../summary-calculation.service';
import { AssessKillChainType } from '../../../../models/baseline/assess-kill-chain-type';
import { SummaryAggregation } from '../../../../models/baseline/summary-aggregation';
import { Constance } from '../../../../utils/constance';

type mainWell = 'heatmap' | 'none';

@Component({
  selector: 'summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryReportComponent implements OnInit {
  public readonly CHART_TYPE: string;
  public readonly DEFAULT_CHART_COLORS: any[];
  public readonly CHART_LABELS: string[];
  public readonly CHART_BG_COLORS: any[];
  public readonly CHART_HOVER_BG_COLORS: any[];
  public readonly CHART_OPTIONS: any;
  public collapseTechniques: boolean;

  public overallRatingChartData: { data: any[], backgroundColor: any[], hoverBackgroundColor: any[] }[];
  public overallRatingChartType: string = this.CHART_TYPE;

  public activeMainWell: mainWell;

  constructor(public summaryCalculationService: SummaryCalculationService,
              // protected changeDetectorRef: ChangeDetectorRef,
  ) {
    this.CHART_TYPE = 'doughnut';
    this.DEFAULT_CHART_COLORS = [{}];
    this.CHART_LABELS = ['Risk Accepted', 'Risk Addressed'];
    this.CHART_BG_COLORS = [Constance.COLORS.red, Constance.COLORS.green];
    this.CHART_HOVER_BG_COLORS = [Constance.COLORS.darkRed, Constance.COLORS.darkGreen];
    this.CHART_OPTIONS = {
      legend: {
        display: true,
        position: 'bottom',
      },
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipLabel = data.labels[tooltipItem.index];
            const tooltipData = allData[tooltipItem.index];
            let total = 0;
            allData.forEach((d) => {
              total += d;
            });
            const tooltipPercentage = Math.round(tooltipData / total * 100);
            return `${tooltipLabel}: ${tooltipPercentage}%`;
          }
        }
      }
    };
  }

  ngOnInit() {
    this.overallRatingChartData = [{
      data: [.6, .4],
      backgroundColor: this.CHART_BG_COLORS,
      hoverBackgroundColor: this.CHART_HOVER_BG_COLORS,
    }
    ];
    this.overallRatingChartType = this.CHART_TYPE;
    this.activeMainWell = 'heatmap';
    this.collapseTechniques = true;
  }

  public setMainWell(wellTab: mainWell) {
    if (this.activeMainWell === wellTab) {
        this.activeMainWell = 'none';
    } else {
        this.activeMainWell = wellTab;
    }
    // this.changeDetectorRef.markForCheck();
  }

  public calculateRisk(riskArr: any[]): string {
    let risk = 0;
    if (riskArr) {
      risk = this.summaryCalculationService.calculateAvgRiskPerAssessedObject(riskArr);
    }
    return this.formatRisk(risk);
  }

  /**
   * @param risk
   * @return {string} formatted
   */
  public formatRisk(risk: number): string {
    let formattedRisk = '0.00';
    if (risk) {
      formattedRisk = Number((risk) * 100).toFixed(2)
    }
    if (formattedRisk === 'Infinity') {
      formattedRisk = '100.00';
    }
    return formattedRisk;
  }
}
