import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import {
    Constance
} from '../../../utils/constance';

@Component({
    selector: 'risk-breakdown',
    templateUrl: 'risk-breakdown.component.html',
    styleUrls: ['risk-breakdown.component.css']
})

export class RiskBreakdownComponent implements OnInit {

    @Input('riskBreakdown') public riskBreakdown: any;

    public categories: string[];

    public ngOnInit() {
        this.categories = Object.keys(this.riskBreakdown);
    }

    public getColor(category: string) {
        let index = Object.keys(this.riskBreakdown).indexOf(category) % 10;
        if (index === undefined) {
            index = Math.floor(Math.random() * (9 - 0 + 1));
        }
        return Constance.MAT_COLORS[Constance.MAT_GRAPH_COLORS[index]][500];
    }
}
