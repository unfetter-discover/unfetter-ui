import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'phase-list',
    templateUrl: './phase-list.component.html',
    styleUrls: ['./phase-list.component.css']
})

export class PhaseListComponent implements OnInit {

    @Input('phase') public phase: any;
    @Input('numAttackPatterns') public numAttackPatterns: any;
    @Input('assessmentId') public assessmentId: any;
    @Input('questions') public questions: any;

    public green: any = {
        h: 122,
        s: 39,
        l: 49
    };

    public red: any = {
        h: 4,
        s: 90,
        l: 58
    };

    public riskColor: any;
    constructor(private route: ActivatedRoute) { }

    public ngOnInit() {
        let avgRisk = this.phase.avgRisk;
        let riskHsl: any = {};

        // Risk color
        let hueDelta = this.green.h - this.red.h;
        riskHsl.h = this.green.h - hueDelta * avgRisk;
        let saturationDelta = this.red.s - this.green.s;
        riskHsl.s = this.green.h + saturationDelta * avgRisk;
        let lightnessDelta = this.red.l - this.green.l;
        riskHsl.l = this.green.l + lightnessDelta * avgRisk;

        this.riskColor = `hsla(${riskHsl.h}, ${riskHsl.s}%, ${riskHsl.l}%, 1)`;
    }
}
