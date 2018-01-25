import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss']
})
export class SummaryReportComponent implements OnInit {

  totalRiskValue: number;
  // TODO fix
  weakestAttackPatterns: any;

  constructor() {
  }

  ngOnInit() {
    // TODO fix
    this.totalRiskValue = 78;
  }
}
