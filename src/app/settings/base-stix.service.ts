import { Observable } from 'rxjs';

export interface BaseStixService {
    url: string;
    load(filter?: any): Observable<any[]>;
    get(id: string): Observable<any>;
    update(item: any): Observable<any>;
    create(item: any): Observable<any>;
    delete(item: any): Observable<any>;
    getByUrl(url: string): Observable<any>;
}
