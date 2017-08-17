import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GenericApi {
    // TODO dont hard code this
    private baseUrl: string = "https://localhost/";
    private data: any = null;

    constructor(private http: Http) { }

    public get(url: string, data?: any): Observable<Response> {
        this.data = (data !== undefined && data !== null) ? '/' + data : '';
        let builtUrl = this.baseUrl + url + this.data;
        return this.http.get(builtUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public post(url: string, data: any, type?: string): Observable<Response> {
        let builtUrl = this.baseUrl + url;
        return this.http.post(builtUrl, data)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public patch(url: string, data: any): Observable<Response> {
        let builtUrl = this.baseUrl + url;
        return this.http.patch(builtUrl, data)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public delete(url: string, data?: any): Observable<Response> {
        this.data = (data != undefined && data != null) ? '/' + data : '';
        let builtUrl = this.baseUrl + url + this.data;
        return this.http.delete(builtUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        if(body['data'] !== undefined) {
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
