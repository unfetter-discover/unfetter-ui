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

import { HeatmapComponent, } from './heatmap.component';
import { HeatBatchData, HeatColor, HeatmapOptions, HeatCellData, DEFAULT_OPTIONS } from './heatmap.data';
import { AuthService } from '../../../core/services/auth.service';
import { Dictionary } from '../../../models/json/dictionary';
import { AppState } from '../../../root-store/app.reducers';
import { UserProfile } from '../../../models/user/user-profile';

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
    framework: string,
    phases: string[],
    labels?: string[],
    sources?: string[],
    platforms?: string[],
    analytics?: any[],
    references?: any[],
    values?: Array<{name: string, color: string}>,
    text?: string, // the foreground, or text, color of an attack pattern cell
}

interface Framework {
    name: string,
    phases: string[],
}

@Component({
    selector: 'attack-patterns-heatmap',
    templateUrl: './attack-patterns-heatmap.component.html',
    styleUrls: ['./attack-patterns-heatmap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttackPatternsHeatmapComponent implements OnInit, DoCheck {

    public showHeatMap = false;
    @Input() public attackPatterns: Dictionary<AttackPatternCell> | Array<AttackPatternCell>;
    private previousPatterns: Dictionary<AttackPatternCell> | Array<AttackPatternCell>;
    public heatMapData: Array<HeatBatchData> = [];
    private frameworkPhases: Array<any>;
    @Input() public options: HeatmapOptions;
    private noColor: HeatColor = {bg: '#ccc', fg: 'black'};
    private baseHeats: Dictionary<HeatColor> = null;
    @ViewChild(HeatmapComponent) private heatMapView: HeatmapComponent;

    @ViewChild('apTooltipTemplate') apTooltipTemplate: TemplateRef<any>;
    public hoverTooltip = true;
    private tooltipBackdropped = false;
    public tooltipTarget: any;
    private tooltipOverlay: OverlayRef;
    private tooltipPortal: TemplatePortal<any>;
    @Output() public hover = new EventEmitter<{row: HeatCellData, event?: UIEvent}>();
    @Output() public click = new EventEmitter<{row: HeatCellData, event?: UIEvent}>();

    public user: UserProfile;

    constructor(
        private appStore: Store<AppState>, 
        private authService: AuthService,
        private overlay: Overlay,
        private vcr: ViewContainerRef,
        private renderer: Renderer2,
        private changeDetector: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        if (!this.options) {
            this.options = {};
        }
        if (!this.options.color) {
            this.options.color = {};
        }

        const getUser$ = this.appStore
            .select('users')
            .pluck('userProfile')
            .take(1);
        const getConfig$ = this.appStore
            .select('config')
            .pluck('configurations')
            .take(1);
        const getData$ = Observable.forkJoin(getUser$, getConfig$)
            .finally(() => {
                if (getData$) {
                    getData$.unsubscribe();
                }
                this.createAttackPatternHeatMap();
                this.previousPatterns = this.attackPatterns;
                this.showHeatMap = (this.attackPatterns && (Object.keys(this.attackPatterns).length > 0));
            })
            .subscribe(
                (res: [UserProfile, any]) => {
                    this.user = res[0];
                    this.frameworkPhases = res[1].killChains
                        .find(kc => kc.name === this.user.preferences.killchain).phase_names;
                },
                (err) => console.log(new Date().toISOString(), err),
            );
    }

    ngDoCheck() {
        if (this.previousPatterns !== this.attackPatterns) {
            this.changeDetector.markForCheck();
            this.createAttackPatternHeatMap();
            this.previousPatterns = this.attackPatterns;
            this.showHeatMap = (this.attackPatterns && (Object.keys(this.attackPatterns).length > 0));
        }
    }

    get heatmap(): HeatmapComponent {
        return this.heatMapView;
    }

    /**
     * @description Create a heatmap chart of all the tactics. This looks like a version of the carousel, but shrunken
     *              in order to fit within the viewport.
     */
    public createAttackPatternHeatMap() {
        if (!this.baseHeats) {
            if (this.options && this.options.color && this.options.color.heatColors) {
                this.baseHeats = this.options.color.heatColors;
            } else if (this.heatMapView && this.heatMapView.options && this.heatMapView.options.color) {
                this.baseHeats = this.heatMapView.options.color.heatColors;
            }
            if (!this.baseHeats) {
                this.baseHeats = DEFAULT_OPTIONS.color.heatColors;
            }
        }

        const heats = Object.assign({}, this.baseHeats);
        const data: Dictionary<HeatBatchData> = {};
        const patterns = Array.isArray(this.attackPatterns) ? this.attackPatterns : Object.values(this.attackPatterns);
        if (patterns && patterns.length && this.frameworkPhases) {
            this.frameworkPhases.forEach(phase => data[phase] = {
                title: this.normalizePhaseName(phase),
                value: null,
                cells: []
            });
        }

        patterns.forEach(pattern => {
            if (pattern.id && pattern.name && pattern.phases && pattern.phases.length) {
                let value = pattern.value || 'false', heat = null;
                if (pattern.values && pattern.values.length) {
                    value = pattern.values.map(v => v.name.toLowerCase()).join('-');
                    heat = pattern.values.map(v => v.color);
                    if (!heats[value]) {
                        heats[value] = {
                            bg: heat,
                            fg: pattern.text || 'black'
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

        if (!this.frameworkPhases) {
            const sorted = Object.values(data).sort((batch1, batch2) => batch1.title.localeCompare(batch2.title));
            sorted.forEach(batch => batch.cells.sort((cell1, cell2) => cell1.title.localeCompare(cell2.title)));
            this.heatMapData = sorted;
        } else {
            this.heatMapData = Object.values(data);
        }
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
