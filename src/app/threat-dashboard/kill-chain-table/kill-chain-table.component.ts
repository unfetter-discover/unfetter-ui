import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    ChangeDetectionStrategy,
    ElementRef,
    ViewChild,
    HostListener,
    TemplateRef,
    ViewContainerRef,
    AfterViewInit
  } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { GoogleCharts } from 'google-charts';
import * as d3 from 'd3';
import { Heatmap } from 'd3-heatmap';

import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { ThreatReport } from '../models/threat-report.model';
import { KillChainEntry } from './kill-chain-entry';
import { AttackPattern } from '../../models/attack-pattern';
import { ThreatDashboard } from '../models/threat-dashboard';
import { topRightSlide } from '../../global/animations/top-right-slide';
import { KillChainPhase } from '../../models';

interface HeatMapData {
  phase: string,
  index: number,
  name: string,
  active: boolean
}

@Component({
  selector: 'unf-kill-chain-table',
  templateUrl: 'kill-chain-table.component.html',
  styleUrls: ['./kill-chain-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [topRightSlide]
})
export class KillChainTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('threatReport')
  public threatReport: ThreatReport;
  @Input('attackPatterns')
  public attackPatterns: AttackPattern[];
  @Input('intrusionSetsDashboard')
  public intrusionSetsDashboard: ThreatDashboard;

  @ViewChild('toolboxBtn')
  public toolboxBtn: ElementRef;
  @ViewChild('toolbox')
  public toolbox: ElementRef;

  @ViewChild('apTooltipTemplate') apTooltipTemplate: TemplateRef<any>;
  public attackPattern: AttackPattern;
  public attackPhases: string[];
  private overlayRef: OverlayRef;
  private portal: TemplatePortal<any>;

  @ViewChild('google_treemap') googleTreeMapView: ElementRef;
  public googleTreeMapData: Array<any> = [];
  @ViewChild('d3_treemap') d3TreeMapView: ElementRef;
  public d3TreeMapData: any = {};

  @ViewChild('google_heatmap') googleHeatMapView: ElementRef;
  public googleHeatMapData: Array<any> = [];
  @ViewChild('d3_heatmap') d3HeatMapView: ElementRef;
  public d3HeatMapData: Array<Array<HeatMapData>> = [];

  public undoToolboxOp: Partial<KillChainEntry>[] = undefined;
  public showToolbox = false;

  public readonly subscriptions: Subscription[] = [];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected genericApi: GenericApi,
    private overlay: Overlay,
    private vcr: ViewContainerRef,
  ) { }

  /**
   * @description init this component
   */
  public ngOnInit(): void {
    this.undoToolboxOp = this.copyState(this.intrusionSetsDashboard.killChainPhases);
  }

  public ngAfterViewInit(): void {
    this.createGoogleAttackPatternTreeMap();
    this.createD3AttackPatternTreeMap();
    this.createGoogleAttackPatternHeatMap();
    this.createD3AttackPatternHeatMap();
  }

  private createGoogleAttackPatternTreeMap() {
    const attackData = {};
    this.googleTreeMapData = [
      ['Attack Patterns Used', '', '# times used', 'Tactics Used In'],
      ['Attack Patterns', '', 0, []],
      ['Unused Patterns', 'Attack Patterns', 0, []],
    ];
    this.intrusionSetsDashboard.killChainPhases.forEach(phase => {
      if (phase.attack_patterns) {
        phase.attack_patterns.forEach(attackPattern => {
          if (!attackData[attackPattern.name]) {
            attackData[attackPattern.name] = {
              count: 0,
              phases: []
            };
          }
          if (attackPattern.isSelected) {
            attackData[attackPattern.name].count++;
            attackData[attackPattern.name].phases.push(phase.name);
          }
        });
      }
    });
    for (let attackPattern in attackData) {
      if (attackData[attackPattern].count > 0) {
        this.googleTreeMapData.push([attackPattern, 'Attack Patterns',
            attackData[attackPattern].count, attackData[attackPattern].phases]);
      }
    }
    // TODO for grins though, let's make this a more busy map for display
    this.googleTreeMapData = [
      ['Attack Patterns Used', '', '# times used', 'Tactics Used In'],
      ['Attack Patterns', '', 0, []],
      ['Account Discovery', 'Attack Patterns', 2, ['Discovery']],
      ['Process Discovery', 'Attack Patterns', 2, ['Discovery']],
      ['.bash_profile and .bashrc', 'Attack Patterns', 2, ['Persistence']],
      ['Accessibility Features', 'Attack Patterns', 3, ['Persistence', 'Privilege Escalation']],
      ['Exploitation of Vulnerability', 'Attack Patterns', 5, ['Privilege Escalation', 'Credential Access', 'Defense Evasion', 'Lateral Movement']],
      ['Bypass User Account Control', 'Attack Patterns', 3, ['Privilege Escalation', 'Defense Evasion']],
      ['Scheduled Task', 'Attack Patterns', 4, ['Persistence', 'Privilege Escalation', 'Execution']],
      ['Web Shell', 'Attack Patterns', 1, []],
    ];

    GoogleCharts.load(() => {
      const data = GoogleCharts.api.visualization.arrayToDataTable(this.googleTreeMapData.map(arr => arr.slice(0, 3)));
      const chart = new GoogleCharts.api.visualization.TreeMap(this.googleTreeMapView.nativeElement);
      chart.draw(data, {
        showScale: false,
        headerHeight: 0,
        fontColor: 'black',
        fontFamily: 'Roboto',
        fontSize: 16,
        minColor: '#db9',
        midColor: '#eb6',
        maxColor: '#e66',
        noColor: '#fff',
        highlightOnMouseOver: true,
        minHighlightColor: '#ff9',
        midHighlightColor: '#ff9',
        maxHighlightColor: '#ff9',
        showTooltips: true,
        generateTooltip: (row, size, value) => {
          const index = row + 1;
          if (row && this.googleTreeMapData[index][3]) {
            const attackPattern: Partial<AttackPattern> =
                this.attackPatterns.find(pattern => pattern.attributes.name === this.googleTreeMapData[index][0]) ||
                {
                  id: undefined,
                  attributes: {
                    version:  '',
                    name: this.googleTreeMapData[index][0],
                    description: '',
                    created: new Date(),
                    modified: new Date(),
                    labels: [],
                    external_references: [],
                    kill_chain_phases: [],
                    x_unfetter_sophistication_level: 0,
                  }
                };
            const dataSources = attackPattern.attributes['x_mitre_data_sources'] || null;
            const platforms = attackPattern.attributes['x_mitre_platforms'] || null;
            const phases = Object.values(this.googleTreeMapData[index][3]).map(phase => '<li>' + phase + '</li>');

            let tooltip = `
                  <div class="col-md-12" style="min-width:300px; max-width:400px; padding:6px; color:#666; background:#f0f0f0; box-shadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);">
                    <div style="display:flex; align-items:center; margin:0;">
                      <div class="flex1"><label style="color:#666;">${attackPattern.attributes.name}</label></div>
              `;
            if (attackPattern.id) {
              tooltip += `
                      <div>
                        <button type="button" class="mat-button mat-primary">
                          <a target="_blank" href="/#/stix/attack-patterns/${attackPattern.id}">Details</a>
                        </button>
                      </div>
                `;
            }
            tooltip += `
                    </div>
                    <div class="mat-card-content">
              `;
            if (attackPattern.attributes.description) {
              tooltip += `
                      <div class="row">
                        <div class="col-md-3"><label style="color:#666;">Description</label></div>
                        <div class="col-md-8 goog-attack-pattern-desc">${attackPattern.attributes.description}</div>
                      </div>
                `;
            }
            if (dataSources) {
              tooltip += `
                      <div class="row">
                        <div class="col-md-3"><label style="color:#666;">Data Sources</label></div>
                        <div class="col-md-9 attack-pattern-sources">${dataSources.join(', ')}</div>
                      </div>
                `;
            }
            if (platforms) {
              tooltip += `
                      <div class="row">
                        <div class="col-md-3"><label style="color:#666;">Platforms</label></div>
                        <div class="col-md-9 goog-attack-pattern-platforms">${platforms.join(', ')}</div>
                      </div>
                `;
            }
            tooltip += `
                      <div class="row">
                        <div class="col-md-3"><label style="color:#666;">Phases</label></div>
                        <div class="col-md-9 goog-attack-pattern-phases">${this.googleTreeMapData[index][3].join(', ')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            return tooltip;
          }
        }
      });
    }, 'treemap');
  }

  private createD3AttackPatternTreeMap() {
    this.d3TreeMapData = {
      id: 'Attack Patterns Used',
      children: [
        {id: 'Account Discovery', value: 1, phases: ['Discovery']},
        {id: 'Process Discovery', value: 1, phases: ['Discovery']},
        {id: '.bash_profile and .bashrc', value: 1, phases: ['Persistence']},
        {id: 'Accessibility Features', value: 2, phases: ['Persistence', 'Privilege Escalation']},
        {id: 'Exploitation of Vulnerability', value: 4, phases: ['Privilege Escalation', 'Credential Access', 'Defense Evasion', 'Lateral Movement']},
        {id: 'Bypass User Account Control', value: 2, phases: ['Privilege Escalation', 'Defense Evasion']},
        {id: 'Scheduled Task', value: 3, phases: ['Persistence', 'Privilege Escalation', 'Execution']},
        {id: 'Web Shell', value: 0, phases: []},
      ]
    };

    const color = d3.scaleLinear<d3.RGBColor, string>()
      .domain([2, 5]).interpolate(d3.interpolateHcl).range([d3.rgb('#db9'), d3.rgb('#e66')]);
    const root = d3.hierarchy(this.d3TreeMapData).sum(d => d.value + 1).sort((a, b) => b.value - a.value);
    const graphElement = d3.select('.d3-treemap');
    const rect = (graphElement.node() as any).getBoundingClientRect();
    const treemap = d3.treemap().size([rect.width, rect.height]).padding(5).round(true);
    treemap(root);
    graphElement.on('mouseout', () => this.hideAttackPatternTooltip(this.attackPattern));
    const showTooltip = (div, node) => {
      let attackPattern;
      this.intrusionSetsDashboard.killChainPhases.forEach(phase => {
        const p = phase.attack_patterns.find(pattern => pattern && pattern.name === node.data.id);
        if (p) {
          attackPattern = p;
          return false;
        }
      });
      if (attackPattern) {
        this.showAttackPatternTooltip(attackPattern, d3.event, node.data.phases, true);
      }
    };
    root.leaves().forEach((node: any) => {
      const div = graphElement.append('div').attr('class', 'd3apNode')
          .style('left', `${node.x0}px`).style('top', `${node.y0}px`)
          .style('width', `${node.x1 - node.x0}px`).style('height', `${Math.max(node.y1 - node.y0, 20)}px`)
          .style('display', 'flex').style('position', 'absolute').style('align-items', 'center')
          .style('box-sizing', 'border-box').style('overflow', 'hidden')
          .style('background', (node.value === 1) ? '#999' : color(node.value))
          .on('mouseover', () => showTooltip(div, node))
          // .on('mouseout', () => this.hideAttackPatternTooltip(this.attackPattern))
        .append('div').text(node.data.id).style('flex', '1')
          .style('text-align', 'center').style('font-size', '16px').style('pointer-events', 'none');
    });
  }

  private createGoogleAttackPatternHeatMap() {

  }

  private createD3AttackPatternHeatMap() {
    const padding = {top: 30, left: 30, right: 0, bottom: 5, between: 0};
    const graphElement = d3.select('.d3-heatmap');
    const rect = (graphElement.node() as any).getBoundingClientRect();
    const width = rect.width - padding.left - padding.right;
    const height = rect.height - padding.top - padding.bottom;

    let data = {}, phases = [], maxPatterns = 0;
    console.log('loading attack patterns');
    this.intrusionSetsDashboard.killChainPhases.forEach(phase => {
      let index = 0;
      if (phase && phase.name && phase.attack_patterns) {
        data[phase.name] = {phase: phase.name, count: phase.attack_patterns.length, columns: [[]]};
        let patterns = 0;
        phase.attack_patterns.forEach(attackPattern => {
          if (attackPattern.name) {
            patterns++;
            data[phase.name].columns[0].push({
              phase: phase.name,
              index: index++,
              name: attackPattern.name,
              active: attackPattern.isSelected
            });
          }
        });
        maxPatterns = Math.max(maxPatterns, data[phase.name].count);
      }
    });
    const originalData = data;

    // now create more columns until we fit nicely in the bounding box
    let cellHeight, splitPasses = 1, newMaxPatterns = maxPatterns;
    console.log(`max patterns is `, maxPatterns);
    for (cellHeight = rect.height / newMaxPatterns; cellHeight < 24; cellHeight = rect.height / newMaxPatterns) {
      console.log(`cell height too small (${cellHeight}), trying for more columns.`)
      // take the largest column (most attack patterns) and split it, then max the other columns the same.
      newMaxPatterns = Math.ceil(maxPatterns / ++splitPasses), data = [];
      console.log(`max patterns now `, newMaxPatterns, splitPasses);
      Object.values(originalData).forEach((d: any) => {
        if (d.count <= newMaxPatterns) {
          data[d.phase] = d;
        } else {
          // going to make the patterns go down, then start new column, rather than balancing... we can change it
          data[d.phase] = {phase: d.phase, count: d.count, columns: [[]]};
          let cols = data[d.phase].columns;
          for (let index = 0, col = 0; index < d.count; index++) {
            if (cols[col].length === newMaxPatterns - 1) {
              cols.push([]);
              col++;
            }
            cols[col].push(d.columns[0][index]);
          }
        }
      });
      console.log('interim data: ', data);
    }
    // normalize it
    let temp = [];
    Object.values(data).forEach((d: any) => {
      temp.push(...d.columns);
      phases.push(d.phase);
    });
    this.d3HeatMapData = temp;
    maxPatterns = newMaxPatterns;

    console.log('resulting data: ', this.d3HeatMapData);
    let columns = this.d3HeatMapData.length;
    let cellWidth = rect.width / columns; // fully zoomed-out width, and no padding between columns
    if (cellWidth > cellHeight) {
      let extra = rect.width - (columns * cellHeight);
      padding.between = Math.min(extra / (columns - 1), 10);
      cellWidth = (rect.width - (columns - 1) * padding.between) / columns;
    }
    console.log('heat map scales: ', 'rect', rect, '# columns', columns, '# patterns', maxPatterns,
        'columns', columns, 'cell width', cellWidth, 'cell height', cellHeight, 'w', width, 'h', height,
        `padding`, padding);

    let xScale = d3.scaleBand().domain(phases).range([0, width]);
    let xAxis = d3.axisTop(xScale).tickFormat(d => d);
    let yScale = d3.scaleLinear().domain([0, maxPatterns]).range([0, height]);
    let yAxis = d3.axisLeft(yScale).tickFormat(d => `${d}`);

    let svg = graphElement
      .append('svg').attr('width', rect.width).attr('height', rect.height)
      .append('g').attr('transform', `translate(${padding.left}, ${padding.top})`);
    this.d3HeatMapData.forEach((phase, index) => {
      console.log(`phase`, phase);
      phase.forEach((d, row) => {
        console.log(`pattern`, d);
        svg.append('g').append('rect').attr('class', 'cell')
          .attr('width', cellWidth).attr('height', cellHeight).style('padding-right', padding.between)
          .attr('x', xScale(d.phase)).attr('y', yScale(d.index)).attr('fill', d.active ? '#e66' : '#ccc');
      });
    });
    svg.append('g').attr('class', 'y axis').call(yAxis);
    svg.append('g').attr('class', 'x axis').call(xAxis)
        .selectAll('text').attr('font-weight', 'normal').style('text-anchor', 'start')
          .attr('dx', '.8em').attr('dy', '.5em').attr('transform', 'rotate(-65)');
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
   * @description close toolbox if clicked outside
   * @param event 
   */
  @HostListener('document:click', ['$event'])
  public clickedOutside(event: UIEvent) {
    const clickedInToolboxBtn = this.toolboxBtn && this.toolboxBtn.nativeElement.contains(event.target);
    const clickedInToolbox = this.toolbox && this.toolbox.nativeElement.contains(event.target);
    if (this.showToolbox && !(clickedInToolbox || clickedInToolboxBtn)) {
      this.showToolbox = false;
    }
  }

  /**
   * @description
   */
  public copyState(killChainPhases: Partial<KillChainEntry>[]): Partial<KillChainEntry>[] {
    return [
      ...killChainPhases.map((phases) => {
        const copy = {
          ...phases,
        };
        copy.attack_patterns = [...phases.attack_patterns];
        return copy;
      })
    ];
  }

  /**
   * @description tally the number of attackpatterns highlighted
   * @return {number}
   */
  public count(attackPatterns: KillChainEntry[]): number {
    let count = 0;
    if (!attackPatterns) {
      return count;
    }
    attackPatterns.forEach((attackPattern) => {
      if (attackPattern.isSelected === true) {
        count = count + 1;
      }
    });
    return count;
  }

  /**
   * @description
   * @param {UIEvent} event
   */
  public onToggleShowToolbox(event?: UIEvent): void {
    this.showToolbox = !this.showToolbox;
  }

  /**
   * @description
   * @param {UIEvent} event 
   */
  public onCompressColumns(event?: UIEvent): void {
    const filtered = this.intrusionSetsDashboard.killChainPhases.filter((phase) => {
      return this.count(phase.attack_patterns) > 0;
    });
    this.intrusionSetsDashboard.killChainPhases = filtered;
  }

  /**
   * @description
   * @param {UIEvent} event
   */
  public onCompressRows(event?: UIEvent): void {
    const filtered = this.intrusionSetsDashboard.killChainPhases.map((phases) => {
      phases.attack_patterns = phases.attack_patterns
        .filter((attackPattern) => attackPattern.isSelected === true);
      return phases;
    });
    this.intrusionSetsDashboard.killChainPhases = filtered;
  }

  /**
   * @description
   * @param {UIEvent} event optional
   */
  public onResetFilters(event?: UIEvent): void {
    if (!this.undoToolboxOp) {
      return;
    }
    this.intrusionSetsDashboard.killChainPhases = this.undoToolboxOp;
    this.undoToolboxOp = this.copyState(this.undoToolboxOp);
  }

  public showAttackPatternTooltip(killChain: Partial<KillChainEntry>, event?: UIEvent, phases?: string[], asTooltip: boolean = false): void {
    if (event) {
      console.log(`stopping event`);
      event.preventDefault();
      event.stopPropagation();
    }

    if (killChain && this.attackPattern && (this.attackPattern.attributes.name === killChain.name)) {
      return;
    }

    this.attackPattern = this.attackPatterns.find(pattern => pattern.attributes.name === killChain.name);
    this.attackPhases = phases || null;

    if (!this.overlayRef) {
      const elem = new ElementRef(event.target);

      const positionStrategy = this.overlay.position()
        .connectedTo(elem,
          {originX: 'center', originY: 'bottom'},
          {overlayX: 'start', overlayY: 'top'})
        .withFallbackPosition(
          {originX: 'center', originY: 'top'},
          {overlayX: 'start', overlayY: 'bottom'})
        .withFallbackPosition(
          {originX: 'center', originY: 'bottom'},
          {overlayX: 'end', overlayY: 'top'})
        .withFallbackPosition(
          {originX: 'center', originY: 'bottom'},
          {overlayX: 'end', overlayY: 'bottom'});

      this.overlayRef = this.overlay.create({
        minWidth: 300,
        maxWidth: 500,
        hasBackdrop: !asTooltip,
        positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.reposition()
      });

      const sub$ = this.overlayRef.backdropClick().subscribe(
        () => this.hideAttackPatternTooltip(this.attackPattern),
        (err) => console.log(err),
        () => sub$.unsubscribe());

      this.portal = new TemplatePortal(this.apTooltipTemplate, this.vcr);
    }

    this.overlayRef.attach(this.portal);
  }

  public hideAttackPatternTooltip(attackPattern: AttackPattern, event?: UIEvent): void {
    if (!attackPattern || !this.attackPattern
        || (this.attackPattern.attributes.name !== attackPattern.attributes.name)) {
      return;
    }
    this.attackPattern = null;
    this.attackPhases = null;
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.overlayRef = null;
  }
}
