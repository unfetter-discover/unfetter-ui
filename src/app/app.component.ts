import { Component,  ViewEncapsulation } from '@angular/core';

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
export class AppComponent {
  constructor(public authService: AuthService) {}
}
