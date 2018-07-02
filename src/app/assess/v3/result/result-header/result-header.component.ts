import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Assessment } from 'stix/assess/v3/assessment';

@Component({
  selector: 'result-header',
  templateUrl: './result-header.component.html',
  styleUrls: ['./result-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ResultHeaderComponent implements OnInit {

  @Input() public assessment: Assessment;
  @Input() public assessmentId: string;
  @Input() public created: Date;
  @Input() public rollupId: string;
  public percentCompleted = 0;
  public percentCompletedMsg: string;
  public resultsLink: string;
  public summaryLink: string;

  // TODO: grab dynamic count of coas and indicators
  protected readonly TOTAL_COAS = 249;
  protected readonly TOTAL_INDICATORS = 45;
  protected readonly TOTAL_SENSORS = 7;

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
        totalQuestions = this.TOTAL_INDICATORS;
        break;
      }
      case 'course-of-action': {
        totalQuestions = this.TOTAL_COAS;
        break;
      }
      case 'x-unfetter-sensor': {
        totalQuestions = this.TOTAL_SENSORS;
        break;
      }
      case 'x-unfetter-capability':
      case 'x-unfetter-object-assessment': {
        totalQuestions = this.TOTAL_SENSORS;
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
    return (percent > 100) ? 100 : percent;
  }

}
