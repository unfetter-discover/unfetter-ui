
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty as observableEmpty, forkJoin as observableForkJoin, from as observableFrom, merge as observableMerge, Observable, of as observableOf, throwError as observableThrowError, zip as observableZip } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, filter, first, map, mergeMap, reduce, tap } from 'rxjs/operators';
import * as UUID from 'uuid';
import { GenericApi } from '../../core/services/genericapi.service';
import { SortHelper } from '../../global/static/sort-helper';
import { JsonApi } from '../../models/json/jsonapi';
import { Report } from '../../models/report';
import { Constance } from '../../utils/constance';
import { JsonApiObject } from '../models/adapter/json-api-object';
import { Boundaries } from '../models/boundaries';
import { LastModifiedThreatReport } from '../models/last-modified-threat-report';
import { ThreatReport } from '../models/threat-report.model';

@Injectable({
  providedIn: 'root',
})
export class ThreatReportOverviewService {

  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/vnd.api+json' });
  private readonly reportsUrl = `${Constance.API_HOST}${Constance.REPORTS_URL}`;
  constructor(
    private http: HttpClient,
    private genericService: GenericApi
  ) { }

  public setGenericApiService(service: GenericApi): ThreatReportOverviewService {
    this.genericService = service;
    return this;
  }

  /**
   * @description pull a threat report object from the backend mongo database
   * NOTE: notice the `Partial<ThreatReport>`, as not all data may be returned,please double check
   * @param {string} id
   * @return {Observable<Partial<ThreatReport>>}
   */
  public load(id: string): Observable<Partial<ThreatReport>> {
    if (!id || id.trim().length === 0) {
      return observableOf();
    }

    const query = { 'stix.type': 'report', 'metaProperties.work_products.id': id };
    const filterStr = encodeURI(JSON.stringify(query));
    // const projection = { 'stix.name': 1, 'stix.id': 1, 'metaProperties.work_products': 1 };
    // const project = encodeURI(JSON.stringify(projection));
    const url = `${this.reportsUrl}?extendedproperties=true&metaproperties=true&filter=${filterStr}`;
    const reports$: Observable<Report[]> = this.genericService.get(url);
    const threatReports$ = reports$.pipe(
      (this.aggregateReportsAsThreatReports()),
      mergeMap((el) => el),
      filter((el) => el.id === id),
      first());
    return threatReports$;
  }

  /**
   * @description pull a list of threat report objects from the backend mongo database
   * @return {Observable<ThreatReport[]>} observable containing an array of threat reports, sorted by name
   */
  public loadAll(): Observable<ThreatReport[]> {
    const url = this.reportsUrl + '?extendedproperties=true&metaproperties=true';
    const o$ = this.genericService.get(url).pipe((this.aggregateReportsAsThreatReports()));
    return o$.pipe(map((arr) => arr.sort(SortHelper.sortDescByField('name'))))
  }

  /**
   * @description pull a list of STIX report objects from the backend mongo database
   * @return {Observable<Report[]>}
   */
  public loadAllReports(): Observable<Report[]> {
    const query = { 'stix.type': 'report' };
    const url = `${this.reportsUrl}?extendedproperties=true&metaproperties=true&filter=${encodeURI(JSON.stringify(query))}`;
    const reports$: Observable<Report[]> = this.genericService.get(url);
    return reports$;
  }

  /**
   * @description load a single stix report with given id
   * @param {string} id of a STIX report
   * @return {Observable<Report>} single STIX report, or empty observable if no id
   */
  public loadReport(id: string): Observable<Report> {
    if (!id) {
      return observableEmpty();
    }

    const query = { 'stix.type': 'report', 'stix.id': id };
    const url = `${this.reportsUrl}?extendedproperties=true&metaproperties=true&filter=${encodeURI(JSON.stringify(query))}`;
    const reports$ = this.genericService.getAs<Report>(url);
    return reports$.pipe(first());
  }

  /**
   * @description
   * @param id of threat report / work product
   * @return {Observable<Report[]>} array of STIX reports associated with a given work product id
   *  , or an empty observable if no id
   */
  public loadAllReportsForThreatReport(id: string): Observable<Report[]> {
    if (!id || id.trim().length === 0) {
      return observableOf();
    }

    const query = { 'stix.type': 'report', 'metaProperties.work_products.id': id };
    const url = `${this.reportsUrl}?extendedproperties=true&metaproperties=true&filter=${encodeURI(JSON.stringify(query))}`;
    return this.genericService.get(url);
  }

