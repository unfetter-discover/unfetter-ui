import { Component, OnInit } from '@angular/core';
import { pluck, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '../../../root-store/app.reducers';
import { MasterConfig } from '../../../core/services/run-config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public showBanner = false;
  public contentOwner: string = null;
  public pagePublisher: string = null;
  public lastReviewed: number = null;
  public lastModified: number = null;
  public footerTextHtml: string = null;

  constructor(
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.store
      .select('config')
      .pipe(
        pluck('runConfig'),
        distinctUntilChanged(),
      )
      .subscribe(
        (cfg: MasterConfig) => {
          if (cfg) {
            this.showBanner = cfg.showBanner || false;
            this.contentOwner = cfg.contentOwner || null;
            this.pagePublisher = cfg.pagePublisher || null;
            this.lastReviewed = cfg.lastReviewed || null;
            this.lastModified = cfg.lastModified || null;
            this.footerTextHtml = cfg.footerTextHtml || null;
          }
        }
      );
  }

}
