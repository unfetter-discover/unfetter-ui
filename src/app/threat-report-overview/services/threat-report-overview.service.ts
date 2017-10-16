import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ThreatReport } from '../models/threat-report.model';
import { ThreatReportMock } from '../models/threat-report-mock.model';
import { Constance } from '../../utils/constance';
import { GenericApi } from '../../global/services/genericapi.service';

@Injectable()
export class ThreatReportOverviewService {

  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/vnd.api+json' });
  private readonly reportsUrl = `${Constance.API_HOST}${Constance.REPORTS_URL}`;
  constructor(private http: HttpClient, private genericService: GenericApi) { }

  /**
   * @description pull a list of threat report objects from the backend mongo database
   * @param filter 
   */
  public load(filter?: string): Observable<ThreatReport[]> {
    const url = this.reportsUrl + '?extendedproperties=true&metaproperties=true';
    return this.genericService.get(url)
      .flatMap((el) => el)
      .reduce((memo, el: any) => {
        console.log(el);
        const name = el.attributes.work_product.name;
        const author = el.attributes.work_product.author || '';
        const date = el.attributes.work_product.date || '';
        const key = name + author + date;
        let tr = memo[key];
        if (!tr) {
          tr = new ThreatReport();
          memo[key] = tr;
        }
        tr.name = name;
        tr.author = author;
        tr.boundries = Object.assign({}, el.attributes.work_product.boundries);
        const report = el.attributes;
        tr.reports.push(report);
        return memo;
      }, {})
      .map((obj) => {
        const keys = Object.keys(obj);
        return keys.map((key) => obj[key]); 
      });
  }

  /**
   * @description save a threat report to the mongo backend database
   * @param threatReport 
   */
  public saveThreatReport(threatReport: ThreatReport): Observable<ThreatReport[]> {
    if (!threatReport) {
      return Observable.of();
    }

    const url = this.reportsUrl;
    const headers = this.headers;

    const reports = threatReport.reports;
    const calls = reports.map((report) => {
      const attributes = Object.assign({}, report.data.attributes);
      const meta = { work_product: {} };
      const workProduct: any = meta.work_product;
      workProduct.boundries = Object.assign({}, threatReport.boundries);
      workProduct.name = threatReport.name;
      workProduct.date = threatReport.date;
      workProduct.author = threatReport.author;
      attributes.metaProperties = meta;
      const body = JSON.stringify({
        data: {
          type: report.data.type || 'report',
          attributes
        }
      });
      return this.http.post<ThreatReport>(url, body, { headers });
    });

    return Observable.forkJoin(...calls);
  }

}
