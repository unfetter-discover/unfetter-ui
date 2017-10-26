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
  selector: 'kill-chain-table',
  templateUrl: 'kill-chain-table.component.html',
  styleUrls: ['./kill-chain-table.component.scss']
})
export class KillChainTableComponent implements OnInit, OnDestroy {

  @Input('threatReport')
  public threatReport: ThreatReport;

  public attackPatterns: any;
  public intrusionSetsDashboard: any = {};
  public groupKillchain: KillChainEntry[];
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
  public ngOnInit() {
    const filter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
    const url = Constance.ATTACK_PATTERN_URL + '?' + filter;
    const sub$ = this.genericApi.get(url).subscribe(
      (attackPatterns) => {
        attackPatterns = this.colorRows(attackPatterns, this.threatReport);
        this.groupKillchain = this.groupByKillchain(attackPatterns);
        this.intrusionSetsDashboard['killChainPhases'] = this.groupKillchain;
      },
      (err) => console.log(err));

    this.subscriptions.push(sub$);
  }

  /**
   * @description 
   */
  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  }

  /**
   * @description group attack patterns by kill chain phase
   * @param attackPatterns
   */
  public groupByKillchain(attackPatterns: any[]): KillChainEntry[] {
    const killChainAttackPattern = [];
    const killChainAttackPatternGroup = {};
    attackPatterns.forEach((attackPattern) => {
      const killChainPhases = attackPattern.attributes.kill_chain_phases;

      if (killChainPhases) {
        killChainPhases.forEach((killChainPhase) => {
          const phaseName = killChainPhase.phase_name;
          let attackPatternsProxies = killChainAttackPatternGroup[phaseName];
          if (attackPatternsProxies === undefined) {
            attackPatternsProxies = [];
            killChainAttackPatternGroup[phaseName] = attackPatternsProxies;
          }
          attackPatternsProxies.push({
            id: attackPattern.id,
            name: attackPattern.attributes.name,
            foregroundColor: attackPattern.foregroundColor,
            backgroundColor: attackPattern.backgroundColor
          } as KillChainEntry);
        });
      }
    });

    Object.keys(killChainAttackPatternGroup).forEach((key) => {
      const killchain = { name: key, attack_patterns: killChainAttackPatternGroup[key] };
      killChainAttackPattern.push(killchain);
    });

    // sort the attack patterns w/ in a given kill chain
    Object.keys(killChainAttackPatternGroup).forEach((key) => {
      let arr = killChainAttackPatternGroup[key];
      arr = arr.sort(SortHelper.sortDescByField('name'));
    });

    return killChainAttackPattern;
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

  /**
   * @description will clear and set the appropriate colors for the rows
   *  do nothing if threat report or attack patterns are not populated
   * @param {AttackPattern[]} attackPatterns
   * @param {ThreatReport} threatReport
   * @return {AttackPattern[]} the given attackpatterns set with colors
   */
  public colorRows(attackPatterns: any[], threatReport: ThreatReport): any[] {
    if (!attackPatterns) {
      return [];

    }

    // clear row colors to default
    attackPatterns.forEach((attackPattern) => {
      attackPattern.backgroundColor = this.defaultBackgroundColor;
      attackPattern.foregroundColor = this.defaultForegroundColor;
    });

    if (!threatReport || !threatReport.reports) {
      return attackPatterns;
    }

    // get active attack patterns
    const reports = threatReport.reports;
    const activeAttackPatternIds = new Set<string>(
      reports
        .map((report) => report.object_refs)
        .reduce((memo, cur) => memo.concat(cur), []));
    const activeAttackPatterns = attackPatterns.filter((curAttackPattern) => activeAttackPatternIds.has(curAttackPattern.id));

    // set selected colors for active attack patterns
    activeAttackPatterns.map((attackPattern) => {
      attackPattern.backgroundColor = this.selectedBackgroundColor;
      attackPattern.foregroundColor = this.selectedForegroundColor;
      return attackPattern;
    });

    return attackPatterns;
  }

}
