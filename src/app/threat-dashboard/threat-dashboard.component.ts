import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Constance } from '../utils/constance';
import { StixService } from '../settings/stix.service';
import { BaseStixService } from '../settings/base-stix.service';
import { BaseComponentService } from '../components/base-service.component';
import { GenericApi } from '../core/services/genericapi.service';

import { IntrusionSet, AttackPattern } from '../models';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReport } from '../threat-report-overview/models/threat-report.model';
import { KillChainEntry } from './kill-chain-table/kill-chain-entry';
import { SelectOption } from '../threat-report-overview/models/select-option';
import { ThreatDashboard } from './models/threat-dashboard';
import { RadarChartDataPoint } from './radar-chart/radar-chart-datapoint';
import { simpleFadeIn, inOutAnimation } from '../global/animations/animations';
import { SortHelper } from '../global/static/sort-helper';
import { RadarChartComponent } from './radar-chart/radar-chart.component';

@Component({
  selector: 'unf-threat-dashboard',
  templateUrl: 'threat-dashboard.component.html',
  styleUrls: ['./threat-dashboard.component.scss'],
  animations: [simpleFadeIn, inOutAnimation]
})
export class ThreatDashboardComponent implements OnInit, OnDestroy {

  @Input('minimize')
  public minimize: boolean;
  public showMinimizeBtn = false;

  public threatReport: ThreatReport;
  public id = '';
  public attackPatterns: AttackPattern[];
  public intrusionSets: IntrusionSet[];
  public intrusionSetsDashboard: ThreatDashboard = { killChainPhases: [], intrusionSets: [], totalAttackPatterns: 0, coursesOfAction: [] };
  public groupKillchain: Array<Partial<KillChainEntry>>;
  public treeData: any;
  public radarData: RadarChartDataPoint[][];
  public loading = true;
  public uniqChainNames: string[] = [];
  public selectedChain = '';

