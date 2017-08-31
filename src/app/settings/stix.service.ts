import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseStixService } from './base-stix.service';

@Injectable()
export class StixService implements BaseStixService {
    public url = '';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    public load(filter?: any): Observable<any[]> {
        const url = filter ? `${this.url}` + '?' + filter : `${this.url}`;
        return this.http
               .get(url)
               .map((response) => {
                   return response.json().data as any[];
                })
                .catch(this.handleError);
    }

    public get(id: string): Observable<any> {
        const url = `${this.url}/${id}`;
        return this.http
            .get(url)
            .map((response) => {
                return response.json().data;
            })
            .catch(this.handleError);
    }

     public getByUrl(url: string): Observable<any> {
         return this.http
            .get(url)
            .map((response) => {
                return response.json().data;
            })
            .catch(this.handleError);
    }

    public delete(item: any): Observable<void> {
        const url = item.url + '/' + item.id;
        return this.http
            .delete(url, {headers: this.headers})
            .map((response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public create(item: any): Observable<any> {
        console.log(JSON.stringify({item}));
        return this.http
            .post(item.url, JSON.stringify({data: item}), {headers: this.headers})
            .map((response) => {
                return response.json().data;
            })
            .catch(this.handleError);
    }

    public update(item: any): Observable<any> {
        const url = `${item.url}/${item.id}`;
        return this.http
            .patch(url, JSON.stringify(item.attributes), {headers: this.headers})
            .map((response) => {
                return response.json().data;
            })
            .catch(this.handleError);
    }

    private handleError(error: Response | any): Observable<any> {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
