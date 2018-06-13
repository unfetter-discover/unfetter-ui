import { Component, OnInit } from '@angular/core';
import { RunConfigService } from '../../../core/services/run-config.service';

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

  constructor(private runConfigService: RunConfigService) { }

  ngOnInit() {
    this.runConfigService.config.subscribe(
      (cfg) => {
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
