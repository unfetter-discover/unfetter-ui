import { Injectable } from '@angular/core';
import { ThreatReport } from '../models/threat-report.model';

@Injectable()
export class ThreatReportSharedService {

    public threatReportOverview: ThreatReport = undefined;

    constructor() { }

}
