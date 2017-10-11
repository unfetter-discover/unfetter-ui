import { Component } from '@angular/core';

import { AuthService } from '../global/services/auth.service';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html'
})

export class HomeComponent {
  constructor(private authService: AuthService) {}
}
