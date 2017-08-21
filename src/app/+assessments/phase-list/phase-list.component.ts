import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'phase-list',
    templateUrl: './phase-list.component.html',
    styleUrls: ['./phase-list.component.css']
})

export class PhaseListComponent {

    @Input('phase') public phase: any;
    @Input('numAttackPatterns') public numAttackPatterns: any;
    @Input('assessmentId') public assessmentId: any;
    @Input('questions') public questions: any;
    @Input('riskBreakdown') public riskBreakdown: any;

    constructor(private route: ActivatedRoute) { }
}
