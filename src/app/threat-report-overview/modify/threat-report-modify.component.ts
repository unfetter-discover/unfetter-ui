
import { Component, OnDestroy, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ThreatReportSharedService } from '../services/threat-report-shared.service';
import { ThreatReportOverviewService } from '../services/threat-report-overview.service';
import { ThreatReport } from '../models/threat-report.model';
import { MdPaginator } from '@angular/material';
import { ThreatReportModifyDataSource } from './threat-report-modify.datasource';

import * as UUID from 'uuid';

@Component({
  selector: 'threat-report-modify',
  templateUrl: './threat-report-modify.component.html',
  styleUrls: ['threat-report-modify.component.scss']
})
export class ThreatReportModifyComponent implements OnInit, AfterViewInit, OnDestroy {

  public static readonly ROUTER_DATA_KEY = 'ThreatReportOverview';

  @ViewChild('paginator')
  public paginator: MdPaginator;

  @ViewChild('filter')
  public filter: ElementRef;

  public displayCols = ['title', 'date', 'author'];
  public threatReport: ThreatReport;
  public dataSource: ThreatReportModifyDataSource;
  public id;

  private readonly subscriptions = [];

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected service: ThreatReportOverviewService,
              protected sharedService: ThreatReportSharedService) { }

  public ngOnInit(): void {
    console.log('on init');
    this.id = this.route.snapshot.paramMap.get('id');
    this.threatReport = this.sharedService.threatReportOverview || new ThreatReport();
    this.dataSource = new ThreatReportModifyDataSource(this.threatReport.reports, this.paginator);

    // Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //   .debounceTime(150)
    //   .distinctUntilChanged()
    //   .subscribe(() => {
    //     if (!this.dataSource) {
    //       return;
    //     }
    //     this.dataSource.nextFilter(this.filter.nativeElement.value);
    // });

  }

  public ngAfterViewInit(): void {
    if (this.threatReport && this.threatReport.reports.length > 0) {
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
   * @description clean up component
   */
  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * go back to list view
   * @param {UIEvent} event optional
   */
  public cancel(event: UIEvent): void {
    this.sharedService.threatReportOverview = null;
    this.router.navigate(['/tro']);
  }

  /**
   * @description
   * @param {UIEvent} event optional
   */
  public save(event?: UIEvent): void {
    console.log(event);
    //  save to database
    this.service.saveThreatReport(this.threatReport).subscribe(
      (reports) => {
        // console.log(`saved ${reports}`);
        // const id = (tro as any).data.id;
        this.router.navigate([`/tro`]);
      },
      (err) => console.log(err),
    )
  }

}
