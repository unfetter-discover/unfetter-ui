import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentsDashboardService } from './assessments-dashboard.service';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'assessments-dashboard',
    templateUrl: './assessments-dashboard.component.html',
    styleUrls: ['./assessments-dashboard.component.css']
})

export class AssessmentsDashboardComponent implements OnInit {

    assessment: any;
    riskByAttackPattern: any;

    constructor(
        private assessmentsDashboardService: AssessmentsDashboardService, 
        private route: ActivatedRoute,
    ){}

    ngOnInit() {
        let id = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : ''; this.assessment = {};
        this.assessment['attributes'] = {};
        this.assessmentsDashboardService.getById(id).subscribe(
            res => {
                this.assessment = res ? res : {};             
            },
            err => console.log(err)             
        );

        this.assessmentsDashboardService.getRiskByAttackPattern(id).subscribe(
            res => {
                this.riskByAttackPattern = res ? res : {};
                console.log(this.riskByAttackPattern);                
            },
            err => console.log(err)
        );
    }

    getNumAttackPatterns(phaseName) {
        let attackPatternsByKillChain = this.riskByAttackPattern.attackPatternsByKillChain;
        // console.log(attackPatternsByKillChain);
        // console.log(phaseName);
        
        

        for (let killPhase of attackPatternsByKillChain) {
            if (killPhase._id === phaseName && killPhase.attackPatterns !== undefined) {
                return killPhase.attackPatterns.length;
            }
        }
        return 0;
    }


}