import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Constance } from '../../utils/constance';
import { UrlTranslationResponse } from '../models/adapter/url-translation-response';
import { JsonApiObject } from '../models/adapter/json-api-object';
import { UrlTranslationRequest } from '../models/adapter/url-translation-request';
import { ExternalDataTranslationRequest } from '../models/adapter/external-data-translation-request';
import { ExternalDataTranslationResponse } from '../models/adapter/external-data-translation-response';

@Injectable()
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
  public translateUrl(req: UrlTranslationRequest): Observable<JsonApiObject<UrlTranslationResponse>> {
    if (!req || !req.systemName || !req.url) {
      return Observable.empty();
    }

    const jsonApiObject = new JsonApiObject<UrlTranslationRequest>();
    jsonApiObject.data = req;
    const body = JSON.stringify(jsonApiObject);
    const headers = this.ensureAuthHeaders(this.headers);
    const url = this.baseUrl + this.translateUrlPath;
    return this.httpClient.post<JsonApiObject<UrlTranslationResponse>>(url, body, { headers });
  }

  /**
   * @description translate a url
   * @param {UrlTranslationRequest} req
   */
  public translateData(req: ExternalDataTranslationRequest): Observable<JsonApiObject<ExternalDataTranslationResponse>> {
    if (!req || !req.systemName || !req.payload) {
      return Observable.empty();
    }

    const jsonApiObject = new JsonApiObject<ExternalDataTranslationRequest>();
    jsonApiObject.data = req;
    const body = JSON.stringify(jsonApiObject);
    const headers = this.ensureAuthHeaders(this.headers);
    const url = this.baseUrl + this.translateDataPath;
    return this.httpClient.post<JsonApiObject<ExternalDataTranslationResponse>>(url, body, { headers });
  }

  /**
   * @description generic fetch of a report
   */
  public fetchReport(url: string, includeAuthHeaders = false): any {
    if (!url) {
      return Observable.empty();
    }
  
    let headers = this.headers;
    if (includeAuthHeaders) {
      headers = this.ensureAuthHeaders(headers);
    }

    return this.httpClient.get<any>(url, { headers });
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

}
