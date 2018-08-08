
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Report } from '../../../models/report';
import { JsonApiObject } from '../../../threat-dashboard/models/adapter/json-api-object';
import { Constance } from '../../../utils/constance';

@Injectable({
    providedIn: 'root',
})
export class ReportUploadService {
    private data: any = null;
    private headers: HttpHeaders;
    public readonly baseUrl = Constance.API_HOST || '';
    public readonly path = `/api/ctf/upload`;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
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
            .pipe(
                map((event) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        const percentDone = Math.round(100 * event.loaded / event.total);
                        console.log(`File is ${percentDone}% uploaded`);
                    } else if (event instanceof HttpResponse) {
                        console.log('File is completly uploaded');
                        return event;
                    }
                }),
                map((event) => (event instanceof HttpResponse) ? event.body : []),
                map((reports) => reports.map((report) => report.data)),
                catchError(this.handleError)
            );
    }

    /**
     * @description throws an observable error with jsons error message
     */
    private handleError(errResp: any): Observable<any> {
        if (!errResp) {
            return observableThrowError('unknown error');
        }
        const err = errResp.error;
        const detail = err && err.detail && err.detail.message ? err.detail.message : '';
        let errMsg = detail ? detail : errResp.message;
        if (!errMsg) {
            errMsg = errResp;
        }
        return observableThrowError(errMsg);
    }
}
