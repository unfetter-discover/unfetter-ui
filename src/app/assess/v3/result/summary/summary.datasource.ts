
import {merge as observableMerge,  BehaviorSubject ,  Observable } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { catchError ,  map ,  switchMap } from 'rxjs/operators';
import { LastModifiedAssessment } from '../../models/last-modified-assessment';
import { AssessService } from '../../services/assess.service';

/**
 * @description handles filter events from the UI sent to the datasource, in this case a service call
 */
export class SummaryDataSource extends DataSource<Partial<LastModifiedAssessment>> {
    protected filterChange = new BehaviorSubject('');
    protected dataChange = new BehaviorSubject(undefined);

    constructor(protected assessService: AssessService) {
        super();
    }

    /**
     * @description connect interface for datasource, listens to filter events and fetch/filters data accordingly
     * @param collectionViewer
     * @returns {Observable<Partial<LastModifiedAssessment>[]>}
     */
    public connect(collectionViewer: CollectionViewer): Observable<Partial<LastModifiedAssessment>[]> {
        const arr = [this.filterChange, this.dataChange];
        return observableMerge(...arr)
            .pipe(
                switchMap(() => {
                    const val = this.filterChange.getValue() || '';
                    const filterVal = val.trim().toLowerCase() || '';
                    const assessments$ = this.assessService.getLatestAssessments(); // .let(this.dedupByRollupId);
                    if (!filterVal || filterVal.length === 0) {
                        return assessments$;
                    }

                    return assessments$.pipe(
                        map((el) => {
                            return el.filter((_) => _.name.trim().toLowerCase().includes(filterVal));
                        }));
                }),
                catchError((err, caught) => {
                    console.log(err);
                    return caught;
                })
            );
    }

    /**
     * @description disconnect interface for datasource
     * @param collectionViewer 
     */
    public disconnect(collectionViewer: CollectionViewer): void {
        console.log('disconnect from datasource');
    }

    /**
     * @description trigger a filter event
     * @returns {void}
     */
    public nextFilter(filter?: string): void {
        filter = filter || '';
        filter = filter.trim();
        this.filterChange.next(filter);
    }

    /**
     * @description trigger a data change event
     * @returns {void}
     */
    public nextDataChange(event: any): void {
        this.dataChange.next(undefined);
    }

    /**
     * @description given objects with duplicate names, dedup the names by rollupId
     * @param {Observable<Partial<LastModifiedAssessment>[]>} o$
     * @return {Observable<Partial<LastModifiedAssessment>[]>}
     */
    public dedupByRollupId(o$: Observable<Partial<LastModifiedAssessment>[]>): Observable<Partial<LastModifiedAssessment>[]> {
        return o$
            .pipe(
                map((val) => {
                    const uniqIds = Array.from(new Set(val.map((el) => el.rollupId)));
                    const uniq = uniqIds
                        .map((key) => {
                            return val.find((el) => el.rollupId === key);
                        });
                    return uniq;
                })
            );
    }

}
