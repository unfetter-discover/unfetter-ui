import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseStixService } from '../base-stix.service';
import { CourseOfAction } from '../../models';

@Injectable()
export class CourseOfActionService implements BaseStixService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'api/courseofaction';  // URL to web api

  constructor(private http: Http) { }

  public load(): Observable<CourseOfAction[]> {
    const url = `${this.url}`;
    return this.http
               .get(url)
               .map((response) => {
                   return response.json().data as CourseOfAction[];
                })
                .catch(this.handleError);
  }

  public get(id: number): Observable<CourseOfAction> {
    console.log('********* ' + id);
    const url = `${this.url}/${id}`;
    return this.http
        .get(url)
        .map((response) => {
            return response.json().data as CourseOfAction;
        })
        .catch(this.handleError);
  }

  public delete(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http
        .delete(url, {headers: this.headers})
        .map((response) => {
            return response.json().data as CourseOfAction;
        })
        .catch(this.handleError);
  }

  public create(courseOfAction: CourseOfAction): Observable<CourseOfAction> {
    return this.http
        .post(this.url, JSON.stringify(courseOfAction), {headers: this.headers})
        .map((response) => {
            return response.json().data as CourseOfAction;
        })
        .catch(this.handleError);
  }

  public update(courseOfAction: CourseOfAction): Observable<CourseOfAction> {
    const url = `${this.url}/${courseOfAction.id}`;
    return this.http
        .put(url, JSON.stringify(courseOfAction), {headers: this.headers})
        .map((response) => {
            return response.json().data as CourseOfAction;
        })
        .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.throw(error.message || error);
  }
}
