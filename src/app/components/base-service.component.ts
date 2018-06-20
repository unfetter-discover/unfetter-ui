import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GenericApi } from '../core/services/genericapi.service';

@Injectable()
export class BaseComponentService {

    constructor(private genericApi: GenericApi) { }

    public autoComplete(url: string): Observable<any> {
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
