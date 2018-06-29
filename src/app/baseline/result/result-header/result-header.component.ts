import { Component, OnInit, Input } from '@angular/core';

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

  public summaryLink: string;
  infoBarMsg: string;
  percentCompleted: number;
  public editUrl: string;

  constructor() { }

  /**
   * @description on init
   * @return {void}
   */
  public ngOnInit(): void {
    const base = '/baseline/result/';
    this.summaryLink = `${base}/summary/${this.baselineId}`;


   

    this.editUrl = `/baseline/wizard/edit/${this.baselineId}`;
    this.infoBarMsg = 'Baselines is currently in beta. Some functionality does not work.'
    this.percentCompleted = 2;
    this.infoBarMsg += ` ${this.percentCompleted}% of your baseline is complete.`;

  }

}