  /**
   * @description take the given reports steam and group them into like ThreatReports
   * @param {Observable<Report[]>} reports
   * @return {Obsevable<ThreatReport[]}
   */
  public aggregateReportsAsThreatReports(): (reports: Observable<Report[]>) => Observable<ThreatReport[]> {
    return (reports: Observable<Report[]>) => {
      return reports.pipe(
        mergeMap((el) => el),
        filter((el) => el !== undefined),
        // if the report does not have a workproduct we cant aggregate it now can we?
        filter((report) => report.attributes
          && report.attributes.metaProperties && report.attributes.metaProperties.work_products),
        // flatten (report * <=> * workproduct) relationship into (report * <=> 1 workproduct)
        mergeMap((report) => {
          const arr = report.attributes.metaProperties.work_products.map((wp) => {
            const tmpReport = Object.assign(new Report(), report);
            tmpReport.attributes = Object.assign({}, report.attributes);
            tmpReport.attributes.metaProperties = Object.assign({}, report.attributes.metaProperties);
            tmpReport.attributes.metaProperties.work_products = [wp];
            return tmpReport;
          }) as Array<Partial<Report>>;
          return arr;
        }),
        reduce((memo, el: Partial<Report>) => {
          // map threat reports to a key, this reduce performs a grouping by like reports
          const report = el;
          const attribs = report.attributes;
          // we are ensured only on workproduct due filter and flatMaps above, ...riggghht?
          const workProduct = attribs.metaProperties.work_products[0];
          const name = workProduct.name;
          const description = workProduct.description;
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
          tr.description = description;
          tr.author = author;
          tr.published = published;
          tr.date = date;
          tr.id = id;
          const srcBoundries = workProduct.boundaries;
          tr.boundaries = new Boundaries();
          tr.boundaries.startDate = srcBoundries.startDate;
          tr.boundaries.endDate = srcBoundries.endDate;
          tr.boundaries.intrusions = new Set(Array.from(srcBoundries.intrusions));
          tr.boundaries.malware = new Set(Array.from(srcBoundries.malware));
          tr.boundaries.targets = new Set(Array.from(srcBoundries.targets));
          tr.reports.push(report);
          return memo;
        }, {} as { [key: string]: ThreatReport }),
        map((obj) => {
          // map from object of keys back to an array of workproducts, 
          //  with each workproducts reports grouped correctly
          const keys = Object.keys(obj);
          return keys.map((key) => obj[key]);
        }));
    }
  }

  /**
   * NOTE: This will ensure you have an uptodate copy of your report!
   * @description modify a single report, update or insert depending on if an id exists
   * @param {Report} report
   * @param {Partial<ThreatReport>} a threat report / workproduct to read its meta properties
   * @return {Observable<Report>}
   */
  public upsertReports(reports: Report[], threatReportMeta?: Partial<ThreatReport>): Observable<Report> {
    const url = this.reportsUrl;
    const headers = this.ensureAuthHeaders(this.headers);

    // let id;
    // if (threatReportMeta) {
    //   id = threatReportMeta.id;
    // }

    const sourceReports$ = observableFrom(reports);
    const hasId = (report: Report) => report.id !== undefined;
    const reportsForUpdate$: Observable<Report> = sourceReports$.pipe(filter(hasId));
    const reportsForInsert$: Observable<Report> = sourceReports$.pipe(filter((x) => !hasId(x)));
    // pull fresh copies of the reports
    const updates$ = reportsForUpdate$.pipe(mergeMap((report) => this.loadReport(report.id)));
    // assign the correct workproduct to these new reports
    const inserts$ = reportsForInsert$
      .pipe(
        map((report: Report) => {
          if (threatReportMeta) {
            const meta = report.attributes.metaProperties || {};
            meta.work_products = meta.work_products || [];
            meta.work_products = meta.work_products.concat({ ...threatReportMeta });
            meta.published = threatReportMeta.published;
            report.attributes.metaProperties = { ...report.attributes.metaProperties, ...meta };
          }
          return report;
        })
      );
    const updateReports$ = observableMerge(inserts$, updates$)
      .pipe(
        mergeMap((el) => {
          // I cant explain why this an array of single element arrays
          //  but lets unwrap
          if (el instanceof Array) {
            el = el[0];
          }
          return this.upsertReport(el, threatReportMeta);
        })
      );
    return updateReports$;
  }

