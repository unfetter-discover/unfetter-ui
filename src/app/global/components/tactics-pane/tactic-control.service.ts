import { Injectable, Output, EventEmitter } from '@angular/core';

import { MatButtonToggleChange } from '@angular/material';

@Injectable()
export class TacticControlService {

    private _filters = {
        rows: false,
        columns: false,
    };

    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor() { }

    get filters() {
        return this._filters;
    }

    public onChange(event: any) {
        if (event) {
            if (event.filters) {
                this._filters = event.filters;
            } else if (event.pager) {
                this.change.emit(event);
            } else if (event.page >= 0) {
                this.change.emit(event);
            }
        }
    }

}
