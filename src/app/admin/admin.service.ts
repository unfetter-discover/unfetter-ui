import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { GenericApi } from '../global/services/genericapi.service';
import { Constance } from '../utils/constance';

@Injectable()
export class AdminService {
    
    private adminUrl = Constance.ADMIN_URL;
    private identitiesUrl = Constance.IDENTITIES_URL;

    constructor(private genericApi: GenericApi) { }

    public getUsersPendingApproval(): Observable<any> {
        return this.genericApi.get(`${this.adminUrl}/users-pending-approval`);
    }

    public getOrgLeaderApplicants(): Observable<any> {
        return this.genericApi.get(`${this.adminUrl}/organization-leader-applicants`);
    }

    public getWebsiteVisits(): Observable<any> {
        return this.genericApi.get(`${this.adminUrl}/site-visits`);
    }

    public getWebsiteVisitsGraph(numDays: number): Observable<any> {
        return this.genericApi.get(`${this.adminUrl}/site-visits-graph/${numDays}`);
    }

    public processUserApproval(user): Observable<any> {
        return this.genericApi.post(`${this.adminUrl}/process-user-approval`, user);
    }

    public getOrganizations(): Observable<any> {
        const filter = {
            'stix.identity_class': 'organization'
        };
        return this.genericApi.get(`${this.identitiesUrl}?filter=${encodeURI(JSON.stringify(filter))}`);
    }

    public processOrgApplicant(userId, organization): Observable<any> {
        return this.genericApi.post(`${this.adminUrl}/process-organization-applicant/${userId}`, organization);
    }
}
