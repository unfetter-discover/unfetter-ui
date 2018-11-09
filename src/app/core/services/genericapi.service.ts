
import { throwError as observableThrowError, of as observableOf,  Observable  } from 'rxjs';

import { catchError, map, filter, tap, pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Constance } from '../../utils/constance';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { JsonApi } from '../../models/json/jsonapi';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { LastModifiedStix } from '../../global/models/last-modified-stix';
import { StixLabelEnum } from '../../models/stix/stix-label.enum';
import { NavigateToErrorPage } from '../../root-store/utility/utility.actions';
import { StixCore } from 'stix';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { StixApiOptions } from '../../global/models/stix-api-options';
import { StixUrls } from '../../global/enums/stix-urls.enum';
import { GridFSFile } from '../../global/models/grid-fs-file';

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
            .pipe(
                map((dat): any => this.extractData(dat)),
                catchError(this.handleError)
            );
    }

    /**
     * @description fetch data of type T, with error handling for ngrx
     * @param url
     * @param data
     * @return {Observable<T>} 
     */
    public getNgrx<T = JsonApiData>(url: string, data?: any): Observable<T> {
        this.data = (data !== undefined && data !== null) ? '/' + data : '';
        let builtUrl = this.baseUrl + url + this.data;

        return this.http.get<JsonApi<T>>(builtUrl)
            .pipe(
                catchError(this.handleNgrxError),
                map((dat): any => this.extractData(dat))
            );
    }

    /**
     * @description fetch stix, and unwrap all json api stuff
     *  usage: 
     *      - Get all attack patterns: getStix<AttackPattern[]>(StixUrls.ATTACK_PATTERNS)
     *      - Get all attack patterns with options: getStix<AttackPattern[]>(StixUrls.ATTACK_PATTERNS, null, { sort: {'stix.name': -1} })
     *      - Get attack pattern by ID: getStix<AttackPattern[]>(StixUrls.ATTACK_PATTERNS, 'attack-pattern--123')
     * @param {StixUrls} url
     * @param {string} id
     * @param {StixApiOptions} options
     * @return {Observable<T>} 
     */
    public getStix<T extends StixCore[] | StixCore>(url: StixUrls, id?: string, options?: StixApiOptions): Observable<T> {
        let builtUrl = this.baseUrl + url;

        if (id) {
            builtUrl = builtUrl.concat(`/${id}`);
        }

        if (options) {
            builtUrl = builtUrl.concat('?');
            Object.entries(options).forEach((option) => {
                builtUrl = builtUrl.concat(`${option[0]}=${encodeURI(JSON.stringify(option[1]))}&`);
            });
        }

        return this.http.get<JsonApi<T>>(builtUrl)
            .pipe(
                map((dat): any => this.extractData(dat)),
                RxjsHelpers.unwrapJsonApi(),
                catchError(this.handleError)
            );
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
            catchError(this.handleError));
    }

    /**
     * @description fetch data of type T
     * @param url
     * @param data
     * @return {Observable<T>} 
     */
    public postAs<T = JsonApiData>(url: string, data?: any): Observable<T> {
        const builtUrl = this.baseUrl + url;
        return this.http.post<JsonApi<T>>(builtUrl, data, { headers: this.postHeaders })
            .pipe(
                map((dat): any => this.extractData(dat)),
                catchError(this.handleError)
            );
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
            catchError(this.handleError));
    }

    /**
     * @description fetch data of type T
     * @param url
     * @param data
     * @return {Observable<T>} 
     */
    public patchAs<T = JsonApiData>(url: string, data?: any): Observable<T> {
        const builtUrl = this.baseUrl + url;
        return this.http.patch<JsonApi<T>>(builtUrl, data, { headers: this.postHeaders })
            .pipe(
                map((dat): any => this.extractData(dat)),
                catchError(this.handleError)
            );

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
            catchError(this.handleError));
    }

    public delete(url: string, data?: any): Observable<any> {
        this.data = (data !== undefined && data !== null) ? '/' + data : '';
        let builtUrl = this.baseUrl + url + this.data;
        return this.http.delete(builtUrl).pipe(
            map(this.extractData),
            catchError(this.handleError));
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
            .get<JsonApi<Partial<LastModifiedStix>[]>>(url)
                .pipe(
                    map((dat): any => this.extractData(dat)),
                    catchError(this.handleError)
                );
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
            .get<JsonApi<Partial<LastModifiedStix>[]>>(url)
                .pipe(
                    map((dat): any => this.extractData(dat)),
                    catchError(this.handleError)
                );
    }

    /**
     * @param  {FileList} files
     * @param  {(number)=>void} progressCallback?
     * @returns Observable<[GridFSFile]>
     * @description This is the observable to upload a list of files to the upload/files route.
     * The optional callback will assist in driving progress bars.
     */
    public uploadAttachments(files: File[], progressCallback?: (number) => void): Observable<GridFSFile[]> {
        const formData: FormData = new FormData();
        files.forEach((file) => formData.append('attachments', file));
        const req = new HttpRequest('POST', `${Constance.UPLOAD_URL}/files`, formData, {
            reportProgress: true
        }); 
        return this.uploadFile<GridFSFile[]>(req, progressCallback);
    }

    public uploadFile<T = any>(req: HttpRequest<FormData>, progressCallback?: (number) => void): Observable<T> {
        return this.http.request(req)
            .pipe(
                tap((event) => {
                    if (event.type === HttpEventType.UploadProgress && progressCallback) {
                        progressCallback(Math.round(100 * event.loaded / event.total));
                    }
                }),
                filter((event) => event instanceof HttpResponse),
                pluck('body'),
                map(this.extractData),
                RxjsHelpers.unwrapJsonApi(),
                catchError(this.handleError)
            );
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
    private handleError(error: any): ErrorObservable<any> {
        return observableThrowError(error);
    }

    /**
     * @description Error handler for NGRX effects, throws an action to navigate to error page
     * @param error
     */
    private handleNgrxError(error: any): ErrorObservable<any> {
        return observableThrowError(new NavigateToErrorPage(error.status || 520));
    }
}
