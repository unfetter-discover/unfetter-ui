import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ThreatBoard } from 'stix/unfetter/index';

import { FeedCarouselComponent } from '../../feed-carousel/feed-carousel.component';
import { UserCitationService } from '../user-citations.service';
import { ThreatFeatureState } from '../../store/threat.reducers';

/**
 * Displays related boards to the given threatboard in a carousel.
 */
@Component({
    selector: 'related-boards',
    templateUrl: './related-boards.component.html',
    styleUrls: ['./related-boards.component.scss']
})
export class RelatedBoardsComponent implements OnChanges {

    @Input() threatBoard: ThreatBoard;

    /**
     * The loaded list of related threatboards.
     */
    private _boards = [];

    private _loaded = false;

    @ViewChild('carousel') carousel: FeedCarouselComponent;

    constructor(
        private boardStore: Store<ThreatFeatureState>,
        private citations: UserCitationService,
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.threatBoard) {
            this.loadBoards();
        }
    }

    /**
     * Load all threatboards, weeding out the one the user is currently viewing.
     */
    private loadBoards() {
        this.boardStore.select('threat')
            .pipe(
                pluck('boardList')
            )
            .subscribe(
                (boards: any[]) => {
                    this._boards = boards.filter(b => b.id !== this.threatBoard.id);
                    console['debug'](`(${new Date().toISOString()}) board list`, this._boards);
                    this.carousel.calculateWindow();
                    this._loaded = true;
                },
                (err) => console.log(`(${new Date().toISOString()}) Error loading boards:`, err)
            );
    }

    public get boards() { return this._boards; }

    public get loaded() { return this._loaded; }

    public getBoardBackground(board: any) {
        const colors = [
            ['indianred', 'firebrick'],
            ['purple', 'indigo'],
            ['olivedrab', 'olive'],
            ['slateblue', 'darkslateblue'],
            ['cadetblue', 'darkslategray'],
        ];
        const n = board.name.charCodeAt(0) % colors.length;
        return `linear-gradient(${colors[n][0]}, ${colors[n][1]})`;
    }

    public getOwner(board: any) {
        return this.citations.getUserName(board);
    }

    /**
     * The user wishes to "follow" a selected board by its id. There is no definition for what that even means, so this
     * function currently does nothing.
     */
    public followBoard(id: string) {
        console.log(`Request to follow board '${id}' received`);
    }

}
