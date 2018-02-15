import { Component, OnInit } from '@angular/core';

import { SummaryCalculationService } from '../summary-calculation.service';
import { AssessKillChainType } from '../../../../models/assess/assess-kill-chain-type';
import { SummaryAggregation } from '../../../../models/assess/summary-aggregation';

@Component({
  selector: 'summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss']
})
export class SummaryReportComponent implements OnInit {
  readonly columnIds: string[];

  constructor(public summaryCalculationService: SummaryCalculationService) {
    this.columnIds = ['kca', 'item', 'risk'];
  }

  ngOnInit() {
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
