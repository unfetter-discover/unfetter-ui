import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    TemplateRef,
    ViewContainerRef,
    Renderer2,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButtonToggleChange, MatToolbar } from '@angular/material';

import { TacticChain, Tactic } from './tactic.model';
import { AttackPatternCell, AttackPatternsHeatmapComponent } from '../heatmap/attack-patterns-heatmap.component';
import { HeatmapOptions } from '../heatmap/heatmap.data';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import { AttackPattern } from '../../../models/attack-pattern';
import { Dictionary } from '../../../models/json/dictionary';
import { UserProfile } from '../../../models/user/user-profile';
import { AppState } from '../../../root-store/app.reducers';
import { Constance } from '../../../utils/constance';

@Component({
    selector: 'tactics-pane',
    templateUrl: './tactics-pane.component.html',
    styleUrls: ['./tactics-pane.component.scss']
})
export class TacticsPaneComponent implements OnInit {

    /*
     * The input values are "preselected" attack patterns.
     */
    @Input() public tactics: AttackPatternCell[];
    public attackPatterns: Array<AttackPatternCell> = [];
    public chainPatterns: TacticChain[];
    public treeMapData: Array<any> = [];

    public display = {
        title: 'Tactics Used',
        view: 'carousel',
    };

    @ViewChild('heatmap') private heatmap: AttackPatternsHeatmapComponent;
    public readonly heatMapOptions: HeatmapOptions = {
        text: {
            cells: {
                showText: true,
            },
        },
        zoom: {
            cellTitleExtent: 2,
        },
    };

    @ViewChild('apTooltipTemplate') apTooltipTemplate: TemplateRef<any>;
    public tooltipTarget: AttackPatternCell;
    private overlayRef: OverlayRef;
    private portal: TemplatePortal<any>;
    private asTooltip: boolean;

    /**
     * @description
     */
    constructor(
        private userStore: Store<AppState>,
        private authService: AuthService,
        private genericApi: GenericApi,
        private overlay: Overlay,
        private renderer: Renderer2,
        private vcr: ViewContainerRef,
    ) { }

    /**
     * @description
     */
    ngOnInit() {
        const getUser$ = this.userStore
            .select('users')
            .pluck('userProfile')
            .take(1)
            .finally(() => getUser$ && getUser$.unsubscribe())
            .subscribe(
                (user: UserProfile) => this.loadAttackPatterns(user),
                (err) => console.log(err),
            );
    }

    /**
     * @description load attack patterns
     */
    private loadAttackPatterns(user?: UserProfile) {
        let filter = '';
        if (user && user.preferences && user.preferences.killchain) {
            const userFramework = user.preferences.killchain;
            const userFrameworkFilter = {
                'stix.kill_chain_phases.kill_chain_name': { $exists: true, $eq: userFramework }
            };
            filter = 'filter=' + encodeURIComponent(JSON.stringify(userFrameworkFilter));
        }
        const projects = {
            'stix.id': 1,
            'stix.name': 1,
            'stix.description': 1,
            'stix.kill_chain_phases': 1,
            'extendedProperties.x_mitre_data_sources': 1,
            'extendedProperties.x_mitre_platforms': 1,
        };
        const project = `project=${encodeURI(JSON.stringify(projects))}`;
        const sort = `sort=${encodeURIComponent(JSON.stringify({ name: '1' }))}`;
        let url = `${Constance.ATTACK_PATTERN_URL}?${filter}&${project}&${sort}`;
        this.genericApi.get(url)
            .subscribe(
                (data: AttackPattern[]) => {
                    const uniqueChainNames = this.getUniqueChainNames(data);
                    const selectedChain = this.determineFilter(uniqueChainNames);
                    const patternList = this.filterAttackPatterns(data, selectedChain);

                    const tactics = this.tactics || [];
                    this.attackPatterns = this.createHeatMap(data, tactics);
                    this.heatmap.ngDoCheck();

                    this.chainPatterns = this.groupAttackPatterns(patternList, tactics);
                    this.treeMapData = this.createTreeMap();
                }
            );
    }

    /**
     * @description unique kill chain names (also called frameworks)
     */
    private getUniqueChainNames(attackPatterns: AttackPattern[], filter = ''): string[] {
        if (!attackPatterns) {
            return [];
        }
        const names = attackPatterns
            .map(ap => ap.attributes.kill_chain_phases.map(chain => chain.kill_chain_name))
            .reduce((memo, ap) => memo.concat(ap), []);
        const uniqNames = new Set(names);
        return Array.from(uniqNames);
    }

