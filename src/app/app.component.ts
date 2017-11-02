import { Component,  OnInit, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { AuthService } from './global/services/auth.service';
import { WebAnalyticsService } from './global/services/web-analytics.service';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  animations: [
    trigger('collapseLevel', [
      state('open', style({ opacity: 1, height: '*' })),
      state('closed', style({ opacity: 0, height: 0 })),
      transition('open <=> closed', animate('200ms ease-in-out')),
    ])
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public showBanner = false;
  public securityMarkingLabel = '';
  public showSubMenu = true;

  constructor(
    public authService: AuthService,
    private webAnalyticsService: WebAnalyticsService
  ) {}

  public ngOnInit() {
    if (SHOWBANNER !== undefined) {
      this.showBanner = SHOWBANNER;
    }

    if (BANNERTEXT !== undefined) {
      this.securityMarkingLabel = BANNERTEXT;
    }

    this.webAnalyticsService.recordVisit();
  }
}
