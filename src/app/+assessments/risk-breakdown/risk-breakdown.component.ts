import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import {
    Constance
} from '../../utils/constance';

@Component({
    selector: 'risk-breakdown',
    templateUrl: 'risk-breakdown.component.html',
    styleUrls: ['risk-breakdown.component.css']
})

export class RiskBreakdownComponent implements OnInit {

    @Input('riskBreakdown') public riskBreakdown: any;

    private categories: String[];

    public ngOnInit() {
        this.categories = Object.keys(this.riskBreakdown);
    }

    public getColor(category: string) {
        switch (Object.keys(this.riskBreakdown).indexOf(category) % 10) {
            case 0:
                return '#0277bd';
            case 1:
                return '#E91E63';
            case 2:
                return '#FFC107';
            case 3:
                return '#8BC34A';
            case 4:
                return '#00BCD4';
            case 5:
                return '#673AB7';
            case 6:
                return '#03A9F4';
            case 7:
                return '#FF5722';
            case 8:
                return '#009688';
            case 9:
                return '#FF9800';
            default:
                return '#9C27B0';
        }
    }
}