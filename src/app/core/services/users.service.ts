import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserProfile } from '../../models/user/user-profile';
import { Constance } from '../../utils/constance';
import { GenericApi } from './genericapi.service';
import { JsonApiData, Identity } from 'stix';

@Injectable()
export class UsersService {

    private userFromTokenUrl = Constance.USER_FROM_TOKEN_URL;
    private finalizeRegistrationUrl = Constance.FINALIZE_REGISTRATION_URL;
    private profileByIdUrl = Constance.PROFILE_BY_ID_URL;
    private identitiesUrl = Constance.IDENTITIES_URL;
    private orgUrl = Constance.ORGANIZATIONS_URL;
    private refreshTokenUrl = Constance.REFRESH_TOKEN_URL;
    private authUrl = Constance.AUTH_URL;

    constructor(private genericApi: GenericApi) { }

    public getUserFromToken(): Observable<any> {
        return this.genericApi.get(this.userFromTokenUrl);
    }

    public finalizeRegistration(user): Observable<any> {
        return this.genericApi.post(this.finalizeRegistrationUrl, { data: { attributes: user } });
    }

    public getUserProfileById(userId): Observable<UserProfile> {
        return this.genericApi.get(`${this.profileByIdUrl}/${userId}`);
    }

    public getOrganizations(): Observable<JsonApiData<Identity>[]> {
        const filter = {
            'stix.identity_class': 'organization'
        };
        return this.genericApi.getAs<JsonApiData<Identity>[]>(
                `${this.identitiesUrl}?filter=${encodeURI(JSON.stringify(filter))}`);
    }

    public requestOrgLeadership(userId, orgId): Observable<any> {
        return this.genericApi.get(`${this.orgUrl}/request-leadership/${userId}/${orgId}`);
    }

    public requestOrgMembership(userId, orgId): Observable<any> {
        return this.genericApi.get(`${this.orgUrl}/request-membership/${userId}/${orgId}`);
    }

    public changeOrgSubscription(userId: string, orgId: string, subscribe: boolean): Observable<any> {
        return this.genericApi.get(`${this.orgUrl}/subscription/${userId}/${orgId}/${subscribe}`);
    }

    public refreshToken(): Observable<string> {
        return this.genericApi.get(this.refreshTokenUrl)
            .pluck('attributes')
            .pluck('token');
    }

    public emailAvailable(email: string): Observable<boolean> {
        return this.genericApi.get(`${this.authUrl}/email-available/${email}`)
            .pluck('attributes')
            .pluck('available');
    }

    public userNameAvailable(userName: string): Observable<boolean> {
        return this.genericApi.get(`${this.authUrl}/username-available/${userName}`)
            .pluck('attributes')
            .pluck('available');
    }

}
