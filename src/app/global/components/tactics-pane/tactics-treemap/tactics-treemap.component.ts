import { Component, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { TacticsView } from '../tactics-view';
import { TacticChain } from '../tactics.model';
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
        super(store, controls, tooltips);
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
        const capitalizer = new CapitalizePipe();
        const data = [
            ['Attack Patterns Used', 'Attack Phase', '# times used'],
            ['Attack Patterns', null, 0],
        ];
        this.frameworks.forEach((chain, index, arr) => {
            const chainName = capitalizer.transform(chain);
            if (arr.length > 1) {
                data.push([chainName, 'Attack Patterns', null]);
            }
            if (tactics && tactics[chain] && tactics[chain].phases) {
                Object.values(tactics[chain].phases).forEach((phase: any) => {
                    const phaseName = capitalizer.transform(phase.name);
                    data.push([phaseName, arr.length > 1 ? chainName : 'Attack Patterns', null]);
                    phase.tactics.forEach(ap => {
                        data.push([capitalizer.transform(ap.title), phaseName, ap.adds.highlights[0].value + 1]);
                    });
                });
            }
        });
        this.data = data;
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