    /**
     * @description
     */
    private determineFilter(names = []): string {
        const mitreLast = 'mitre-attack';
        const name = names.find(el => el !== mitreLast);
        return name;
    }

    /**
     * @description filter attack patterns
     */
    private filterAttackPatterns(attackPatterns: AttackPattern[], filterChainName = ''): AttackPattern[] {
        if (!attackPatterns) {
            return [];
        }
        const noFilter = filterChainName === '';
        return attackPatterns.filter(ap => {
            if (noFilter) {
                return ap;
            }
            const names = ap.attributes.kill_chain_phases.map((chain) => chain.kill_chain_name);
            return names.includes(filterChainName);
        });
    }

    /**
     * @description Collect all the tactics into cell data.
     */
    private createHeatMap(attackPatterns: AttackPattern[], tactics: AttackPatternCell[]) {
        return attackPatterns.map((attackPattern: any) => {
            const ap: AttackPatternCell = {
                ...this.convertAttackPattern(attackPattern),
                title: attackPattern.attributes.name,
                value: attackPattern.isSelected,
                framework: null,
            };
            if (attackPattern.attributes.kill_chain_phases) {
                const frameworks: string[] = attackPattern.attributes.kill_chain_phases
                    .map(phase => phase.kill_chain_name);
                ap.framework = frameworks.length ? Array.from(new Set(frameworks))[0] : null;
            }
            const match = tactics.find(tactic => tactic.id === ap.id);
            ap.values = match ? match.values : [];
            ap.text = match ? match.text : null;
            return ap;
        });
    }

    /**
     * @description Groups patterns by phase and framework.
     * @todo this version cannot set gradients
     */
    private groupAttackPatterns(attackPatterns: AttackPattern[], tactics: AttackPatternCell[]): TacticChain[] {
        const chains: Dictionary<TacticChain> = {};
        attackPatterns.forEach(attackPattern => {
            attackPattern.attributes.kill_chain_phases.forEach((kcp, index, arr) => {
                let chain: TacticChain = chains[kcp.kill_chain_name];
                if (!chain) {
                    chain = chains[kcp.kill_chain_name] = {
                        name: kcp.kill_chain_name,
                        phases: [],
                    };
                }
                let phase = chain.phases.find(p => p.name === kcp.phase_name);
                if (!phase) {
                    chain.phases.push(phase = {
                        name: kcp.phase_name,
                        tactics: [],
                    });
                }
                const match: any = tactics.find(tactic => tactic.id === attackPattern.id);
                const ap: Tactic = {
                    ...this.convertAttackPattern(attackPattern),
                    title: attackPattern.attributes.name + (arr.length > 1 ? ` (${index + 1})` : ''),
                    adds: { highlights: [{ value: 0, color: {}, }], }
                };
                if (match && match.values && match.values.length) {
                    ap.adds.highlights[0].value = 20;
                    ap.adds.highlights[0].color.bg = match.values[0].color;
                    ap.adds.highlights[0].color.fg = match.text;
                }
                phase.tactics.push(ap);
            });
        });
        Object.values(chains).forEach(chain => chain.phases.forEach(phase => {
            phase.tactics.sort((a, b) => a.name.localeCompare(b.name));
        }));
        return Object.values(chains);
    }

    /**
     * @description creates a treemap of our _active_ tactics, counting each time the tactic is seen.
     */
    private createTreeMap() {
        const capitalizer = new CapitalizePipe();
        const data = [
            ['Attack Patterns Used', 'Attack Phase', '# times used'],
            ['Attack Patterns', null, 0],
        ];
        this.chainPatterns.forEach((chain: any, index, arr) => {
            const chainName = capitalizer.transform(chain.name);
            if (arr.length > 1) {
                data.push([chainName, 'Attack Patterns', null]);
            }
            Object.values(chain.phases).forEach((phase: any) => {
                const phaseName = capitalizer.transform(phase.name);
                data.push([phaseName, arr.length > 1 ? chainName : 'Attack Patterns', phase.tactics.length]);
                phase.tactics.forEach(ap => {
                    data.push([capitalizer.transform(ap.title), phaseName, ap.adds.highlights[0].value + 1]);
                });
            });
        });
        return data;
    }

