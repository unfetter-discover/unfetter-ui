import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AttackPattern } from '../../models/attack-pattern';

@Injectable()
export class AttackPatternsService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private attackPatternUrl = 'api/attackPatterns';  // URL to web api

  constructor(private http: Http) { }

  public getAttackPatterns(): Observable<AttackPattern[]> {

    return this.http
               .get(this.attackPatternUrl)
               .map((response) => {
                   return response.json().data as AttackPattern[];
                })
                .catch(this.handleError);
  }

  public getAttackPattern(id: number): Observable<AttackPattern> {
    const url = `${this.attackPatternUrl}/${id}`;
    return this.http
        .get(url)
        .map((response) => {
            return response.json().data as AttackPattern;
        })
        .catch(this.handleError);
  }

  public delete(id: number): Observable<void> {
    const url = `${this.attackPatternUrl}/${id}`;
    return this.http
        .delete(url, {headers: this.headers})
        .map((response) => {
            return response.json().data as AttackPattern;
        })
        .catch(this.handleError);
  }

  public create(name: string): Observable<AttackPattern> {
    let params = `{name: ${name}}`;
    return this.http
        .post(this.attackPatternUrl, JSON.stringify(params), {headers: this.headers})
        .map((response) => {
            return response.json().data as AttackPattern;
        })
        .catch(this.handleError);
  }

  public update(attackPattern: AttackPattern): Observable<AttackPattern> {
    const url = `${this.attackPatternUrl}/${attackPattern.id}`;
    return this.http
        .put(url, JSON.stringify(attackPattern), {headers: this.headers})
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
