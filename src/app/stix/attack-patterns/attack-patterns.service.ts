import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AttackPattern } from '../../models';

@Injectable()
export class AttackPatternsService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'api/attackPatterns';  // URL to web api

  constructor(private http: Http) { }

  public load(): Observable<AttackPattern[]> {
    const url = `${this.url}`;
    return this.http
               .get(url)
               .map((response) => {
                   return response.json().data as AttackPattern[];
                })
                .catch(this.handleError);
  }

  public get(id: number): Observable<AttackPattern> {
    console.log('********* ' + id);
    const url = `${this.url}/${id}`;
    return this.http
        .get(url)
        .map((response) => {
            return response.json().data as AttackPattern;
        })
        .catch(this.handleError);
  }

  public delete(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http
        .delete(url, {headers: this.headers})
        .map((response) => {
            return response.json().data as AttackPattern;
        })
        .catch(this.handleError);
  }

  public create(AttackPattern: AttackPattern): Observable<AttackPattern> {
    return this.http
        .post(this.url, JSON.stringify(AttackPattern), {headers: this.headers})
        .map((response) => {
            return response.json().data as AttackPattern;
        })
        .catch(this.handleError);
  }

  public update(AttackPattern: AttackPattern): Observable<AttackPattern> {
    const url = `${this.url}/${AttackPattern.id}`;
    return this.http
        .put(url, JSON.stringify(AttackPattern), {headers: this.headers})
        .map((response) => {
            return response.json().data as AttackPattern;
        })
        .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.throw(error.message || error);
  }
}
