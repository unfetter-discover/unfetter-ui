
import { Component, OnDestroy, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ThreatReportSharedService } from '../services/threat-report-shared.service';
import { ThreatReportOverviewService } from '../services/threat-report-overview.service';
import { ThreatReport } from '../models/threat-report.model';
import { MdPaginator, MdSnackBar, MdDialog } from '@angular/material';
import { ThreatReportModifyDataSource } from './threat-report-modify.datasource';

import * as UUID from 'uuid';
import { Constance } from '../../utils/constance';
import { ConfirmationDialogComponent } from '../../components/dialogs/confirmation/confirmation-dialog.component';

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

  public displayCols = ['title', 'date', 'author', 'actions'];
  public threatReport: ThreatReport;
  public dataSource: ThreatReportModifyDataSource;
  public id = '';
  public inProgress = true;
  public readonly iconUrl = Constance.CAMPAIGN_ICON;

  private readonly subscriptions = [];

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected location: Location,
              protected service: ThreatReportOverviewService,
              protected sharedService: ThreatReportSharedService,
              protected dialog: MdDialog,
              protected snackBar: MdSnackBar) { }

  /**
   * @description initialize this component
   */
  public ngOnInit(): void {
    console.log('on init');
    this.id = this.route.snapshot.paramMap.get('id');
    this.threatReport = this.sharedService.threatReportOverview;
    if (this.id && this.id.trim() !== '') {
      this.load();
    } else {
      this.threatReport = this.sharedService.threatReportOverview || new ThreatReport();
      this.dataSource = new ThreatReportModifyDataSource(this.threatReport.reports, this.paginator);
      this.inProgress = false;
    }
  }

  /**
   * @description initalization after children are set
   */
  public ngAfterViewInit(): void {
    if (this.threatReport && this.threatReport.reports.length > 0) {
      this.initFilter();
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
    this.location.back();
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
        // console.log(`saved ${reports}`);
        // const id = (tro as any).data.id;
        this.router.navigate([`/tro`]);
      },
      (err) => console.log(err),
    );
    this.subscriptions.push(sub$);
  }
/**
 *
 * @param report
 */
  public deletButtonClicked(row: any): void {
    console.log(row.data)
    const _self = this;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: row.data });
    dialogRef.afterClosed().subscribe(
        (result) => {
            if (result === 'true') {
              const sub = _self.service.deleteThreatReport(row.data.attributes.id).subscribe(
                (d) => {
                  _self.load();
                }, (err) => {

                }, () => {
                  sub.unsubscribe();
                }
              );
          }
        });
  }

  /**
   * @description initialize the filter input box
   */
  protected initFilter(): void {
    const _self = this;
    setTimeout(
      () => {
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) {
            return;
          }
          this.dataSource.nextFilter(_self.filter.nativeElement.value);
        });
      }, 100
    )
  }

  private load(): void {
    const loadId$ = this.service.loadAll()
    .flatMap((arr) => arr)
    .filter((tro) => tro.id === this.id)
    .subscribe(
      (tro) => {
        if (this.threatReport) {
          if (!this.threatReport.reports || this.threatReport.reports.length === 0) {
            this.threatReport.reports = tro.reports;
          }
        } else {
          this.threatReport =  tro;
        }
        this.threatReport.reports = this.threatReport.reports.map((report) => {
          const o = { data: { attributes: {} } };
          o.data.attributes = Object.assign(o.data.attributes, report);
          return o;
        });
        this.sharedService.threatReportOverview = this.threatReport;
        this.dataSource = new ThreatReportModifyDataSource(this.threatReport.reports, this.paginator);
        this.inProgress = false;
      },
      (err) => console.log(err),
      () => loadId$.unsubscribe());
  }

}
