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
    AfterViewInit,
    ChangeDetectorRef,
    Renderer2,
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
  count: number,
  columns: Array<Array<{name: string, active: boolean}>>
}

@Component({
  selector: 'unf-kill-chain-table',
  templateUrl: 'kill-chain-table.component.html',
  styleUrls: ['./kill-chain-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [topRightSlide]
})
export class KillChainTableComponent implements OnInit, OnDestroy, AfterViewInit {

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
  public hoverTooltip: boolean;

  @ViewChild('google_treemap') googleTreeMapView: ElementRef;
  public googleTreeMapData: Array<any> = [];
  public showTreeMap = false;

  @ViewChild('d3_heatmap') d3HeatMapView: ElementRef;
  public d3HeatMapData: Array<HeatMapData> = [];
  public showHeatMap = true;

  public undoToolboxOp: Partial<KillChainEntry>[] = undefined;
  public showToolbox = false;

  public readonly subscriptions: Subscription[] = [];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected genericApi: GenericApi,
    private overlay: Overlay,
    private vcr: ViewContainerRef,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
  ) { }

  /**
   * @description init this component
   */
  public ngOnInit(): void {
    this.undoToolboxOp = this.copyState(this.intrusionSetsDashboard.killChainPhases);
  }

  public ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.createD3AttackPatternHeatMap();
      this.showTreeMap = false;
      this.showHeatMap = false;
      this.changeDetector.detectChanges();
      this.d3HeatMapView.nativeElement.click();
    });
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
        showTooltips: false
      });

      GoogleCharts.api.visualization.events.addListener(chart, 'onmouseover', (event) => {
        if (!event || !event.row) {
          return;
        }
        let selectedPattern: string = data.getValue(event.row, 0);
        let nodePhases = this.googleTreeMapData.filter(row => row[0] === selectedPattern)[0][3];
        let attackPattern;
        this.intrusionSetsDashboard.killChainPhases.forEach(phase => {
          const p = phase.attack_patterns.find(pattern => pattern && pattern.name === selectedPattern);
          if (p) {
            attackPattern = p;
            return false;
          }
        });
        if (attackPattern) {
          const ev = {
            target: this.googleTreeMapView.nativeElement,
            preventDefault: () => {},
            stopPropagation: () => {}
          } as UIEvent;
          this.showAttackPatternTooltip(attackPattern, ev, nodePhases, true);
        }
      });
      GoogleCharts.api.visualization.events.addListener(chart, 'onmouseout',
          () => this.hideAttackPatternTooltip(this.attackPattern));
    }, 'treemap');
  }

  private createD3AttackPatternHeatMap() {
    // Collect the data.
    let rawData = {}, columns = 0, maxPatterns = 0;
    this.intrusionSetsDashboard.killChainPhases.forEach(phase => {
      let index = 0;
      if (phase && phase.name && phase.attack_patterns) {
        let d = rawData[phase.name] = {
          phase: phase.name.replace(/\-/g, ' ').split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
          count: 0,
          columns: []
        };
        phase.attack_patterns.forEach(attackPattern => {
          if (attackPattern.name) {
            d.count++;
            d.columns.push({
              name: attackPattern.name,
              active: attackPattern.isSelected
            });
          }
        });
        maxPatterns = Math.max(maxPatterns, d.count);
        columns++;
      }
    });

    // Now determine how much space we currently have, and create multiple columns to get it to fit
    const padding = {top: 24, left: 1, right: 1, bottom: 0, between: 0};
    const graphElement = d3.select('.heat-map');
    const rect = (graphElement.node() as any).getBoundingClientRect();
    const width = rect.width - padding.left - padding.right;
    const height = rect.height - padding.top - padding.bottom;

    let cellHeight, cellWidth, splitPasses = 0, passCount;
    do {
      ++splitPasses;
      passCount = Math.ceil(maxPatterns / splitPasses);
      columns = 0;
      Object.values(rawData).forEach((d: any) => columns += Math.ceil(d.count / passCount));
      cellWidth = Math.floor(width / columns);
      let extra = width - (columns * cellWidth);
      padding.between = Math.min(extra / (columns - 1), 4);
      cellWidth = Math.floor((width - (columns - 1) * padding.between) / columns);
      cellWidth -= cellWidth % 2;
      cellHeight = Math.floor(height / passCount - 2);
    } while ((width !== 0) && (cellHeight < cellWidth / 2));
    maxPatterns = Math.ceil(maxPatterns / splitPasses);

    // Normalize the data.
    let data = [];
    Object.values(rawData).forEach((d: any) => {
      if (d.count <= maxPatterns) {
        data.push({phase: d.phase, count: d.count, columns: [d.columns]});
      } else {
        // going to make the patterns go down, then start new column, rather than balancing... we can change it
        let phase: HeatMapData = {phase: d.phase, count: d.count, columns: [[]]}, col = 0;
        // TODO shouldn't there be an easier way to split the array?
        d.columns.forEach(p => {
          if (phase.columns[col].length === maxPatterns) {
            phase.columns.push([]);
            col++;
          }
          phase.columns[col].push(p);
        });
        data.push(phase);
      }
    });
    this.d3HeatMapData = data;

    // Time to draw.
    let xScale = d3.scaleLinear().domain([0, columns]).range([0, width]);
    let xAxis = d3.axisTop(xScale).tickSize(0).tickFormat(() => '');
    let yScale = d3.scaleLinear().domain([0, maxPatterns]).range([0, height]);
    let yAxis = d3.axisLeft(yScale).tickSize(0).tickFormat(() => '');
    let headerColors = [['#db9', '#fff'], ['#f0f0f0', '#f0f0f0']];

    let svg = graphElement
      .append('svg').attr('width', rect.width).attr('height', rect.height)
      .append('g').attr('transform', `translate(${padding.left}, ${padding.top})`);
    let header = svg.append('g').attr('class', 'x axis').call(xAxis)
      .attr('transform', `translate(0, -${padding.top})`);
    header.selectAll('.tick, .domain').remove();

    let colIndex = 0;
    this.d3HeatMapData.forEach(phase => {
      let firstX = xScale(colIndex);
      let phaseColor = headerColors.shift();
      let phaseWidth = cellWidth * phase.columns.length + (phase.columns.length - 1) - 2;

      svg.append('rect')
        .attr('width', phaseWidth).attr('height', '100%')
        .attr('x', firstX).attr('y', yScale(0)).attr('fill', phaseColor[1]);
      phase.columns.forEach((patterns, column) => {
        let x = xScale(colIndex);
        patterns.forEach((d, index) => {
          let cell = svg.append('rect').attr('class', 'cell')
            .attr('width', cellWidth - 1).attr('height', cellHeight - 1).style('padding-right', padding.between)
            .attr('x', x).attr('y', yScale(index) + 1).attr('fill', d.active ? '#e66' : '#ccc')
            .attr('aria-label', d.name)
            .on('mouseover', p => {
              let attackPattern;
              this.intrusionSetsDashboard.killChainPhases.forEach(ph => {
                const ptn = ph.attack_patterns.find(pattern => pattern && pattern.name === d.name);
                if (ptn) {
                  attackPattern = ptn;
                  return false;
                }
              });
              if (attackPattern) {
                this.showAttackPatternTooltip(attackPattern, d3.event, [phase.phase], true);
              }
            })
            .on('mouseout', () => this.hideAttackPatternTooltip(this.attackPattern));
        });
        colIndex++;
      });

      // Let's try to write the phase name on the x-axis over the column(s)
      let phaseHeader = header.append('svg')
        .attr('x', firstX + 1).attr('y', 1).attr('width', phaseWidth).attr('height', padding.top)
        .style('overflow', 'hidden');
      phaseHeader.append('rect').attr('x', 0).attr('rx', 6).attr('width', phaseWidth)
        .attr('y', 0).attr('ry', 6).attr('height', padding.top + 6).attr('fill', phaseColor[0]);
      let text = phaseHeader.append('text').attr('x', phaseWidth / 2).attr('y', padding.top - 10).attr('dy', '.35em')
        .attr('text-anchor', 'middle').attr('fill', '#333').text(phase.phase).attr('aria-label', phase.phase);
      for (let done = false, size = 14; !done && (size > 9); size--) {
        text.attr('text-anchor', 'middle').attr('font-size', `${size}px`);
        done = (text.node() as any).getComputedTextLength() <= phaseWidth;
      }
      headerColors.push(phaseColor);
    });
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
    this.showHeatMap = this.showTreeMap = false;
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
    this.showHeatMap = this.showTreeMap = false;
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
    this.showHeatMap = this.showTreeMap = false;
  }

  /**
   * @description
   * @param {UIEvent} event optional
   */
  public onTreeMap(event?: UIEvent): void {
    requestAnimationFrame(() => {
      this.showHeatMap = false;
      this.showTreeMap = true;
    });
    if (!this.googleTreeMapData.length) {
      this.createGoogleAttackPatternTreeMap();
    }
  }

  /**
   * @description
   * @param {UIEvent} event optional
   */
  public onHeatMap(event?: UIEvent): void {
    requestAnimationFrame(() => {
      this.showTreeMap = false;
      this.showHeatMap = true;
    });
    if (!this.d3HeatMapData.length) {
      this.createD3AttackPatternHeatMap();
    }
  }

  public showAttackPatternTooltip(tactic: Partial<KillChainEntry>, event?: UIEvent,
      phases?: string[], asTooltip: boolean = false): void {
    if (tactic && this.attackPattern && (this.attackPattern.attributes.name === tactic.name)) {
      return;
    }

    this.attackPattern = this.attackPatterns.find(pattern => pattern.attributes.name === tactic.name);
    this.attackPhases = phases || null;
    this.hoverTooltip = asTooltip;

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
