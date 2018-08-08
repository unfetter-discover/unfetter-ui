import { Injectable, Optional, SkipSelf } from '@angular/core';
import { ThreatReport } from '../models/threat-report.model';

/**
 * @deprecated I think we can remove this after the screen redesigns
 */
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
