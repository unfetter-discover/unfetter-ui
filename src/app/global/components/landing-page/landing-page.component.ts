import { Component } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  constructor(public authService: AuthService) { }
}
