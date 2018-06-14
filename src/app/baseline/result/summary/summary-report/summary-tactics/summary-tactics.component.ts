
import {finalize} from 'rxjs/operators';
import {
    Component,
    OnInit,
    Input,
    ViewChild,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as d3 from 'd3';

import { Tactic } from '../../../../../global/components/tactics-pane/tactics.model';
import { HeatmapOptions } from '../../../../../global/components/heatmap/heatmap.data';
import { TreemapOptions } from '../../../../../global/components/treemap/treemap.data';
import { CarouselOptions } from '../../../../../global/components/tactics-pane/tactics-carousel/carousel.data';
import { TacticsPaneComponent } from '../../../../../global/components/tactics-pane/tactics-pane.component';
import { Dictionary } from '../../../../../models/json/dictionary';
import { AppState } from '../../../../../root-store/app.reducers';

@Component({
    selector: 'summary-tactics',
    templateUrl: './summary-tactics.component.html',
    styleUrls: ['./summary-tactics.component.scss']
})
export class SummaryTacticsComponent implements OnInit, OnChanges {

    /**
     * @description 
     */
    public attackPatterns: Tactic[] = [];

    /**
     * @description 
     */
    @Input() private capabilities: any[] = [];

    /**
     * @description 
     */
    private capabilitiesToAttackPatternMap: any;

    /**
     * @description 
     */
    public readonly heatmapOptions: HeatmapOptions = {
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

    /**
     * @description 
     */
    public readonly treemapOptions: TreemapOptions = {
        minColor: '#c8e0ec',
        midColor: '#a8c0cc',
        maxColor: '#88a0ac',
    };

    /**
     * @description 
     */
    public readonly carouselOptions: CarouselOptions = {
    };

    /**
     * @description 
     */
    @Input() public collapseSubject: BehaviorSubject<boolean>;

    public collapseContents: boolean;

    constructor(
        private tacticsStore: Store<AppState>,
    ) {
    }

    /**
     * @description 
     */
    ngOnInit() {
        this.loadCapabilitiesMap();
        this.collapseContents = false;
    }

    /**
     * @description 
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.capabilities) {
            const indicators = this.groupCapabilitiesByAttackPatterns();
            requestAnimationFrame(() => {
                this.attackPatterns = [];
                // this.attackPatterns = this.collectAttackPatterns(patterns, indicators);
            });
        }

        if (this.collapseSubject) {
            const collapseCard$ = this.collapseSubject.pipe(
              finalize(() => collapseCard$ && collapseCard$.unsubscribe()))
              .subscribe(
                (collapseContents) => this.collapseContents = collapseContents,
                (err) => console.log(err),
            );
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
            const name = pattern.name;
            if (name) {
            let analytics = indicators[name];
            if (analytics) {
                analytics = analytics.map(analytic => this.capabilities.find(a => a.id === analytic));
                attackPatterns[name] = Object.assign({}, {
                    ...pattern,
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
