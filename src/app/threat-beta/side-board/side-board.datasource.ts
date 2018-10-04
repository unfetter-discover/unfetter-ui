
import { merge as observableMerge, Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap, pluck } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { Store } from '@ngrx/store';
import { CollectionViewer } from '@angular/cdk/collections';

import { ThreatBoard } from 'stix/unfetter/';
import { ThreatFeatureState } from '../store/threat.reducers';

export class SideBoardDataSource extends DataSource<ThreatBoard> {
    protected filterChange = new BehaviorSubject('');
    protected dataChange = new BehaviorSubject(undefined);

    constructor(protected store: Store<ThreatFeatureState>) {
        super();
    }

    /**
     * @description connect interface for datasource, listens to filter events and fetch/filters data accordingly
     * @param {CollectionViewer} collectionViewer
     * @returns {Observable<ThreatBoard[]>}
     */
    public connect(collectionViewer: CollectionViewer): Observable<ThreatBoard[]> {
        const arr = [this.filterChange, this.dataChange];
        return observableMerge(...arr)
            .pipe(
                switchMap(() => {
                    const val = this.filterChange.getValue();
                    const filterVal = val.trim().toLowerCase() || '';

                    return this.store.select('threat')
                        .pipe(
                            pluck('boardList'),
                            map((boardList: ThreatBoard[]) => {
                                if (filterVal) {
                                    return boardList.filter((board) => board.name.toLowerCase().indexOf(filterVal) > -1);
                                } else {
                                    return boardList;
                                }
                            })
                        );
                })
            );
    }

    /**
     * @description disconnect interface for datasource
     * @param {CollectionViewer} collectionViewer
     */
    public disconnect(collectionViewer: CollectionViewer): void {
        console.log('disconnect from datasource');
    }

    /**
     * @description trigger a filter event
     */
    public nextFilter(filter?: string): void {
        filter = filter || '';
        filter = filter.trim();
        this.filterChange.next(filter);
    }

    /**
     * @description trigger a data change event
     */
    public nextDataChange(event: any): void {
        this.dataChange.next(undefined);
    }
}
