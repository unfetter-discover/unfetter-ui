import { Component, Input, OnInit } from '@angular/core';
import { Assessment } from 'stix/assess/v3/assessment';

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
  protected totalIndicators = 45;
  protected totalCoas = 249;
  protected totalSensors = 7;
  protected editUrl: string;

  constructor() { }

  /**
   * @description on init
   * @return {void}
   */
  public ngOnInit(): void {
    const base = '/assess-beta';
    const resultBase = `${base}/result`;
    this.summaryLink = `${resultBase}/summary/${this.rollupId}/${this.assessmentId}`;
    this.resultsLink = `${resultBase}/full/${this.rollupId}/${this.assessmentId}`;
    const editBase = `${base}/wizard/edit/`;
    this.editUrl = `${editBase}/${this.rollupId}`; 
    // TODO: initialize the correct total questions, by calling the server, may need a count endpoint
    this.percentCompleted = this.calcPercentCompleted(this.assessment);
    this.percentCompletedMsg = `Assessments BETA, some features do not work!`
    this.percentCompletedMsg += ` ${this.percentCompleted}% of your assessment is complete.`;
  }

  /**
   * @param  {Assessment} assessment
   * @returns number
   */
  public calcPercentCompleted(assessment: Assessment): number {
    const defaultPercent = 0;
    if (!assessment) {
      return defaultPercent;
    }

    const assessmentObjects = assessment.assessment_objects || [];
    if (assessmentObjects.length < 1) {
      return defaultPercent;
    }

    const assessmentType = assessmentObjects[0].stix.type || '';
    let totalQuestions;
    switch (assessmentType.toString()) {
      case 'indicator': {
        totalQuestions = this.totalIndicators;
        break;
      }
      case 'course-of-action': {
        totalQuestions = this.totalCoas;
        break;
      }
      case 'x-unfetter-sensor': {
        totalQuestions = this.totalSensors;
        break;
      }
      case 'x-unfetter-capability': 
      case 'x-unfetter-object-assessment': {
        totalQuestions = this.totalSensors;
        break;
      }
      default: {
        const msg = `cannot cacluate percent complete. cannot determine the assessment type of ${JSON.stringify(assessmentObjects[0])}.  moving on...`;
        console.log(msg);
        return defaultPercent;
      }
    }

    const numAssessed = assessmentObjects.length;
    const percent = Math.round((numAssessed / totalQuestions) * 100);
    // console.log('calc % completed', percent);
    return percent;
  }

}
