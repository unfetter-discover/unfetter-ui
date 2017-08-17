
import { Component,  OnInit,  ViewEncapsulation } from '@angular/core';
import { AssessmentComponent } from '../assessment.component';
import { Constance } from '../../../utils/constance';
import { AssessmentsService } from '../../assessments.service';
import { CourseOfAction } from '../../../models/course-of-action';

@Component({
  selector: 'mitigations.component',
  templateUrl: './mitigations.component.html'
})
export class MitigationsComponent implements OnInit {
  private data: CourseOfAction[];
  private description =  'An Assessment is your evaluation of the implementations of your network.  You will rate your environment ' +
            ' to the best of your ability.' +
            'On the final page of the survey, you will be asked to enter a name for the report and a description.  Unfetter Discover will ' +
            'use the survey to help you understand your gaps, how important they are and which should be addressed.  You may create ' +
            'multiple reports to see how your risk is changed when implementing different security processes.';

  constructor(private assessmentsService: AssessmentsService) {
      assessmentsService.url = Constance.COURSE_OF_ACTION_URL;
  }

  public ngOnInit() {
     this.assessmentsService.load().subscribe(
       (data) => {
         this.data = data;
      }
    );
  }
}
