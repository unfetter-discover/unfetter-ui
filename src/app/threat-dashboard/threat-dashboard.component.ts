import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatMenu } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Constance } from '../utils/constance';
import { StixService } from '../settings/stix.service';
import { BaseStixService } from '../settings/base-stix.service';
import { BaseComponentService } from '../components/base-service.component';
import { GenericApi } from '../core/services/genericapi.service';

import { IntrusionSet, AttackPattern } from '../models';
import { ThreatReportSharedService } from '../threat-report-overview/services/threat-report-shared.service';
import { ThreatReportOverviewDataSource } from '../threat-report-overview/threat-report-overview.datasource';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReport } from '../threat-report-overview/models/threat-report.model';
import { KillChainEntry } from './kill-chain-table/kill-chain-entry';
import { SelectOption } from '../threat-report-overview/models/select-option';
import { ThreatDashboard } from './models/threat-dashboard';
import { RadarChartDataPoint } from './radar-chart/radar-chart-datapoint';
import { simpleFadeIn, slideInOutAnimation } from '../global/animations/animations';
import { SortHelper } from '../global/static/sort-helper';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { BarChartItem } from './bar-chart/bar-chart-item';
import { SidepanelComponent } from '../global/components/sidepanel';
import { ConfirmationDialogComponent } from '../components/dialogs/confirmation/confirmation-dialog.component';
import { Report } from '../models/report';
import { MasterListDialogTableHeaders } from '../global/components/master-list-dialog/master-list-dialog.component';

type troColName = keyof ThreatReport | 'actions';

@Component({
  selector: 'unf-threat-dashboard',
  templateUrl: 'threat-dashboard.component.html',
  styleUrls: ['./threat-dashboard.component.scss'],
  animations: [simpleFadeIn, slideInOutAnimation]
})
export class ThreatDashboardComponent implements OnInit, OnDestroy {

  @Output()
  public modifiedBoundaries: EventEmitter<ThreatReport> = new EventEmitter();

  public threatReport: ThreatReport;
  public id = '';
  public attackPatterns: AttackPattern[];
  public intrusionSets: IntrusionSet[];
  public intrusionSetsDashboard: ThreatDashboard = { killChainPhases: [], intrusionSets: [], totalAttackPatterns: 0, coursesOfAction: [] };
  public groupKillchain: Array<Partial<KillChainEntry>>;
  public treeData: any;
  public radarData: RadarChartDataPoint[][];
  public barChartData: BarChartItem[];
  public loading = true;
  public treeLoading = true;
  public radarLoading = true;
  public barLoading = true;
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

