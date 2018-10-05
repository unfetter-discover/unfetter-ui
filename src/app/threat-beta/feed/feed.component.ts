import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { pluck, map, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Report } from 'stix';
import { ThreatBoard } from 'stix/unfetter';

import { ThreatFeatureState } from '../store/threat.reducers';
import { getSelectedBoard } from '../store/threat.selectors';
import * as fromThreat from '../store/threat.actions';

@Component({
    selector: 'feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

    public threatBoard: ThreatBoard;
    private _boardLoaded = false;

    public reports = {};
    private _reportsLoaded = false;

    public boards = {};
    private _boardsLoaded = false;

    constructor(
        private store: Store<ThreatFeatureState>,
        private sanitizer: DomSanitizer,
    ) {
    }

    public get boardLoaded() { return this._boardLoaded; }

    public get reportsLoaded() { return this._reportsLoaded; }

    public get boardsLoaded() { return this._boardsLoaded; }

    ngOnInit() {
        this.store.select(getSelectedBoard)
            .subscribe(
                (board) => {
                    console.log('retrieved threat board:', board);
                    this.threatBoard = board;
                    this._boardLoaded = true;

                    this.store.select('threat')
                        .pipe(
                            pluck('boardList'),
                            filter((b: any) => b.id !== board.id)
                        )
                        .subscribe(
                            (boards) => {
                                console.log(`(${new Date().toISOString()}) board list`, boards);
                                this.boards = boards;
                                this._boardsLoaded = true;
                            },
                            (err) => console.log(`(${new Date().toISOString()}) Error loading boards:`, err)
                        );

                    this.store.select('threat')
                        .pipe(
                            pluck('attachedReports')
                        )
                        .subscribe(
                            (reports) => {
                                this.reports = reports;
                                this._reportsLoaded = true;
                            },
                            (err) => console.log(`(${new Date().toISOString()}) Error loading reports:`, err)
                        );
                },
                (err) => console.log(`(${new Date().toISOString()}) Error loading threat board:`, err)
            )
    }

    public getReportBackground(report: any) {
        const colors = [
            ['darkred', 'rosybrown'],
            ['lightblue', 'darkblue'],
            ['lightgreen', 'darkgreen'],
            ['orchid', 'darkorchid'],
            ['palevioletred', 'mediumvioletred'],
        ];
        const n = report.name.charCodeAt(0) % colors.length;
        return `linear-gradient(${colors[n][0]}, ${colors[n][1]})`;
    }

    public getReportBackgroundImage(report: any) {
        return this.sanitizer.bypassSecurityTrustStyle(
                `url(${report.metaProperties.image}), linear-gradient(transparent, transparent)`);
    }

    public getBoardBackground(board: any) {
        const colors = [
            ['slateblue'],
            ['brown'],
            ['forestgreen'],
            ['deeppurple'],
        ];
        const n = board.name.charCodeAt(0) % colors.length;
        return colors[n];
    }

}
