import { Component, Input } from '@angular/core';

@Component({
    selector: 'indicator-card',
    templateUrl: 'indicator-card.component.html',
    styleUrls: ['indicator-card.component.scss']
})

export class IndicatorCardComponent {
    @Input() public indicator: any;
    @Input() public attackPatterns: any;
}
