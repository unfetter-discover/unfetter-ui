import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { LastModifiedBaseline } from '../../models/last-modified-baseline';
import { BaselineService } from '../../services/baseline.service';

/**
 * @description handles filter events from the UI sent to the datasource, in this case a service call
 */
export class SummaryDataSource extends DataSource<Partial<LastModifiedBaseline>> {

    public readonly demoMode: boolean = (environment.runMode === 'DEMO');
    protected filterChange = new BehaviorSubject('');
    protected dataChange = new BehaviorSubject(undefined);

    constructor(
        protected assessService: BaselineService,
        protected creatorId?: string,
    ) {
        super();
    }

    /**
     * @description connect interface for datasource, listens to filter events and fetch/filters data accordingly
     * @param collectionViewer
     */
    public connect(collectionViewer: CollectionViewer): Observable<Partial<LastModifiedBaseline>[]> {
        const arr = [this.filterChange, this.dataChange];
        return Observable.merge(...arr)
            .switchMap(() => {
                const val = this.filterChange.getValue();
                const filterVal = val.trim().toLowerCase() || '';
                const baselines$ = this.assessService.getLatestAssessments();
                if (!filterVal || filterVal.length === 0) {
                    return baselines$;
                }

                return baselines$
                    .map((el) => {
                        return el.filter((_) => _.name.trim().toLowerCase().includes(filterVal));
                    });
            });
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
