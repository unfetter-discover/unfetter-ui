import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpRequest, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Constance } from '../../utils/constance';

@Injectable()
export class UploadService {
    private baseUrl = Constance.API_HOST || '';
    private data: any = null;
    private postHeaders: HttpHeaders;

    constructor(private http: HttpClient) {
        this.postHeaders = new HttpHeaders();
        this.postHeaders.append('Content-Type', 'multipart/form-data');
        this.postHeaders.append('Accept', 'application/json');
    }

    /**
     * @description upload a file
     * @param url 
     * @param file 
     */
    public post(url: string, file: File): Observable<HttpEvent<{}>> {
        const formData: FormData = new FormData();
        formData.append('upfile', file, file.name);
        const fullUrl = this.baseUrl + url;
        const req = new HttpRequest('POST', fullUrl, formData, {
            reportProgress: true,
            headers: this.postHeaders
        });
        // return this.http.post<Response>(fullUrl, data, { headers: this.postHeaders })
        //     .map(this.extractData)
        //     .catch(this.handleError);
        return this.http.request(req)
            .map((event) => {
                if (event.type === HttpEventType.UploadProgress) {
                    const percentDone = Math.round(100 * event.loaded / event.total);
                    console.log(`File is ${percentDone}% uploaded`);
                } else if (event instanceof HttpResponse) {
                    console.log('File is completley uploaded');
                    return event;
                }
            })
    }

    private extractData(res: Response) {
        let body = res.json();
        if (body['data'] !== undefined) {
            return body['data'] as any[];
        }
        return ({});
    }

    private handleError(error: any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
