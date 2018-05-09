import {
  Component,
  OnInit,
  DoCheck,
  Input,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';

import { HeatmapOptions } from '../../../../global/components/heatmap/heatmap.data';
import { Tactic, TacticChain } from '../../../../global/components/tactics-pane/tactics.model';
import { TacticsPaneComponent } from '../../../../global/components/tactics-pane/tactics-pane.component';
import { CarouselOptions } from '../../../../global/components/tactics-pane/tactics-carousel/carousel.data';
import { TreemapOptions } from '../../../../global/components/treemap/treemap.data';
import { Dictionary } from '../../../../models/json/dictionary';
import { AppState } from '../../../../root-store/app.reducers';
import { Constance } from '../../../../utils/constance';

@Component({
  selector: 'summary-heatmap',
  templateUrl: './summary-heatmap.component.html',
  styleUrls: ['./summary-heatmap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryHeatmapComponent implements OnInit, DoCheck {

  public attackPatterns: Tactic[] = [];
  private previousTactics: Tactic[];
  @Input() private capabilities: any[] = [];
  private previousCapabilities: any[];
  private capabilitiesToAttackPatternMap: any;

  @ViewChild('tactics') private tactics: TacticsPaneComponent;
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
  public readonly treemapOptions: TreemapOptions = {
      minColor: '#c8e0ec',
      midColor: '#a8c0cc',
      maxColor: '#88a0ac',
  };
  public readonly carouselOptions: CarouselOptions = {
  };

  @Input() public collapseAllCardsSubject: BehaviorSubject<boolean>;
  public collapseContents: boolean = false;

  constructor(
    private tacticsStore: Store<AppState>,
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
      this.previousCapabilities = this.capabilities;
    }
    if (this.previousTactics !== this.attackPatterns) {
      if (this.tactics && this.tactics[this.tactics.view]) {
        this.previousTactics = this.attackPatterns;
        requestAnimationFrame(() => this.tactics['heatmap'].redraw());
      } else {
        // stupid fix to force the heatmap to draw
        setTimeout(() => { this.ngDoCheck(); }, 250);
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
    const initData$ = this.tacticsStore
      .select('config')
      .pluck('tacticsChains')
      .take(1)
      .finally(() => initData$ && initData$.unsubscribe())
      .subscribe(
        (tactics: Dictionary<TacticChain>) => {
          if (tactics) {
            const patterns = Object.values(tactics).reduce((arr, chain) => {
              chain.phases.forEach(phase => arr.concat(phase.tactics));
              return arr;
            }, []);
            this.update(patterns);
          }
        },
        (err) => console.log(err)
      );
  }

  private update(patterns: any[]) {
    const indicators = this.groupCapabilitiesByAttackPatterns();
    requestAnimationFrame(() => {
      this.attackPatterns = this.collectAttackPatterns(patterns, indicators);
    });
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
  private collectAttackPatterns(patterns: any[], indicators: Dictionary<string[]>): Tactic[] {
    const attackPatterns: Dictionary<Tactic> = {};
    patterns.forEach((pattern) => {
      const name = pattern.attributes.name;
      if (name) {
        let analytics = indicators[name];
        if (analytics) {
          analytics = analytics.map(analytic => this.capabilities.find(a => a.id === analytic));
          attackPatterns[name] = Object.assign({}, {
            ...pattern.attributes,
            analytics: analytics,
            adds: {
              highlights: [{value: analytics.length, color: {style: analytics.length > 0}}]
            },
          });
        }
      }
    });
    return Object.values(attackPatterns);
  }

}
