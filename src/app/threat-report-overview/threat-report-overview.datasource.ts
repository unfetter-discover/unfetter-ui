import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ThreatReportOverviewService } from './threat-report-overview.service';
import { ThreatReportOverview } from './threat-report-overview.model';

export class ThreatReportOverviewDataSource extends DataSource<ThreatReportOverview> {
    
    constructor(protected service: ThreatReportOverviewService) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ThreatReportOverview[]> {
        return this.service.load();
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        console.log('disconnect from datasource');
    }
}
