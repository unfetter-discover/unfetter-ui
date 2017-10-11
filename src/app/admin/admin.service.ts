import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { GenericApi } from '../global/services/genericapi.service';
import { Constance } from '../utils/constance';

@Injectable()
export class AdminService {
    private usersPendingApprovalUrl = Constance.USERS_PENDING_APPROVAL_URL;
    private processUserApprovalUrl = Constance.PROCESS_USER_APPROVAL_URL;

    constructor(private genericApi: GenericApi) { }

    public getUsersPendingApproval(): Observable<any> {
        return this.genericApi.get(this.usersPendingApprovalUrl);
    }

    public processUserApproval(user): Observable<any> {
        return this.genericApi.post(this.processUserApprovalUrl, user);
    }
}
