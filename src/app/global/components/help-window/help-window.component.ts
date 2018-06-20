import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { heightCollapse } from '../../animations/height-collapse';

@Component({
  selector: 'help-window',
  templateUrl: './help-window.component.html',
  styleUrls: ['./help-window.component.scss'],
  animations: [heightCollapse]
})
export class HelpWindowComponent implements OnChanges {

  @Input() public helpHtml: string = '';
  public showHelp: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.helpHtml) {
      this.helpHtml = this.helpHtml.trim().replace(/([^\n])\n([^\n])/g, '$1 $2');
    }
  }
}
