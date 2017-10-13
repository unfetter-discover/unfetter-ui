import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReport } from './models/threat-report.model';
import { BehaviorSubject } from 'rxjs';

/**
 * @description handles filter events from the UI sent to the datasource, in this case a service call
 */
export class ThreatReportOverviewDataSource extends DataSource<ThreatReport> {
    protected filterChange = new BehaviorSubject('');

    constructor(protected service: ThreatReportOverviewService) {
        super();
    }

    /**
     * @description listens to filter events and fetch/filters data accordingly
     * @param collectionViewer 
     */
    public connect(collectionViewer: CollectionViewer): Observable<ThreatReport[]> {
        return this.filterChange
                .switchMap((val) => {
                    console.log('filter on val', val);
                    const filterVal = val.trim().toLowerCase() || '';
                    if (!filterVal || filterVal.length === 0) {
                        return this.service.load();
                    }

                    return this.service.load()
                        .map((el) => el.filter((tro) => tro.name.includes(filterVal) || tro.author.includes(filterVal)));
                });
    }

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
}
