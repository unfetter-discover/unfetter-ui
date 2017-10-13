import { Component, OnDestroy, ViewChild, AfterViewInit, OnInit } from '@angular/core';
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
  }

  public ngAfterViewInit(): void {
    // const observableList = [ this.paginators.changes ];
    // if (!this.id || this.id === -1) {
    //   // go fetch data for this component
    //   observableList.push(this.service.load());
    // }

    // had to monitor querylist on paginator because of the  ExpressionChangedAfterItHasBeenCheckedError error, 
    //  due to putting a ngIf on the table
    // const sub$ = Observable
    //   .combineLatest(...observableList)
    //   .subscribe((combined) => {
    //     const [ paginators, threatReports ] = combined;
    //     this.paginator = paginators.first;       
    //     if (threatReports) {
    //       const arr = threatReports.first;
    //       this.threatReport = arr.filter((el) => el.id === Number(this.id))[0] || new ThreatReport();
    //     }
    //     this.dataSource = new ThreatReportModifyDataSource(this.threatReport.reports, this.paginator);
    //     this.ref.markForCheck();
    //   });
    // this.subscriptions.push(sub$);

    // const observableList = [ this.paginators.changes ];
    // if (!this.id || this.id === -1) {
    //   // go fetch data for this component
    //   observableList.push(this.service.load());
    // }
    
    // had to monitor querylist on paginator because of the  ExpressionChangedAfterItHasBeenCheckedError error, 
    //  due to putting a ngIf on the table
    // const sub$ = Observable
    //   .combineLatest(...observableList)
    //   .subscribe((combined) => {
    //     const [ paginators, threatReports ] = combined;
    //     this.paginator = paginators.first;       
    //     if (threatReports) {
    //       const arr = threatReports.first;
    //       this.threatReport = arr.filter((el) => el.id === Number(this.id))[0] || new ThreatReport();
    //     }
    //     this.dataSource = new ThreatReportModifyDataSource(this.threatReport.reports, this.paginator);
    //     this.ref.markForCheck();
    //   });
    // this.subscriptions.push(sub$);
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
    this.router.navigate(['/tro']);
  }

  /**
   * @description
   * @param {UIEvent} event optional
   */
  public save(event: UIEvent): void {
    console.log(event);
    const id = UUID.v4();
    this.threatReport.id = id;
    // TODO: save to database
    // this.router.navigate([`/tro/modify`, tro.id]);
  }

}
