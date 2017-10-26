import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { GenericApi } from '../global/services/genericapi.service';
import { Constance } from '../utils/constance';

@Injectable()
export class AdminService {
    
    private adminUrl = Constance.ADMIN_URL;

    constructor(private genericApi: GenericApi) { }

    public getUsersPendingApproval(): Observable<any> {
        return this.genericApi.get(`${this.adminUrl}/users-pending-approval`);
    }

    public getWebsiteVisits(): Observable<any> {
        return this.genericApi.get(`${this.adminUrl}/site-visits`);
    }

    public processUserApproval(user): Observable<any> {
        return this.genericApi.post(`${this.adminUrl}/process-user-approval`, user);
    }
}
