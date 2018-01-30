import { Component, OnInit, Input } from '@angular/core';
import { simpleFadeIn, inOutAnimation } from '../../animations/animations';
import { parentFadeIn, slideInOutAnimation } from '../../animations/animations';

interface NamedItem {
  name: string;
}

interface Option {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'unfetter-side-panel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.scss'],
  // animations: [simpleFadeIn, inOutAnimation, parentFadeIn, slideInOutAnimation]
})
export class SidepanelComponent implements OnInit {

    @Input() public width = 400;

    /* @Input() */ public collapsible = false;

    @Input() public minimized = false;

    @Input() public headerBackground = '';

    @Input() public item: NamedItem;

    public showMinimizeButton = false;

    public options: Array<Option> = [
      {label: 'Sample Option', icon: 'apps', url: 'sample.url.html'}
    ];

    constructor() {}

    ngOnInit() {
    }

    getWidth() {
      return this.width + 'px';
    }

}
