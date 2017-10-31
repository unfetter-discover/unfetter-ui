import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { GenericApi } from '../global/services/genericapi.service';
import { Constance } from '../utils/constance';

@Injectable()
export class OrganizationsService {
    
    private orgUrl = Constance.ORGANIZATIONS_URL;
    private identitiesUrl = Constance.IDENTITIES_URL;

    constructor(private genericApi: GenericApi) { }

    public getPendingApprovals(): Observable<any> {
        return this.genericApi.get(`${this.orgUrl}/pending-approval`);
    }

    public processUser(id, organiztions): Observable<any> {
        return this.genericApi.post(`${this.orgUrl}/process-approval/${id}`, organiztions);
    };
}
