import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentsSummaryService } from './assessments-summary.service';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'assessments-summary',
    templateUrl: './assessments-summary.component.html',
    styleUrls: ['./assessments-summary.component.css']
})

export class AssessmentsSummaryComponent implements OnInit {

    public summary: any;
    public id: string;

    constructor(
        private assessmentsSummaryService: AssessmentsSummaryService,
        private route: ActivatedRoute
    ) {}

    public ngOnInit() {
        // https://localhost/api/x-unfetter-assessments?id=%22x-unfetter-assessment--4adcb0ee-be04-4ac5-b863-aca49c2cd9f4xxx%22&sort=%7B%22stix.created%22:-1%7D
        this.id = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : '';
        const self = this;
        const subscription = this.assessmentsSummaryService.getById(this.id).subscribe(
            (res) => {
                console.log(res);
                // const assessments = res.data;
                // const assessment = assessments.find((el) => el.id === self.id);
                // if (!assessment) {
                    // console.error('Could not find assessement with id ', self.id);
                // }
                // this.summary = assessment ? assessment : {};
                this.summary = res ? res : {};
            },
            (err) => console.log(err),
            () => subscription.unsubscribe()
        );
    }

}