  private readonly filter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
  private readonly subscriptions: Subscription[] = [];
  private readonly red500 = '#F44336';
  private readonly redAccent200 = '#FF5252';
  private readonly defaultBackgroundColor = '#FFFFFF';
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
    this.minimize = false;
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id || this.id.trim() === '') {
      this.notifyDoneLoading();
      return;
    }
    this.fetchDataAndRender();
  }

  /**
   * @description fetch data and render components
   * @return {void}
   */
  public fetchDataAndRender(): void {
    this.loading = true;
    const loadReport$ = this.loadThreatReport();
    const loadAttackPatterns$ = this.loadAttackPatterns();
    const loadIntrusionSets$ = this.loadIntrusionSets();
    // load the report and attackpatterns
    const loadAll$ = Observable.forkJoin(loadReport$, loadAttackPatterns$, loadIntrusionSets$);
    const logErr = (err) => console.log('request err', err);
    const noop = () => { };
    const sub$ = loadAll$.subscribe(
      (arr) => this.fetchIntrusionSetsAndRender(),
      logErr.bind(this));
    this.subscriptions.push(sub$);
  }

  /**
   * @description fetch just the intrusions and render components
   */
  public fetchIntrusionSetsAndRender(): void {
    this.intrusionSetsDashboard = { killChainPhases: [], intrusionSets: [], totalAttackPatterns: 0, coursesOfAction: [] };
    const logErr = (err) => console.log('request err', err);
    const noop = () => { };
    // get intrusion sets, used
    const intrusionIds = Array.from(this.threatReport.boundries.intrusions).map((el: SelectOption) => el.value);
    if (!intrusionIds || intrusionIds.length === 0) {
      this.renderVisualizations();
      this.notifyDoneLoading();
      return;
    }

    // build and render the visualizations
    const sub2$ = this.loadIntrusionSetMapping(intrusionIds)
      .map((mappings) => {
        // finish load and render something so the svg has a size to work from
        this.notifyDoneLoading();
        this.renderVisualizations();
      })
      .subscribe(noop, logErr.bind(this));
    this.subscriptions.push(sub2$);
  }

  /**
   * @description with out fetching data, render the components
   */
  public renderVisualizations(): void {
    // get intrusion sets, used
    const intrusionIds = Array.from(this.threatReport.boundries.intrusions).map((el: SelectOption) => el.value);
    if (!intrusionIds || intrusionIds.length === 0) {
      // build the table and short circuit the rest of the visualizations
      this.buildKillChainTable();
      return;
    }

    // NOTE: order matters!
    this.buildKillChainTable();
    requestAnimationFrame(() => {
      this.treeData = this.buildTreeData();
      this.radarData = this.buildRadarData();
    });
  }

  /**
   * @description build a kill chain table
   * @return {void}
   */
  public buildKillChainTable(): void {
    this.attackPatterns = this.colorRows(this.attackPatterns, this.threatReport);
    this.groupKillchain = this.groupByKillchain(this.attackPatterns);
    this.intrusionSetsDashboard.killChainPhases = this.groupKillchain;
  }

  /**
   * @description the boundries have been modified, refresh this component
   * @param event
   */
  public onBoundriesModified(event: ThreatReport): void {
    console.log(event);
    this.threatReport = event;
    this.fetchIntrusionSetsAndRender();
  }

  /**
   * @description trigger a change detection and set loading to false to turn off spinner
   * @return {void}
   */
  public notifyDoneLoading(): void {
    requestAnimationFrame(() => this.loading = false);
  }

  /**
   * @description load threat report
   * @return {Obsevable<ThreatReport}
   */
  public loadThreatReport(): Observable<ThreatReport> {
    return this.threatReportService.load(this.id).map((el) => this.threatReport = el as ThreatReport);
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
    return this.genericApi.get(url)
      .map((el) => this.attackPatterns = el)
      .do(() => {
        this.uniqChainNames = this.generateUniqChainNames(this.attackPatterns);
        this.selectedChain = this.determineFilter(this.uniqChainNames);
        this.attackPatterns = this.filterAttackPatterns(this.attackPatterns, this.selectedChain);
      });
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
    this.intrusionSetsDashboard.killChainPhases = undefined;
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
          attackPatternsProxies.push({ ...attackPattern } as KillChainEntry);
        });
      }
    });

    // sort the attack patterns w/ in a given kill chain
    Object.keys(killChainAttackPatternGroup).forEach((key) => {
      let arr = killChainAttackPatternGroup[key];
      arr = arr.sort(SortHelper.sortDescByField<any, 'name'>('name'));
    });

    // extract the keyed attackpatterns into a single flat array
    const killChainAttackPattern =
      Object.keys(killChainAttackPatternGroup).map((key) => {
        const killchain =
          {
            name: key,
            attack_patterns: killChainAttackPatternGroup[key]
          } as Partial<KillChainEntry>;
        return killchain;
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
      .map((report) => report.attributes.object_refs)
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
    this.intrusionSetsDashboard.intrusionSets.forEach((intrusionSet) => {
      const child = {
        name: intrusionSet.name,
        type: intrusionSet.type,
        color: intrusionSet.color,
        description: intrusionSet.description
      };
      this.intrusionSetsDashboard.killChainPhases.forEach((killChainPhase) => {
        let killChainPhaseChild = null;
        killChainPhase.attack_patterns.forEach((attackPattern) => {
          const intrusions = attackPattern.intrusion_sets || [];
          intrusions.forEach((intrusion_set) => {
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
                name: attackPattern.name,
                color: intrusionSet.color,
                description: attackPattern.description
              };
              killChainPhaseChild.children.push(attackPatternChild);
              this.intrusionSetsDashboard[
                'coursesOfAction'
              ].forEach((coursesOfAction) => {
                const found = coursesOfAction.attack_patterns.find((attack) => {
                  return attack._id === attackPattern._id;
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
   * @description filter attack patterns
   * @param {AttackPattern[]} attackPatterns
   * @param {string} filterChainName
   * @return {AttackPattern[]} filtered list of attack patterns or empty array
   */
  public filterAttackPatterns(attackPatterns: AttackPattern[], filterChainName = ''): AttackPattern[] {
    if (!attackPatterns) {
      return [];
    }

    const noFilter = filterChainName === '';
    return attackPatterns.filter((el) => {
      if (noFilter) {
        return el;
      }
      const names = el.attributes.kill_chain_phases.map((chain) => chain.kill_chain_name);
      return names.includes(filterChainName);
    });
  }

  /**
   * @description unique kill chain names
   * @param {AttackPattern[]}
   * @return {string[]} uniq list of names
   */
  public generateUniqChainNames(attackPatterns: AttackPattern[], filter = ''): string[] {
    if (!attackPatterns) {
      return [];
    }

    const names = attackPatterns
      .map((el) => {
        return el.attributes.kill_chain_phases.map((chain) => chain.kill_chain_name);
      })
      .reduce((memo, el) => memo.concat(el), []);
    const uniqNames = new Set(names);
    return Array.from(uniqNames);
  }

  /**
   * @description
   */
  public determineFilter(names = []): string {
    const mitreLast = 'mitre-attack';
    const name = names.find((el) => el !== mitreLast);
    return name;
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
