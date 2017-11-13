import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Constance } from '../../utils/constance';
import { GenericApi } from '../../global/services/genericapi.service';
import { ThreatReport } from '../../threat-report-overview/models/threat-report.model';
import { SortHelper } from '../../assessments/assessments-summary/sort-helper';
import { KillChainEntry } from './kill-chain-entry';
import { AttackPattern } from '../../models/attack-pattern';
import { ThreatDashboard } from '../models/threat-dashboard';

@Component({
  selector: 'unf-kill-chain-table',
  templateUrl: 'kill-chain-table.component.html',
  styleUrls: ['./kill-chain-table.component.scss']
})
export class KillChainTableComponent implements OnInit, OnDestroy {

  @Input('threatReport')
  public threatReport: ThreatReport;
  @Input('attackPatterns')
  public attackPatterns: AttackPattern[];
  @Input('intrusionSetsDashboard')
  public intrusionSetsDashboard: ThreatDashboard;

  public readonly subscriptions: Subscription[] = [];

  // private readonly redAccent200 = '#FF5252';
  private readonly defaultBackgroundColor = '#FAFAFA';
  // private readonly defaultForegroundColor = '#000000';
  // // private readonly selectedForegroundColor = '#F5F5F5';
  // private readonly selectedForegroundColor = 'rbga(255, 255, 255, .87);'
  // private readonly selectedBackgroundColor = this.redAccent200;

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

  /**
   * @description tally the number of attackpatterns highlighted
   * @return {number}
   */
  public count(attack_patterns: KillChainEntry[]): number {
    let count = 0;
    attack_patterns.forEach((attack_pattern) => {
      if (attack_pattern.backgroundColor && attack_pattern.backgroundColor !== this.defaultBackgroundColor) {
        count = count + 1;
      }
    });
    return count;
  }

}
