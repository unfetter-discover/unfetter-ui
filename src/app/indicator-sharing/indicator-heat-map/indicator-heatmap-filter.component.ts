import {
        Component,
        Inject,
        Input,
        ViewChild,
        ElementRef,
        TemplateRef,
        ViewContainerRef,
        ChangeDetectorRef,
        AfterViewInit,
    } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Store } from '@ngrx/store';

import { AttackPatternsHeatmapComponent } from '../../global/components/heatmap/attack-patterns-heatmap.component';
import { HeatMapOptions } from '../../global/components/heatmap/heatmap.data';
import { IndicatorSharingFeatureState } from '../store/indicator-sharing.reducers';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'indicator-heatmap-filter',
    templateUrl: './indicator-heatmap-filter.component.html',
    styleUrls: ['./indicator-heatmap-filter.component.scss'],
})
export class IndicatorHeatMapFilterComponent implements AfterViewInit {

    @ViewChild('heatmapView') private view: AttackPatternsHeatmapComponent;
    @Input() heatmapOptions: HeatMapOptions = {
        view: {
            component: '#indicator-heatmap-filter',
        },
        color: {
            batchColors: [
                {header: {bg: '.odd', fg: '#333'}, body: {bg: '.odd', fg: 'black'}},
                {header: {bg: 'transparent', fg: '#333'}, body: {bg: 'transparent', fg: 'black'}},
            ],
            heatColors: {
                'inactive': {bg: '#eee', fg: 'black'},
                'selected': {bg: '.selected', fg: 'black'},
            },
        },
        text: {
            showCellText: true,
        },
        zoom: {
            hasMinimap: false,
            cellTitleExtent: 1,
        },
    }

    public attackPatterns = {};
    public selectedPatterns = [];

    @ViewChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;
    private overlayRef: OverlayRef;
    private portal: TemplatePortal<any>;

    constructor(
        public dialogRef: MatDialogRef<IndicatorHeatMapFilterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private overlay: Overlay,
        private vcr: ViewContainerRef,
        private changeDetector: ChangeDetectorRef,
        public store: Store<IndicatorSharingFeatureState>
    ) { }

    ngAfterViewInit() {
        // NOTE This is a hack to get the modal to start to render before the data is processed, 
        // since there is a noticeable lag time when that occurs
        requestAnimationFrame(() => {
            const getAttackPatterns$ = this.store.select('indicatorSharing')
                .pluck('attackPatterns')
                .take(1)
                .finally(() => getAttackPatterns$ && getAttackPatterns$.unsubscribe())
                .subscribe(
                    (attackPatterns: any[]) => {
                        this.attackPatterns = attackPatterns.reduce(
                            (patterns, pattern) => this.collectAttackPattern(patterns, pattern), {});
                        this.view['heatMapView'].forceUpdate();
                        setTimeout(() => this.view['heatMapView']['ngDoCheck'](), 500);
                    },
                    (err) => console.log(err),
                );
        });
    }

    /**
     * @description now group up all the phases and the attack patterns they have, for the heatmap display
     */
    private collectAttackPattern(patterns, pattern) {
        const name = pattern.name;
        if (name) {
            const selected = this.data.active && this.data.active.includes(pattern.id);
            const ap = patterns[name] = Object.assign({}, {
                id: pattern.id,
                name: name,
                title: name,
                description: pattern.description,
                phases: (pattern.kill_chain_phases || []).map(p => p.phase_name),
                sources: pattern.x_mitre_data_sources,
                platforms: pattern.x_mitre_platforms,
                value: selected ? 'selected' : 'inactive',
            });
            if (selected) {
                this.selectedPatterns.push(ap);
            }
        }
        return patterns;
    }

    /**
     * @description for selecting and deselecting attack patterns
     */
    public toggleAttackPattern(clicked?: any) {
        if (clicked && clicked.row) {
            const index = this.selectedPatterns.findIndex(pattern => pattern.id === clicked.row.id);
            let newValue = 'selected';
            if (index < 0) {
                // pattern was not previously selected; select it
                this.selectedPatterns.push(clicked.row);
            } else {
                // remove the pattern from our selection list
                newValue = 'inactive';
                this.selectedPatterns.splice(index, 1);
            }
            this.attackPatterns[clicked.row.title].value = newValue;
            this.view['heatMapView'].updateCells();
        }
    }

    /**
     * @description retrieve the list of selected attack pattern names
     */
    public close(): string[] {
        return Array.from(new Set(this.selectedPatterns.map(pattern => pattern.id)));
    }
  
}