  /**
   * NOTE: This will not ensure you have an uptodate copy of your report!  See upsertReports for consistency
   * @description modify a single report, update or insert depending on if an id exists
   * @param {Report} report
   * @param {Partial<ThreatReport>} a threat report / workproduct to read its meta properties
   * @return {Observable<Report>}
   */
  public upsertReport(report: Report, threatReportMeta?: Partial<ThreatReport>): Observable<Report> {
    const url = this.reportsUrl;
    const headers = this.ensureAuthHeaders(this.headers);

    let id;
    if (threatReportMeta) {
      id = threatReportMeta.id;
    }

    // const metaProperties = {
    //   published: false,
    //   work_products: [],
    // };
    // const attributes = Object.assign({}, { metaProperties }, report.attributes);
    const attributes = report.attributes;
    attributes.metaProperties.published = (attributes.metaProperties.published !== undefined) ? attributes.metaProperties.published : false;
    attributes.metaProperties.work_products = attributes.metaProperties.work_products || [];
    if (threatReportMeta) {
      // filter out the given work product we are reattaching it
      attributes.metaProperties.work_products = attributes.metaProperties.work_products.filter((wp) => wp.id !== id);
      // reattach
      const updatedThreatReport = this.deepCopyThreatReportForSave(id, threatReportMeta);
      attributes.metaProperties.work_products = attributes.metaProperties.work_products.concat(updatedThreatReport);
    }
    const body = JSON.stringify({
      data: {
        type: report.type || 'report',
        attributes
      }
    } as JsonApiObject<Report>);

    const reportId = attributes.id || undefined;
    if (reportId) {
      // update an existing object
      const updateOrAddUrl = `${url}/${reportId}`;
      return this.http.patch<Report>(updateOrAddUrl, body, { headers });
    } else {
      // add new object
      return this.http.post<Report>(url, body, { headers });
    }
  }

  /**
   * @description copy constuct a threat report suitable to save to the database
   *  NOTE: we need a copy constuctor because Object.assign is a shallow copy only
   * @param {string} id threat report id
   * @param {Partial<ThreatReport>} threatReport 
   */
  public deepCopyThreatReportForSave(id: string, threatReport: Partial<ThreatReport>): Partial<ThreatReport> {
    const meta = { work_products: [{}] };
    const workProduct: any = meta.work_products[0];
    workProduct.boundaries = new Boundaries();
    workProduct.boundaries.startDate = threatReport.boundaries.startDate;
    workProduct.boundaries.endDate = threatReport.boundaries.endDate;
    // Set does not serialize well?, so this needs to be an Array
    workProduct.boundaries.intrusions = Array.from(threatReport.boundaries.intrusions || []);
    workProduct.boundaries.malware = Array.from(threatReport.boundaries.malware || []);
    workProduct.boundaries.targets = Array.from(threatReport.boundaries.targets || []);
    workProduct.name = threatReport.name;
    workProduct.description = threatReport.description;
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
      return observableEmpty();
    }

    const url = this.reportsUrl;
    const headers = this.ensureAuthHeaders(this.headers);

