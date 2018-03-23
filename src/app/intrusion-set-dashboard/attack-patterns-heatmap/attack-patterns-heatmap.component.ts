import {
        Component,
        OnInit,
        DoCheck,
        Input,
        ViewChild,
        Renderer2,
        ElementRef,
        TemplateRef,
        ViewContainerRef,
        ChangeDetectorRef,
    } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';

import {
        HeatmapComponent,
        HeatMapOptions,
        BatchData,
        HeatColor,
    } from '../../global/components/heatmap/heatmap.component';
import { AttackPatternHighlighterService } from '../attack-pattern-highlighter.service';
import { TemplatePortal } from '@angular/cdk/portal';
import { GenericApi } from '../../core/services/genericapi.service';
import { Dictionary } from '../../models/json/dictionary';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'attack-patterns-heatmap',
    templateUrl: './attack-patterns-heatmap.component.html',
    styleUrls: ['./attack-patterns-heatmap.component.scss']
})
export class AttackPatternsHeatmapComponent implements OnInit, DoCheck {

    public heatMapData: Array<BatchData> = [];
    private noColor: HeatColor = {bg: 'transparent', fg: 'black'};
    public readonly heatMapOptions: HeatMapOptions = {
        batchColors: [
            {header: {bg: '#4db6ac', fg: 'black'}, body: {bg: 'white', fg: 'black'}},
        ],
        heatColors: {'false': this.noColor},
        noColor: this.noColor,
        showText: true,
    };
    public showHeatMap = false;

    @ViewChild(HeatmapComponent) private heatMapView: HeatmapComponent;

    @Input() public killChainPhases: any[];
    private previousKillChainPhases = [];
    private attackPatterns: Dictionary<any> = {};

    @ViewChild('apTooltipTemplate') apTooltipTemplate: TemplateRef<any>;
    private attackPattern: any;
    private overlayRef: OverlayRef;
    private portal: TemplatePortal<any>;
  
    constructor(
        private genericApi: GenericApi,
        private overlay: Overlay,
        private vcr: ViewContainerRef,
        private renderer: Renderer2,
        private changeDetector: ChangeDetectorRef,
        private highlighter: AttackPatternHighlighterService,
    ) { }

    ngOnInit() {
        this.showHeatMap = (this.killChainPhases && (this.killChainPhases.length > 0));
        this.loadData();
    }

    /**
     * @description retrieve the attack patterns and their tactics phases from the backend database
     */
    private loadData() {
        const apSort = { 'stix.name': '1' };
        const apProperties = {
            'stix.name': 1,
            'stix.description': 1,
            'stix.kill_chain_phases': 1,
            'extendedProperties.x_mitre_data_sources': 1,
            'extendedProperties.x_mitre_platforms': 1,
            'stix.id': 1,
        };
        const apQuery = encodeURI(`sort=${JSON.stringify(apSort)}&project=${JSON.stringify(apProperties)}`);
        const initAttackPatterns$ = this.genericApi.get(`${Constance.ATTACK_PATTERN_URL}?${apQuery}`)

        const intrusionsProperties = {
            'stix.name': 1,
            'stix.id': 1
        };
        const intrusionsFilter = encodeURI(`project=${JSON.stringify(intrusionsProperties)}`);
        const initIntrusions$ = this.genericApi.get(`${Constance.INTRUSION_SET_URL}?${intrusionsFilter}`);

        const relFilter = {
            'stix.relationship_type': 'uses',
            'stix.source_ref': {'$regex': '^intrusion\-set\-\-'},
            'stix.target_ref': {'$regex': '^attack\-pattern\-\-'},
        };
        const relQuery = encodeURI(`filter=${JSON.stringify(relFilter)}`);
        const initRelationships$ = this.genericApi.get(`${Constance.RELATIONSHIPS_URL}?${relQuery}`)

        const initData$ = Observable.forkJoin(initAttackPatterns$, initIntrusions$, initRelationships$)
            .finally(() => initData$ && initData$.unsubscribe())
            .subscribe(
                ([attackPatterns, intrusionSets, relationships]) => {
                    attackPatterns.forEach(ap => {
                        if (ap && ap.attributes) {
                            const pattern = this.attackPatterns[ap.attributes.id] = ap.attributes;
                            pattern.phases = pattern.kill_chain_phases.map(phase => phase.phase_name);
                            pattern.intrusion_sets = [];
                        };
                    });
                    console.log('intrusions', intrusionSets);
                    const intrusions = {};
                    intrusionSets.forEach(intrusion => {
                        if (intrusion && intrusion.attributes) {
                            intrusions[intrusion.attributes.id] = intrusion.attributes;
                        }
                    })
                    relationships.forEach(rel => {
                        if (rel && rel.attributes && rel.attributes.source_ref && rel.attributes.target_ref) {
                            const ap = this.attackPatterns[rel.attributes.target_ref];
                            const is = intrusions[rel.attributes.source_ref];
                            if (ap && is) {
                                ap.intrusion_sets.push(is);
                            }
                        }
                    });
                    console.log('resulting patterns', this.attackPatterns);
                },
                (err) => console.log(new Date().toISOString(), err)
            );
    }

