import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationDialogComponent } from '../components/dialogs/confirmation/confirmation-dialog.component';
import { ThreatReport } from './models/threat-report.model';
import { ThreatReportSharedService } from './services/threat-report-shared.service';
import { ThreatReportOverviewDataSource } from './threat-report-overview.datasource';
import { ThreatReportOverviewService } from '../threat-dashboard/services/threat-report-overview.service';

type troColName = keyof ThreatReport | 'actions';

@Component({
  selector: 'threat-report-overview',
  templateUrl: './threat-report-overview.component.html',
  styleUrls: ['threat-report-overview.component.scss']
})
export class ThreatReportOverviewComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('filter')
  public filters: QueryList<ElementRef>;
  public filter: ElementRef;

  public dataSource: ThreatReportOverviewDataSource;
  public loading = true;
  public hasError = false;
  public errorMsg = '';

  public readonly displayCols: troColName[] = ['name', 'date', 'author', 'actions'];
  private readonly subscriptions = [];
  private readonly duration = 250;
  private readonly modifyRoute = '/threat-dashboard/modify';

  constructor(
    protected threatReportOverviewService: ThreatReportOverviewService,
    protected router: Router,
    protected sharedService: ThreatReportSharedService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar) { }

  /**
   * @description fetch data for this component
   * @returns {void}
   */
  public ngOnInit(): void {
    this.dataSource = new ThreatReportOverviewDataSource(this.threatReportOverviewService);
  }

  /**
   * @description setup keyhandlers after viewchild components exists
   * @return {void}
   */
  public ngAfterViewInit(): void {
    console.log('afterContentInit');
    const sub$ = this.filters.changes.subscribe(
      (comps) => this.initFilter(comps.first),
      (err) => {
        console.log(err);
        this.hasError = true;
        this.errorMsg = err;
      },
      () => {
        console.log('done');
      });
    this.subscriptions.push(sub$);
    // this.changeDetector.markForCheck();
    // need to trigger a change detection, so do it on next repaint
    requestAnimationFrame(() => this.loading = false);
  }

  /**
   * @description clean up this component
   * @return {void}
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
    this.router.navigate(['/threat-dashboard/create']);
  }

  /**
   * @description loop all reports and delete from mongo
   *  a workproduct is related to many reports
   * @param row
   * @param {UIEvent} event optional
   * @return {void}
   */
  public deleteButtonClicked(row: any, event?: UIEvent): void {
    if (!row || !row.id) {
      return;
    }

    row['attributes'] = { name: row.name };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: row });
    dialogRef.afterClosed().subscribe(
      (result) => {
        const isBool = typeof result === 'boolean';
        const isString = typeof result === 'string';
        if (!result ||
          (isBool && result !== true) ||
          (isString && result !== 'true')) {
          return;
        }

        const sub$ = this.threatReportOverviewService.deleteThreatReport(row.id).subscribe(
          (resp) => {
            console.log(resp);
            const s$ = resp.subscribe(
              (reports) => {
                console.log('modified ', reports);
                this.dataSource.nextDataChange(reports);
              },
              (err) => console.log(err)
            );
            this.subscriptions.push(s$);
          },
          (err) => console.log(err));
        this.subscriptions.push(sub$);
      });
  }

  /**
   * @description route to edit a workproduct
   * @param {any} row with and id
   * @param {UIEvent} event optional
   * @return {Promise<boolean>}
   */
  public editButtonClicked(row: any, event?: UIEvent): Promise<boolean> {
    this.sharedService.threatReportOverview = undefined;
    if (!row || !row.id) {
      return;
    }

    return this.router.navigate([`${this.modifyRoute}/${row.id}`]);
  }

  /**
   * @description setup filterbox events
   * @return {void}
   */
  public initFilter(filter: ElementRef): void {
    if (!filter || !filter.nativeElement) {
      console.log('filter element is undefined, cannot setup events observable, moving on...');
      return;
    }

    this.filter = filter;
    const sub$ = Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(this.duration)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.nextFilter(this.filter.nativeElement.value);
      });
    this.subscriptions.push(sub$);
  }

}
