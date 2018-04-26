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

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Store } from '@ngrx/store';

import { AttackPatternsHeatmapComponent } from '../../../global/components/heatmap/attack-patterns-heatmap.component';
import { HeatMapOptions } from '../../../global/components/heatmap/heatmap.data';
import { GenericApi } from '../../../core/services/genericapi.service';
import { Constance } from '../../../utils/constance';

@Component({
    selector: 'attack-pattern-chooser',
    templateUrl: './attack-pattern-chooser.component.html',
    styleUrls: ['./attack-pattern-chooser.component.scss'],
})
export class AttackPatternChooserComponent implements OnInit, AfterViewInit {

    public attackPatterns = {};
    @Input() public selectedPatterns = [];

    @ViewChild('heatmapView') private view: AttackPatternsHeatmapComponent;
    @Input() heatmapOptions: HeatMapOptions = {
        view: {
            component: '#attack-pattern-filter',
        },
        color: {
            batchColors: [
                {header: {bg: 'white', fg: '#333'}, body: {bg: 'white', fg: 'black'}},
            ],
            heatColors: {
                'inactive': {bg: '#fcfcfc', fg: 'black'},
                'selected': {bg: '.selected', fg: 'black'},
                'active': {bg: '.active', fg: 'black'},
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

    @ViewChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;
    private overlayRef: OverlayRef;
    private portal: TemplatePortal<any>;

    constructor(
        private dialogRef: MatDialogRef<AttackPatternsHeatmapComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private genericApi: GenericApi,
        private overlay: Overlay,
        private vcr: ViewContainerRef,
        private changeDetector: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        this.selectedPatterns = this.data.active || [];
    }
    
    ngAfterViewInit() {
        this.loadAttackPatterns();
    }

    /**
     * @description retrieve the attack patterns and their tactics phases from the backend database
     */
    private loadAttackPatterns() {
        const sort = { 'stix.name': '1' };
        const project = {
            'stix.id': 1,
            'stix.name': 1,
            'stix.description': 1,
            'stix.kill_chain_phases': 1,
            'extendedProperties.x_mitre_data_sources': 1,
            'extendedProperties.x_mitre_platforms': 1,
        };
        const filter = encodeURI(`sort=${JSON.stringify(sort)}&project=${JSON.stringify(project)}`);
        const initData$ = this.genericApi.get(`${Constance.ATTACK_PATTERN_URL}?${filter}`)
            .finally(() => initData$ && initData$.unsubscribe())
            .subscribe(
                (patterns: any[]) => {
                    this.attackPatterns = this.collectAttackPatterns(patterns);
                    this.view['heatMapView'].forceUpdate();
                    setTimeout(() => {
                        this.view['heatMapView'].ngDoCheck();
                        const selects = this.selectedPatterns
                            .map(pattern => Object.values(this.attackPatterns).find((ap: any) => ap.id === pattern));
                        this.selectedPatterns = [];
                        selects.forEach(pattern => this.toggleAttackPattern({row: pattern}));
                    }, 350);
                },
                (err) => console.log(new Date().toISOString(), err),
            );
    }

    /**
     * @description Build a list of all the attack patterns.
     */
    private collectAttackPatterns(patterns: any[]): any {
        const attackPatterns = {};
        patterns.forEach((pattern) => {
            const name = pattern.attributes.name;
            if (name) {
                attackPatterns[name] = Object.assign({}, {
                    id: pattern.attributes.id,
                    name: name,
                    title: name,
                    description: pattern.attributes.description,
                    phases: (pattern.attributes.kill_chain_phases || []).map(p => p.phase_name),
                    sources: pattern.attributes.x_mitre_data_sources,
                    platforms: pattern.attributes.x_mitre_platforms,
                    value: 'inactive',
                });
            }
        });
        return attackPatterns;
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
            const ap = this.attackPatterns[clicked.row.title];
            if (ap) {
                ap.value = newValue;
                this.view['heatMapView'].heatmap.workspace.data.forEach(batch => {
                    batch.value = batch.cells.some(cell => cell.value === 'selected') ? 'active' : null;
                });
                this.view['heatMapView'].updateCells();
            }
        }
    }

    /**
     * @description Remove all selections
     */
    public clearSelections() {
        this.selectedPatterns.slice(0).forEach(pattern => this.toggleAttackPattern({row: pattern}));
    }

    /**
     * @description retrieve the list of selected attack pattern names
     */
    public onClose(): string[] {
        return Array.from(new Set(this.selectedPatterns.map(pattern => pattern.id)));
    }
  
}
