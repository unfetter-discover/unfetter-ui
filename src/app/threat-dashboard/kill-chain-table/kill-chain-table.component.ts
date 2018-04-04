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

import { Constance } from '../../utils/constance';
import { AuthService } from '../../core/services/auth.service';
import { GenericApi } from '../../core/services/genericapi.service';
import { ThreatReport } from '../models/threat-report.model';
import { KillChainEntry } from './kill-chain-entry';
import { AttackPattern } from '../../models/attack-pattern';
import { ThreatDashboard } from '../models/threat-dashboard';
import { topRightSlide } from '../../global/animations/top-right-slide';
import { KillChainPhase } from '../../models';
import { HeatMapOptions } from '../../global/components/heatmap/heatmap.component';
import { Dictionary } from '../../models/json/dictionary';

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

  private attackPatternPhases: Dictionary<Array<string>> = {};
  public treeMapData: Array<any> = [];
  public showTreeMap = false;

  public heatMapData: Array<HeatMapData> = [];
  public readonly heatMapOptions: HeatMapOptions = {
    showText: false,
    hasMinimap: true,
  };
  public showHeatMap = true;

  public undoToolboxOp: Partial<KillChainEntry>[] = undefined;
  public showToolbox = false;

  public readonly subscriptions: Subscription[] = [];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected authService: AuthService,
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
    this.collectAttackPatternPhases();
    this.createAttackPatternHeatMap();
  }

  public ngAfterViewInit(): void {
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
    this.createAttackPatternTreeMap();
    requestAnimationFrame(() => {
      this.showHeatMap = false;
      this.showTreeMap = true;
    });
  }

  /**
   * @description
   * @param {UIEvent} event optional
   */
  public onHeatMap(event?: UIEvent): void {
    this.createAttackPatternHeatMap();
    requestAnimationFrame(() => {
      this.showTreeMap = false;
      this.showHeatMap = true;
    });
  }

  /**
   * @description Collects the phases (kill chains? tactics?) used by each attack pattern.
   */
  private collectAttackPatternPhases() {
    this.intrusionSetsDashboard.killChainPhases.forEach(phase => {
      if (phase.attack_patterns) {
        phase.attack_patterns.forEach(attackPattern => {
          if (!this.attackPatternPhases[attackPattern.name]) {
            this.attackPatternPhases[attackPattern.name] = [];
          }
          this.attackPatternPhases[attackPattern.name].push(phase.name);
        });
      }
    });
  }

  /**
   * @description creates a treemap of our _active_ tactics, counting each time the tactic is seen.
   */
  private createAttackPatternTreeMap() {
    const attackData = {};
    this.intrusionSetsDashboard.killChainPhases.forEach(phase => {
      if (phase.attack_patterns) {
        phase.attack_patterns.forEach(attackPattern => {
          if (!attackData[attackPattern.name]) {
            attackData[attackPattern.name] = 0
          }
          if (attackPattern.isSelected) {
            attackData[attackPattern.name]++;
          }
        });
      }
    });

    const data = [
      ['Attack Patterns Used', '', '# times used'],
      ['Attack Patterns', '', 0],
      ['Unused Patterns', 'Attack Patterns', 0],
    ];
    for (let attackPattern in attackData) {
      if (attackData[attackPattern] > 0) {
        data.push([attackPattern, 'Attack Patterns', attackData[attackPattern]]);
      }
    }
    this.treeMapData = data;
  }

  /**
   * @description Display a tooltip on the treemap for the tactic we are hovering over.
   */
  public showTreeMapTooltip(selectedPattern: any) {
    if (!selectedPattern) {
      this.hideAttackPatternTooltip(this.attackPattern);
    } else {
      const patternName: string = selectedPattern.row[0];
      const rawSelection = this.attackPatternPhases[patternName];
      let attackPattern = null;
      
      this.intrusionSetsDashboard.killChainPhases.forEach(phase => {
        attackPattern = attackPattern || phase.attack_patterns.find(pattern => pattern && pattern.name === patternName);
      });
      if (attackPattern && (!this.attackPattern || this.attackPattern.id !== attackPattern.id)) {
        this.showAttackPatternTooltip(attackPattern, selectedPattern, rawSelection || null, true);
      } else {
        this.hideAttackPatternTooltip(this.attackPattern);
      }
    }
  }

  /**
   * @description Create a heatmap chart of all the tactics. This looks like a version of the carousel, but shrunken
   *              in order to fit within the viewport.
   */
  private createAttackPatternHeatMap() {
    // Collect the data.
    let data = [];
    this.intrusionSetsDashboard.killChainPhases.forEach(phase => {
      let index = 0;
      if (phase && phase.name && phase.attack_patterns) {
        const name = phase.name
          .replace(/\-/g, ' ')
          .split(/\s+/)
          .map(w => w[0].toUpperCase() + w.slice(1))
          .join(' ')
          .replace(/\sAnd\s/g, ' and ')
          ;
        const d = {
          batch: name,
          active: null,
          columns: [[]]
        };
        phase.attack_patterns.forEach(attackPattern => {
          if (attackPattern.name) {
            d.columns[0].push({
              batch: attackPattern.name,
              active: attackPattern.isSelected
            });
          }
        });
        data.push(d);
      }
    });
    this.heatMapData = data;
  }

  /**
   * @description Display a tooltip on the heatmap for the tactic we are hovering over.
   */
  public showHeatMapTooltip(selectedPattern: any, hover: boolean = true) {
    if (!selectedPattern || !selectedPattern.row) {
      if (this.hoverTooltip) { // only hide it if it really a tooltip, not a popup
        this.hideAttackPatternTooltip(this.attackPattern);
      }
    } else {
      const patternName: string = selectedPattern.row.batch;
      const rawSelection = this.attackPatternPhases[patternName];
      let attackPattern = null;
      this.intrusionSetsDashboard.killChainPhases.forEach(phase => {
        attackPattern = attackPattern || phase.attack_patterns.find(pattern => pattern && pattern.name === patternName);
      });
      if (!attackPattern) {
        this.hideAttackPatternTooltip(this.attackPattern);
      } else if (this.attackPattern && (this.attackPattern.id === attackPattern.id)) {
        // displaying same attack pattern already; if the current one is hovering (real tooltip), redisplay as popup
        if (!hover && this.hoverTooltip) {
          this.attackPattern = null;
          this.showAttackPatternTooltip(attackPattern, selectedPattern.event, rawSelection || null, hover);
        }
      } else {
        this.showAttackPatternTooltip(attackPattern, selectedPattern.event, rawSelection || null, hover);
      }
    }
  }

  public showAttackPatternTooltip(tactic: Partial<KillChainEntry>, event?: UIEvent,
      phases?: string[], asTooltip: boolean = false): void {
    if (tactic && this.attackPattern && (this.attackPattern.id === tactic.id)) {
      return;
    }

    this.attackPattern = this.attackPatterns.find(pattern => pattern.id === tactic.id);
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
        (err) => console.log(`${new Date().toISOString()} Error using tooltip: ${err}`),
        () => sub$.unsubscribe());

      this.portal = new TemplatePortal(this.apTooltipTemplate, this.vcr);
    } else {
      this.overlayRef.detach();
      this.overlayRef.getConfig().hasBackdrop = !asTooltip;
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

  public isAdminUser(): boolean {
    return this.authService.isAdmin();
  }

}
