import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { GenericApi } from '../core/services/genericapi.service';
import { Constance } from '../utils/constance';

@Injectable()
export class AdminService {

    private adminUrl = Constance.ADMIN_URL;
    private identitiesUrl = Constance.IDENTITIES_URL;
    private configUrl = Constance.CONFIG_URL;

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

    public getConfig(): Observable<any> {
        return this.genericApi.get(`${this.configUrl}`);
    }

    public getSingleConfig(id): Observable<any> {
        return this.genericApi.get(`${this.configUrl}/${id}`)
    }

    public deleteSingleConfig(id): Observable<any> {
        return this.genericApi.delete(`${this.configUrl}/${id}`)
    }

    public addConfig(data): Observable<any> {
        return this.genericApi.post(`${this.configUrl}`, data)
    }

    public processChangedData(data, id): Observable<any> {
        return this.genericApi.patch(`${this.configUrl}/${id}`, data);
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

    public getHeartbeat(): Observable<any> {
        return this.genericApi.get(`${this.adminUrl}/heartbeat`);
    }
}