    ngDoCheck() {
        if (this.killChainPhases !== this.previousKillChainPhases) {
            this.changeDetector.markForCheck();
            if (this.killChainPhases) {
                this.createAttackPatternHeatMap();
            }
            this.previousKillChainPhases = this.killChainPhases;
            this.showHeatMap = (this.killChainPhases && (this.killChainPhases.length > 0));
        }
    }

    /**
     * @description Create a heatmap chart of all the tactics. This looks like a version of the carousel, but shrunken
     *              in order to fit within the viewport.
     */
    private createAttackPatternHeatMap() {
        let data = [];
        this.heatMapOptions.heatColors = {'false': this.noColor};

        this.killChainPhases.forEach(phase => {
            let index = 0;
            if (phase && phase.name && phase.attack_patterns) {
                const name = this.normalizePhaseName(phase.name);
                const d = {
                    batch: name,
                    active: null,
                    columns: [[]]
                };
                phase.attack_patterns.forEach(attackPattern => {
                    if (attackPattern.name) {
                        let active: string = 'false';
                        if (!/#ffffff/i.test(attackPattern.back)) {
                            active = attackPattern.back;
                            if (!this.heatMapOptions.heatColors[active]) {
                                this.heatMapOptions.heatColors[active] = {
                                    bg: active,
                                    fg: attackPattern.fore || 'black'
                                };
                            }
                        }
                        d.columns[0].push({
                            batch: attackPattern.name,
                            active: active,
                        });
                    }
                });
                data.push(d);
            }
        });

        this.heatMapData = data;
        this.heatMapView.options.heatColors = this.heatMapOptions.heatColors;
    }

    public normalizePhaseName(phase: string): string {
        return phase
            .replace(/\-/g, ' ')
            .split(/\s+/)
            .map(w => w[0].toUpperCase() + w.slice(1))
            .join(' ')
            .replace(/\sAnd\s/g, ' and ')
            ;
    }

    public highlightAttackPattern(selection: any) {
        if (!selection || !selection.row) {
            this.hideAttackPatternTooltip(this.attackPattern);
        } else {
            selection.attackPattern = Object.values(this.attackPatterns).find(ptn => ptn.name === selection.row.batch);
            if (!selection.attackPattern) {
                this.hideAttackPatternTooltip(this.attackPattern);
            } else {
                this.showAttackPatternTooltip(selection.attackPattern, selection.event);
                this.highlighter.highlightAttackPattern(selection.attackPattern);
            }
        }
    }

    public showAttackPatternTooltip(tactic: any, event?: UIEvent): void {
        if (tactic && this.attackPattern && (this.attackPattern.id === tactic.id)) {
            return;
        }
  
        this.attackPattern = tactic;
  
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
                hasBackdrop: true,
                positionStrategy,
                scrollStrategy: this.overlay.scrollStrategies.reposition()
            });

            const sub$ = this.overlayRef.backdropClick().subscribe(
                () => this.hideAttackPatternTooltip(this.attackPattern),
                (err) => console.log(new Date().toISOString(), err),
                () => sub$.unsubscribe());
    
            this.portal = new TemplatePortal(this.apTooltipTemplate, this.vcr);
        }

        this.overlayRef.attach(this.portal);
    }

    public getIntrusionSetNames(attackPattern: any): string {
        return attackPattern.intrusion_sets.map(is => is.name).join(', ');
    }
  
    public hideAttackPatternTooltip(attackPattern: any, event?: UIEvent): void {
      if (!attackPattern || !this.attackPattern || (this.attackPattern.name !== attackPattern.name)) {
        return;
      }
      this.attackPattern = null;
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.highlighter.highlightAttackPattern(null);
    }
  
}