import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericApi } from '../global/services/genericapi.service';

@Injectable()
export class BaseComponentService {

  constructor(private genericApi: GenericApi) { }

  public autoCompelet(url: string): Observable<any> {
    return this.genericApi.get(url);
  }

  public get(url: string): Observable<any> {
    return this.genericApi.get(url);
  }

  public delete(url: string, id: string): Observable<any> {
    const uri = `${url}/${id}`;
    return this.genericApi.delete(url);
  }

  public save(url: string, item: any): Observable<any> {
    return this.genericApi.post(url, { data: item });
  }
}

// @Injectable()
// export class BaseComponentService {

//   private headers = new Headers({ 'Content-Type': 'application/json' });

//   constructor(private http: Http) { }

//   public autoCompelet(url: string): Observable<any[]> {

//     return this.http
//       .get(url)
//       .map((response) => {
//         return response.json().data as any[];
//       });
//   }

//   public get(url: string): Observable<any[]> {
//     return this.http
//       .get(url)
//       .map((response) => {
//         return response.json().data as any[];
//       });
//   }

//   public delete(url: string, id: string): Observable<any[]> {
//     const uri = `${url}/${id}`;
//     return this.http
//       .delete(uri, { headers: this.headers })
//       .map((response) => {
//         return response.json();
//       });
//   }

//   public save(url: string, item: any): Observable<any[]> {
//     return this.http
//       .post(url, JSON.stringify({ data: item }), { headers: this.headers })
//       .map((response) => {
//         return response.json().data;
//       });
//   }
// }
