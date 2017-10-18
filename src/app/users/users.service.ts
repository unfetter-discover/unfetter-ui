import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GenericApi } from '../global/services/genericapi.service';
import { Constance } from '../utils/constance';

@Injectable()
export class UsersService {
    private userFromTokenUrl = Constance.USER_FROM_TOKEN_URL;
    private finalizeRegistrationUrl = Constance.FINALIZE_REGISTRATION_URL;
    constructor(private genericApi: GenericApi) { }

    public getUserFromToken(): Observable<any> {
        return this.genericApi.get(this.userFromTokenUrl);
    }

    public finalizeRegistration(user): Observable<any> {
        return this.genericApi.post(this.finalizeRegistrationUrl, {data: {attributes: user}});
    }
}
