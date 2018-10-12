import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThreatFeatureState } from '../../store/threat.reducers';
import { pluck } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'recent-reports',
  templateUrl: './recent-reports.component.html',
  styleUrls: ['./recent-reports.component.scss']
})
export class RecentReportsComponent implements OnInit {

  public readonly carouselItemWidth = 210;
  public readonly carouselItemPadding = 8;

  public reports = [];
  private _reportsLoaded = false;
  public reportHoverIndex = -1;
  public reportsHover = false;
  public reportsPage = 0;
  private _reportsPerPage: number;
  private _reportsPages: number;
  @ViewChild('reportsView') reportsView: ElementRef;

  constructor(
    private store: Store<ThreatFeatureState>,
    private sanitizer: DomSanitizer) {
  }

  public get reportsLoaded() { return this._reportsLoaded; }

  ngOnInit() {
    this.store.select('threat')
      .pipe(
        pluck('feedReports')
      )
      .subscribe(
        (reports: any[]) => {
          this.reports = reports
            //            .map(report => ({ ...report, vetted: board.reports.includes(report.id) }))
            .sort(this.sortByLastModified);
          console.log(`(${new Date().toISOString()}) reports list`, this.reports);
          this.calculateReportsWindow();
          this._reportsLoaded = true;
        },
        (err) => console.log(`(${new Date().toISOString()}) Error loading reports:`, err)
      );
  }

  private calculateReportsWindow() {
    if (!this.reportsView) {
      requestAnimationFrame(() => this.calculateReportsWindow());
    } else {
      let perPage = 1;
      const itemWidth = this.carouselItemWidth + this.carouselItemPadding;
      const reportsWidth = this.reportsView.nativeElement.offsetWidth +
        (Number.parseInt(this.reportsView.nativeElement.style['margin-left'] || 0, 10));
      perPage = Math.floor(reportsWidth / itemWidth);
      if (reportsWidth - perPage * itemWidth < this.carouselItemPadding) {
        perPage++;
      }
      this._reportsPerPage = Math.max(perPage, 1);
      this._reportsPages = Math.ceil(this.reports.length / this._reportsPerPage);
    }
  }

  private get reportsPerPage() {
    return this._reportsPerPage;
  }

  public get reportsPages() {
    return this._reportsPages;
  }

  public get reportsOffset() {
    return this.reportsPage * this._reportsPerPage * -220;
  }

  public isFirstReport() {
    return this.reportsPage === 0;
  }

  public isLastReport() {
    return this.reportsPage >= this._reportsPages - 1;
  }

  public scrollReportsLeft() {
    if (this.reportsPage > 0) {
      this.reportsPage--;
    }
  }

  public scrollReportsRight() {
    if (this.reportsPage < this._reportsPages - 1) {
      this.reportsPage++;
    }
  }

  public scrollToReportsPage(page: number) {
    page = Math.max(0, Math.min(page, this._reportsPages - 1));
    if (this.reportsPage !== page) {
      this.reportsPage = page;
    }
  }

  public viewReport(id: string) {
    console.log(`Request to view report '${id}' received`);
  }

  public shareReport(id: string) {
    console.log(`Request to share report '${id}' received`);
  }

  public getReportBackground(report: any) {
    const colors = [
      ['darkred', 'rosybrown'],
      ['lightblue', 'darkblue'],
      ['lightgreen', 'darkgreen'],
      ['orchid', 'darkorchid'],
      ['palevioletred', 'mediumvioletred'],
    ];
    const n = report.name.charCodeAt(0) % colors.length;
    return `linear-gradient(${colors[n][0]}, ${colors[n][1]})`;
  }

  public getReportBackgroundImage(report: any) {
    return this.sanitizer.bypassSecurityTrustStyle(
      `url(${report.metaProperties.image}), linear-gradient(transparent, transparent)`);
  }

  public sortByLastModified(a: any, b: any) {
    return b.modified.localeCompare(a.modified);
  }
}
