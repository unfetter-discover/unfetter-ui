import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Constance } from '../utils/constance';
import { StixService } from '../settings/stix.service';
import { BaseStixService } from '../settings/base-stix.service';
import { BaseComponentService } from '../components/base-service.component';
import { GenericApi } from '../global/services/genericapi.service';

import { IntrusionSetComponent } from '../intrusion-set/intrusion-set.component';
import { IntrusionSet, AttackPattern } from '../models';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReport } from '../threat-report-overview/models/threat-report.model';
import { SortHelper } from '../assessments/assessments-summary/sort-helper';
import { KillChainEntry } from './kill-chain-table/kill-chain-entry';
import { SelectOption } from '../threat-report-overview/models/select-option';
import { ThreatDashboard } from './models/threat-dashboard';

@Component({
  selector: 'unf-threat-dashboard',
  templateUrl: 'threat-dashboard.component.html',
  styleUrls: ['./threat-dashboard.component.scss']
})
export class ThreatDashboardComponent implements OnInit, OnDestroy {
  public threatReport: ThreatReport;
  public id = '';
  public attackPatterns: AttackPattern[];
  public intrusionSets: IntrusionSet[];
  public intrusionSetsDashboard: ThreatDashboard = { killChainPhases: [], intrusionSets: [], totalAttackPatterns: 0, coursesOfAction: [] };
  public groupKillchain: Array<Partial<KillChainEntry>>;
  public treeData: any;
  public loading = true;

