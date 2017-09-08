import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constance } from '../../../utils/constance';

@Component({
    selector: 'phase-list',
    templateUrl: './phase-list.component.html',
    styleUrls: ['./phase-list.component.css']
})

export class PhaseListComponent implements OnInit {

    @Input('phase') public phase: any;
    @Input('numAttackPatterns') public numAttackPatterns: any;
    @Input('assessmentId') public assessmentId: any;
    @Input('riskBreakdown') public riskBreakdown: any;

    private totalRisk: number = 1;

    constructor(private route: ActivatedRoute) { }

    public ngOnInit() {
        let tempRisk = 0;
        for (let question in this.riskBreakdown) {
            tempRisk += this.riskBreakdown[question];
        }
        this.totalRisk = tempRisk;
    }
}
