
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, OperatorFunction } from 'rxjs';
import { map } from '../../../../node_modules/rxjs/operators';
import { Constance } from '../../utils/constance';
import { ExternalDataTranslationRequest } from '../models/adapter/external-data-translation-request';
import { ExternalDataTranslationResponse } from '../models/adapter/external-data-translation-response';
import { JsonApiObject } from '../models/adapter/json-api-object';
import { UrlTranslationRequest } from '../models/adapter/url-translation-request';
import { UrlTranslationResponse } from '../models/adapter/url-translation-response';

@Injectable({
  providedIn: 'root',
})
export class ReportTranslationService {

  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/vnd.api+json' });
  private readonly baseUrl = Constance.API_HOST || '';
  private readonly translateUrlPath = `/api/ctf/translate/report/url`;
  private readonly translateDataPath = `/api/ctf/translate/report/data`;

  constructor(private httpClient: HttpClient) { }

  /**
   * @description translate a url
   * @param {UrlTranslationRequest} req
   */
  public translateUrl(req: UrlTranslationRequest): Observable<UrlTranslationResponse> {
    if (!req || !req.systemName || !req.url) {
      return EMPTY;
    }

    const jsonApiObject = new JsonApiObject<UrlTranslationRequest>();
    jsonApiObject.data = req;
    const body = JSON.stringify(jsonApiObject);
    const headers = this.ensureAuthHeaders(this.headers);
    const url = this.baseUrl + this.translateUrlPath;
    return this.httpClient
      .post<JsonApiObject<UrlTranslationResponse>>(url, body, { headers })
      .pipe(
        this.mapData(),
    );
  }

  /**
   * @description translate a url
   * @param {UrlTranslationRequest} req
   */
  public translateData(req: ExternalDataTranslationRequest): Observable<ExternalDataTranslationResponse> {
    if (!req || !req.systemName || !req.payload) {
      console.log(req);
      console.log('system name and payload is required to request a data tranlation but was not found, attempting to move on...');
      return EMPTY;
    }

    const jsonApiObject = new JsonApiObject<ExternalDataTranslationRequest>();
    jsonApiObject.data = req;
    const body = JSON.stringify(jsonApiObject);
    const headers = this.ensureAuthHeaders(this.headers);
    const url = this.baseUrl + this.translateDataPath;
    return this.httpClient
      .post<JsonApiObject<ExternalDataTranslationResponse>>(url, body, { headers })
      .pipe(
        this.mapData<ExternalDataTranslationResponse>(),
        this.verifyAndParseDtgs(),
        this.verifyGranularMarking(),
        this.verifySourceName()
      );
  }

  /**
   * Do a GET request to an external system to fetch JSON
   * Requires that CORS is turned on at the external system end
   * @description generic fetch of a report
   * @param  {string} url
   * @param  {boolean} withCredentials, default true, for a CORS request
   * @param  {boolean} includeAuthHeaders, default false, if include jwt unfetter token, use only for local unfetter calls
   * @returns Observable
   */
  public fetchExternalReport(url: string, withCredentials = true, includeAuthHeaders = false): Observable<any> {
    if (!url) {
      return EMPTY;
    }

    let headers = this.headers;
    if (includeAuthHeaders) {
      headers = this.ensureAuthHeaders(headers);
    }

    return this.httpClient.get<any>(url,
      {
        headers,
        withCredentials,
      })
      .pipe(
        this.mapData(),
        this.mapPayload()
      );
  }

  /**
   * @description add auth http header is missing and it exists in local storage
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
   * @description unwrap the data attribute
   * @returns OperatorFunction
   */
  public mapData<T = any>(): OperatorFunction<JsonApiObject<T>, T> {
    return map((json: JsonApiObject<T>) => json.data);
  }

  /**
 * @description unwrap the data attribute
 * @returns OperatorFunction
 */
  public mapPayload<T = any>(): OperatorFunction<T, any> {
    return map((data: any) => data.payload);
  }

  /**
   * @description verify the date time group fields are parsable as Date and in ISO String format
   * @returns OperatorFunction
   */
  public verifyAndParseDtgs(): OperatorFunction<ExternalDataTranslationResponse, ExternalDataTranslationResponse> {
    return map((resp: ExternalDataTranslationResponse) => {
      const stix = resp.translated.payload.stix;
      const dtgs = ['modified', 'created', 'published'];
      dtgs.forEach((field) => {
        stix[field] = new Date(stix[field]).toISOString();
      });
      resp.translated.payload.stix = stix;
      return resp;
    })
  }

  /**
   * @description verify granular markings have selectors
   * @returns OperatorFunction
   */
  public verifyGranularMarking(): OperatorFunction<ExternalDataTranslationResponse, ExternalDataTranslationResponse> {
    return map((resp: ExternalDataTranslationResponse) => {
      const stix = resp.translated.payload.stix;
      const defaultSelectors = [
        'name',
        'description',
        'title',
        'x_unfetter_object_actions'
      ];
      stix.granular_markings.forEach((marking) => {
        marking.selectors = marking.selectors || defaultSelectors;
      });
      resp.translated.payload.stix = stix;
      return resp;
    });
  }

  /**
   * @description verify granular markings have selectors
   * @returns OperatorFunction
   */
  public verifySourceName(): OperatorFunction<ExternalDataTranslationResponse, ExternalDataTranslationResponse> {
    return map((resp: ExternalDataTranslationResponse) => {
      const stix = resp.translated.payload.stix;
      const defaultSourceName = 'External from Unfetter';
      // const pattern = '^((http[s]?):\/)?\/?([^:\/\s]+)((\/\w+)*\/)?([\w\-\.]*[^#?\s]+)?(.*)?(#[\w\-]+)?$';
      // const regex = new RegExp(pattern, 'i');
      stix.external_references.forEach((ref) => {
        let sourceName = ref.source_name;
        if (sourceName === undefined || sourceName.length < 1) {
          // source name is empty attempt to get a new one
          // const match = regex.exec(sourceName);
          // if (match) {
          // }
          sourceName = defaultSourceName;
        }
        ref.source_name = ref.source_name || sourceName;
      });
      resp.translated.payload.stix = stix;
      return resp;
    });
  }
}
