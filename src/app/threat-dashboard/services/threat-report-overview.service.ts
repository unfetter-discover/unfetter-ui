import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as UUID from 'uuid';

import { Constance } from '../../utils/constance';
import { GenericApi } from '../../global/services/genericapi.service';
import { ThreatReport } from '../../threat-report-overview/models/threat-report.model';
import { Boundries } from '../../threat-report-overview/models/boundries';

@Injectable()
export class ThreatReportOverviewService {

  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/vnd.api+json' });
  private readonly reportsUrl = `${Constance.API_HOST}${Constance.REPORTS_URL}`;
  constructor(private http: HttpClient, private genericService: GenericApi) { }

  /**
   * @description pull a threat report object from the backend mongo database
   * @param {string} id
   */
  public load(id: string): Observable<ThreatReport> {
    if (!id || id.trim().length === 0) {
      return Observable.of();
    }

    return this.loadAll()
      .flatMap((arr) => arr)
      .filter((el) => {
        return el.id === id;
      });
  }

  /**
   * @description pull a list of threat report objects from the backend mongo database
   */
  public loadAll(): Observable<ThreatReport[]> {
    const url = this.reportsUrl + '?extendedproperties=true&metaproperties=true';
    return this.genericService.get(url)
      .flatMap((el) => el)
      .reduce((memo, el: any) => {
        // map threat reports to a key, this reduce performs a grouping by like reports
        const name = el.attributes.work_product.name;
        const author = el.attributes.work_product.author || '';
        const date = el.attributes.work_product.date || '';
        const id = el.attributes.work_product.id || -1;
        let key = el.attributes.work_product.id;
        if (!key) {
          key = name + author + date;
        }
        let tr = memo[key];
        if (!tr) {
          tr = new ThreatReport();
          memo[key] = tr;
        }
        tr.name = name;
        tr.author = author;
        tr.id = id;
        const srcBoundries = el.attributes.work_product.boundries;
        tr.boundries = new Boundries();
        tr.boundries.startDate = srcBoundries.startDate;
        tr.boundries.endDate = srcBoundries.endDate;
        tr.boundries.intrusions = new Set(Array.from(srcBoundries.intrusions));
        tr.boundries.malware = new Set(Array.from(srcBoundries.malware));
        tr.boundries.targets = new Set(Array.from(srcBoundries.targets));
        const report = el.attributes;
        tr.reports.push(report);
        return memo;
      }, {})
      .map((obj) => {
        // map from object of keys back to an array, grouped correctly
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
    const id = UUID.v4();
    const calls = reports.map((report) => {
      const attributes = Object.assign({}, report.data.attributes);
      const meta = { work_product: {} };
      const workProduct: any = meta.work_product;
      workProduct.boundries = new Boundries();
      workProduct.boundries.startDate = threatReport.boundries.startDate;
      workProduct.boundries.endDate = threatReport.boundries.endDate;
      workProduct.boundries.intrusions = Array.from(threatReport.boundries.intrusions);
      workProduct.boundries.malware = Array.from(threatReport.boundries.malware);
      workProduct.boundries.targets = Array.from(threatReport.boundries.targets);
      workProduct.name = threatReport.name;
      workProduct.date = threatReport.date;
      workProduct.author = threatReport.author;
      workProduct.id = id;
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

  /**
   *  @description delete a threat report from the mongo backend database
   *  @param id
   */
  public deleteThreatReport(id: string): Observable<ThreatReport[]> {
    const url = this.reportsUrl + '/' + id;
    return Observable.create((observer) => {
      const sub  = this.genericService.delete(url).subscribe(
        (data) => {
          observer.next(data);
          observer.complete();
        }, (error) => {
          // handle errors here
          observer.throw = '';
        }, () => {
          sub.unsubscribe();
        }
      );
    });
  }

}
