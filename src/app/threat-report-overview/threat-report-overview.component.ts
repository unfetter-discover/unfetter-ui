import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReportOverviewDataSource } from './threat-report-overview.datasource';
import { ThreatReport } from './models/threat-report.model';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ThreatReportSharedService } from './services/threat-report-shared.service';

type troColName = keyof ThreatReport;

@Component({
  selector: 'threat-report-overview',
  templateUrl: './threat-report-overview.component.html',
  styleUrls: ['threat-report-overview.component.scss']
})
export class ThreatReportOverviewComponent implements OnInit, OnDestroy {

  @ViewChild('filter')
  public filter: ElementRef;

  public displayCols: troColName[] = ['name', 'date', 'author'];
  public dataSource: ThreatReportOverviewDataSource;

  private readonly subscriptions = [];

  constructor(
    protected threatReportOverviewService: ThreatReportOverviewService,
    protected router: Router,
    protected sharedService: ThreatReportSharedService) { }

  /**
   * @description fetch data for this component
   * @returns {void}
   */
  public ngOnInit(): void {
    this.dataSource = new ThreatReportOverviewDataSource(this.threatReportOverviewService);
    if (this.filter) {
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) {
            return;
          }
          this.dataSource.nextFilter(this.filter.nativeElement.value);
        });
    }
  }

  /**
   * @description clean up this component
   */
  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * @description clear state and route to create new form
   * @param event 
   */
  public routeCreateNew(event?: UIEvent): void {
    this.sharedService.threatReportOverview = undefined;
    this.router.navigate(['/tro/create']);
  }
}
