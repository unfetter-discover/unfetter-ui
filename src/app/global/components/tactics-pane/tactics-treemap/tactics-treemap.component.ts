import { Component, ViewChild, Input, } from '@angular/core';
import { Store } from '@ngrx/store';

import { TacticsView } from '../tactics-view';
import { TacticChain, Tactic } from '../tactics.model';
import { TacticsControlService } from '../tactics-control.service';
import { TacticsTooltipService, TooltipEvent } from '../tactics-tooltip/tactics-tooltip.service';
import { TreemapComponent } from '../../treemap/treemap.component';
import { TreemapOptions } from '../../treemap/treemap.data';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { Dictionary } from '../../../../models/json/dictionary';
import { AppState } from '../../../../root-store/app.reducers';

@Component({
    selector: 'tactics-treemap',
    templateUrl: './tactics-treemap.component.html',
    styleUrls: ['./tactics-treemap.component.scss'],
})
export class TacticsTreemapComponent extends TacticsView<TreemapComponent, TreemapOptions> {

    /**
     * The generated data that will be rendered.
     */
    public data = [];

    @ViewChild('treemap') private treemap: TreemapComponent;

    constructor(
        store: Store<AppState>,
        controls: TacticsControlService,
        tooltips: TacticsTooltipService,
    ) {
        super(store, controls, tooltips);
    }

    /**
     * @description
     */
    protected get view() {
        return this.treemap;
    }

    /**
     * @description
     */
    protected validateOptions() {
        // @todo
    }

    /**
     * @description ensure valid carousel option values
     */
    protected extractData(tactics: Dictionary<TacticChain>) {
        const data = [
            ['Attack Patterns Used', 'Attack Phase', '# times used'],
            ['Attack Patterns', null, 0],
        ];
        if (tactics) {
            this.frameworks.forEach((chain, cindex, chains) => {
                const framework = tactics[chain];
                if (framework && framework.phases && framework.phases.length) {
                    if (chains.length > 1) {
                        data.push([framework.name, 'Attack Patterns', null]);
                    }
                    Object.values(framework.phases).forEach((phase: any) => {
                        data.push([phase.name, chains.length > 1 ? framework.name : 'Attack Patterns', null]);
                        phase.tactics.forEach(ap => {
                            const name = ap.name
                                    + (ap.phases.length > 1 ? ` (${ap.phases.indexOf(phase.id) + 1})` : '');
                            const target = this.targets.find(tactic => tactic.id === ap.id);
                            const value = (this.hasHighlights(target)) ? this.sumHighlights(target) : 0;
                            data.push([name, phase.name, value + 1]);
                        });
                    });
                }
            });
        }
        requestAnimationFrame(() => {
            this.data = data;
        });
    }

    /**
     * @description
     */
    private sumHighlights(tactic: Tactic): number {
        return tactic.adds.highlights.reduce((sum, h) => sum + h.value ? h.value : 1, 0);
    }

    /**
     * @description set up whatever you have to with the control service; this includes pulling previous state when
     *              switching between this view and another
     */
    protected initController() {
        // Nothing to do
    }

    /**
     * @description
     */
    public rerender() {
        this.treemap.ngDoCheck();
    }

    /**
     * @description attempts to find the given tactic in the targeted list; if not found, returns the given tactic
     */
    protected lookupTarget(data: any): Tactic {
        if (data.length) {
            let name: string = data[0];
            let index = name.lastIndexOf(' (');
            if (index > 0) {
                name = name.substring(0, index);
            }
            return this.tactics.find(tactic => name.localeCompare(tactic.name) === 0);
        }
        return null;
    }

}
