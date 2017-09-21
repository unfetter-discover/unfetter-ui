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

    const lim = 10;
    const arr = Array(lim);
    for (let i = 0; i < lim; i++) {
      arr[i] = { 
            id: i,
            name: `name-${i}`,
            date: new Date().toISOString(),
            author: `author-${i}`
          } as ThreatReportOverview
    }
    return Observable.of(arr);
  }

}
