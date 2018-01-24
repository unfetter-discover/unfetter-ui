import { Component, Input } from '@angular/core';

import { heightCollapse } from '../../animations/height-collapse';

@Component({
  selector: 'help-window',
  templateUrl: './help-window.component.html',
  styleUrls: ['./help-window.component.scss'],
  animations: [heightCollapse]
})
export class HelpWindowComponent {

  @Input() public helpHtml: string = '';
  public showHelp: boolean = false;

  constructor() { }
}
