import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThreatFeatureState } from '../../store/threat.reducers';
import { pluck, distinctUntilChanged } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { FeedCarouselComponent } from '../../feed/feed-carousel/feed-carousel.component';

@Component({
  selector: 'recent-reports',
  templateUrl: './recent-reports.component.html',
  styleUrls: ['./recent-reports.component.scss']
})
export class RecentReportsComponent implements OnInit {


    /**
     * The loaded list of vetted and potential reports.
     */
    private _reports: any[] = [];

    private _loaded: boolean = false;

    @ViewChild('carousel') carousel: FeedCarouselComponent;

  constructor(
    private store: Store<ThreatFeatureState>,
    private sanitizer: DomSanitizer) {
  }

  public get loaded() { return this._loaded; }

  public get reports() { return this._reports; }

  ngOnInit() {
    this.store.select('threat')
      .pipe(
        pluck('feedReports')
      )
      .subscribe(
        (reports: any[]) => {
          this._reports = reports
            .sort(this.sortByLastModified);
          console.log(`(${new Date().toISOString()}) reports list`, this.reports);
          this.carousel.calculateWindow();
          this._loaded = true;
        },
        (err) => console.log(`(${new Date().toISOString()}) Error loading reports:`, err)
      );
  }

  public viewReport(id: string) {
    console.log(`Request to view report '${id}' received`);
  }

  public shareReport(id: string) {
    console.log(`Request to share report '${id}' received`);
  }

  public getReportBackground(item: any): string {
    const colors = [
        ['darkred', 'rosybrown'],
        ['lightblue', 'darkblue'],
        ['lightgreen', 'darkgreen'],
        ['orchid', 'darkorchid'],
        ['palevioletred', 'mediumvioletred'],
    ];
    const n = item.name.charCodeAt(0) % colors.length;
    return `linear-gradient(${colors[n][0]}, ${colors[n][1]})`;
}

public getReportBackgroundImage(item: any) {
  return this.sanitizer.bypassSecurityTrustStyle(
          (item.metaProperties.image ? `url(${item.metaProperties.image}), ` : '') +
          'linear-gradient(transparent, transparent)');
}

  public sortByLastModified(a: any, b: any) {
    return b.modified.localeCompare(a.modified);
  }
}
