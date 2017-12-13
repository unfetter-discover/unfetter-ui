import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as UUID from 'uuid';

import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { ThreatReport } from '../../threat-report-overview/models/threat-report.model';
import { Boundries } from '../../threat-report-overview/models/boundries';
import { Report } from '../../models/report';
import { JsonApiObject } from '../models/adapter/json-api-object';

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

    const query = { 'stix.type': 'report', 'metaProperties.work_products.id': id };
    const url = `${this.reportsUrl}?extendedproperties=true&metaproperties=true&filter=${encodeURI(JSON.stringify(query))}`;
    const reports$: Observable<Report[]> = this.genericService.get(url);
    const threatReports$ = this
      .aggregateReportsToThreatReports(reports$)
      .filter((arr) => {
        const filtered = arr.find((el) => el.id === id) !== undefined;
        return filtered;
      })
      // .flatMap((el) => el);
    return threatReports$;
  }

  /**
   * @description pull a list of threat report objects from the backend mongo database
   */
  public loadAll(): Observable<ThreatReport[]> {
    const url = this.reportsUrl + '?extendedproperties=true&metaproperties=true';
    const reports$: Observable<Report[]> = this.genericService.get(url);
    return this.aggregateReportsToThreatReports(reports$);
  }

  /**
   * @description pull a list of STIX report objects from the backend mongo database
   */
  public loadAllReports(): Observable<Report[]> {
    const query = { 'stix.type': 'report' };
    const url = `${this.reportsUrl}?extendedproperties=true&metaproperties=true&filter=${encodeURI(JSON.stringify(query))}`;
    const reports$: Observable<Report[]> = this.genericService.get(url);
    return reports$;
  }

  /**
   * @description take all the reports and group them into like ThreatReports
   * @param {Observable<Report[]>} reports
   * @return {Obsevable<ThreatReport[]}
   */
  public aggregateReportsToThreatReports(reports: Observable<Report[]>): Observable<ThreatReport[]> {
    return reports
      .flatMap((el) => el)
      .filter((el) => el !== undefined)
      // if the report does not have a workproduct we cant aggregate it now can we?
      .filter((report) => report.attributes
        && report.attributes.metaProperties && report.attributes.metaProperties.work_products)
      // flatten (report * <=> * workproduct) relationship into (report * <=> 1 workproduct)
      .flatMap((report) => {
        console.log(report.attributes.metaProperties.work_products);
        const arr = report.attributes.metaProperties.work_products.map((wp) => {
          const tmpReport = Object.assign(new Report(), report);
          tmpReport.attributes = Object.assign({}, report.attributes);
          tmpReport.attributes.metaProperties = Object.assign({}, report.attributes.metaProperties);
          tmpReport.attributes.metaProperties.work_products = [wp];
          return tmpReport;
        }) as Array<Partial<Report>>;
        return arr;
      })
      .reduce((memo, el) => {
        // map threat reports to a key, this reduce performs a grouping by like reports
        const report = el;
        const attribs = report.attributes;
        // we are ensured only on workproduct due filter and flatMaps above, ...riggghht?
        const workProduct = attribs.metaProperties.work_products[0];
        const name = workProduct.name;
        const author = workProduct.author || '';
        const date = workProduct.date || '';
        const published = workProduct.published;
        const id = workProduct.id || -1;
        let key = workProduct.id;
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
        tr.published = published;
        tr.date = date;
        tr.id = id;
        const srcBoundries = workProduct.boundries;
        tr.boundries = new Boundries();
        tr.boundries.startDate = srcBoundries.startDate;
        tr.boundries.endDate = srcBoundries.endDate;
        tr.boundries.intrusions = new Set(Array.from(srcBoundries.intrusions));
        tr.boundries.malware = new Set(Array.from(srcBoundries.malware));
        tr.boundries.targets = new Set(Array.from(srcBoundries.targets));
        tr.reports.push(report);
        return memo;
      }, {} as { [key: string]: ThreatReport })
      .map((obj) => {
        // map from object of keys back to an array of workproducts, 
        //  with each workproducts reports grouped correctly
        console.log(obj);
        const keys = Object.keys(obj);
        return keys.map((key) => obj[key]);
      });
  }

  /**
   * @description save Stix Reports not necessarily associated with any threat reports (ie workproducts)
   * @param reports
   * @return {Observable<Report[]>}
   */
  public saveReports(reports: Report[]): Observable<Report[]> {
    if (!reports) {
      return Observable.empty();
    }

    const url = this.reportsUrl;
    const headers = this.ensureAuthHeaders(this.headers);
    const calls = reports.map((report) => {
      const id = report.id || UUID.v4();
      const attributes = Object.assign({}, report.attributes);
      report.id = id;
      report.attributes.id = id;
      const body = JSON.stringify({
        data: {
          type: report.type || 'report',
          attributes
        }
      } as JsonApiObject<Report>);

      // add new object
      return this.http
        .post<JsonApiObject<Report>>(url, body, { headers })
        // unwrap the json api object
        .map((jsonSchema) => jsonSchema.data);
    });

    return Observable.forkJoin(...calls);
  }

  /**
   * @description copy constuct a threat report suitable to save to the database
   * @param {string} id threat report id
   * @param {Partial<ThreatReport>} threatReport 
   */
  public copyThreatReportForSave(id: string, threatReport: Partial<ThreatReport>): Partial<ThreatReport> {
    const meta = { work_products: [{}] };
    const workProduct: any = meta.work_products[0];
    workProduct.boundries = new Boundries();
    workProduct.boundries.startDate = threatReport.boundries.startDate;
    workProduct.boundries.endDate = threatReport.boundries.endDate;
    // Set does not serialize well?, so this needs to be an Array
    workProduct.boundries.intrusions = Array.from(threatReport.boundries.intrusions || []);
    workProduct.boundries.malware = Array.from(threatReport.boundries.malware || []);
    workProduct.boundries.targets = Array.from(threatReport.boundries.targets || []);
    workProduct.name = threatReport.name;
    workProduct.date = threatReport.date;
    workProduct.author = threatReport.author;
    workProduct.published = threatReport.published;
    workProduct.id = id;
    return workProduct;
  }

  /**
   * @description save a threat report to the mongo backend database
   *  a threat report (ie workproduct) will contain many stix reports
   *  every stix report containing the workproduct information in its metaproperties
   *  this is a many to many relationship and will probably be refactored in the future
   * @param {Partial<ThreatReport>} threatReport
   * @return {Observable<Partial<ThreatReport>>}
   */
  public saveThreatReport(threatReport: Partial<ThreatReport>): Observable<Partial<ThreatReport>> {
    if (!threatReport) {
      return Observable.empty();
    }

    const url = this.reportsUrl;
    const headers = this.ensureAuthHeaders(this.headers);

    const id = threatReport.id || UUID.v4();
    threatReport.id = id;
    const reports = threatReport.reports;
    const calls = reports.map((report) => {
      const attributes = Object.assign({}, report.attributes);
      const meta = {
        work_products: []
      };
      if (report.attributes.metaProperties && report.attributes.metaProperties.work_products) {
        const associatedWorkProducts = report.attributes.metaProperties.work_products.filter((wp) => wp.id !== id);
        meta.work_products = [...associatedWorkProducts];
      }
      const updatedThreatReport = this.copyThreatReportForSave(id, threatReport);
      meta.work_products = meta.work_products.concat(updatedThreatReport);
      attributes.metaProperties = meta;
      const body = JSON.stringify({
        data: {
          type: report.type || 'report',
          attributes
        }
      } as JsonApiObject<Report>);

      const reportId = report.attributes.id || undefined;
      if (reportId) {
        // update an existing object
        const updateOrAddUrl = `${url}/${reportId}`;
        return this.http.patch<Report>(updateOrAddUrl, body, { headers });
      } else {
        // add new object
        return this.http.post<Report>(url, body, { headers });
      }
    });

    const saveReports$ = Observable.forkJoin(...calls).map((arr) => threatReport);
    // return this.aggregateReportsToThreatReports(saveReports$).flatMap((el) => el);
    return saveReports$;
  }

  /**
   * TODO: This is really delete a STIX Report, not a ThreatReport/WorkProduct
   *  rename when I get back here
   * @description delete a threat report from the mongo backend database
   * @param {string} id of the threat report to delete
   * @return {Observable<ThreatReport[]>}
   */
  public deleteThreatReport(id: string): Observable<ThreatReport[]> {
    if (!id || id.trim().length === 0) {
      return Observable.of([]);
    }

    const url = this.reportsUrl + '/' + id;
    const headers = this.ensureAuthHeaders(this.headers);
    return this.http.delete<ThreatReport[]>(url, { headers });
  }

  /**
   * @description add an auth http header if it is missing and it exists in local storage
   * @param {HttpHeaders} headers 
   * @return {HttpHeaders}
   */
  public ensureAuthHeaders(headers: HttpHeaders): HttpHeaders {
    if (!headers.get('Authorization')) {
      let token = localStorage.getItem('unfetterUiToken');
      if (token) {
        headers = headers.set('Authorization', token);
      }
    }
    return headers;
  }

}
