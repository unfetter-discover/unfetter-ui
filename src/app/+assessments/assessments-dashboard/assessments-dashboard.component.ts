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

    assessment: Object;
    riskByAttackPattern: Object;

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


}