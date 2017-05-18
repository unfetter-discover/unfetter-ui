import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BaseComponentService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    public autoCompelet(url: string): Observable<any[]> {

        return this.http
               .get(url)
               .map((response) => {
                   return response.json().data as any[];
                });
    }

    public get(url: string): Observable<any[]> {
        return this.http
               .get(url)
               .map((response) => {
                   return response.json().data as any[];
                });
    }

    public delete(url: string, id: string): Observable<any[]> {
        const uri = `${url}/${id}`;
        return this.http
            .delete(uri, {headers: this.headers})
            .map((response) => {
                return response.json();
            });
    }

     public save(url: string, item: any): Observable<any[]> {
          return this.http
            .post(url, JSON.stringify({data: item}), {headers: this.headers})
            .map((response) => {
                return response.json().data;
            });
    }
}
