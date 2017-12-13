import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpRequest, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Constance } from '../../utils/constance';
import { Report } from '../../models/report';
import { JsonApiObject } from '../../threat-dashboard/models/adapter/json-api-object';

@Injectable()
export class UploadService {
    private data: any = null;
    private headers: HttpHeaders;
    private readonly authStorageKey = 'unfetterUiToken';
    private readonly authHeaderKey = 'Authorization';
    private readonly baseUrl = Constance.API_HOST || '';
    private readonly path = `/api/ctf/upload`;

    constructor(private http: HttpClient) {
        this.headers = this.genHeadersWithAuth();
        this.headers.append('Content-Type', 'multipart/form-data');
        this.headers.append('Accept', 'application/json');
    }

    /**
     * @description upload a file
     * @param {File} file
     * @return {Observable<Report[]>}
     */
    public post(file: File): Observable<Report[]> {
        const headers = this.headers;
        const formData: FormData = new FormData();
        formData.append('upfile', file, file.name);
        const fullUrl = this.baseUrl + this.path;
        const req = new HttpRequest('POST', fullUrl, formData, {
            reportProgress: true,
            headers
        });
        return this.http.request<Array<JsonApiObject<Report>>>(req)
            .map((event) => {
                if (event.type === HttpEventType.UploadProgress) {
                    const percentDone = Math.round(100 * event.loaded / event.total);
                    console.log(`File is ${percentDone}% uploaded`);
                } else if (event instanceof HttpResponse) {
                    console.log('File is completly uploaded');
                    return event;
                }
            })
            .map((event) => (event instanceof HttpResponse) ? event.body : [])
            .map((reports) => reports.map((report) => report.data))
            .catch(this.handleError);
    }

    /**
     * @description sets the authorization token in the header, 
     *  iff is it not already set in the header and it exists in localstorage
     * 
     * @return {void}
     */
    private genHeadersWithAuth(headers = new HttpHeaders()): HttpHeaders {
        if (!headers.get(this.authHeaderKey)) {
            const token = localStorage.getItem(this.authStorageKey);
            if (token) {
                return headers.set(this.authHeaderKey, token);
            }
        }

        return headers;
    }

    /**
     * @description throws an observable error with jsons error message
     */
    private handleError(errResp: any): Observable<any> {
        if (!errResp) {
            return Observable.throw('unknown error');
        }
        const err = errResp.error;
        const detail = err && err.detail && err.detail.message
            ? err.detail.message : '';
        let errMsg = detail ? detail : errResp.message;
        if (!errMsg) {
            errMsg = errResp;
        }
        return Observable.throw(errMsg);
    }
}
