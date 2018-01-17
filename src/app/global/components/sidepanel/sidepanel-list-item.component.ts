import { Component, OnInit, Input } from '@angular/core';
import { slideInOutAnimation } from '../../animations/animations';

@Component({
  selector: 'sidepanel-list-item',
  templateUrl: './sidepanel-list-item.component.html',
  styleUrls: ['./sidepanel-list-item.component.scss'],
  animations: [slideInOutAnimation]
})
export class SidepanelListItemComponent implements OnInit {

  @Input('label') public label: string = '';

  @Input('icon') public icon: string = '';

  @Input('items') public items: any = [];

  @Input('expandable') public expandable: boolean = false;

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
