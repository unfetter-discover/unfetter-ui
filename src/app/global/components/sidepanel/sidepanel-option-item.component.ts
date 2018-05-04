import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sidepanel-option-item',
  templateUrl: './sidepanel-option-item.component.html',
  styleUrls: ['./sidepanel-option-item.component.scss']
})
export class SidepanelOptionItemComponent implements OnInit {

  @Input() public label: string;

  @Input() public icon: string;

  @Input() public disabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
