import { Component, Input, OnInit } from '@angular/core';
import { Assessment } from '../../../models/assess/assessment';

@Component({
  selector: 'result-header',
  templateUrl: './result-header.component.html',
  styleUrls: ['./result-header.component.scss']
})
export class ResultHeaderComponent implements OnInit {

  @Input()
  rollupId: string;
  @Input()
  assessmentId: string;

  @Input()
  public created: Date;
  @Input()
  public assessment: Assessment;

  public summaryLink: string;
  public resultsLink: string;

  public percentCompletedMsg: string;
  public percentCompleted = 0;

  constructor() { }

  /**
   * @description on init
   * @return {void}
   */
  public ngOnInit(): void {
    const base = '/assess/result/';
    this.summaryLink = `${base}/summary/${this.rollupId}/${this.assessmentId}`;
    this.resultsLink = `${base}/full/${this.rollupId}/${this.assessmentId}`;
    this.percentCompleted = this.calcPercentCompleted(this.assessment);
    this.percentCompletedMsg = `${this.percentCompleted} of your assessment is complete.`;
  }

  /**
   * @param  {Assessment} assessment
   * @returns number
   */
  public calcPercentCompleted(assessment: Assessment): number {
    if (!assessment) {
      return 0;
    }

    // assessment.assessment_objects;
    console.log('calc % completed', assessment);
  }

}
