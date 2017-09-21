import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ThreatReportOverview } from './threat-report-overview.model';

@Injectable()
export class ThreatReportOverviewService {
  private readonly headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  public load(filter?: string): Observable<ThreatReportOverview[]> {
    return Observable.of([
      { 
        id: 1,
        name: 'name',
        date: new Date().toISOString(),
        author: 'author1'
      } as ThreatReportOverview
    ]);
  }

}
