import { Injectable, Output, EventEmitter } from '@angular/core';

import { MatButtonToggleChange } from '@angular/material';

/**
 * This service allows any controls in the tactics pane's header to communicate to the view component in the tactics
 * pane body, and vice versa.
 * 
 * For example, the carousel has filter buttons in the header that would modify the displayed view. And likewise, the
 * view will show so many pages, so once the view is rendered, it needs to let the header's page-select know how many
 * pages the user can scroll around to.
 */
@Injectable()
export class TacticsControlService {

    /**
     * 
     */
    public state: any = {};

    /**
     * 
     */
    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor(
    ) {
    }

    /**
     * @description 
     */
    public onChange(event: any) {
        if (event) {
            this.change.emit(event);
        }
    }

}
