
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

  public displayCols = ['title', 'date', 'author', 'actions'];
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
    this.threatReport = this.sharedService.threatReportOverview || new ThreatReport();
    const loadReports$ = this.load();
  }

  /**
   * @description initalization after view children are set
   */
  public ngAfterViewInit(): void {
    console.log('after view init');
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
   * go back to list view
   * @param {UIEvent} event optional
   */
  public cancel(event: UIEvent): void {
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
        // add new report, wrap in the expect data attribute, cause you know, jsonschema
        // const report = {
        //   data: result
        // };
        const report = result as Report;
        this.threatReport.reports.push(report);
      },
      (err) => console.log(err)
      );
  }

  /**
   * @description delete a report
   * @param report
   * @param {UIEvent} event optional
   * @return {void}
   */
  // public deletButtonClicked(row: any, event?: UIEvent): void {
  //   const _self = this;
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: row.data });
  //   dialogRef.afterClosed().subscribe(
  //     (result) => {
  //       const isBool = typeof result === 'boolean';
  //       const isString = typeof result === 'string';
  //       if (!result ||
  //           (isBool && result !== true) ||
  //           (isString && result !== 'true')) {
  //         return;
  //       }

  //       if (!row.data.attributes || !row.data.attributes.id) {
  //         return;
  //       }

  //       const sub$ = _self.service.deleteThreatReport(row.data.attributes.id).subscribe(
  //         (d) => {
  //           this.threatReport.reports = this.threatReport.reports.filter((r) => r.data.attributes.id !== row.data.attributes.id);
  //           this.dataSource.nextDataChange(this.threatReport.reports);
  //         },
  //         (err) => console.log(err),
  //         () => sub$.unsubscribe());
  //     });
  // }

  public onFileParsed(event: any): void {
    if (event) {
      // TODO: turn dates into ISO Date format or backend will complain on validation
      event = event.map((e) => {
        console.log(e);
        if (e && e.attributes && e.attributes.created) {
          e.attributes.created = undefined;
        }
        return e;
      });
      const sub$ = this.service.saveReports(event)
        .subscribe(() => {
          this.load();
        },
        (err) => console.log(err),
        () => sub$.unsubscribe());
    };
  }

  public onFileUploadFail(event: string): void {
    if (event) {
      this.snackBar.open(event, 'Close', {
        duration: 2000,
      });
    }
  }

  public onPage(event?: PageEvent): void {
    this.dataSource.nextPageChange(event);
  }

  /**
   * @description initialize the filter input box
   * @param {ElementRef} filter
   */
  protected initFilter(filter: ElementRef): void {
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
   * @description load workproducts, setup this comoponents datasource
   * @return {void}
   */
  private load(): Observable<Report[]> {
    this.inProgress = true;
    const loadReports$ = this.service.loadAllReports()
      .map((reports) => this.reports = reports)
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
        if (this.paginator && this.dataSource && !this.dataSource.paginator) {
          console.log('setting paginator');
          this.dataSource.paginator = this.paginator;
        }
      });
    // .do(() => {
    //   // remember to clear the shared service used by other pages
    //   this.sharedService.threatReportOverview = this.threatReport;
    // })

    this.dataSource = new ThreatReportModifyDataSource(loadReports$, this.paginator);
    return loadReports$;
  }

  /**
   * @description 
   * @return true is string and true or boolean and true, otherwise false
   */
  private isTruthy(val: boolean | string = false): boolean {
    const isBool = typeof val === 'boolean';
    const isString = typeof val === 'string';
    return (isBool && val === true) || (isString && val === 'true');
  }

  /**
   * @description 
   * @return true is string and false or boolean and false, otherwise true
   */
  private isFalsey(val: boolean | string | Partial<Report> | undefined): boolean {
    const isUndefined = typeof val === 'undefined';
    const isBool = typeof val === 'boolean';
    const isString = typeof val === 'string';
    return isUndefined || (isBool && val === false) || (isString && val === 'false');
  }
}
