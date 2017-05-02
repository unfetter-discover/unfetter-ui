import { Observable } from 'rxjs/Observable';

export interface BaseStixService {
    load(): Observable<any[]>;
    get(id: number): Observable<any>;
    update(item: any): Observable<any>;
}
