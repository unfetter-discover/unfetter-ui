
import {distinctUntilChanged} from 'rxjs/operators';
import {
        Component,
        Inject,
        OnInit,
        Input,
        ViewChild,
        ElementRef,
        TemplateRef,
        ViewContainerRef,
        ChangeDetectorRef,
    } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import {
    TacticsHeatmapComponent
} from '../../../global/components/tactics-pane/tactics-heatmap/tactics-heatmap.component';
import { Tactic, TacticChain } from '../../../global/components/tactics-pane/tactics.model';
import { HeatmapOptions } from '../../../global/components/heatmap/heatmap.data';
import { GenericApi } from '../../../core/services/genericapi.service';
import { Constance } from '../../../utils/constance';
import { AppState } from '../../../root-store/app.reducers';
import { Dictionary } from '../../../models/json/dictionary';
import { AttackPattern } from '../../../models';
import { TooltipEvent } from '../../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.service';

@Component({
    selector: 'attack-pattern-chooser',
    templateUrl: './attack-pattern-chooser.component.html',
    styleUrls: ['./attack-pattern-chooser.component.scss'],
})
export class AttackPatternChooserComponent implements OnInit {

    public attackPatterns: Tactic[] = [];

    @ViewChild('apChooser') private heatmap: TacticsHeatmapComponent;
    @Input() options: HeatmapOptions = {
        view: {
            component: '#attack-pattern-filter',
        },
        color: {
            batchColors: [
                {header: {bg: '.odd', fg: '#333'}, body: {bg: '.odd', fg: 'black'}},
                {header: {bg: 'transparent', fg: '#333'}, body: {bg: 'transparent', fg: 'black'}},
            ],
            heatColors: {
                'false': {bg: '#ccc', fg: 'black'},
                'inactive': {bg: '#ccc', fg: 'black'},
                'selected': {bg: '.selected', fg: 'black'},
                'active': {bg: '.active', fg: 'black'},
            },
        },
        text: {
            cells: {
                showText: true,
            },
        },
        zoom: {
            cellTitleExtent: 1,
        },
    }

    @ViewChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;
    private overlayRef: OverlayRef;
    private portal: TemplatePortal<any>;

    constructor(
        private tacticsStore: Store<AppState>,
        private dialogRef: MatDialogRef<TacticsHeatmapComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private genericApi: GenericApi,
        private overlay: Overlay,
        private vcr: ViewContainerRef,
        private changeDetector: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        if (this.data && this.data.active) {
            (this.data.active as Observable<AttackPattern[]>).pipe(
                distinctUntilChanged())
                .subscribe(
                    (patterns) => {
                        // @todo We need to convert whatever is provided to us into Tactic objects,
                        //       and set their value to a heat property ('inactive' or 'selected').
                    },
                    (err) => console.log(`(${new Date().toISOString}) Attack Pattern Chooser preselects error`, err),
                )
        }
    }

    /**
     * @description for selecting and deselecting attack patterns
     */
    public toggleAttackPattern(clicked?: TooltipEvent) {
        if (clicked && clicked.data) {
            const index = this.attackPatterns.findIndex(pattern => pattern.id === clicked.data.id);
            let newValue = 'selected';
            if (index < 0) {
                // pattern was not previously selected; select it
                this.attackPatterns.push(clicked.data);
            } else {
                // remove the pattern from our selection list
                newValue = 'false';
                this.attackPatterns.splice(index, 1);
            }
            this.heatmap.view.helper['heatmap'].workspace.data.forEach(batch => {
                batch.cells.forEach(cell => {
                    if (cell.id === clicked.data.id) {
                        cell.value = newValue === 'selected' ? 'active' : 'inactive';
                    }
                });
            });
            this.heatmap.view.helper.updateCells();
        }
    }

    /**
     * @description Remove all selections
     */
    public clearSelections() {
        this.attackPatterns.slice(0).forEach(pattern => this.toggleAttackPattern({data: pattern}));
    }

    /**
     * @description retrieve the list of selected attack pattern names
     */
    public close() {
        const selections = Array.from(new Set(this.attackPatterns.map(pattern => pattern.id)));
        this.dialogRef.close(selections);
    }
  
}