    const id = threatReport.id || UUID.v4();
    threatReport.id = id;
    const reports = threatReport.reports;
    const saveReports$ = this.upsertReports(reports as Report[], threatReport)
      .pipe(
        tap((el) => console.log('upserted report', el)),
        reduce((acc, val) => acc.concat(val), []),
        map((el) => threatReport)
      );
    return saveReports$;
  }

  /**
   * @description delete a STIX report from the mongo backend database
   * @param {string} id of the STIX report to delete
   * @return {Observable<Report>}
   */
  public deleteReport(id: string): Observable<Report> {
    if (!id || id.trim().length === 0) {
      return observableEmpty();
    }

    const url = this.reportsUrl + '/' + id;
    const headers = this.ensureAuthHeaders(this.headers);
    return this.http.delete<Report>(url, { headers });
  }

  /**
   * @description disassociate this from the given report
   * @return {Obsevable<Report>}
   * @param {Report} report
   * @param {ThreatReport} disassociate this from the given report
   */
  public removeReport(report: Report, threatReport: ThreatReport): Observable<Report> {
    if (!report || !threatReport) {
      return observableEmpty();
    }

    const url = this.reportsUrl;
    const headers = this.ensureAuthHeaders(this.headers);

    const id = threatReport.id;
    const attributes = Object.assign({}, report.attributes);
    const meta = {
      work_products: []
    };
    if (report.attributes.metaProperties && report.attributes.metaProperties.work_products) {
      // this report has other workproducts, keep them
      // filter out the given work product
      const associatedWorkProducts = report.attributes.metaProperties.work_products.filter((wp) => wp.id !== id);
      meta.work_products = [...associatedWorkProducts];
    }
    attributes.metaProperties = meta;
    const body = JSON.stringify({
      data: {
        type: report.type || 'report',
        attributes
      }
    } as JsonApiObject<Report>);

    const reportId = report.attributes.id;
    // update the existing object
    const updateOrAddUrl = `${url}/${reportId}`;
    return this.http.patch<Report>(updateOrAddUrl, body, { headers });
  }

  /**
   * @description disassociate this from the given report
   * @return {Observable<Report[]>}
   * @param {Report[]} report
   * @param {ThreatReport} disassociate this from the given report
   */
  public removeReports(reports: Report[], threatReport: ThreatReport): Observable<Report[]> {
    const url = this.reportsUrl;
    const headers = this.ensureAuthHeaders(this.headers);

    const id = threatReport.id;
    const calls = reports
      // ensure all elements have are defined and have an id, otherwise skip it
      .filter((el) => el !== undefined)
      .filter((report) => report.attributes)
      .filter((report) => report.attributes.id)
      .map((report) => {
        return this.removeReport(report, threatReport);
      });
    return observableForkJoin(...calls);
  }

  /**
   * @description disassociate all reports from the given workproduct
   * @param {string} id of the workproduct
   * @return {Observable<Report[]>} reports modified
   */
  public deleteThreatReport(id: string): Observable<Observable<Report[]>> {
    if (!id || id.trim().length === 0) {
      return observableEmpty();
    }

    const url = this.reportsUrl;
    const headers = this.ensureAuthHeaders(this.headers);
    const loadAll$ = this.loadAllReportsForThreatReport(id);
    // TODO: try the mergeMap to unwrap the outer Observable!!! sorry, time constraints!
    const modifyAll = (reports: Report[]) => {
      // with all reports
      const calls = reports
        // .flatMap((el) => el)
        // filter for defined and containing a workproduct
        // .filter((report) => report && report.attributes)
        // .filter((report) => report.attributes.metaProperties && report.attributes.metaProperties.work_products)
        // update the database to not include the workproduct with the given id
        .map((report) => {
          const attributes = Object.assign({}, report.attributes);
          const meta = {
            work_products: []
          };
          if (report.attributes.metaProperties && report.attributes.metaProperties.work_products) {
            const associatedWorkProducts = report.attributes.metaProperties.work_products.filter((wp) => wp.id !== id);
            meta.work_products = [...associatedWorkProducts];
          }
          attributes.metaProperties = meta;
          const body = JSON.stringify({
            data: {
              type: report.type || 'report',
              attributes
            }
          } as JsonApiObject<Report>);

          const reportId = report.attributes.id;
          // update an existing object
          const updateOrAddUrl = `${url}/${reportId}`;
          const updateOp$ = this.http.patch<Report>(updateOrAddUrl, body, { headers });
          return updateOp$;
        });
      return observableForkJoin(...calls);
    };

    const o$ = observableZip(loadAll$, modifyAll);
    return o$;
  }

  /**
   * @description fetch latest threat reports regardless of creatorid,
   *  NOTE: the backend may apply security filtering based on user and run mode
   * @param {string} id of the workproduct
   * @return {Observable<Partial<LastModifiedThreatReport>[]>} reports modified
   */
  public getLatestReports(): Observable<Partial<LastModifiedThreatReport>[]> {
    const url = Constance.API_HOST + Constance.LATEST_THREAT_REPORTS_URL;
    const headers = this.ensureAuthHeaders(this.headers);
    return this.http.get<JsonApi<Partial<LastModifiedThreatReport>[]>>(url, { headers })
      .pipe(
        map((resp): any => resp.data),
        catchError(this.handleError)
      );
  }

  /**
   * @description fetch latest threat reports by creatorId
   *  NOTE: the backend may apply security filters, based on user and run mode
   * @param {string} id of the workproduct
   * @return {Observable<Partial<LastModifiedThreatReport>[]>} reports modified
   */
  public getLatestReportsByCreatorId(creatorId: string): Observable<Partial<LastModifiedThreatReport>[]> {
    const url = Constance.API_HOST + Constance.LATEST_THREAT_REPORTS_URL + `/creator/${creatorId}`;
    const headers = this.ensureAuthHeaders(this.headers);
    return this.http.get<JsonApi<Partial<LastModifiedThreatReport>[]>>(url, { headers })
      .pipe(
        map((resp): any => resp.data),
        catchError(this.handleError)
      );
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

  /**
  * @description throw error
  * @param error
  */
  private handleError(error: any): ErrorObservable<any> {
    console.log(error);
    return observableThrowError(error);
  }

}
