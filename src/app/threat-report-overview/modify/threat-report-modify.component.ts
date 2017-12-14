
import { Component, OnDestroy, ViewChild, OnInit, ElementRef, AfterViewInit, Renderer, AfterContentInit, QueryList, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSnackBar, MatDialog, PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as UUID from 'uuid';

import { Constance } from '../../utils/constance';
import { ConfirmationDialogComponent } from '../../components/dialogs/confirmation/confirmation-dialog.component';
import { ThreatReportSharedService } from '../services/threat-report-shared.service';
import { ThreatReport } from '../models/threat-report.model';
import { ThreatReportModifyDataSource } from './threat-report-modify.datasource';
import { ThreatReportOverviewService } from '../../threat-dashboard/services/threat-report-overview.service';
import { Report } from '../../models/report';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { ModifyReportDialogComponent } from '../modify-report-dialog/modify-report-dialog.component';
import { DateHelper } from '../../global/static/date-helper';

@Component({
  selector: 'unf-threat-report-modify',
  templateUrl: './threat-report-modify.component.html',
  styleUrls: ['threat-report-modify.component.scss']
})
export class ThreatReportModifyComponent implements OnInit, AfterViewInit, OnDestroy {

  public static readonly ROUTER_DATA_KEY = 'ThreatReportOverview';

  @ViewChild('fileUpload')
  public fileUpload: FileUploadComponent;

  @ViewChild('paginator')
  public paginator: MatPaginator;

  @ViewChildren('filter')
  public filters: QueryList<ElementRef>;
  public filter: ElementRef;

  public displayCols = ['actions', 'title', 'date', 'author'];
  public threatReport: ThreatReport;
  public dataSource: ThreatReportModifyDataSource;
  public curDisplayLen$: Observable<number>;
  public reports: Report[];
  public id = '';
  public inProgress = true;
  public readonly iconUrl = Constance.CAMPAIGN_ICON;
  public readonly threatDashboard = 'threat-dashboard';

  private readonly subscriptions = [];

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected location: Location,
    protected service: ThreatReportOverviewService,
    protected sharedService: ThreatReportSharedService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected render: Renderer) { }

  /**
   * @description initialize this component
   */
  public ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.threatReport = this.sharedService.threatReportOverview;
    if (this.threatReport) {
      // load just reports, so dont give an id
      this.load();
    } else {
      // we need reports, and the threat report use the id
      this.load(this.id);
    }
  }

  /**
   * @description initalization after view children are set
   */
  public ngAfterViewInit(): void {
    const sub$ = this.filters.changes.subscribe(
      (comps) => this.initFilter(comps.first),
      (err) => console.log(err));
    this.subscriptions.push(sub$);
  }

  /**
   * @description clean up component
   */
  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  }

  /**
   * @description go back to list view
   * @param {UIEvent} event optional
   */
  public cancel(event?: UIEvent): void {
    this.sharedService.threatReportOverview = null;
    // this.location.back();
    this.router.navigate([`/${this.threatDashboard}`]);
  }

  /**
   * @description
   * @param {UIEvent} event optional
   */
  public save(event?: UIEvent): void {
    //  save to database
    const sub$ = this.service.saveThreatReport(this.threatReport)
      .subscribe(
      (reports) => {
        this.router.navigate([`/${this.threatDashboard}`]);
      },
      (err) => console.log(err),
    );
    this.subscriptions.push(sub$);
  }

  /**
   * @description open add external report dialog
   * @param {UIEvent} event optional
   * @return {void}
   */
  public openAddReportDialog(event?: UIEvent): void {
    const opts = {
      width: '800px',
      height: 'calc(100vh - 140px)'
    };
    this.dialog
      .open(ModifyReportDialogComponent, opts)
      .afterClosed()
      .subscribe((result: Partial<Report> | boolean) => {
        if (this.isFalsey(result)) {
          return;
        }
        const report = this.fixReportDateBeforeSave(result as Report);
        const sub$ = this.service.upsertReport(report)
          .subscribe(() => {
            console.log('saved report, reloading');
            this.load(this.threatReport.id);
          },
          (err) => console.log(err),
          () => sub$.unsubscribe());
      },
      (err) => console.log(err)
      );
  }

  /**
   * @description add a report to the threat report
   * @param {Report} report include this report in the current workproduct
   * @return {void}
   */
  public onIncludeReport(report: Report, event?: UIEvent): void {
    if (!report || !this.threatReport) {
      return;
    }

    if (event) {
      event.preventDefault();
    }

    this.threatReport.reports = this.threatReport.reports.concat(report);
    console.log(report);
    console.log(this.threatReport);
    if (!this.threatReport.id) {
      // this threat report is in progress so do not save to db until they hit save
      return;
    }

    const sub$ = this.service.upsertReports([report], this.threatReport)
      .subscribe(
      (tro) => {
        console.log(tro);
      },
      (err) => console.log(err),
      () => sub$.unsubscribe());
  }

  /**
   * @description exclude a report from this threat report
   * @param {Report} report include this report in the current workproduct
   * @return {void}
   */
  public onExcludeReport(report: Report, event?: UIEvent): void {
    if (!report || !this.threatReport) {
      return;
    }

    if (event) {
      event.preventDefault();
    }

    console.log(report);
    console.log(this.threatReport);
    this.threatReport.reports = this.threatReport
      .reports.filter((el) => el.attributes.id !== report.attributes.id);
    if (!this.threatReport.id) {
      // this threat report is in progress so do not save to db until they hit save
      return;
    }

    const sub$ = this.service.removeReport(report, this.threatReport)
      .subscribe(
      (tro) => {
        console.log(tro);
      },
      (err) => console.log(err),
      () => sub$.unsubscribe());
  }

  /**
   * @description handle when a csv file is parsed into reports
   * @param {Report[]} event
   * @return {void}
   */
  public onFileParsed(event?: Report[]): void {
    if (!event) {
      return;
    }
    // turn dates into ISO Date format or backend will complain on validation
    const reports = this.fixReportDatesBeforeSave(event);
    const sub$ = this.service.upsertReports(reports)
      .subscribe(() => {
        console.log('saved reports, reloading');
        this.load(this.threatReport.id);
      },
      (err) => console.log(err),
      () => sub$.unsubscribe());
  }

  /**
   * @description notify user of any upload or parse errors
   * @param {string} event optional
   */
  public onFileUploadFail(event?: string): void {
    if (!event) {
      return;
    }

    // notify the user of the error
    this.snackBar.open(event, 'Close', {
      duration: 3400,
    });
  }

  /**
   * @description trigger an event in the datasource, because the user paged
   * @param {PageEvent} event optional
   */
  public onPage(event?: PageEvent): void {
    this.dataSource.nextPageChange(event);
  }

  /**
   * @description initialize the filter input box
   * @param {ElementRef} filter
   */
  public initFilter(filter: ElementRef): void {
    if (!filter || !filter.nativeElement) {
      console.log('filter nativeElement is not initialized, cannot setup observable, moving on...')
      return;
    }

    this.filter = filter;
    const sub$ = Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.nextFilter(this.filter.nativeElement.value);
      });
    this.subscriptions.push(sub$);
  }

  /**
   * @description load workproducts, setup this components datasource
   * @param {string} optional threat report id
   * @return {Observable<Report[]>}
   */
  public load(threatReportId?: string): Observable<Report[]> {
    this.inProgress = true;

    let loadAll$;
    const loadReports$ = this.service.loadAllReports();
    if (!threatReportId) {
      // this may be an unsaved threat report
      loadAll$ = Observable.combineLatest(loadReports$)
        .withLatestFrom((results) => {
          this.reports = results[0];
          return this.reports;
        })
        // get any inprogress threat reports, or create a new one
        .do(() => this.threatReport = this.sharedService.threatReportOverview || new ThreatReport());
    } else {
      // this may be an unsaved threat report
      const loadThreatReport$ = this.service.load(threatReportId);
      loadAll$ = Observable.combineLatest(loadThreatReport$, loadReports$)
        .withLatestFrom((results) => {
          this.threatReport = results[0] as ThreatReport;
          this.reports = results[1];
          return this.reports;
        })
        // clear out an inprogress threat reports we were creating
        .do(() => this.sharedService.threatReportOverview = this.threatReport);
    }

    loadAll$ = loadAll$
      .do(() => {
        // removing spinner, put on change queue
        requestAnimationFrame(() => {
          this.inProgress = false;
        });
      })
      .do(() => {
        // trigger change detection, to connect number of reports show
        //  needed or get expression changed error
        requestAnimationFrame(() => {
          this.curDisplayLen$ = this.dataSource.curDisplayLen$;
        });
      })
      .do(() => {
        // have to set pager after the table is rendered, pager is used by 
        //  datasource to calculate what to display
        if (this.paginator && this.dataSource && !this.dataSource.paginator) {
          console.log('setting paginator');
          this.dataSource.paginator = this.paginator;
        }
      });

    this.dataSource = new ThreatReportModifyDataSource(loadAll$, this.paginator);
    return loadReports$;
  }

  /**
   * @description
   */
  public isIncludedReport(reportId: string): boolean {
    if (!reportId) {
      return false;
    }

    return this.threatReport.reports.find((report) => report.id === reportId) !== undefined;
  }

  /**
   * @description 
   * @return {boolean} returns true iff string and true or boolean and true, otherwise false
   */
  private isTruthy(val: boolean | string = false): boolean {
    const isBool = typeof val === 'boolean';
    const isString = typeof val === 'string';
    return (isBool && val === true) || (isString && val === 'true');
  }

  /**
   * @description 
   * @return returns true iff string and false or boolean and false, otherwise true
   */
  private isFalsey(val: boolean | string | Partial<Report> | undefined): boolean {
    const isUndefined = typeof val === 'undefined';
    const isBool = typeof val === 'boolean';
    const isString = typeof val === 'string';
    return isUndefined || (isBool && val === false) || (isString && val === 'false');
  }

  private fixReportDatesBeforeSave(reports: Report[]): Report[] {
    // turn dates into ISO Date format or backend will complain on validation
    return reports.map((e) => this.fixReportDateBeforeSave(e));
  }

  private fixReportDateBeforeSave(report: Report): Report {
    const e = report;
    // turn dates into ISO Date format or backend will complain on validation
    if (e && e.attributes && e.attributes.created) {
      // turn to required ISO8601 format or clear the date because we cant use it
      e.attributes.created = DateHelper.getISOOrUndefined(e.attributes.created);
    }
    return e;
  }
}
