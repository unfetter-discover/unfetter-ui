import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    TemplateRef,
    ViewContainerRef,
    Renderer2,
    Output,
    EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButtonToggleChange, MatToolbar } from '@angular/material';

import { TacticChain, Tactic } from './tactics.model';
import { TacticsCarouselComponent } from './tactics-carousel/tactics-carousel.component';
import { TacticsHeatmapComponent } from './tactics-heatmap/tactics-heatmap.component';
import { TacticsTreemapComponent } from './tactics-treemap/tactics-treemap.component';
import { TacticsTooltipComponent } from './tactics-tooltip/tactics-tooltip.component';
import { TooltipEvent } from './tactics-tooltip/tactics-tooltip.service';
import { CarouselOptions } from './tactics-carousel/carousel.data';
import { HeatmapOptions } from '../heatmap/heatmap.data';
import { TreemapOptions } from '../treemap/treemap.data';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import { AttackPattern } from '../../../models/attack-pattern';
import { Dictionary } from '../../../models/json/dictionary';
import { UserProfile } from '../../../models/user/user-profile';
import { AppState } from '../../../root-store/app.reducers';
import { Constance } from '../../../utils/constance';

@Component({
    selector: 'tactics-pane',
    templateUrl: './tactics-pane.component.html',
    styleUrls: ['./tactics-pane.component.scss']
})
export class TacticsPaneComponent implements OnInit {

    /**
     * The relevant frameworks for the patterns to display. If not provided, will attempt to derive it from the
     * preselected attack patterns provided in the tactics property. If no tactics are provided, will default
     * to the current user's preferred framework.
     * 
     * To put this simply: If you are presenting this component in a dashboard that presents data that was provided
     * to the dashboard itself, say, some published artifact, you should be providing the framework that was used to
     * create that data. If it is something the user is creating, say a new STIX object, then provide the user's
     * preferred framework.
     * 
     * On another note, displaying more than one framework is discouraged, especially with respect to the heatmap.
     * Frameworks have several phases, and each phase can have dozens of attack patterns, so the display of that
     * much data does not view well.
     */
    @Input() public frameworks: string[] = [];

    /*
     * These input values are only the "preselected" attack patterns. If there is nothing preselected, it is perfectly
     * okay to not provide this input.
     */
    @Input() public targeted: Tactic[] = [];

    /**
     * Title to display in the component's header.
     */
    @Input() public title: string = 'Tactics Used';

    /**
     * The starting view in the pane. Defaults to the heatmap.
     * @todo We may want to make this a preference some day?
     */
    @Input() public view: 'heatmap' | 'treemap' | 'carousel' = 'heatmap';

    /**
     * What style settings to use.
     */
    @Input() public theme: string = 'theme-bg-primary theme-color-primary';

    /**
     * The heatmap options object here makes it easier for those using this component to supply option without having
     * to do something weird to drill down into the component.
     */
    @ViewChild('heatmap') private heatmap: TacticsHeatmapComponent;
    @Input() public heatmapOptions: HeatmapOptions = {
        text: {
            cells: {
                showText: true,
            },
        },
        zoom: {
            cellTitleExtent: 2,
        },
    };

    /**
     * View options that will be propagated to the treemap, to override the default settings if you wish.
     */
    @ViewChild('treemap') private treemap: TacticsTreemapComponent;
    @Input() public treemapOptions = new TreemapOptions();

    /**
     * View options that will be propagated to the carousel, again, for overriding, as needed.
     */
    @ViewChild('carousel') private carousel: TacticsCarouselComponent;
    @Input() public carouselOptions: CarouselOptions = new CarouselOptions();

    /**
     * Displays tooltips for the tactics.
     */
    @ViewChild('tooltips') public tooltips: TacticsTooltipComponent;

    /**
     * Ability to override default hover behavior on attack patterns.
     */
    @Output() public hover: EventEmitter<TooltipEvent> = new EventEmitter();

    /**
     * Ability to override default click behavior on attack patterns.
     */
    @Output() public click: EventEmitter<TooltipEvent> = new EventEmitter();

    /**
     * @description
     */
    constructor(
    ) {}

    /**
     * @description
     */
    ngOnInit() {
        this.treemapOptions.headerHeight = 20;
    }

    /**
     * @description
     */
    public isHeatmapView(): boolean {
        return this.view === 'heatmap';
    }

    /**
     * @description
     */
    public isTreemapView(): boolean {
        return this.view === 'treemap';
    }

    /**
     * @description
     */
    public isCarouselView(): boolean {
        return this.view === 'carousel';
    }

    /**
     * @description
     */
    public onViewChange(ev?: MatButtonToggleChange) {
        if (ev && ev.value) {
            this.view = ev.value;
            if (ev.value === 'heatmap') {
                requestAnimationFrame(() => this.heatmap.ngDoCheck());
            }
        }
    }

    /**
     * @description
     */
    public onHover(event?: TooltipEvent) {
        if (event && (event.type === 'hover') && this.hover.observers.length) {
            this.hover.emit(event);
        } else {
            this.tooltips.handleTacticTooltip(event);
        }
    }

    /**
     * @description
     */
    public onClick(event?: TooltipEvent) {
        if (event && (event.type === 'click') && this.click.observers.length) {
            this.hover.emit(event);
        } else {
            this.tooltips.handleTacticTooltip(event);
        }
    }

}
