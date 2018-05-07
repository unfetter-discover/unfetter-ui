import { Injectable, Output, EventEmitter } from '@angular/core';
import { Tactic } from '../tactics.model';

export interface TooltipEvent {
    type?: 'hover' | 'click',
    tactic?: any,
    event?: UIEvent,
}

/**
 * This service allows a tactics view to fire an event that a tooltip should be shown or removed.
 */
@Injectable()
export class TacticsTooltipService {

    /**
     * Passes the event to the tooltip component, or anyone else who needs notification.
     */
    @Output() tooltip: EventEmitter<TooltipEvent> = new EventEmitter();

    constructor() {}

    /**
     * @description Alert that a tactic was hovered over, and that a tooltip needs to be displayed for it.
     */
    public onHover(event?: TooltipEvent) {
        this.tooltip.emit({...event, type: 'hover'});
    }

    /**
     * @description Alert that a tactic was clicked on, and that a modal tooltip needs to be displayed for it.
     */
    public onClick(event: TooltipEvent) {
        this.tooltip.emit({...event, type: 'click'});
    }

}
