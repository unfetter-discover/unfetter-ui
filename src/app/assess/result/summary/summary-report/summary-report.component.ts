import { Component, OnInit } from '@angular/core';

import { SummaryCalculationService } from '../summary-calculation.service';

@Component({
  selector: 'summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss']
})
export class SummaryReportComponent implements OnInit {

  totalRiskValue: string;
  weakness: string;

  constructor(private summaryCalculationService: SummaryCalculationService) {
  }

  ngOnInit() {
    this.totalRiskValue = this.summaryCalculationService.getRiskText();
    this.weakness = this.summaryCalculationService.weakness;
  }
}
