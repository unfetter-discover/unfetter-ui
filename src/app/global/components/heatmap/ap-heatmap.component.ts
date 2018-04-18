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

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { HeatmapComponent, } from './heatmap.component';
import { HeatBatchData, HeatColor, HeatMapOptions, HeatCellData } from './heatmap.data';
import { AuthService } from '../../../core/services/auth.service';
import { Dictionary } from '../../../models/json/dictionary';

/**
 * @description Common data that can be found on attack patterns displayed in a heatmap cell.
 */
export interface AttackPatternCell extends HeatCellData {
    id: string,
    name: string,
    version?: string,
    created?: Date,
    modified?: Date,
    description: string,
    sophistication_level?: number,
    phases: string[],
    labels?: string[],
    sources?: string[],
    platforms?: string[],
    analytics?: any[],
    references?: any[],
    values?: Array<{name: string, color: string}>,
    color?: string,
}

@Component({
    selector: 'ap-heatmap',
    templateUrl: './ap-heatmap.component.html',
    styleUrls: ['./ap-heatmap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApHeatmapComponent implements OnInit, DoCheck {

    public showHeatMap = false;
    @Input() public attackPatterns: Dictionary<AttackPatternCell> | Array<AttackPatternCell>;
    private previousPatterns: Dictionary<AttackPatternCell> | Array<AttackPatternCell>;
    public heatMapData: Array<HeatBatchData> = [];
    @Input() public heatMapOptions: HeatMapOptions;
    private noColor: HeatColor = {bg: '#ccc', fg: 'black'};
    private baseHeats: Dictionary<HeatColor> = null;
    @ViewChild(HeatmapComponent) private heatMapView: HeatmapComponent;

    @ViewChild('apTooltipTemplate') apTooltipTemplate: TemplateRef<any>;
    public hoverTooltip = true;
    private tooltipBackdropped = false;
    private tooltipTarget: any;
    private tooltipOverlay: OverlayRef;
    private tooltipPortal: TemplatePortal<any>;
    @Output() public hover = new EventEmitter<{row: HeatCellData, event?: UIEvent}>();
    @Output() public click = new EventEmitter<{row: HeatCellData, event?: UIEvent}>();

    constructor(
        private authService: AuthService,
        private overlay: Overlay,
        private vcr: ViewContainerRef,
        private renderer: Renderer2,
        private changeDetector: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        if (!this.heatMapOptions) {
            this.heatMapOptions = {};
        }
        if (!this.heatMapOptions.color) {
            this.heatMapOptions.color = {};
        }
        this.createAttackPatternHeatMap();
        this.previousPatterns = this.attackPatterns;
        this.showHeatMap = (this.attackPatterns && (Object.keys(this.attackPatterns).length > 0));
    }

    ngDoCheck() {
        if (this.previousPatterns !== this.attackPatterns) {
            this.changeDetector.markForCheck();
            this.createAttackPatternHeatMap();
            this.previousPatterns = this.attackPatterns;
            this.showHeatMap = (this.attackPatterns && (Object.keys(this.attackPatterns).length > 0));
        }
    }

    /**
     * @description Create a heatmap chart of all the tactics. This looks like a version of the carousel, but shrunken
     *              in order to fit within the viewport.
     */
    private createAttackPatternHeatMap() {
        if (!this.baseHeats) {
            if (this.heatMapView && this.heatMapView.options && this.heatMapView.options.color) {
                this.baseHeats = this.heatMapView.options.color.heatColors;
            }
            if (!this.baseHeats) {
                this.baseHeats = this.heatMapView['defaultOptions'].color.heatColors;
            }
        }

        const heats = Object.assign({}, this.baseHeats);
        const data: Dictionary<HeatBatchData> = {};
        const patterns = Array.isArray(this.attackPatterns) ? this.attackPatterns : Object.values(this.attackPatterns);
        patterns.forEach(pattern => {
            if (pattern.id && pattern.name && pattern.phases && pattern.phases.length) {
                let value = pattern.value || 'false', heat = null;
                if (pattern.values && pattern.values.length) {
                    value = pattern.values.map(v => v.name.toLowerCase()).join('-');
                    heat = pattern.values.map(v => v.color);
                    if (!heats[value]) {
                        heats[value] = {
                            bg: heat,
                            fg: pattern.color || 'black'
                        };
                    }
                }
                pattern.title = pattern.name;
                pattern.value = value.toString();
                pattern.phases.forEach(phase => {
                    if (phase) {
                        let batch = data[phase];
                        if (!batch) {
                            batch = data[phase] = {
                                title: this.normalizePhaseName(phase),
                                value: null,
                                cells: []
                            };
                        }
                        batch.cells.push(pattern);
                    }
                });
            }
        });

        const sorted = Object.values(data).sort((batch1, batch2) => batch1.title.localeCompare(batch2.title));
        sorted.forEach(batch => batch.cells.sort((cell1, cell2) => cell1.title.localeCompare(cell2.title)));
        this.heatMapData = sorted;
        if (this.heatMapView && this.heatMapView.options && this.heatMapView.options.color) {
            this.heatMapView.options.color.heatColors = heats;
        }
    }

    private normalizePhaseName(phase: string): string {
        return phase
            .replace(/\-/g, ' ')
            .split(/\s+/)
            .map(w => w[0].toUpperCase() + w.slice(1))
            .join(' ')
            .replace(/\sAnd\s/g, ' and ')
            ;
    }

    /**
     * @description Handle hovering over the an attack pattern in the heatmap.
     */
    public onHover(selection: any, hover: boolean = false) {
        if (this.tooltipBackdropped) {
            return;
        }
        if (!selection || !selection.row) {
            this.hideAttackPatternTooltip(this.tooltipTarget);
        } else {
            selection.attackPattern = Object.values(this.attackPatterns).find(ptn => ptn.name === selection.row.title);
            if (!selection.attackPattern) {
                this.hideAttackPatternTooltip(this.tooltipTarget);
            } else {
                if (hover === false) {
                    this.hideAttackPatternTooltip(this.tooltipTarget);
                }
                this.showAttackPatternTooltip(selection.attackPattern, selection.event, hover);
                this.hover.emit(selection);
            }
        }
    }

    /**
     * @description Handle clicking on an attack pattern in the heatmap.
     */
    public onClick(selection: any) {
        if (this.click.observers.length) {
            this.click.emit(selection);
        } else {
            this.onHover(selection, false);
        }
    }

    /**
     * @description Order a tooltip to be drawn, possibly as a modal, for a given attack pattern.
     */
    public showAttackPatternTooltip(tactic: any, event: UIEvent, hover: boolean = false): void {
        if (tactic && this.tooltipTarget && (this.tooltipTarget.id === tactic.id)) {
            return;
        }

        this.tooltipTarget = tactic;
        this.hoverTooltip = hover;

        if (!this.tooltipOverlay) {
            const elem = new ElementRef(event.target);

            const positionStrategy = this.overlay.position()
                .connectedTo(elem, {originX: 'center', originY: 'bottom'}, {overlayX: 'start', overlayY: 'top'})
                .withFallbackPosition({originX: 'center', originY: 'top'}, {overlayX: 'start', overlayY: 'bottom'})
                .withFallbackPosition({originX: 'center', originY: 'bottom'}, {overlayX: 'end', overlayY: 'top'})
                .withFallbackPosition({originX: 'center', originY: 'bottom'}, {overlayX: 'end', overlayY: 'bottom'});

            this.tooltipOverlay = this.overlay.create({
                minWidth: 300,
                maxWidth: 500,
                hasBackdrop: !hover,
                positionStrategy,
                scrollStrategy: this.overlay.scrollStrategies.reposition()
            });

            const sub$ = this.tooltipOverlay.backdropClick().subscribe(
                () => this.hideAttackPatternTooltip(this.tooltipTarget),
                (err) => console.log(new Date().toISOString(), err),
                () => sub$.unsubscribe());

            this.tooltipPortal = new TemplatePortal(this.apTooltipTemplate, this.vcr);
            this.tooltipBackdropped = !hover;
        } else {
            this.tooltipOverlay.detach();
            this.tooltipOverlay.getConfig().hasBackdrop = !hover;
        }

        this.tooltipOverlay.attach(this.tooltipPortal);
    }

    /**
     * @description Remove the tooltip display from the heatmap.
     */
    public hideAttackPatternTooltip(attackPattern: any, event?: UIEvent): void {
        if (!attackPattern || !this.tooltipTarget || (this.tooltipTarget.name !== attackPattern.name)) {
            return;
        }
        this.tooltipBackdropped = false;
        this.tooltipTarget = null;
        this.tooltipOverlay.detach();
        this.tooltipOverlay.dispose();
        this.tooltipOverlay = null;
        this.hover.emit(null);
    }

    public getAnalyticNames(attackPattern: AttackPatternCell): string {
        return attackPattern.analytics.map(is => is.name).join(', ');
    }

    public isAdminUser(): boolean {
        return this.authService.isAdmin();
    }

}
