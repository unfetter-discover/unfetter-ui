import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Constance } from '../../utils/constance';

@Injectable()
export class GenericApi {
    private baseUrl = Constance.API_HOST || '';
    private data: any = null;
    private postHeaders: Headers;
    private authHeaders: Headers;

    constructor(private http: Http) {
        this.postHeaders = new Headers();
        this.postHeaders.append('Content-Type', 'application/json');
        this.postHeaders.append('Accept', 'application/vnd.api+json');
        this.authHeaders = new Headers();
    }

    public setAuthHeaders(token) {
        this.authHeaders.set('Authorization', token);
        this.postHeaders.set('Authorization', token);
    }

    public get(url: string, data?: any): Observable<any> {
        this.data = (data !== undefined && data !== null) ? '/' + data : '';
        let builtUrl = this.baseUrl + url + this.data;
        
        if (!this.authHeaders.get('Authorization')) {
            let token = localStorage.getItem('unfetterUiToken');
            if (token) {
                this.setAuthHeaders(token);
            }
        }
        
        return this.http.get(builtUrl, {headers: this.authHeaders})
            .map(this.extractData)
            .catch(this.handleError);
    }

    public post(url: string, data: any, type?: string): Observable<any> {
        let builtUrl = this.baseUrl + url;
        return this.http.post(builtUrl, data, {headers: this.postHeaders})
            .map(this.extractData)
            .catch(this.handleError);
    }

    public patch(url: string, data: any): Observable<any> {
        let builtUrl = this.baseUrl + url;
        return this.http.patch(builtUrl, data, { headers: this.postHeaders })
            .map(this.extractData)
            .catch(this.handleError);
    }

    public delete(url: string, data?: any): Observable<any> {
        this.data = (data !== undefined && data !== null) ? '/' + data : '';
        let builtUrl = this.baseUrl + url + this.data;
        return this.http.delete(builtUrl, {headers: this.authHeaders})
            .map(this.extractData)
            .catch(this.handleError);
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