  private readonly filter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
  private readonly subscriptions: Subscription[] = [];
  private readonly red500 = '#F44336';
  private readonly redAccent200 = '#FF5252';
  private readonly defaultBackgroundColor = '#FAFAFA';
  private readonly defaultForegroundColor = '#000000';
  private readonly selectedForegroundColor = '#F5F5F5';
  private readonly selectedBackgroundColor = this.redAccent200;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected genericApi: GenericApi,
    protected threatReportService: ThreatReportOverviewService
  ) { }

  /**
   * @description init this component
   */
  public ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id || this.id.trim() === '') {
      this.notifyDoneLoading();
      return;
    }

    const loadReport$ = this.loadThreatReport();
    const loadAttackPatterns$ = this.loadAttackPatterns();
    const loadIntrusionSets$ = this.loadIntrusionSets();
    // load the report and attackpatterns
    const loadAll$ = Observable.forkJoin(loadReport$, loadAttackPatterns$, loadIntrusionSets$);
    const logErr = (err) => console.log('request err', err);
    const noop = () => { };
    const sub$ = loadAll$.subscribe(
      (arr) => {
        const buildKillChainTable = () => {
          // build the kill chain table data
          this.attackPatterns = this.colorRows(this.attackPatterns, this.threatReport);
          this.groupKillchain = this.groupByKillchain(this.attackPatterns);
          this.intrusionSetsDashboard['killChainPhases'] = this.groupKillchain;
        };
        // get intrusion sets, used
        const intrusionIds: string[] = Array.from(this.threatReport.boundries.intrusions).map((el: SelectOption) => el.value);
        if (!intrusionIds || intrusionIds.length === 0) {
          // build the table and short circuit the tree
          buildKillChainTable();
          return;
        }

        // build the collapsible tree data
        const sub2$ = this.loadIntrusionSetMapping(intrusionIds)
          .map((mappings) => {
            // build tree
            this.buildTreeData();
            // color table, NOTE: order may matter!
            buildKillChainTable();
          })
          .subscribe(noop, logErr, () => this.notifyDoneLoading());
        this.subscriptions.push(sub2$);
      },
      logErr.bind(this),
      () => this.notifyDoneLoading());
    this.subscriptions.push(sub$);
  }

  public notifyDoneLoading(): void {
    setTimeout(() => this.loading = false, 0);
  }

  /**
   * @description load threat report
   * @return {Obsevable<ThreatReport}
   */
  public loadThreatReport(): Observable<ThreatReport> {
    return this.threatReportService.load(this.id).map((el) => this.threatReport = el);
  }

  /**
   * @description load attack patterns
   * @return {Observable<any>}
   */
  public loadAttackPatterns(): Observable<AttackPattern[]> {
    const url = Constance.ATTACK_PATTERN_URL + '?' + this.filter;
    return this.genericApi.get(url).map((el) => this.attackPatterns = el);
  }

  /**
   * @description load intrusion sets
   * @return {Observable<any>}
   */
  public loadIntrusionSets(): Observable<IntrusionSet[]> {
    const url = Constance.INTRUSION_SET_URL + '?' + this.filter;
    return this.genericApi.get(url).map((data) => this.intrusionSets = data);
  }

  /**
   * @description load instrusion set mapping
   */
  public loadIntrusionSetMapping(ids: string[] = []): Observable<ThreatDashboard> {
    if (ids.length === 0) {
      return Observable.of();
    }
    this.intrusionSetsDashboard.killChainPhases = null;
    const url = 'api/dashboards/intrusionSetView?intrusionSetIds=' + ids.join();
    return this.genericApi.get(url).map((data) => this.intrusionSetsDashboard = data);
  }

  /**
   * @description clean up this component
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
  public groupByKillchain(attackPatterns: any[]): Array<Partial<KillChainEntry>> {
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

    // sort the attack patterns w/ in a given kill chain
    Object.keys(killChainAttackPatternGroup).forEach((key) => {
      let arr = killChainAttackPatternGroup[key];
      arr = arr.sort(SortHelper.sortDescByField('name'));
    });

    // extract the keyed attackpatterns into a single array
    const killChainAttackPattern = [];
    Object.keys(killChainAttackPatternGroup).forEach((key) => {
      const killchain =
        {
          name: key,
          attack_patterns: killChainAttackPatternGroup[key]
        } as Partial<KillChainEntry>;
      killChainAttackPattern.push(killchain);
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
  public colorRows(attackPatterns: AttackPattern[], threatReport: ThreatReport): AttackPattern[] {
    if (!attackPatterns) {
      return [];
    }

    // clear row colors to default
    attackPatterns.forEach((attackPattern: any) => {
      attackPattern.backgroundColor = this.defaultBackgroundColor;
      attackPattern.foregroundColor = this.defaultForegroundColor;
    });

    if (!threatReport || !threatReport.reports) {
      return attackPatterns;
    }

    // get active attack patterns
    const attackIds = threatReport.reports
      .map((report) => report.object_refs)
      .reduce((memo, cur) => memo.concat(cur), []);
    const activeAttackPatternIds = new Set<string>(attackIds);
    const activeAttackPatterns = attackPatterns.filter((curAttackPattern) => activeAttackPatternIds.has(curAttackPattern.id));

    // set selected colors for active attack patterns
    activeAttackPatterns.map((attackPattern: any) => {
      attackPattern.backgroundColor = this.selectedBackgroundColor;
      attackPattern.foregroundColor = this.selectedForegroundColor;
      return attackPattern;
    });

    return attackPatterns;
  }

  /**
   * @description take the instrusion set dashbaord and build a d3 tree
   * @return {void}
   */
  public buildTreeData(): void {
    const root = { name: '', type: 'root', children: [] };
    this.intrusionSetsDashboard['intrusionSets'].forEach((intrusionSet) => {
      const child = {
        name: intrusionSet.name,
        type: intrusionSet.type,
        color: intrusionSet.color,
        description: intrusionSet.description
      };
      this.intrusionSetsDashboard['killChainPhases'].forEach((killChainPhase) => {
        let killChainPhaseChild = null;
        killChainPhase.attack_patterns.forEach((attack_pattern) => {
          attack_pattern.intrusion_sets.forEach((intrusion_set) => {
            if (intrusionSet.name === intrusion_set.name) {
              killChainPhaseChild = killChainPhaseChild
                ? killChainPhaseChild
                : {
                  name: killChainPhase.name,
                  type: 'kill_chain_phase',
                  color: intrusionSet.color,
                  children: []
                };
              const attackPatternChild = {
                type: 'attack-pattern',
                name: attack_pattern.name,
                color: intrusionSet.color,
                description: attack_pattern.description
              };
              killChainPhaseChild.children.push(attackPatternChild);
              this.intrusionSetsDashboard[
                'coursesOfAction'
              ].forEach((coursesOfAction) => {
                const found = coursesOfAction.attack_patterns.find((attack) => {
                  return attack._id === attack_pattern._id;
                });
                if (found) {
                  const coursesOfActionChild = {
                    type: 'course-of-action',
                    name: coursesOfAction.name,
                    description: coursesOfAction.description,
                    color: intrusionSet.color
                  };
                  if (!attackPatternChild['children']) {
                    attackPatternChild['children'] = [];
                  }
                  attackPatternChild['children'].push(coursesOfActionChild);
                }
              });
            }
          });
        });
        if (killChainPhaseChild) {
          child['children'] = child['children'] ? child['children'] : [];
          child['children'].push(killChainPhaseChild);
        }
      });
      root.children.push(child);
    });
    this.treeData = root;
  }

  /**
   * @description callback to signal d3 has finished loading the tree
   * @returns {void}
   */
  public treeComplete(): void {
    console.log('finished loading tree');
  }

}
