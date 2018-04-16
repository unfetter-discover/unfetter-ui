import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'attack-patterns-legend',
    templateUrl: './attack-patterns-legend.component.html',
    styleUrls: ['./attack-patterns-legend.component.scss']
})
export class AttackPatternsLegendComponent implements OnInit {

    @Input() public intrusionSets: any[];

    @Input() public total: number;

    constructor() { }

    ngOnInit() {
    }

}
