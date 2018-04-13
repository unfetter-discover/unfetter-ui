import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss']
})
export class HeaderLogoComponent {

  @Input() public title: string;

  constructor() { }
}
