import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseStixService } from '../base-stix.service';
import { Sighting } from '../../models';

@Injectable()
export class SightingService implements BaseStixService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'api/sightings';  // URL to web api

  constructor(private http: Http) { }

  public load(): Observable<Sighting[]> {
    const url = `${this.url}`;
    return this.http
               .get(url)
               .map((response) => {
                   return response.json().data as Sighting[];
                })
                .catch(this.handleError);
  }

  public get(id: number): Observable<Sighting> {
    console.log('********* ' + id);
    const url = `${this.url}/${id}`;
    return this.http
        .get(url)
        .map((response) => {
            return response.json().data as Sighting;
        })
        .catch(this.handleError);
  }

  public delete(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http
        .delete(url, {headers: this.headers})
        .map((response) => {
            return response.json().data as Sighting;
        })
        .catch(this.handleError);
  }

  public create(Sighting: Sighting): Observable<Sighting> {
    return this.http
        .post(this.url, JSON.stringify(Sighting), {headers: this.headers})
        .map((response) => {
            return response.json().data as Sighting;
        })
        .catch(this.handleError);
  }

  public update(Sighting: Sighting): Observable<Sighting> {
    const url = `${this.url}/${Sighting.id}`;
    return this.http
        .put(url, JSON.stringify(Sighting), {headers: this.headers})
        .map((response) => {
            return response.json().data as Sighting;
        })
        .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.throw(error.message || error);
  }
}
