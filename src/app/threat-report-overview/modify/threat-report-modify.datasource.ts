import { EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReport } from './models/threat-report.model';
import { Report } from '../../models/report';

/**
 * @description handles filter events from the UI sent to the datasource, in this case a service call
 */
export class ThreatReportModifyDataSource extends DataSource<Report> {
    public displayLenSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public curDisplayLen$: Observable<number> = this.displayLenSubject$.asObservable();
    protected readonly dataChange$: BehaviorSubject<Report[]> = new BehaviorSubject([]);
    protected readonly filterChange$ = new BehaviorSubject('');
    protected readonly pageChange$ = new BehaviorSubject<PageEvent>(undefined);

    constructor(public reports$: Observable<Report[]>, public paginator?: MatPaginator) {
        super();
        // this.dataChange = new BehaviorSubject<Report[]>(this.reports);
        // this.nextDataChange(reports);
        const co = reports$.multicast(this.dataChange$);
        co.connect();
    }

    /**
     * @description listens to filter events and fetch/filters data accordingly
     * @param collectionViewer
     */
    public connect(collectionViewer: CollectionViewer): Observable<Report[]> {

        const changes: Array<Observable<any>> = [
            this.dataChange$,
            this.filterChange$,
            this.pageChange$,
        ];

        return Observable.merge(...changes).map(() => {
            let data = this.dataChange$.value;
            const value = this.filterChange$.value.toLowerCase();
            if (value || value.trim().length > 0) {
                data = data.filter((d) => {
                    let title;
                    let descrip;
                    title = d.attributes.name;
                    descrip = d.attributes.description;
                    return title.toLowerCase().includes(value) || descrip.toLowerCase().includes(value);
                });
            }

            if (!data) {
                this.displayLenSubject$.next(0);
                return [];
            }

            const pageEvent = this.pageChange$.value;
            const pageIndex = (pageEvent && pageEvent.pageIndex) ? pageEvent.pageIndex : 0;
            const pageSize = (pageEvent && pageEvent.pageSize) ? pageEvent.pageSize : 25;
            const startIndex = pageIndex * pageSize;
            const display = data.slice(startIndex, pageSize);
            this.displayLenSubject$.next(display.length);
            return display;
        });
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        console.log('disconnect from datasource');
    }

    /**
     * @description trigger a filter for reports event
     */
    public nextFilter(filter?: string): void {
        filter = filter || '';
        filter = filter.trim();
        this.filterChange$.next(filter);
    }

    /**
     * @description trigger a reports array change event
     * @param data
     * @return {void}
     */
    public nextDataChange(data: Report[]): void {
        this.dataChange$.next(data);
    }

    /**
     * @description trigger a page reports event
     * @param event
     */
    public nextPageChange(event: PageEvent): void {
        this.pageChange$.next(event);
    }

}
