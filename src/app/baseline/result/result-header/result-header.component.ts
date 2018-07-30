import { Component, OnInit, Input } from '@angular/core';
import { SummaryCalculationService } from '../summary/summary-calculation.service';
import { Store } from '@ngrx/store';
import * as assessReducers from '../../store/baseline.reducers';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { SaveBaseline } from '../../store/baseline.actions';

@Component({
  selector: 'result-header',
  templateUrl: './result-header.component.html',
  styleUrls: ['./result-header.component.scss']
})
export class ResultHeaderComponent implements OnInit {

  @Input()
  baselineId: string;

  @Input()
  public published: Date;
  private percentCompleted: number;
  public summaryLink: string;
  infoBarMsg: string;
  public editUrl: string;

  @Input() currentBaseline: AssessmentSet;

  constructor(
    public calculationService: SummaryCalculationService,
    private wizardStore: Store<assessReducers.BaselineState>
  ) { }


  /**
   * @description on init
   * @return {void}
   */
  public ngOnInit(): void {
    const base = '/baseline/result/';
    this.summaryLink = `${base}/summary/${this.baselineId}`;
    this.percentCompleted = this.calculationService.blPercentComplete;
    if (this.percentCompleted < 100) {
      this.infoBarMsg = `${this.percentCompleted.toFixed(2)}% of your baseline is complete.`;
      this.editUrl = `/baseline/wizard/edit/${this.baselineId}`;
    }
  }

  public publishBaseline() {
    this.currentBaseline.metaProperties.published = true;
    this.wizardStore.dispatch(new SaveBaseline(this.currentBaseline));
  }
}
