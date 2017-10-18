import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReportOverviewDataSource } from './threat-report-overview.datasource';
import { ThreatReport } from './models/threat-report.model';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ThreatReportSharedService } from './services/threat-report-shared.service';
import { ConfirmationDialogComponent } from '../components/dialogs/confirmation/confirmation-dialog.component';
import { MdDialog, MdSnackBar } from '@angular/material';

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
  
  public readonly displayCols: troColName[] = ['name', 'date', 'author', 'actions'];
  private readonly subscriptions = [];
  private readonly duration = 250;

  constructor(
    protected changeDetector: ChangeDetectorRef,
    protected threatReportOverviewService: ThreatReportOverviewService,
    protected router: Router,
    protected sharedService: ThreatReportSharedService,
    protected dialog: MdDialog,
    protected snackBar: MdSnackBar) { }

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
    setTimeout(() => this.loading = false, 0);
    const sub$ = this.filters.changes.subscribe(
      (comps) => this.initFilter(comps.first),
      (err) => console.log(err),
      () => console.log('done'));
    this.subscriptions.push(sub$);
    this.changeDetector.markForCheck();
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
    this.router.navigate(['/tro/create']);
  }

  /**
   * @description loop all reports and delete from mongo
   * @param row
   */
  public deleteButtonClicked(row: any): void {
    const _self = this;
    row['attributes'] = { name: row.name };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: row });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result === 'true') {
          const sub = Observable.create((observer) => {
            let count = row.reports.length;
            row.reports.forEach(
              (report) => {
                const sub1 = _self.threatReportOverviewService.deleteThreatReport(report.id).subscribe(
                  (d) => {
                    --count;
                  }, (err) => {

                  }, () => {
                    if (count <= 0) {
                      observer.next(null);
                      observer.complete();
                    }
                  }
                );
                this.subscriptions.push(sub1);
              }
            )
          }).subscribe(
            () => {
              _self.dataSource.nextFilter();
            }, () => {

            }, () => {
              sub.unsubscribe();
            }
            );
        }
      });
  }

  /**
   * @description setup filterbox events
   * @return {void}
   */
  public initFilter(filter: ElementRef): void {
    this.changeDetector.markForCheck();
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
    this.changeDetector.markForCheck();
  }
}
