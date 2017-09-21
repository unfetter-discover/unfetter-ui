import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ThreatReportOverviewService } from './threat-report-overview.service';
import { ThreatReportOverviewDataSource } from './threat-report-overview.datasource';
import { ThreatReportOverview } from './threat-report-overview.model';
import { Observable } from 'rxjs/Observable';

type troColName = keyof ThreatReportOverview;

@Component({
   selector: 'threat-report-overview',
   templateUrl: './threat-report-overview.component.html',
   styleUrls: ['threat-report-overview.component.css']
})
export class ThreatReportOverviewComponent implements OnInit, OnDestroy {

  @ViewChild('filter') 
  public filter: ElementRef;

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
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.dataSource) { 
        return; 
      }
      this.dataSource.nextFilter(this.filter.nativeElement.value);
    });
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
