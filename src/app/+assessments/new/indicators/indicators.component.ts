
import { Component,  OnInit,  ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Constance } from '../../../utils/constance';
import { AssessmentsService } from '../../assessments.service';
import { Indicator } from '../../../models/indicator';
import { AssessmentComponent } from '../assessment.component';

@Component({
  selector: 'indicators.component',
  templateUrl: './indicators.component.html'
})
export class IndicatorsComponent implements OnInit {
    private data: Indicator[];
    private description =  'An Assessment is your evaluation of the implementations of your network.  You will rate your environment ' +
            ' to the best of your ability.' +
            'On the final page of the survey, you will be asked to enter a name for the report and a description.  Unfetter Discover will ' +
            'use the survey to help you understand your gaps, how important they are and which should be addressed.  You may create ' +
            'multiple reports to see how your risk is changed when implementing different security processes.';

    constructor(private assessmentsService: AssessmentsService, private route: ActivatedRoute) {
        assessmentsService.url = Constance.INDICATOR_URL;
    }

    public ngOnInit() {
        console.dir(this.route.snapshot.url)
        console.log('*****');
        this.assessmentsService.load().subscribe(
            (data) => {
                this.data = data;
            }
        );
    }
}
