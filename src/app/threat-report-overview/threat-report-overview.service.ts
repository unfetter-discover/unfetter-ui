import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ThreatReport } from './models/threat-report.model';
import { ThreatReportMock } from './models/threat-report-mock.model';

@Injectable()
export class ThreatReportOverviewService {
  private readonly headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  public load(filter?: string): Observable<ThreatReport[]> {
    const arr = ThreatReportMock.mockMany(10);
    return Observable.of(arr);
  }

}
