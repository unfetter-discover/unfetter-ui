import {
    Component,
    OnInit,
    DoCheck,
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
import { Tactic, TacticChain } from '../tactics.model';
import { TacticsView } from '../tactics-view';
import { TacticsTooltipService } from '../tactics-tooltip/tactics-tooltip.service';
import { TacticsControlService } from '../tactics-control.service';

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
export class TacticsHeatmapComponent extends TacticsView<HeatmapComponent, HeatmapOptions> implements DoCheck {

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

    protected get view() {
        return this.heatmap
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
        // initialize the heat colors
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
        const heats = Object.assign({}, this.baseHeats);

        // convert the tactics in the TacticChains we were given into heat cells
        const patterns: Dictionary<AttackPatternCell> = Object.values(tactics).reduce((aps, chain) => {
            chain.phases.forEach(phase => {
                phase.tactics.forEach(tactic => {
                    if (!aps[tactic.id]) {
                        const ap: AttackPatternCell = aps[tactic.id] = {...tactic, title: tactic.name, value: 'false'};
                        const target = this.targeted.find(t => t.id === tactic.id);
                        if (target && target.adds && target.adds.highlights && target.adds.highlights.length) {
                            let value = ap.value, values = [], heat = [];
                            target.adds.highlights.forEach(h => {
                                if (h.color && h.color.bg) {
                                    values.push(h.color.bg.toLowerCase());
                                    heat.push(h.color.bg);
                                    if (h.color.fg) {
                                        ap.text = h.color.fg;
                                    }
                                }
                            });
                            ap.value = values.join('-');
                            if (!heats[ap.value]) {
                                heats[ap.value] = { bg: heat, fg: ap.text || 'black', };
                            }
                        }
                    }
                });
            });
            return aps;
        }, {});

        // now convert the phases in the TacticChains into heat batches
        const data: Dictionary<HeatBatchData> = Object.values(tactics).reduce((chains, chain) => {
            chain.phases.forEach(phase => {
                data[phase.name] = {
                    title: phase.name,
                    value: null,
                    cells: [],
                };
                phase.tactics.forEach(pattern => {
                    data[phase.name].cells.push(patterns[pattern.id]);
                });
                data[phase.name].cells.sort((ap1, ap2) => ap1.title.localeCompare(ap2.title));
            });
            return chains;
        }, {});
        this.data = Object.values(data);

        if (this.heatmap && this.heatmap.options && this.heatmap.options.color) {
            this.heatmap.options.color.heatColors = heats;
        }
    }

    /**
     * @description set up whatever you have to with the control service; this includes pulling previous state when
     *              switching between this view and another
     */
    protected initController() {
        // Nothing to do
    }

    protected rerender() {
        this.view.ngDoCheck();
    }

}
