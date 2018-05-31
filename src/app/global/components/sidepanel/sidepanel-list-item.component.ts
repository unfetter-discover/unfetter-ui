import { Component, OnInit, Input } from '@angular/core';
import { slideInOutAnimation } from '../../animations/animations';

@Component({
  selector: 'sidepanel-list-item',
  templateUrl: './sidepanel-list-item.component.html',
  styleUrls: ['./sidepanel-list-item.component.scss'],
  animations: [slideInOutAnimation]
})
export class SidepanelListItemComponent implements OnInit {

  @Input() public label: string = '';

  @Input() public icon: string = '';

  @Input() public items: any = [];

  @Input() public expandable: boolean = false;

  @Input() public showCount: boolean = true;

  @Input() public expanded: boolean = false;

  @Input() public hideToggle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  getCount() {
    if (this.items) {
      if (this.items.length) {
        return this.items.length;
      }
      if (this.items.size) {
        return this.items.size;
      }
    }
    return 0;
  }

}
