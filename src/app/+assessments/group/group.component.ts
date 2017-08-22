import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentsDashboardService } from '../assessments-dashboard/assessments-dashboard.service';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'assessments-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class AssessmentsGroupComponent implements OnInit {

    private activePhase: String;
    private assessment: any;
    private riskByAttackPattern: any;
    private assessedObjects: any;
    private unassessedPhases: String;
    private currentAttackPattern: any;
    private id: String = '';

    constructor(
        private assessmentsDashboardService: AssessmentsDashboardService,
        private route: ActivatedRoute,
    ) { }

    public ngOnInit() {
        this.id = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : '';
        let routedPhase = this.route.snapshot.params['phase'] ? this.route.snapshot.params['phase'] : '';
        this.assessmentsDashboardService.getRiskByAttackPattern(this.id)
            .subscribe(
                (res) => {
                    this.riskByAttackPattern = res ? res : {};
                    this.populateUnassessedPhases();
                    this.activePhase = routedPhase ? routedPhase : this.riskByAttackPattern.phases[0]._id;
                    this.setAttackPattern(this.getScores(this.activePhase)[0].attackPatternId);
                },
                (err) => console.log(err)
            );

        this.assessmentsDashboardService.getAssessedObjects(this.id)
            .subscribe(
                (res) => {
                    this.assessedObjects = res ? res : {};
                    console.log('Assessed objs\n', this.assessedObjects);
                },
                (err) => console.log(err)
            );

        this.assessment = {};
        this.assessment['attributes'] = {};
        this.assessmentsDashboardService.getById(this.id)
            .subscribe(
                (res) => {
                    this.assessment = res ? res : {};
                },
                (err) => console.log(err)
            );
    }

    public getNumAttackPatterns(phaseName) {
        let attackPatternsByKillChain = this.riskByAttackPattern.attackPatternsByKillChain;

        for (let killPhase of attackPatternsByKillChain) {
            if (killPhase._id === phaseName && killPhase.attackPatterns !== undefined) {
                return killPhase.attackPatterns.length;
            }
        }
        return 0;
    }

    public populateUnassessedPhases() {
        let assessedPhases = this.riskByAttackPattern.phases.map((phase) => phase._id);
        this.unassessedPhases = Constance.KILL_CHAIN_PHASES
            .filter((phase) => assessedPhases.indexOf(phase) < 0)
            .reduce((prev, phase) => prev.concat(', '.concat(phase)), '')
            .slice(2);
    }

    public setPhase(phaseName) {
        this.activePhase = phaseName;
        this.setAttackPattern(this.getScores(this.activePhase)[0].attackPatternId);
    }

    public getScores(phaseName) {
        return this.riskByAttackPattern.phases.find((phase) => phase._id === phaseName).scores;
    }

    public setAttackPattern(attackPatternId) {
        this.currentAttackPattern = this.riskByAttackPattern.attackPatternsByKillChain
            .find((killChain) => killChain._id === this.activePhase)
            .attackPatterns
            .find((attackPattern) => attackPattern.id === attackPatternId);
    }
}
