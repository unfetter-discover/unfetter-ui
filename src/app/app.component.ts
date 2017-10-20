import { Component,  OnInit, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { AuthService } from './global/services/auth.service';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public showBanner = false;
  public securityMarkingLabel = '';

  constructor(public authService: AuthService) {}

  public ngOnInit() {
    if (SHOWBANNER !== undefined) {
      this.showBanner = SHOWBANNER;
    }

    if (BANNERTEXT !== undefined) {
      this.securityMarkingLabel = BANNERTEXT;
    }
  }
}
