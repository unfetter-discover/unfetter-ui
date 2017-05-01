import { Observable } from 'rxjs/Observable';
//import { StixObject } from '../models'

export interface BaseStixService {
    load(): Observable<any[]>;
    get(id: number): Observable<any>;
    delete(id: string): Observable<any>;
    update(item: any):  Observable<any>;


}