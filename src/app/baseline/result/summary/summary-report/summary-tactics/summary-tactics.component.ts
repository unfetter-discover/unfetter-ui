
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { HeatmapOptions } from '../../../../../global/components/heatmap/heatmap.data';
import { CarouselOptions } from '../../../../../global/components/tactics-pane/tactics-carousel/carousel.data';
import { Tactic, TacticChain } from '../../../../../global/components/tactics-pane/tactics.model';
import { TreemapOptions } from '../../../../../global/components/treemap/treemap.data';
import { Dictionary } from '../../../../../models/json/dictionary';
import { AppState } from '../../../../../root-store/app.reducers';
import { getVisualizationData, getAttackPatternsWithArbitrarilyRenamedPropertiesForHeatMap } from '../../../../../root-store/stix/stix.selectors';

@Component({
    selector: 'summary-tactics',
    templateUrl: './summary-tactics.component.html',
    styleUrls: ['./summary-tactics.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class SummaryTacticsComponent implements OnInit {

    /**
     * @description 
     */
    @Input() public capabilities: any[] = [];

    /**
     * @description attack pattern ids to translate to tactics to hightlight in heat map
     */
    @Input() public selectedAttackPatternIds: string[] = [];

    /**
     * @description attack patterns selected on heat map
     */
    public attackPatterns: Tactic[] = [];

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

    public collapseContents: boolean;

    constructor(
        private appStore: Store<AppState>,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    /**
     * @description 
     */
    ngOnInit(): void {
        const sub$ = combineLatest(
            this.appStore.select(getVisualizationData),
            this.appStore.select(getAttackPatternsWithArbitrarilyRenamedPropertiesForHeatMap)
        )
            .pipe(
                filter(([visualizationData, attackPatterns]) => attackPatterns && attackPatterns.length > 0 && visualizationData !== undefined && Object.keys(visualizationData).length > 0),
                map(([visualizationData, _attackPatterns]) => {
                    const tactics = _attackPatterns;
                    let attackPatterns = this.attackPatternIdsToTactics(this.selectedAttackPatternIds, tactics as any);
                    const chains = visualizationData;
                    attackPatterns = this.deriveAttackPatternFramework(attackPatterns, chains);
                    return this.enhanceWithHeatMapOptions(attackPatterns);
                })
            )
            .subscribe(
                (attackPatterns) => {
                    this.attackPatterns = attackPatterns;
                    this.changeDetectorRef.markForCheck();
                },
                (err) => console.log(err),
                () => {
                    if (sub$) {
                        sub$.unsubscribe();
                    }
                }
            );
    }

    /**
     * @param  {string[]} attackPatternIds
     * @param  {Tactic[]} tactics
     * @returns Tactic
     */
    public attackPatternIdsToTactics(attackPatternIds: string[], tactics: Tactic[]): Tactic[] {
        const attackPatternSet = new Set<string>(attackPatternIds);
        return tactics.filter((tactic) => attackPatternSet.has(tactic.id));
    }

    /**
     * @param  {Tactic[]} attackPatterns
     * @param  {Dictionary<TacticChain>} chains
     * @returns Tactic
     */
    public deriveAttackPatternFramework(attackPatterns: Tactic[], chains: Dictionary<TacticChain>): Tactic[] {
        const phaseMatches = Object.keys(chains).filter((key) => {
            const curChain = chains[key];
            const isPhaseMatch = curChain.phases.find((tacticPhase) => {
                const id = tacticPhase.id;
                return attackPatterns.find((attackPattern) => {
                    return attackPattern.phases.find((phase) => phase === id) !== undefined;
                }) !== undefined;
            });
            return isPhaseMatch;
        });
        const chainNameMatch = chains[phaseMatches[0]].id;
        const enhancedAttackPatterns = attackPatterns
            .map((attackPattern) => {
                attackPattern.framework = chainNameMatch;
                return attackPattern;
            });
        return enhancedAttackPatterns;
    }

    /**
     * @param  {Tactic[]} tactics
     * @returns Tactic
     */
    public enhanceWithHeatMapOptions(tactics: Tactic[]): Tactic[] {
        return tactics.map((tactic) => {
            tactic.adds = {
                highlights: [{ value: 2, color: { style: 'selected', bg: '#33a0b0', fg: 'white' } }]
            };
            return tactic;
        });
    }
}
