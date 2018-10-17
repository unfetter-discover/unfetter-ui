import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, forkJoin } from 'rxjs';
import { pluck, map, filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Report } from 'stix';
import { ThreatBoard } from 'stix/unfetter/index';

import { ThreatFeatureState } from '../store/threat.reducers';
import { getSelectedBoard, getThreatBoardReports } from '../store/threat.selectors';
import * as fromThreat from '../store/threat.actions';
import { AppState } from '../../root-store/app.reducers';

@Component({
    selector: 'feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

    public threatBoard: ThreatBoard;

    private _threatboardLoaded = false;

    constructor(
        private boardStore: Store<ThreatFeatureState>,
    ) {
    }

    public get threatboardLoaded() { return this._threatboardLoaded; }

    ngOnInit() {
        this.boardStore.select(getSelectedBoard)
            .subscribe(
                (board) => {
                    console.log(`(${new Date().toISOString()}) retrieved threat board:`, board);
                    this.threatBoard = board;
                    this._threatboardLoaded = true;
                },
                (err) => console.log(`(${new Date().toISOString()}) Error loading threat board:`, err)
            )
    }

    public get boardUpdateTime() {
        return new Date(this.threatBoard.modified).toUTCString();
    }

    // TODO apply search filter

}
