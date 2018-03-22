import {
        Component,
        OnInit,
        DoCheck,
        Input,
        ViewChild,
        Renderer2,
        ViewContainerRef,
        ChangeDetectorRef,
    } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';

import {
        HeatmapComponent,
        HeatMapOptions,
        BatchData,
        HeatColor,
    } from '../../global/components/heatmap/heatmap.component';
import { Dictionary } from '../../models/json/dictionary';
import { AttackPatternHighlighterService } from '../attack-pattern-highlighter.service';

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
        hoverColor: null,
        showText: true,
    };
    public showHeatMap = false;

    @ViewChild(HeatmapComponent) private heatMapView: HeatmapComponent;

    @Input() public killChainPhases: any[];
    private previousKillChainPhases = [];
    private attackPatternPhases: Dictionary<Array<string>> = {};

    constructor(
        private overlay: Overlay,
        private vcr: ViewContainerRef,
        private renderer: Renderer2,
        private changeDetector: ChangeDetectorRef,
        private highlighter: AttackPatternHighlighterService,
    ) { }

    ngOnInit() {
        this.showHeatMap = (this.killChainPhases && (this.killChainPhases.length > 0));
    }

    ngDoCheck() {
        if (this.killChainPhases !== this.previousKillChainPhases) {
            this.changeDetector.markForCheck();
            if (this.killChainPhases) {
                this.collectAttackPatternPhases();
                this.createAttackPatternHeatMap();
            }
            this.previousKillChainPhases = this.killChainPhases;
            this.showHeatMap = (this.killChainPhases && (this.killChainPhases.length > 0));
        }
    }

    /**
     * @description Collects the phases (kill chains? tactics?) used by each attack pattern.
     */
    private collectAttackPatternPhases() {
        this.killChainPhases.forEach(phase => {
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
     * @description Create a heatmap chart of all the tactics. This looks like a version of the carousel, but shrunken
     *              in order to fit within the viewport.
     */
    private createAttackPatternHeatMap() {
        let data = [];
        this.heatMapOptions.heatColors = {'false': this.noColor};

        this.killChainPhases.forEach(phase => {
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

    public highlightAttackPattern(event: any) {
        console.log('hover triggered', event);
        this.highlighter.setActiveAttackPattern(event);
    }

}
