import { Component, OnInit, Input } from '@angular/core';
import { SummaryCalculationService } from '../summary/summary-calculation.service';

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

  constructor(
    public calculationService: SummaryCalculationService
  ) { }

  /**
   * @description on init
   * @return {void}
   */
  public ngOnInit(): void {
    const base = '/baseline/result/';
    this.summaryLink = `${base}/summary/${this.baselineId}`;
    this.infoBarMsg = 'Baselines is currently in beta. Some functionality does not work.'

    this.percentCompleted = Math.round((this.calculationService.baselineWeightings.protPct + 
                                        this.calculationService.baselineWeightings.protPct + 
                                        this.calculationService.baselineWeightings.protPct) / 3);
    if (this.percentCompleted < 100) {
      this.infoBarMsg += ` ${this.percentCompleted}% of your baseline is complete.`;
      this.editUrl = `/baseline/wizard/edit/${this.baselineId}`;
    }
  }
}
