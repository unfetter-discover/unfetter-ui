import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sidepanel-mini-item',
  templateUrl: './sidepanel-mini-item.component.html',
  styleUrls: ['./sidepanel-mini-item.component.scss']
})
export class SidepanelMiniItemComponent implements OnInit {

  @Input() icon: string;

  @Input() tooltip: string;

  constructor() { }

  ngOnInit() {
  }

}
