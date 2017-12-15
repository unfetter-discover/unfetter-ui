import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ThreatReport } from './models/threat-report.model';
import { ThreatReportOverviewService } from '../threat-dashboard/services/threat-report-overview.service';

/**
 * @description handles filter events from the UI sent to the datasource, in this case a service call
 */
export class ThreatReportOverviewDataSource extends DataSource<ThreatReport> {
    protected filterChange = new BehaviorSubject('');
    protected dataChange = new BehaviorSubject(undefined);

    constructor(protected service: ThreatReportOverviewService) {
        super();
    }

    /**
     * @description connect interface for datasource, listens to filter events and fetch/filters data accordingly
     * @param collectionViewer
     */
    public connect(collectionViewer: CollectionViewer): Observable<ThreatReport[]> {
        const arr = [this.filterChange, this.dataChange];
        return Observable.merge(...arr)
            .switchMap(() => {
                console.log('rebuilding table');
                const val = this.filterChange.getValue();
                const filterVal = val.trim().toLowerCase() || '';
                const products$ = this.service.loadAll();
                if (!filterVal || filterVal.length === 0) {
                    return products$;
                }

                return products$
                    .map((el) => {
                        return el.filter((tro) => tro.name.trim().toLowerCase().includes(filterVal)
                            || tro.author.trim().toLowerCase().includes(filterVal));
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
