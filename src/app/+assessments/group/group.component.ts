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

    private riskByAttackPattern: any;

    constructor(
        private assessmentsDashboardService: AssessmentsDashboardService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        let id = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : '';
        this.assessmentsDashboardService.getRiskByAttackPattern(id).subscribe(
            res => {
                this.riskByAttackPattern = res ? res : {};
                console.log('Got it in group!');
                console.log(this.riskByAttackPattern);
                
                
            },
            err => console.log(err)
        );
    }
}