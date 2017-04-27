import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseStixService } from '../base-stix.service';
import { Campaign } from '../../models';

@Injectable()
export class CampaignService implements BaseStixService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'api/campaigns';  // URL to web api

  constructor(private http: Http) { }

  public load(): Observable<Campaign[]> {
    const url = `${this.url}`;
    return this.http
               .get(url)
               .map((response) => {
                   return response.json().data as Campaign[];
                })
                .catch(this.handleError);
  }

  public get(id: number): Observable<Campaign> {
    console.log('********* ' + id);
    const url = `${this.url}/${id}`;
    return this.http
        .get(url)
        .map((response) => {
            return response.json().data as Campaign;
        })
        .catch(this.handleError);
  }

  public delete(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http
        .delete(url, {headers: this.headers})
        .map((response) => {
            return response.json().data as Campaign;
        })
        .catch(this.handleError);
  }

  public create(Campaign: Campaign): Observable<Campaign> {
    return this.http
        .post(this.url, JSON.stringify(Campaign), {headers: this.headers})
        .map((response) => {
            return response.json().data as Campaign;
        })
        .catch(this.handleError);
  }

  public update(Campaign: Campaign): Observable<Campaign> {
    const url = `${this.url}/${Campaign.id}`;
    return this.http
        .put(url, JSON.stringify(Campaign), {headers: this.headers})
        .map((response) => {
            return response.json().data as Campaign;
        })
        .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.throw(error.message || error);
  }
}
