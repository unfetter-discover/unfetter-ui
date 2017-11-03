import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GenericApi } from '../global/services/genericapi.service';
import { Constance } from '../utils/constance';

@Injectable()
export class UsersService {

    private userFromTokenUrl = Constance.USER_FROM_TOKEN_URL;
    private finalizeRegistrationUrl = Constance.FINALIZE_REGISTRATION_URL;
    private profileByIdUrl = Constance.PROFILE_BY_ID_URL;
    private identitiesUrl = Constance.IDENTITIES_URL;
    private orgUrl = Constance.ORGANIZATIONS_URL;

    constructor(private genericApi: GenericApi) { }

    public getUserFromToken(): Observable<any> {
        return this.genericApi.get(this.userFromTokenUrl);
    }

    public finalizeRegistration(user): Observable<any> {
        return this.genericApi.post(this.finalizeRegistrationUrl, {data: {attributes: user}});
    }

    public getUserProfileById(userId): Observable<any> {
        return this.genericApi.get(`${this.profileByIdUrl}/${userId}`);
    }

    public getOrganizations(): Observable<any> {
        const filter = {
            'stix.identity_class': 'organization'
        };
        return this.genericApi.get(`${this.identitiesUrl}?filter=${encodeURI(JSON.stringify(filter))}`);
    }

    public requestOrgLeadership(userId, orgId): Observable<any> {
        return this.genericApi.get(`${this.orgUrl}/request-leadership/${userId}/${orgId}`);
    }

    public requestOrgMemebership(userId, orgId): Observable<any> {
        return this.genericApi.get(`${this.orgUrl}/request-membership/${userId}/${orgId}`);
    }
}
