import {
    Component,
    OnInit,
    OnDestroy,
    Output,
    ViewChild,
    ElementRef,
    TemplateRef,
    ViewContainerRef,
    Renderer2,
    EventEmitter,
} from '@angular/core';

import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { Tactic } from '../tactics.model';
import { TacticsTooltipService, TooltipEvent } from './tactics-tooltip.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'tactics-tooltip',
    templateUrl: './tactics-tooltip.component.html',
    styleUrls: ['./tactics-tooltip.component.scss']
})
export class TacticsTooltipComponent implements OnInit, OnDestroy {

    /**
     * @description Common tooltip component across the views.
     * @todo refactor this into its own component?
     */
    @ViewChild('tacticTooltipTemplate') tooltipTemplate: TemplateRef<any>;

    /**
     * @description if you want to override the hover event behavior, listen for events
     */
    @Output() public hover: EventEmitter<TooltipEvent> = new EventEmitter();

    /**
     * @description if you want to override the click event behavior, listen for events
     */
    @Output() public click: EventEmitter<TooltipEvent> = new EventEmitter();

    private tooltipTarget: Tactic;
    private backdropped: boolean = false;

    private overlayRef: OverlayRef;
    private portal: TemplatePortal<any>;

    private tooltip$: Subscription = null;

    constructor(
        private tooltips: TacticsTooltipService,
        private authService: AuthService,
        private overlay: Overlay,
        private renderer: Renderer2,
        private vcr: ViewContainerRef,
    ) {}

    /**
     * @description 
     */
    ngOnInit() {
        this.tooltip$ = this.tooltips.tooltip
            .subscribe(
                (event: TooltipEvent) => {
                    if (event && event.type && this[event.type].observers.length) {
                        if (!event.observed) {
                            event.observed = true;
                            this.hover.emit(event);
                        }
                    } else {
                        this.handleTacticTooltip(event);
                    }
                },
                (err) => console.log(`(${new Date().toISOString()}) bad tooltip event`, err),
            );
    }

    /**
     * @description 
     */
    ngOnDestroy() {
        if (this.tooltip$) {
            this.tooltip$.unsubscribe();
        }
    }

    /**
     * @description Handle hovering over the an attack pattern in the heatmap.
     */
    public handleTacticTooltip(event: TooltipEvent) {
        if (this.backdropped && (event.type !== 'click')) {
            return;
        }
        if (!event || !event.data || !event.data.id) {
            if (event && event.source) {
                this.hideTacticTooltip(this.tooltipTarget);
            }
        } else {
            this.showTacticTooltip(event.data, event.source, event.type !== 'click');
        }
    }

    /**
     * @description
     */
    public showTacticTooltip(tactic?: Tactic, event?: UIEvent, asTooltip: boolean = true): void {
        if (tactic && this.tooltipTarget && (tactic.id === this.tooltipTarget.id)) {
            if (this.backdropped || asTooltip) {
                return;
            }
        }

        this.tooltipTarget = tactic;
        this.backdropped = !asTooltip;

        if (!this.overlayRef) {
            const elem = new ElementRef(event.target);

            const positionStrategy = this.overlay.position()
                .connectedTo(elem, {originX: 'center', originY: 'bottom'}, {overlayX: 'start', overlayY: 'top'})
                .withFallbackPosition({originX: 'center', originY: 'top'}, {overlayX: 'start', overlayY: 'bottom'})
                .withFallbackPosition({originX: 'center', originY: 'bottom'}, {overlayX: 'end', overlayY: 'top'})
                .withFallbackPosition({originX: 'center', originY: 'bottom'}, {overlayX: 'end', overlayY: 'bottom'});

            this.overlayRef = this.overlay.create({
                minWidth: 300,
                maxWidth: 500,
                hasBackdrop: this.backdropped,
                positionStrategy,
                scrollStrategy: this.overlay.scrollStrategies.reposition()
            });

            const sub$ = this.overlayRef.backdropClick().subscribe(
                () => this.hideTacticTooltip(this.tooltipTarget),
                (err) => console.log(`${new Date().toISOString()} Error using tooltip: ${err}`),
                () => sub$.unsubscribe());

            this.portal = new TemplatePortal(this.tooltipTemplate, this.vcr);
        } else {
            this.overlayRef.detach();
            this.overlayRef.getConfig().hasBackdrop = this.backdropped;
        }

        this.overlayRef.attach(this.portal);
    }

    /**
     * @description
     */
    public hideTacticTooltip(tactic: Tactic): void {
        if (!tactic || !this.tooltipTarget || (tactic.id !== this.tooltipTarget.id)) {
            return;
        }
        this.backdropped = false;
        this.tooltipTarget = null;
        this.overlayRef.detach();
        this.overlayRef.dispose();
        this.overlayRef = null;
    }

    /**
     * @description
     */
    public getAnalyticNames(tactic: Tactic): string {
        return tactic.analytics ? tactic.analytics.map(is => is.name).join(', ') : '';
    }

    /**
     * @description
     */
    public isAdminUser(): boolean {
        return this.authService.isAdmin();
    }

}
