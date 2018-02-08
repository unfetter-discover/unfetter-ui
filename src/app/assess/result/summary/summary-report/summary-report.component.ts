import { Component, OnInit } from '@angular/core';

import { SummaryCalculationService } from '../summary-calculation.service';
import { AssessKillChainType } from '../../../../models/assess/assess-kill-chain-type';

@Component({
  selector: 'summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss']
})
export class SummaryReportComponent implements OnInit {
  totalRiskValue: string;
  weakness: string;
  topRisks: AssessKillChainType[];


  constructor(private summaryCalculationService: SummaryCalculationService) {
  }

  ngOnInit() {
    this.totalRiskValue = this.summaryCalculationService.getRiskText();
    this.weakness = this.summaryCalculationService.weakness;
    this.topRisks = this.summaryCalculationService.topRisks;
  }
}
