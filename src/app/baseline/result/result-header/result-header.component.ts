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

  constructor() { }

  /**
   * @description on init
   * @return {void}
   */
  public ngOnInit(): void {
    const base = '/baseline/result/';
    this.summaryLink = `${base}/summary/${this.baselineId}`;
  }

}
