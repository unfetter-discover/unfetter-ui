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
    private path = `/api/ctf/upload`;
    private data: any = null;
    private postHeaders: HttpHeaders;

    constructor(private http: HttpClient) {
        this.postHeaders = new HttpHeaders();
        this.postHeaders.append('Content-Type', 'multipart/form-data');
        this.postHeaders.append('Accept', 'application/json');
    }

    /**
     * @description upload a file
     * @param file 
     */
    public post(file: File): Observable<any[]> {
        const formData: FormData = new FormData();
        formData.append('upfile', file, file.name);
        const fullUrl = this.baseUrl + this.path;
        const req = new HttpRequest('POST', fullUrl, formData, {
            reportProgress: true,
            headers: this.postHeaders
        });
        return this.http.request(req)
            .map((event) => {
                if (event.type === HttpEventType.UploadProgress) {
                    const percentDone = Math.round(100 * event.loaded / event.total);
                    console.log(`File is ${percentDone}% uploaded`);
                } else if (event instanceof HttpResponse) {
                    console.log('File is completly uploaded');
                    return event;
                }
            })
            .map((event) => {
                if (event instanceof HttpResponse) {
                    return event.body;
                } else {
                    return [];
                }
            })
            .catch(this.handleError);
    }

    /**
     * @description extract the data elements from the response body
     * @param res 
     */
    // private extractData(res: HttpResponse<{}>) {
    //     const body = res.body;
    //     if (body['data'] !== undefined) {
    //         return body['data'] as any[];
    //     }
    //     return ({});
    // }

    /**
     * @description throws an observable error with jsons error message
     */
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
