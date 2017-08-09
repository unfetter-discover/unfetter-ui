import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentsDashboardService } from '../assessments-dashboard/assessments-dashboard.service';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'assessments-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class AssessmentsGroup implements OnInit {

    private activePhase: String;
    private assessment: any;
    private riskByAttackPattern: any;
    private unassessedPhases: String;
    private currentAttackPattern: any;
    private id: String = '';

    constructor(
        private assessmentsDashboardService: AssessmentsDashboardService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : '';
        this.assessmentsDashboardService.getRiskByAttackPattern(this.id)
            .subscribe(
                res => {
                    this.riskByAttackPattern = res ? res : {};
                    this.populateUnassessedPhases();
                    this.activePhase = this.riskByAttackPattern.phases[0]._id;
                    this.setAttackPattern(this.getScores(this.activePhase)[0].attackPatternName);
                },
                err => console.log(err)
            );

        this.assessment = {};
        this.assessment['attributes'] = {};
        this.assessmentsDashboardService.getById(this.id)
            .subscribe(
                res => {
                    this.assessment = res ? res : {};
                },
                err => console.log(err)
            );
    }

    getNumAttackPatterns(phaseName) {
        let attackPatternsByKillChain = this.riskByAttackPattern.attackPatternsByKillChain;

        for (let killPhase of attackPatternsByKillChain) {
            if (killPhase._id === phaseName && killPhase.attackPatterns !== undefined) {
                return killPhase.attackPatterns.length;
            }
        }
        return 0;
    }

    populateUnassessedPhases() {
        let assessedPhases = this.riskByAttackPattern.phases.map(phase => phase._id);
        this.unassessedPhases = Constance.KILL_CHAIN_PHASES
            .filter(phase => assessedPhases.indexOf(phase) < 0)
            .reduce((prev, phase) => prev.concat(', '.concat(phase)), '')
            .slice(2);
    }

    getRiskColor(avgRisk) {
        let riskHsl: any = {};

        let green: any = {
            h: 122,
            s: 39,
            l: 49
        };

        let red: any = {
            h: 4,
            s: 90,
            l: 58
        };

        let hueDelta = green.h - red.h;
        riskHsl.h = green.h - hueDelta * avgRisk;
        let saturationDelta = red.s - green.s;
        riskHsl.s = green.h + saturationDelta * avgRisk;
        let lightnessDelta = red.l - green.l;
        riskHsl.l = green.l + lightnessDelta * avgRisk;

        return `hsla(${riskHsl.h}, ${riskHsl.s}%, ${riskHsl.l}%, 1)`; 
    }

    setPhase(phaseName) {
        this.activePhase = phaseName;
        this.setAttackPattern(this.getScores(this.activePhase)[0].attackPatternName);
    }

    getScores(phaseName) {
        return this.riskByAttackPattern.phases.find(phase => phase._id === phaseName).scores
    }

    setAttackPattern(attackPatternName) {
        this.currentAttackPattern = this.riskByAttackPattern.attackPatternsByKillChain
            .find(killChain => killChain._id === this.activePhase)
            .attackPatterns
            .find(attackPattern => attackPattern.name === attackPatternName);        
    }
}