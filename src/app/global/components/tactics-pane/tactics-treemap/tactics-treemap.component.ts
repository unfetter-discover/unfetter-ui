import { Component, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { TacticsView } from '../tactics-view';
import { TacticChain, Tactic } from '../tactics.model';
import { TacticsControlService } from '../tactics-control.service';
import { TacticsTooltipService } from '../tactics-tooltip/tactics-tooltip.service';
import { TreemapComponent } from '../../treemap/treemap.component';
import { TreemapOptions } from '../../treemap/treemap.data';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { Dictionary } from '../../../../models/json/dictionary';
import { AppState } from '../../../../root-store/app.reducers';

@Component({
    selector: 'tactics-treemap',
    templateUrl: './tactics-treemap.component.html',
    styleUrls: ['./tactics-treemap.component.scss']
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
        super('treemap', store, controls, tooltips);
    }

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
                            const target = this.targeted.find(tactic => tactic.id === ap.id);
                            const value = (this.hasHighlights(target)) ? this.sumHighlights(target) : 0;
                            data.push([name, phase.name, value + 1]);
                        });
                    });
                }
            });
        }
        requestAnimationFrame(() => {
            console.log('resulting treemap data', data);
            this.data = data;
        });
    }

    /**
     * @description
     */
    private sumHighlights(tactic: Tactic): number {
        return tactic.adds.highlights.reduce((sum, h) => sum + h.value ? (h.value * 10) : 1, 0);
    }

    /**
     * @description set up whatever you have to with the control service; this includes pulling previous state when
     *              switching between this view and another
     */
    protected initController() {
        // Nothing to do
    }

    protected rerender() {
        this.treemap.ngDoCheck();
    }

}
