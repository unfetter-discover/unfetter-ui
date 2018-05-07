import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    TemplateRef,
    Renderer2,
    ViewContainerRef,
    Output,
    EventEmitter,
} from '@angular/core';

import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { Tactic } from '../tactics.model';
import { TacticsTooltipService, TooltipEvent } from './tactics-tooltip.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'tactics-tooltip',
    templateUrl: './tactics-tooltip.component.html',
    styleUrls: ['./tactics-tooltip.component.scss']
})
export class TacticsTooltipComponent implements OnInit {

    /**
     * Common tooltip component across the views.
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
    private isHovering: boolean;

    private overlayRef: OverlayRef;
    private portal: TemplatePortal<any>;

    constructor(
        private tooltips: TacticsTooltipService,
        private authService: AuthService,
        private overlay: Overlay,
        private renderer: Renderer2,
        private vcr: ViewContainerRef,
    ) {}

    ngOnInit() {
        this.tooltips.tooltip
            .subscribe(
                (msg: TooltipEvent) => {
                    if (msg && msg.type && this[msg.type].observers.length) {
                        this.hover.emit(msg);
                    } else if (!msg || !msg.tactic) {
                        this.hideTacticTooltip(null);
                    } else {
                        this.showTacticTooltip(msg.tactic, msg.event, msg.type !== 'click');
                    }
                },
                (err) => console.log(`(${new Date().toISOString()}) bad tooltip event`, err),
            );
    }

    /**
     * @description
     */
    public showTacticTooltip(tactic?: Tactic, event?: UIEvent, asTooltip: boolean = true): void {
        if (tactic && this.tooltipTarget && (tactic.id === this.tooltipTarget.id)) {
            return;
        }

        this.tooltipTarget = tactic;
        this.isHovering = asTooltip;

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
                hasBackdrop: !asTooltip,
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
            this.overlayRef.getConfig().hasBackdrop = !asTooltip;
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
        this.tooltipTarget = null;
        this.overlayRef.detach();
        this.overlayRef.dispose();
        this.overlayRef = null;
    }

    public isAdminUser(): boolean {
        return this.authService.isAdmin();
    }

}
