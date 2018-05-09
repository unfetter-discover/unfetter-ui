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

import {
    TacticsHeatmapComponent
} from '../../global/components/tactics-pane/tactics-heatmap/tactics-heatmap.component';
import { HeatmapOptions } from '../../global/components/heatmap/heatmap.data';
import { IndicatorSharingFeatureState } from '../store/indicator-sharing.reducers';
import { Constance } from '../../utils/constance';
import { TooltipEvent } from '../../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.service';

@Component({
    selector: 'indicator-heatmap-filter',
    templateUrl: './indicator-heatmap-filter.component.html',
    styleUrls: ['./indicator-heatmap-filter.component.scss'],
})
export class IndicatorHeatMapFilterComponent implements AfterViewInit {

    @ViewChild('heatmapView') private heatmap: TacticsHeatmapComponent;
    @Input() heatmapOptions: HeatmapOptions = {
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
            cells: {
                showText: true,
            },
        },
        zoom: {
            cellTitleExtent: 1,
        },
    }

    public attackPatterns = [];
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
        public store: Store<IndicatorSharingFeatureState>,
    ) { }

    ngAfterViewInit() {
        // NOTE This is a hack to get the modal to start to render before the data is processed, 
        // since there is a noticeable lag time when that occurs
        requestAnimationFrame(() => {
            const getAttackPatterns$ = this.store
                .select('indicatorSharing')
                .pluck('attackPatterns')
                .take(1)
                .finally(() => getAttackPatterns$ && getAttackPatterns$.unsubscribe())
                .subscribe(
                    (attackPatterns: any[]) => {
                        const tactics = attackPatterns.reduce(
                            (patterns, pattern) => this.collectAttackPattern(patterns, pattern), {});
                        this.attackPatterns = Object.values(tactics);
                        console.log('preselects?', this.attackPatterns);
                        this.heatmap.view.redraw();
                        // this.heatmap.view.click.subscribe((event) => this.toggleAttackPattern(event));
                        setTimeout(() => this.heatmap.view.ngDoCheck(), 500);
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
                adds: {
                    highlights: [{color: {style: selected ? 'selected' : 'inactive'}}],
                },
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
    public toggleAttackPattern(clicked?: TooltipEvent) {
        if (clicked && clicked.data) {
            const index = this.selectedPatterns.findIndex(pattern => pattern.id === clicked.data.id);
            let newValue = 'selected';
            if (index < 0) {
                // pattern was not previously selected; select it
                this.selectedPatterns.push(clicked.data);
            } else {
                // remove the pattern from our selection list
                newValue = 'inactive';
                this.selectedPatterns.splice(index, 1);
            }
            const target = this.attackPatterns.find(p => p.name === clicked.data.name);
            console.log('toggling', clicked, index, newValue, target);
            if (target) {
                target.adds.highlights[0].color.style = newValue;
                this.attackPatterns = this.attackPatterns.slice(0);
                this.heatmap.redraw();
            }
        }
    }

    /**
     * @description retrieve the list of selected attack pattern names
     */
    public close(): string[] {
        return Array.from(new Set(this.selectedPatterns.map(pattern => pattern.id)));
    }
  
}
