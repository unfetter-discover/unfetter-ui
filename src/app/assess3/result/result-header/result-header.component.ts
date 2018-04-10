import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'result-header',
  templateUrl: './result-header.component.html',
  styleUrls: ['./result-header.component.scss']
})
export class ResultHeaderComponent implements OnInit {

  @Input()
  assessmentId: string;

  @Input()
  public created: Date;

  public summaryLink: string;
  public resultsLink: string;

  constructor() { }

  /**
   * @description on init
   * @return {void}
   */
  public ngOnInit(): void {
    const base = '/assess3/result/';
    this.summaryLink = `${base}/summary/${this.assessmentId}`;
    this.resultsLink = `${base}/full/${this.assessmentId}`;
  }

}
