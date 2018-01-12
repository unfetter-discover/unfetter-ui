import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constance } from '../../utils/constance';
import { JsonApi } from '../../models/jsonapi';
import { JsonApiData } from '../../models/jsonapi-data';

@Injectable()
export class GenericApi {
    private baseUrl = Constance.API_HOST || '';
    private data: any = null;
    private postHeaders: HttpHeaders;

    constructor(private http: HttpClient) {
        this.postHeaders = new HttpHeaders();
        this.postHeaders.append('Content-Type', 'application/json');
        this.postHeaders.append('Accept', 'application/vnd.api+json');
    }

    /**
     * @description fetch data of type T
     * @param url
     * @param data
     * @return {Observable<T>} 
     */
    public getAs<T = JsonApiData>(url: string, data?: any): Observable<T> {
        this.data = (data !== undefined && data !== null) ? '/' + data : '';
        let builtUrl = this.baseUrl + url + this.data;
        
        return this.http.get<JsonApi<T>>(builtUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * @description fetch data with weak types, for older code
     * @param url
     * @param data
     * @return {Observable<T>} 
     */
    public get(url: string, data?: any): Observable<any> {
        this.data = (data !== undefined && data !== null) ? '/' + data : '';
        let builtUrl = this.baseUrl + url + this.data;
        
        return this.http.get(builtUrl)
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
        return this.http.delete(builtUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData<T>(res: JsonApi<T>): T {
        return res.data || {} as T;
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
