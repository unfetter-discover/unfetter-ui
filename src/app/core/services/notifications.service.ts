import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GenericApi } from './genericapi.service';
import { Constance } from '../../utils/constance';
import { NotificationEmitTypes } from '../../root-store/notification/notification.model';

@Injectable()
export class NotificationsService {

    public readonly notificationsUrl = Constance.NOTIFICATION_STORE_URL;
    public readonly processUrl = `${Constance.NOTIFICATION_STORE_URL}/user-notifications/process`;

    constructor(
        private genericApi: GenericApi
    ) { }

    public getNotifications(): Observable<any> {
        return this.genericApi.get(`${this.notificationsUrl}/user-notifications`);
    }

    public readNotification(notificationId: string): Observable<any> {
        const url = `${this.processUrl}/${NotificationEmitTypes.READ_NOTIFICATION}/${notificationId}`
        return this.genericApi.get(url);
    }

    public deleteNotification(notificationId: string): Observable<any> {
        const url = `${this.processUrl}/${NotificationEmitTypes.DELETE_NOTIFICATION}/${notificationId}`
        return this.genericApi.get(url);
    }

    public readAllNotifications(): Observable<any> {
        const url = `${this.processUrl}/${NotificationEmitTypes.READ_ALL_NOTIFICATIONS}`
        return this.genericApi.get(url);
    }

    public deleteAllNotifications(): Observable<any> {
        const url = `${this.processUrl}/${NotificationEmitTypes.DELETE_ALL_NOTIFICATIONS}`
        return this.genericApi.get(url);
    }
}
