import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Constance } from '../../utils/constance';
import { GenericApi } from '../../global/services/genericapi.service';
import { ThreatReport } from '../../threat-report-overview/models/threat-report.model';
import { SortHelper } from '../../assessments/assessments-summary/sort-helper';
import { KillChainEntry } from './kill-chain-entry';

@Component({
  selector: 'attack-pattern-count',
  templateUrl: 'attack-pattern-count.component.html',
  styleUrls: ['./attack-pattern-count.component.scss']
})
export class AttackPatternCountComponent implements OnInit, OnDestroy {

  @Input('threatReport')
  public threatReport: ThreatReport;
  @Input('attackPatterns')
  public attackPatterns: any;
  @Input('intrusionSetsDashboard')
  public intrusionSetsDashboard: any;

  public readonly subscriptions: Subscription[] = [];
  private readonly red500 = '#F44336';
  private readonly redAccent200 = '#FF5252';
  private readonly defaultBackgroundColor = '#FAFAFA';
  private readonly defaultForegroundColor = '#000000';
  private readonly selectedForegroundColor = '#F5F5F5';
  private readonly selectedBackgroundColor = this.redAccent200;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected genericApi: GenericApi
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

}
