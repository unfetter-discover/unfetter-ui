import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThreatReportOverviewService } from './threat-report-overview.service';
import { ThreatReportOverviewDataSource } from './threat-report-overview.datasource';
import { ThreatReportOverview } from './threat-report-overview.model';

type troColName = keyof ThreatReportOverview;

@Component({
   selector: 'threat-report-overview',
   templateUrl: './threat-report-overview.component.html',
   styleUrls: ['threat-report-overview.component.css']
})
export class ThreatReportOverviewComponent implements OnInit, OnDestroy {

  public displayCols: troColName[] = [ 'id', 'name', 'date', 'author' ];
  public dataSource: ThreatReportOverviewDataSource; 
  private readonly subscriptions = [];

  constructor(protected threatReportOverviewService: ThreatReportOverviewService) {}

  /**
   * @description fetch data for this component
   * @returns {void}
   */
  public ngOnInit(): void {
    this.dataSource = new ThreatReportOverviewDataSource(this.threatReportOverviewService);

    // const sub$ = this.threatReportOverviewService
    //   .load()
    //   .subscribe((threatReports) => {
    //     this.threatReports = threatReports;
    //   },
    //   (err) => console.log(err),
    //   () => console.log('done'))

  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
