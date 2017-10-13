import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReport } from './models/threat-report.model';
import { MdPaginator } from '@angular/material';
import { EventEmitter } from '@angular/core';

/**
 * @description handles filter events from the UI sent to the datasource, in this case a service call
 */
export class ThreatReportModifyDataSource extends DataSource<{}> {

    constructor(public csvImportData: any[], public paginator: MdPaginator) {
        super();
    }

    /**
     * @description listens to filter events and fetch/filters data accordingly
     * @param collectionViewer 
     */
    public connect(collectionViewer: CollectionViewer): Observable<any[]> {
        const changes: Array<Observable<any>> = [
            Observable.of(this.csvImportData)
        ];

        if (this.paginator) {
            changes.push(this.paginator.page);
        }

        return Observable.merge(...changes).map(() => {
            const data = this.csvImportData;
            const pageIndex = (this.paginator && this.paginator.pageIndex) ? this.paginator.pageIndex : 0;
            const pageSize = (this.paginator && this.paginator.pageSize) ? this.paginator.pageSize : 25; 
            const startIndex = pageIndex * pageSize;
            return data.slice(startIndex, pageSize);
        });
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        console.log('disconnect from datasource');
    }

}
