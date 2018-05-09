import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    Renderer2,
    ElementRef,
    TemplateRef,
    ViewContainerRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { TacticsView } from '../tactics-view';
import { Tactic, TacticChain } from '../tactics.model';
import { TacticsControlService } from '../tactics-control.service';
import { TacticsTooltipService, TooltipEvent } from '../tactics-tooltip/tactics-tooltip.service';
import { HeatmapComponent } from '../../heatmap/heatmap.component';
import {
    HeatBatchData,
    HeatCellData,
    HeatColor,
    HeatmapOptions,
    DEFAULT_OPTIONS,
} from '../../heatmap/heatmap.data';
import { Dictionary } from '../../../../models/json/dictionary';
import { UserProfile } from '../../../../models/user/user-profile';
import { AppState } from '../../../../root-store/app.reducers';
import { AuthService } from '../../../../core/services/auth.service';

/**
 * @description Common data that can be found on attack patterns displayed in a heatmap cell.
 */
export interface AttackPatternCell extends HeatCellData, Tactic {
    value: string,
    values?: Array<{name: string, color: string}>,
    text?: string, // the foreground, or text, color of an attack pattern cell
}

@Component({
    selector: 'tactics-heatmap',
    templateUrl: './tactics-heatmap.component.html',
    styleUrls: ['./tactics-heatmap.component.scss']
})
export class TacticsHeatmapComponent extends TacticsView<HeatmapComponent, HeatmapOptions> {

    public data: HeatBatchData[] = [];

    @ViewChild(HeatmapComponent) private heatmap: HeatmapComponent;

    private noColor: HeatColor = {bg: '#ccc', fg: 'black'};

    private baseHeats: Dictionary<HeatColor> = null;

    constructor(
        store: Store<AppState>,
        controls: TacticsControlService,
        tooltips: TacticsTooltipService,
        private changeDetector: ChangeDetectorRef,
    ) {
        super(store, controls, tooltips);
    }

    public get view() {
        return this.heatmap;
    }

    /**
     * @description
     */
    protected validateOptions() {
        if (!this.options) {
            this.options = {};
        }
        if (!this.options.color) {
            this.options.color = {};
        }
    }

    /**
     * @description ensure valid carousel option values
     */
    protected extractData(tactics: Dictionary<TacticChain>) {
        const heats = this.getBaseHeats();

        // convert the tactics in the TacticChains we were given into heat cells
        const data: Dictionary<HeatBatchData> = {};
        const patterns: Dictionary<AttackPatternCell> = this.frameworks.reduce((aps, chain) => {
            this.convertTacticChain(tactics, chain, data, aps, heats);
            return aps;
        }, {});

        // now convert the phases in the TacticChains into heat batches
        Object.values(data).forEach(batch => batch.cells.sort((ap1, ap2) => ap1.title.localeCompare(ap2.title)));
        requestAnimationFrame(() => {
            this.data = Object.values(data);
            console.log(`(${new Date().toISOString()}) heatmap tactics`, this.data);
            if (this.heatmap && this.heatmap.options && this.heatmap.options.color) {
                this.heatmap.options.color.heatColors = heats;
                console.log(`(${new Date().toISOString()}) heatmap heats`, this.heatmap.options.color.heatColors);
            }
        });
    }

    /**
     * @description initialize the heat colors
     */
    private getBaseHeats() {
        if (!this.baseHeats) {
            if (this.options && this.options.color && this.options.color.heatColors) {
                this.baseHeats = this.options.color.heatColors;
            } else if (this.view && this.view.options && this.view.options.color) {
                this.baseHeats = this.view.options.color.heatColors;
            }
            if (!this.baseHeats) {
                this.baseHeats = DEFAULT_OPTIONS.color.heatColors;
            }
        }
        return Object.assign({}, this.baseHeats);
    }

    /**
     * @description
     */
    private convertTacticChain(tactics: Dictionary<TacticChain>, chain: string,
            data: Dictionary<HeatBatchData>, aps: any, heats: Dictionary<HeatColor>) {
        tactics[chain].phases.forEach(phase => {
            data[phase.id] = {
                title: phase.name,
                value: null,
                cells: [],
            };
            phase.tactics.forEach(tactic => {
                if (!aps[tactic.id]) {
                    // convert the tactic into a heat cell, colorize it if it is targeted
                    const ap: AttackPatternCell = aps[tactic.id] = {...tactic, title: tactic.name, value: 'false'};
                    const target = this.targeted.find(t => t.id === tactic.id);
                    if (this.hasHighlights(target)) {
                        const colors = this.collectColors(target);
                        if (colors.styles.size) {
                            ap.value = Array.from(colors.styles).sort().join('-');
                        } else if (colors.bgs.size) {
                            ap.value = Array.from(colors.bgs).join('-');
                        }
                        if (!heats[ap.value]) {
                            heats[ap.value] = { bg: Array.from(colors.heats), fg: colors.text || 'black', };
                        }
                        if (colors.text) {
                            ap.text = colors.text;
                        }
                    }
                }
                data[phase.id].cells.push(aps[tactic.id]);
            });
        });
    }

    /**
     * @description
     */
    private collectColors(target: Tactic) {
        const colors = {
            styles: new Set(),
            bgs: new Set(),
            heats: new Set(),
            text: null,
        };
        target.adds.highlights.forEach(h => {
            if (h.color) {
                if (h.color.style) {
                    colors.styles.add(h.color.style);
                    if (h.color.bg) {
                        colors.heats.add(h.color.bg);
                    }
                } else if (h.color.bg) {
                    colors.bgs.add(h.color.bg.toLowerCase());
                    colors.heats.add(h.color.bg);
                }
                if (h.color.fg) {
                    colors.text = h.color.fg;
                }
            }
        });
        return colors;
    }

    /**
     * @description set up whatever you have to with the control service; this includes pulling previous state when
     *              switching between this view and another
     */
    protected initController() {
        // Nothing to do
    }

    /**
     * @description order a rebuild of the underlying heatmap
     */
    protected rerender() {
        this.view.ngDoCheck();
    }

    /**
     * @description 
     */
    protected lookupTarget(data: any): Tactic {
        return data;
    }

}
