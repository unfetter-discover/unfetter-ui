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
}
