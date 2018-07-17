import { Injectable, Optional, SkipSelf } from '@angular/core';
import { ThreatReport } from '../models/threat-report.model';

@Injectable({
    providedIn: 'root',
})
export class ThreatReportSharedService {

    public threatReportOverview: ThreatReport = undefined;

    constructor(
        @SkipSelf() @Optional() protected parent: ThreatReportSharedService) {
        if (parent) {
            throw new Error(
                'ThreatReportSharedService is already loaded. Import it in one module only');
        }
    }

}
