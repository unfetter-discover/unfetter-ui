import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Tactic } from '../../global/components/tactics-pane/tactics.model';
import { HeatColor, HeatmapOptions } from '../../global/components/heatmap/heatmap.data';
import { CarouselOptions } from '../../global/components/tactics-pane/tactics-carousel/carousel.data';
import { TooltipEvent } from '../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.service';
import { TreemapOptions } from '../../global/components/treemap/treemap.data';
import { IntrusionSetHighlighterService } from '../intrusion-set-highlighter.service';
import { Dictionary } from '../../models/json/dictionary';

@Component({
    selector: 'intrusion-sets-tactics',
    templateUrl: './intrusion-sets-tactics.component.html',
    styleUrls: ['./intrusion-sets-tactics.component.scss'],
})
export class IntrusionSetsTacticsComponent implements OnInit, OnChanges {

    /**
     * @description
     */
    @Input() public intrusionSets: any[] = [];

    /**
     * @description
     */
    @Input() public attackPatterns: Dictionary<any> = {};

    /**
     * @description
     */
    public targets: Tactic[] = [];

    /**
     * @description
     */
    public readonly heatmapOptions: HeatmapOptions = {
        color: {
            batchColors: [
                {header: {bg: '.theme-fill-primary-lighter', fg: 'black'}, body: {bg: 'white', fg: 'black'}},
            ],
            heatColors: {'false': {bg: '#ccc', fg: 'black'}},
            noColor: {bg: '#ccc', fg: 'black'},
            showGradients: true,
            maxGradients: 3,
            defaultGradient: {bg: ['#999', 'black'], fg: 'white'}
        },
        text: {
            cells: {
                showText: true,
            },
        },
    };

    /**
     * @description
     */
    public readonly treemapOptions: TreemapOptions = {
        minColor: '#8df6ec',
        midColor: '#6dd6cc',
        maxColor: '#4db6ac',
    };

    /**
     * @description
     */
    public readonly carouselOptions: CarouselOptions = {
        toolboxTheme: 'theme-bg-primary-lighter theme-color-primary-lightest'
    };

    constructor(
        private highlighter: IntrusionSetHighlighterService,
    ) {
    }

    /**
     * @description
     */
    ngOnInit() {
    }

    /**
     * @description
     */
    ngOnChanges() {
        this.targets = this.intrusionSets ? this.getSelections() : [];
    }

    /**
     * @description
     */
    private getSelections() {
        const targets: Dictionary<Tactic> = {};
        this.intrusionSets.forEach(is => {
            const highlight = {
                value: 2,
                color: {
                    style: is.name.toLowerCase(),
                    bg: is.color,
                    fg: this.getContrast(is.color),
                },
            };
            is.attack_patterns.forEach(pattern => {
                const tactic = this.attackPatterns[pattern.id];
                if (tactic) {
                    let target = targets[pattern.id];
                    if (!target) {
                        targets[pattern.id] = target = { ...tactic, adds: { highlights: [], }, };
                    }
                    target.adds.highlights.push(highlight);
                }
            });
        });
        return Object.values(targets);
    }

    /**
     * @description
     */
    public getContrast(color: string) {
        // http://www.w3.org/TR/AERT#color-contrast
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        const rgb = !result ? null :
            {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            };
        const o = Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);
        return o > 125 ? 'black' : 'white';
    }

    /**
     * @description
     */
    public highlightAttackPattern(selection: TooltipEvent) {
        let ap = null;
        if (selection && selection.data) {
            ap = Object.values(this.attackPatterns).find(ptn => ptn.name === selection.data.name) || null;
        }
        this.highlighter.highlightIntrusionSets(ap);
    }

}
