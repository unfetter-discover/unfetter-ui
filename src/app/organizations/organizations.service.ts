import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { GenericApi } from '../core/services/genericapi.service';
import { Constance } from '../utils/constance';

@Injectable()
export class OrganizationsService {
    
    private orgMngtUrl = Constance.ORGANIZATIONS_MANAGEMENT_URL;
    private identitiesUrl = Constance.IDENTITIES_URL;

    constructor(private genericApi: GenericApi) { }

    public getPendingApprovals(): Observable<any> {
        return this.genericApi.get(`${this.orgMngtUrl}/pending-approval`);
    }

    public processUser(id, organiztions): Observable<any> {
        return this.genericApi.post(`${this.orgMngtUrl}/process-approval/${id}`, organiztions);
    };
}
