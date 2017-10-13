import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReport } from './models/threat-report.model';
import { MdPaginator } from '@angular/material';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @description handles filter events from the UI sent to the datasource, in this case a service call
 */
export class ThreatReportModifyDataSource extends DataSource<{}> {
    protected filterChange = new BehaviorSubject('');

    constructor(public csvImportData: any[], public paginator: MdPaginator) {
        super();
    }

    /**
     * @description listens to filter events and fetch/filters data accordingly
     * @param collectionViewer
     */
    public connect(collectionViewer: CollectionViewer): Observable<any[]> {

        const changes: Array<Observable<any>> = [
            Observable.of(this.csvImportData),
            this.filterChange
        ];

        if (this.paginator) {
            changes.push(this.paginator.page);
        }

        return Observable.merge(...changes).map(() => {
           let data =  this.csvImportData;
           const value = this.filterChange.value.toLowerCase();
           data = data.filter((d) => {
               return d.data.attributes.title.toLowerCase().includes(value) ||  d.data.attributes.description.toLowerCase().includes(value)
           });
           // data = data ? data : this.csvImportData;
           const pageIndex = (this.paginator && this.paginator.pageIndex) ? this.paginator.pageIndex : 0;
           const pageSize = (this.paginator && this.paginator.pageSize) ? this.paginator.pageSize : 25;
           const startIndex = pageIndex * pageSize;
           return data.slice(startIndex, pageSize);
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
