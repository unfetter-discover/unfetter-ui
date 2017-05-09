import { Observable } from 'rxjs/Observable';

export interface BaseStixService {
    url: string;
    load(): Observable<any[]>;
    get(id: string): Observable<any>;
    update(item: any): Observable<any>;
    create(item: any): Observable<any>;
    delete(id: string): Observable<any>;
    update(item: any):  Observable<any>;
}
