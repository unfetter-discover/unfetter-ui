import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Constance } from '../utils/constance';
import { StixService } from '../settings/stix.service';
import { BaseStixService } from '../settings/base-stix.service';
import { BaseComponentService } from '../components/base-service.component';
import { GenericApi } from '../global/services/genericapi.service';

import { IntrusionSetComponent } from '../intrusion-set/intrusion-set.component';
import { IntrusionSet, AttackPattern } from '../models';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReport } from '../threat-report-overview/models/threat-report.model';
import { SortHelper } from '../assessments/assessments-summary/sort-helper';
import { KillChainEntry } from './kill-chain-table/kill-chain-entry';
import { SelectOption } from '../threat-report-overview/models/select-option';
import { ThreatDashboard } from './models/threat-dashboard';
import { RadarChartDataPoint } from './radar-chart/radar-chart-datapoint';

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
  public radarData: RadarChartDataPoint[][];
  public loading = true;

  private readonly filter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
  private readonly subscriptions: Subscription[] = [];
  private readonly red500 = '#F44336';
  private readonly redAccent200 = '#FF5252';
  private readonly defaultBackgroundColor = '#FAFAFA';
  private readonly defaultForegroundColor = '#000000';
  // private readonly selectedForegroundColor = '#F5F5F5';
  private readonly selectedForegroundColor = 'rgba(255, 255, 255, .87)';
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
          // build the table and short circuit the rest of the visualizations
          buildKillChainTable();
          return;
        }

        // build and render the visualizations
        const sub2$ = this.loadIntrusionSetMapping(intrusionIds)
          .map((mappings) => {
            // NOTE: order matters!
            this.treeData = this.buildTreeData();
            buildKillChainTable();
            this.radarData = this.buildRadarData();
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
    const url = Constance.ATTACK_PATTERN_URL + '?' + this.filter + '&project=' + encodeURI(JSON.stringify({
      'stix.name': 1,
      'stix.kill_chain_phases': 1,
      'stix.id': 1
    }));
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
          let attackPatternsProxies: KillChainEntry[] = killChainAttackPatternGroup[phaseName];
          if (attackPatternsProxies === undefined) {
            attackPatternsProxies = [];
            killChainAttackPatternGroup[phaseName] = attackPatternsProxies;
          }
          attackPatternsProxies.push({
            id: attackPattern.id,
            name: attackPattern.attributes.name,
            foregroundColor: attackPattern.foregroundColor,
            backgroundColor: attackPattern.backgroundColor,
            isSelected: attackPattern.isSelected
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
      attackPattern.isSelected = false;
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
      attackPattern.isSelected = true;
      return attackPattern;
    });

    return attackPatterns;
  }

  /**
   * @description take the instrusion set dashbaord and build a d3 tree
   * @return {void}
   */
  public buildTreeData(): any {
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

    return root;
  }

  /**
   * @description build the data needed to show the radar chart
   * @return {RadarChartDataPoint[][]}
   */
  public buildRadarData(): RadarChartDataPoint[][] {
    const phases = this.intrusionSetsDashboard.killChainPhases;
    const dataPoints = phases
      .map((phase) => {
        const total = phase.attack_patterns.length || 0;
        const selectedAttackPatterns = phase
          .attack_patterns
          .filter((attackPattern) => this.isTruthy(attackPattern.isSelected));
        const dataPoint = new RadarChartDataPoint();
        dataPoint.area = phase.name;
        dataPoint.value = Math.round((selectedAttackPatterns.length / total) * 100);
        return dataPoint;
      });

    // const arr = [
    //   [
    //     { 'area': 'Central ', 'value': 80 },
    //     { 'area': 'Kirkdale', 'value': 40 },
    //     { 'area': 'Kensington ', 'value': 40 },
    //     { 'area': 'Everton ', 'value': 90 },
    //     { 'area': 'Picton ', 'value': 60 },
    //     { 'area': 'Riverside ', 'value': 80 }
    //   ]
    // ];

    return [dataPoints];
  }

  /**
   * @description callback to signal d3 has finished loading the tree
   * @returns {void}
   */
  public treeRendered(): void {
    console.log('finished loading tree');
  }

  public radarRendered(): void {
    console.log('radar rendered');
  }

  /**
   * @description is truthy if defined, boolean, and true
   * @param val
   * @return true if true, otherwise false
   */
  private isTruthy(val: any): boolean {
    const isUndefined = 'undefined' === typeof val;
    const isBool = 'boolean' === typeof val;
    return !isUndefined && isBool && val === true;
  }

}
