
import {throwError as observableThrowError, of as observableOf,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constance } from '../../utils/constance';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { JsonApi } from '../../models/json/jsonapi';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { LastModifiedStix } from '../../global/models/last-modified-stix';
import { StixLabelEnum } from '../../models/stix/stix-label.enum';

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

        return this.http.get<JsonApi<T>>(builtUrl).pipe(
            map(this.extractData),
            catchError(this.handleError),);
    }

    /**
     * @description fetch data with weak types, for older code
     * @param url
     * @param data
     * @return {Observable<any>} 
     */
    public get(url: string, data?: any): Observable<any> {
        this.data = (data !== undefined && data !== null) ? '/' + data : '';
        let builtUrl = this.baseUrl + url + this.data;

        return this.http.get(builtUrl).pipe(
            map(this.extractData),
            catchError(this.handleError),);
    }

    /**
     * @description fetch data of type T
     * @param url
     * @param data
     * @return {Observable<T>} 
     */
    public postAs<T = JsonApiData>(url: string, data?: any): Observable<T> {
        const builtUrl = this.baseUrl + url;
        return this.http.post<JsonApi<T>>(builtUrl, data, { headers: this.postHeaders }).pipe(
            map(this.extractData),
            catchError(this.handleError),);
    }

    /**
     * @description
     * TODO: remove this when things are ported over to postAs
     * @see postAs for better typing
     * @param {string} url
     * @param {any} data
     * @param {type} string optional
     * @return {Observable<any>}
     */
    public post(url: string, data: any, type?: string): Observable<any> {
        let builtUrl = this.baseUrl + url;
        return this.http.post(builtUrl, data, { headers: this.postHeaders }).pipe(
            map(this.extractData),
            catchError(this.handleError),);
    }

    /**
     * @description fetch data of type T
     * @param url
     * @param data
     * @return {Observable<T>} 
     */
    public patchAs<T = JsonApiData>(url: string, data?: any): Observable<T> {
        const builtUrl = this.baseUrl + url;
        return this.http.patch<JsonApi<T>>(builtUrl, data, { headers: this.postHeaders }).pipe(
            map(this.extractData),
            catchError(this.handleError),);

    }

    /**
     * @description
     * TODO: remove this after porting to patchAs
     * @see patchAs for better typings
     * @param url
     * @param data
     */
    public patch(url: string, data: any): Observable<any> {
        let builtUrl = this.baseUrl + url;
        return this.http.patch(builtUrl, data, { headers: this.postHeaders }).pipe(
            map(this.extractData),
            catchError(this.handleError),);
    }

    public delete(url: string, data?: any): Observable<any> {
        this.data = (data !== undefined && data !== null) ? '/' + data : '';
        let builtUrl = this.baseUrl + url + this.data;
        return this.http.delete(builtUrl).pipe(
            map(this.extractData),
            catchError(this.handleError),);
    }

    /**
     * @description retrieve <i>partial last modified stix objects</i>, for all creators/users in system
     * @return {Observable<Partial<LastModifiedStix>[]>}
     */
    public getLatestByType(stixType: StixLabelEnum): Observable<Partial<LastModifiedStix>[]> {
        if (!stixType || stixType.trim() === '') {
            return observableOf([]);
        }

        const url = `${this.baseUrl}/latest/type/${stixType}`;
        return this.http
            .get<JsonApi<Partial<LastModifiedStix>[]>>(url).pipe(
            map(this.extractData),
            catchError(this.handleError),);
    }

    /**
     * @description retrieve <i>partial last modified stix objects</i> for given creator
     * @param {string} userId, creator mongo user id, not stix identity
     * @return {Observable<Partial<LastModifiedStix>[]>}
     */
    public getLatestByTypeAndCreatorId(stixType: StixLabelEnum, creatorId: string): Observable<Partial<LastModifiedStix>[]> {
        if (!stixType || stixType.trim() === '') {
            return observableOf([]);
        }

        if (!creatorId || creatorId.trim() === '') {
            return this.getLatestByType(stixType);
        }

        const url = `${this.baseUrl}/latest/type/${stixType}/creator/${creatorId}`;
        return this.http
            .get<JsonApi<Partial<LastModifiedStix>[]>>(url).pipe(
            map(this.extractData),
            catchError(this.handleError),);
    }

    /**
     * @description unwrap the data element from JsonApi
     * @param res
     * @return {T}
     */
    private extractData<T>(res: JsonApi<T>): T {
        return res.data || {} as T;
    }

    /**
     * @description throw error
     * @param error
     */
    private handleError(error: any): ErrorObservable {
        return observableThrowError(error);
    }
}
