import { Component, Input } from '@angular/core';

@Component({
    selector: 'indicator-card',
    templateUrl: 'indicator-card.component.html',
    styleUrls: ['indicator-card.component.scss']
})

export class IndicatorCardComponent {
    @Input() public indicator: any;
    @Input() public attackPatterns: any;
    @Input() public searchParameters: any;

    public labelSelected(label) {
        return this.searchParameters.labels.length !== this.searchParameters.activeLabels.length && this.searchParameters.activeLabels.includes(label);
    }

    // public labelToggle(label, labelToggle) {
    //     if (labelToggle) {
    //         this.searchParameters.activeLabels.push(label);
    //     } else {
    //         console.log('before', this.searchParameters);
            
    //         this.searchParameters.activeLabels.splice(this.searchParameters.activeLabels.indexOf(label), 1);
    //         console.log('after', this.searchParameters);
    //     }
    // }
}