  public masterListOptions = {
    dataSource: null,
    columns: new MasterListDialogTableHeaders('date', 'Modified'),
    displayRoute: '/threat-dashboard/view',
    modifyRoute: '/threat-dashboard/modify',
  };

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected genericApi: GenericApi,
    protected dialog: MatDialog,
    protected renderer: Renderer2,
    protected threatReportService: ThreatReportOverviewService,
    protected sharedService: ThreatReportSharedService,
  ) { }

  /**
   * @description init this component
   */
  public ngOnInit() {
    this.masterListOptions.dataSource = new ThreatReportOverviewDataSource(this.threatReportService);
    this.masterListOptions.columns.id.classes = 'cursor-pointer';
    const getId$ = this.route.params
      .pluck('id')
      .subscribe(
      (id: string) => {
        this.threatReport = null;
        if (!id || id.trim() === '') {
          this.notifyDoneLoading();
        } else {
          id = id.trim();
          if (!this.id || (id !== this.id)) {
            this.id = id.trim();
            this.fetchDataAndRender();
          }
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        if (getId$) {
          getId$.unsubscribe();
        }
      }
      );
  }

  /**
   * @description fetch data and render components
   * @return {void}
   */
  public fetchDataAndRender(): void {
    requestAnimationFrame(() => this.loading = true);
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
    const intrusionIds = Array.from(this.threatReport.boundaries.intrusions).map((el: SelectOption) => el.value);
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
    const intrusionIds = Array.from(this.threatReport.boundaries.intrusions).map((el: SelectOption) => el.value);
    if (!intrusionIds || intrusionIds.length === 0) {
      // build the table and short circuit the rest of the visualizations
      this.buildKillChainTable();
      return;
    }

    // NOTE: order matters!
    this.buildKillChainTable();
    requestAnimationFrame(() => {
      this.treeLoading = true;
      this.radarLoading = true;
      this.barLoading = true;
      this.treeData = this.buildTreeData();
      this.radarData = this.buildRadarData();
      this.barChartData = this.buildBarChartData();
      this.treeLoading = false;
      this.radarLoading = false;
      this.barLoading = false;
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
   * @description the boundaries have been modified, refresh this component
   * @param event
   */
  public onBoundariesModified(event: ThreatReport): void {
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
      'stix.description': 1,
      'stix.kill_chain_phases': 1,
      'extendedProperties.x_mitre_data_sources': 1,
      'extendedProperties.x_mitre_platforms': 1,
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
   * @description dummy data
   * @return {BarChartItem[]}
   */
  public buildBarChartData(): BarChartItem[] {
    const phases = this.intrusionSetsDashboard.killChainPhases;
    const dataPoints = phases
      .map((phase) => {
        const total = phase.attack_patterns.length || 0;
        const selectedAttackPatterns = phase.attack_patterns
          .filter((attackPattern) => this.isTruthy(attackPattern.isSelected));
        const frequency = Math.round((selectedAttackPatterns.length / total) * 100);
        const dataPoint = new BarChartItem(phase.name, frequency, selectedAttackPatterns);
        return dataPoint;
      });

    return dataPoints;
  }

  /**
   * @description callback to signal d3 has finished loading the tree
   * @returns {void}
   */
  public treeRendered(): void {
    console.log('finished loading tree');
    this.treeLoading = false;
  }

  public radarRendered(): void {
    console.log('radar rendered');
    this.radarLoading = false;
  }

  /**
   * @description
   */
  public barChartRendered(): void {
    console.log('bar chart rendered');
    this.barLoading = false;
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

  /**
   * @description load the overview workproduct with the given id, or return an empty Observable
   * @param workProductId
   * @return {Observable<ThreatReport>}
   */
  public load(workProductId: string): Observable<Partial<ThreatReport>> {
    if (!workProductId || workProductId.trim().length === 0) {
      return Observable.empty();
    }
    return this.threatReportService.load(workProductId);
  }

  /**
   * @description angular track by list function, uses the items id if
   *  it exists, otherwise uses the index
   * @param {number} index
   * @param {item}
   * @return {number}
   */
  public trackByFn(index: number, item: any): number {
    return item.id || index;
  }

  public getReportURL(report: Report): string {
    if (report
      && report.attributes
      && report.attributes.external_references
      && report.attributes.external_references.length > 0) {
      return report.attributes.external_references[0].url;
    }
    return '';
  }

  /**
   * @description navigate to the stix page relating to the given id, or noop for no id
   * @param {string} intrustionId uuid
   * @param {UIEvent} event optional
   * @returns {Promise<boolean>}
   */
  public onNavigateToIntrusion(intrusionId: string = '', event?: UIEvent): Promise<boolean> {
    if (!intrusionId || intrusionId.trim().length === 0) {
      return;
    }
    const url = `/stix/intrusion-sets/`;
    return this.router.navigate([url, intrusionId]);
  }

  /**
   * @description navigate to the stix page relating to the given id, or noop for no id
   * @param {string} intrustionId uuid
   * @param {UIEvent} event optional
   * @returns {Promise<boolean>}
   */
  public onNavigateToMalware(malwareId: string = '', event?: UIEvent): Promise<boolean> {
    if (!malwareId || malwareId.trim().length === 0) {
      return;
    }
    const url = `/stix/malwares/`;
    return this.router.navigate([url, malwareId]);
  }

  /**
   * @description highlight background on hover, using a class
   * @param {UIEvent} event optional
   * @return {void}
   */
  public listItemMouseEnter(event: UIEvent): void {
    if (!event) {
      return;
    }
    const el = event.currentTarget;
    this.renderer.addClass(el, 'list-item-hover');
  }

  /**
   * @description remove highlight background on hover, using a class
   * @param {UIEvent} event optional
   * @return {void}
   */
  public listItemMouseLeave(event: UIEvent): void {
    if (!event) {
      return;
    }
    const el = event.currentTarget;
    this.renderer.removeClass(el, 'list-item-hover');
  }

  /**
   * @description user clicks tab above master list table to change filtering from "yours" to "shared";
   *              not yet implemented
   * @param {number} tab the tab they clicked on
   * @return {void} not yet defined
   */
  public filterTabChanged(tab: number): void {
    console.log('Filter tab clicked. ', tab);
  }

  /**
   * @description route to create a workproduct
   * @param {UIEvent} event optional
   * @return {Promise<boolean>}
   */
  public createButtonClicked(event?: UIEvent): Promise<boolean> {
    this.sharedService.threatReportOverview = undefined;
    return this.router.navigate(['/threat-dashboard/create']);
  }

  /**
   * @description route to display a workproduct
   * @param {ThreatReport} report the report to display
   * @return {Promise<boolean>}
   */
  public cellSelected(report: any): Promise<boolean> {
    return this.router.navigate([`${this.masterListOptions.displayRoute}/${report.id}`]);
  }

  /**
   * @description route to edit a workproduct
   * @param {ThreatReport} report the report to edit
   * @return {Promise<boolean>}
   */
  public editButtonClicked(report: ThreatReport): Promise<boolean> {
    this.sharedService.threatReportOverview = undefined;
    return this.router.navigate([`${this.masterListOptions.modifyRoute}/${report.id}`]);
  }

  /**
   * @description route to share a workproduct; not yet implemented
   * @param {ThreatReport} report the report to share
   * @return {Promise<boolean>}
   */
  public shareButtonClicked(report: ThreatReport): Promise<boolean> {
    return;
  }

  /**
   * @description clicked currently viewed assessment, confirm delete
   * @return {void}
   */
  public onDeleteCurrent(): void {
    this.confirmDelete({ name: this.threatReport.name, id: this.id });
  }

  /**
   * @description clicked master list cell, confirm delete
   * @param {LastModifiedAssessment} assessment
   * @return {void}
   */
  public onDelete(report: ThreatReport): void {
    this.confirmDelete(report);
  }
  
  /**
   * @description loop all reports and delete from mongo a workproduct is related to many reports
   * @param {ThreatReport} report the UUID of the report to delete
   * @param {UIEvent} optional event
   * @return {void}
   */
  public confirmDelete(report: { name: string, id: string }, event?: UIEvent): void {
    if (!report || !report.id || !report.name) {
      console.log('no report or id given to delete');
      return;
    }

    const isCurrentlyViewed = report.id === this.id ? true : false;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { attributes: report } });
    const dialogSub$ = dialogRef.afterClosed()
      .subscribe(
      (result) => {
        const isBool = typeof result === 'boolean';
        const isString = typeof result === 'string';
        if (!result ||
          (isBool && result !== true) ||
          (isString && result !== 'true')) {
          return;
        }

        const sub$ = this.threatReportService.deleteThreatReport(report.id).subscribe(
          (resp) => {
            const s$ = resp.subscribe(
              (reports) => {
                if (isCurrentlyViewed === true) {
                  // deleted currently viewed, route to next in last mod, or create page
                  this.router.navigate([Constance.THREAT_DASHBOARD_NAVIGATE_URL]);
                } else {
                  this.masterListOptions.dataSource.nextDataChange(reports);
                }
              },
              (err) => console.log(err)
            );
            this.subscriptions.push(s$);
          },
          (err) => console.log(err)
        );
        this.subscriptions.push(sub$);
      },
      (err) => console.log(err),
      () => dialogSub$.unsubscribe());
  }

}
