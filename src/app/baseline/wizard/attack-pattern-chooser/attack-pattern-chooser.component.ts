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
        AfterViewInit,
    } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

@Component({
    selector: 'attack-pattern-chooser',
    templateUrl: './attack-pattern-chooser.component.html',
    styleUrls: ['./attack-pattern-chooser.component.scss'],
})
export class AttackPatternChooserComponent implements OnInit, AfterViewInit {

    public attackPatterns: Tactic[] = [];
    public selected = [];

    @ViewChild('apChooser') private heatmap: TacticsHeatmapComponent;
    @Input() options: HeatmapOptions = {
        view: {
            component: '#attack-pattern-filter',
        },
        color: {
            batchColors: [
                {header: {bg: 'white', fg: '#333'}, body: {bg: 'white', fg: 'black'}},
            ],
            heatColors: {
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
        this.selected = this.data.active || [];
    }
    
    ngAfterViewInit() {
        this.heatmap.data.forEach(batch => {
            batch.cells.forEach(pattern => {
                pattern.value = this.selected.find(p => p.title === pattern.title) ? 'selected' : 'inactive';
            });
        });
    }

    /**
     * @description for selecting and deselecting attack patterns
     */
    public toggleAttackPattern(clicked?: any) {
        if (clicked && clicked.row) {
            const index = this.selected.findIndex(pattern => pattern.id === clicked.row.id);
            if (index < 0) {
                // pattern was not previously selected; select it
                clicked.row.value = 'selected';
                this.selected.push(clicked.row);
            } else {
                // remove the pattern from our selection list
                clicked.row.value = 'inactive';
                this.selected.splice(index, 1);
            }
            this.heatmap.view.helper['heatmap'].workspace.data.forEach(batch => {
                batch.value = batch.cells.some(cell => cell.value === 'selected') ? 'active' : null;
            });
            this.heatmap.view.helper.updateCells();
        }
    }

    /**
     * @description Remove all selections
     */
    public clearSelections() {
        this.selected.slice(0).forEach(pattern => this.toggleAttackPattern({row: pattern}));
    }

    /**
     * @description retrieve the list of selected attack pattern names
     */
    public onClose(): string[] {
        return Array.from(new Set(this.selected.map(pattern => pattern.id)));
    }
  
}
