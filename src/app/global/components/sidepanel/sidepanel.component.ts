import { Component, OnInit, Input } from '@angular/core';
import { Routes } from '@angular/router';

interface IconnedRoute {
  href: string;
  tooltip?: string;
}

@Component({
  selector: 'unfetter-side-panel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent implements OnInit {

  @Input() private width = 320;
  @Input() private collapsible = true;
  @Input() private minimized = false;

  public miniRoutes: IconnedRoute[] = [];

  constructor(
      private content: any
  ) {}

  ngOnInit() {
  }

  getWidth() {
    return this.width;
  }

  isCollapsible() {
    return this.collapsible;
  }

  isMinimized() {
    return this.minimized;
  }
  expand(): void {
    this.minimized = false;
  }
  contract(): void {
    this.minimized = true;
  }

}
