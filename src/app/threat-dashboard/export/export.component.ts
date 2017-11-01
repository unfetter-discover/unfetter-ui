import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Constance } from '../../utils/constance';
import { ThreatReport } from '../../threat-report-overview/models/threat-report.model';

@Component({
  selector: 'unf-export-component',
  templateUrl: 'export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit, OnDestroy {
  @Input('threatReport')
  public threatReport: ThreatReport;

  public readonly subscriptions: Subscription[] = [];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
  ) { }

  /**
   * @description init this component
   */
  public ngOnInit() { }

  /**
   * @description 
   */
  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  }

  /**
   * @description
   */
  public stringify(): string {
    return JSON.stringify(this.threatReport, undefined, 2);
  }

}
