
import { Component,  OnInit } from '@angular/core';
import { AppState } from './app.service';
import { AssessmentComponent } from '../assessment.component';
import { AssessmentsService } from '../../assessments.service';
import { Constance } from '../../../utils/constance';
import { Tool } from '../../../models/tool';

@Component({
  selector: 'sensors.component',
  templateUrl: './sensors.component.html'
})
export class SensorsComponent implements OnInit {
  private data: Tool[];
  private description =  'An Assessment is your evaluation of the implementations of your network.  You will rate your environment ' +
            ' to the best of your ability.' +
            'On the final page of the survey, you will be asked to enter a name for the report and a description.  Unfetter Discover will ' +
            'use the survey to help you understand your gaps, how important they are and which should be addressed.  You may create ' +
            'multiple reports to see how your risk is changed when implementing different security processes.';

  constructor(private assessmentsService: AssessmentsService) {

    assessmentsService.url = 'api/x-unfetter-sensors';
  }

  public ngOnInit() {
     this.assessmentsService.load().subscribe(
       (data) => {
         this.data = data;
      }
    );
  }
}
