import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Constance } from '../../utils/constance';
import { GenericApi } from '../../global/services/genericapi.service';

@Component({
  selector: 'kill-chain-table',
  templateUrl: 'kill-chain-table.component.html',
  styleUrls: ['./kill-chain-table.component.scss']
})
export class KillChainTableComponent implements OnInit {

  public attackPatterns: any;
  public intrusionSetsDashboard: any = {};
  public groupKillchain: any[];
  public readonly subscriptions: Subscription[] = [];

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
          this.groupKillchain = this.groupByKillchain(attackPatterns);
          this.intrusionSetsDashboard['killChainPhases'] = this.groupKillchain;
        },
        (err) => console.log(err));

    this.subscriptions.push(sub$);
  }

  /**
   * @description group attack patterns by kill chain phase
   * @param attackPatterns
   */
  public groupByKillchain(attackPatterns: any[]): any[] {
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
            name: attackPattern.attributes.name,
            back: '#fafafa'
          });
        });
      }
    });
    Object.keys(killChainAttackPatternGroup).forEach((key) => {
      const killchain = { name: key, attack_patterns: killChainAttackPatternGroup[key] };
      killChainAttackPattern.push(killchain);
    });
    return killChainAttackPattern;
  }

  /**
   * @description
   * @return {number}
   */
  public count(attack_patterns: any): number {
    let count = 0;
    attack_patterns.forEach((attack_pattern) => {
      if (attack_pattern.back && attack_pattern.back !== '#fafafa') {
        count = count + 1;
      }
    });
    return count;
  }

}