    /**
     * @description 
     */
    private convertAttackPattern(attackPattern: AttackPattern): any {
        const ap: Tactic = {
            id: attackPattern.id,
            name: attackPattern.attributes.name,
            version: attackPattern.attributes.version,
            created: attackPattern.attributes.created,
            modified: attackPattern.attributes.modified,
            description: attackPattern.attributes.description,
            sophistication_level: attackPattern.attributes.x_unfetter_sophistication_level,
            phases: attackPattern.attributes.kill_chain_phases.map(p => p.phase_name),
            labels: attackPattern.attributes.labels,
            sources: (attackPattern.attributes as any).x_mitre_data_sources,
            references: attackPattern.attributes.external_references,
            platforms: (attackPattern.attributes as any).x_mitre_platforms,
        };
        return ap;
    }

    /**
     * @description
     */
    public isHeatmapView(): boolean {
        return this.display.view === 'heatmap';
    }

    /**
     * @description
     */
    public isTreemapView(): boolean {
        return this.display.view === 'treemap';
    }

    /**
     * @description
     */
    public isCarouselView(): boolean {
        return this.display.view === 'carousel';
    }

    /**
     * @description
     */
    public onViewChange(ev?: MatButtonToggleChange) {
        if (ev && ev.value) {
            this.display.view = ev.value;
            if (ev.value === 'heatmap') {
                requestAnimationFrame(() => this.heatmap.heatmap.ngDoCheck());
            }
        }
    }

    /**
     * @description
     */
    public showCarouselTooltip(ev?: any) {
        this.showTacticTooltip(ev.tactic, ev.event, false);
    }

    /**
     * @description Display a tooltip on the treemap for the tactic we are hovering over.
     */
    public showTreeMapTooltip(selectedPattern: any) {
        if (!selectedPattern) {
            this.hideTacticTooltip(this.tooltipTarget);
        } else {
            let patternName: string = selectedPattern.row[0];
            if (/.*\(\d+\)$/.test(patternName)) {
                patternName = patternName.substring(0, patternName.lastIndexOf(' '));
            }
            let attackPattern = this.attackPatterns.find(pattern => pattern.name === patternName);
            if (attackPattern && (!this.tooltipTarget || this.tooltipTarget.id !== attackPattern.id)) {
                this.showTacticTooltip(attackPattern, selectedPattern);
            } else {
                this.hideTacticTooltip(this.tooltipTarget);
            }
        }
    }

    /**
     * @description
     */
    private showTacticTooltip(tactic: AttackPatternCell, event?: UIEvent, asTooltip: boolean = true): void {
        if (tactic && this.tooltipTarget && (this.tooltipTarget.id === tactic.id)) {
            return;
        }

        this.tooltipTarget = this.attackPatterns.find(pattern => pattern.id === tactic.id);
        this.asTooltip = asTooltip;

        if (!this.overlayRef) {
            const elem = new ElementRef(event.target);

            const positionStrategy = this.overlay.position()
                .connectedTo(elem, {originX: 'center', originY: 'bottom'}, {overlayX: 'start', overlayY: 'top'})
                .withFallbackPosition({originX: 'center', originY: 'top'}, {overlayX: 'start', overlayY: 'bottom'})
                .withFallbackPosition({originX: 'center', originY: 'bottom'}, {overlayX: 'end', overlayY: 'top'})
                .withFallbackPosition({originX: 'center', originY: 'bottom'}, {overlayX: 'end', overlayY: 'bottom'});

            this.overlayRef = this.overlay.create({
                minWidth: 300,
                maxWidth: 500,
                hasBackdrop: !asTooltip,
                positionStrategy,
                scrollStrategy: this.overlay.scrollStrategies.reposition()
            });

            const sub$ = this.overlayRef.backdropClick().subscribe(
                () => this.hideTacticTooltip(this.tooltipTarget),
                (err) => console.log(`${new Date().toISOString()} Error using tooltip: ${err}`),
                () => sub$.unsubscribe());

            this.portal = new TemplatePortal(this.apTooltipTemplate, this.vcr);
        } else {
            this.overlayRef.detach();
            this.overlayRef.getConfig().hasBackdrop = !asTooltip;
        }

        this.overlayRef.attach(this.portal);
    }
  
    /**
     * @description
     */
    private hideTacticTooltip(attackPattern: AttackPatternCell, event?: UIEvent): void {
        if (!attackPattern || !this.tooltipTarget || (this.tooltipTarget.name !== attackPattern.name)) {
            return;
        }
        this.tooltipTarget = null;
        this.overlayRef.detach();
        this.overlayRef.dispose();
        this.overlayRef = null;
    }

    public isAdminUser(): boolean {
        return this.authService.isAdmin();
    }

}
