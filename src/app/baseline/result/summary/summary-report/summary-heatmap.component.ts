import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GenericApi } from '../../../../core/services/genericapi.service';
import { AttackPatternsHeatmapComponent } from '../../../../global/components/heatmap/attack-patterns-heatmap.component';
import { HeatmapOptions } from '../../../../global/components/heatmap/heatmap.data';
import { Dictionary } from '../../../../models/json/dictionary';
import { Constance } from '../../../../utils/constance';



@Component({
  selector: 'summary-heatmap',
  templateUrl: './summary-heatmap.component.html',
  styleUrls: ['./summary-heatmap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryHeatmapComponent implements OnInit, DoCheck {

  public attackPatterns = {};
  @Input() private capabilities: any[] = [];
  private previousCapabilities: any[];
  private capabilitiesToAttackPatternMap: any;

  @ViewChild('heatmap') private view: AttackPatternsHeatmapComponent;
  @Input() heatmapOptions: HeatmapOptions = {
    view: {
      component: '#baseline-heat-map',
    },
    color: {
      batchColors: [
        { header: { bg: 'transparent', fg: '#333' }, body: { bg: 'transparent', fg: 'black' } },
      ],
      heatColors: {
        'true': { bg: '#b2ebf2', fg: 'black' },
        'false': { bg: '#ccc', fg: 'black' },
        'selected': { bg: '#33a0b0', fg: 'black' },
      },
    },
    text: {
      cells: {
        showText: true,
      },
    },
    zoom: {
      cellTitleExtent: 2,
    }
  }
  private oldrect = null;

  @Input() public collapseAllCardsSubject: BehaviorSubject<boolean>;
  public collapseContents: boolean = false;

  constructor(
    public genericApi: GenericApi,
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.previousCapabilities = this.capabilities;

    this.loadCapabilitiesMap();
    this.loadAttackPatterns();

    if (this.collapseAllCardsSubject) {
      const collapseCard$ = this.collapseAllCardsSubject
        .finally(() => collapseCard$ && collapseCard$.unsubscribe())
        .subscribe(
          (collapseContents) => this.collapseContents = collapseContents,
          (err) => console.log(err),
      );
    }
  }

  ngDoCheck() {
    if (this.previousCapabilities !== this.capabilities) {
      const indicators = this.groupCapabilitiesByAttackPatterns();
      Object.values(this.attackPatterns).forEach((pattern: any) => {
        const analytics = indicators[pattern.name] || [];
        pattern.analytics = analytics.map(analytic => this.capabilities.find(a => a.id === analytic));
        pattern.value = analytics.length > 0;
      });
      this.view.createAttackPatternHeatMap();
      this.view.heatmap.redraw();
      this.previousCapabilities = this.capabilities;
    } else {
      const node: any = d3.select(`#baseline-heat-map .heat-map`).node();
      const rect = node ? node.getBoundingClientRect() : null;
      if (node && rect && rect.width && rect.height) {
        if (this.oldrect === null) {
          this.oldrect = rect;
        } else if ((this.oldrect.width !== rect.width) || (this.oldrect.height !== rect.height)) {
          this.view.heatmap.redraw();
          this.oldrect = rect;
        }
      }
    }
  }

  /**
   * @description retrieve the capabilities-to-attack-patterns map from the ngrx store
   */
  private loadCapabilitiesMap() {
    // const getCapabilityToAttackPatternMap$ = this.store
    //     .select('indicatorSharing')
    //     .pluck('indicatorToApMap')
    //     .distinctUntilChanged()
    //     .finally(() => {
    //         if (getCapabilityToAttackPatternMap$) {
    //             getCapabilityToAttackPatternMap$.unsubscribe();
    //         }
    //     })
    //     .subscribe(
    //         (capabilityToAttackPatternMap) => this.capabilitiesToAttackPatternMap = capabilityToAttackPatternMap,
    //         (err) => console.log(err)
    //     );
  }

  /**
   * @description retrieve the attack patterns and their tactics phases from the backend database
   */
  private loadAttackPatterns() {
    const sort = { 'stix.name': '1' };
    const project = {
      'stix.id': 1,
      'stix.name': 1,
      'stix.description': 1,
      'stix.kill_chain_phases': 1,
      'extendedProperties.x_mitre_data_sources': 1,
      'extendedProperties.x_mitre_platforms': 1,
    };
    const filter = encodeURI(`sort=${JSON.stringify(sort)}&project=${JSON.stringify(project)}`);
    const initData$ = this.genericApi.get(`${Constance.ATTACK_PATTERN_URL}?${filter}`)
      .finally(() => initData$ && initData$.unsubscribe())
      .subscribe(
        (patterns: any[]) => this.view && this.update(patterns),
        (err) => console.log(err)
      );
  }

  private update(patterns: any[]) {
    const indicators = this.groupCapabilitiesByAttackPatterns();
    this.attackPatterns = this.collectAttackPatterns(patterns, indicators);
    this.view.createAttackPatternHeatMap();
    this.view.heatmap.redraw();
  }

  /**
   * @description create a map of attack patterns and their capabilities (inverted capabilities-to-attack-patterns map)
   */
  private groupCapabilitiesByAttackPatterns() {
    const capabilityIds: string[] = this.capabilities ? this.capabilities.map(capability => capability.id) : [];
    const patternCapabilities: Dictionary<string[]> = {};
    // Object.entries(this.capabilitiesToAttackPatternMap)
    //   .filter(capability => capabilityIds.includes(capability[0]))
    //   .forEach(([capability, patterns]: [string, any[]]) => {
    //     if (patterns && patterns.length) {
    //       patterns.forEach((p: any) => {
    //         if (!patternCapabilities[p.name]) {
    //           patternCapabilities[p.name] = [];
    //         }
    //         patternCapabilities[p.name].push(capability);
    //       });
    //     }
    //   });
    return patternCapabilities;
  }

  /**
   * @description Build a list of all the attack patterns.
   */
  private collectAttackPatterns(patterns: any[], indicators: Dictionary<string[]>): any {
    const attackPatterns = {};
    patterns.forEach((pattern) => {
      const name = pattern.attributes.name;
      if (name) {
        let analytics = indicators[name] || [];
        analytics = analytics.map(analytic => this.capabilities.find(a => a.id === analytic));
        attackPatterns[name] = Object.assign({}, {
          id: pattern.attributes.id,
          name: name,
          title: name,
          description: pattern.attributes.description,
          phases: (pattern.attributes.kill_chain_phases || []).map(p => p.phase_name),
          sources: pattern.attributes.x_mitre_data_sources,
          platforms: pattern.attributes.x_mitre_platforms,
          analytics: analytics,
          value: analytics.length > 0,
        });
      }
    });
    return attackPatterns;
  }

}
