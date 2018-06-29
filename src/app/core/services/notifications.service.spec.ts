import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of as observableOf } from 'rxjs';

import { NotificationsService } from './notifications.service';
import { GenericApi } from './genericapi.service';
import { NotificationEmitTypes } from '../../root-store/notification/notification.model';

describe('NotificationsService should', () => {

    let service: NotificationsService;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                NotificationsService,
                GenericApi,
            ]
        });
    }));

    // synchronous beforeEach
    beforeEach(() => {
        service = TestBed.get(NotificationsService);
    });

    it('get user notifications', inject([GenericApi], (api: GenericApi) => {
        const spy = spyOn(api, 'get').and.returnValue(observableOf({}));
        service.getNotifications()
            .subscribe(
                response => expect(response).toEqual({})
            );
        expect(spy).toHaveBeenCalledWith(jasmine.stringMatching('user-notifications'));
    }));

    it('get read a specific notification', inject([GenericApi], (api: GenericApi) => {
        const spy = spyOn(api, 'get').and.returnValue(observableOf({}));
        service.readNotification('xyz')
            .subscribe(
                response => expect(response).toEqual({})
            );
        expect(spy).toHaveBeenCalledWith(jasmine.stringMatching(NotificationEmitTypes.READ_NOTIFICATION));
    }));

    it('get read all notifications', inject([GenericApi], (api: GenericApi) => {
        const spy = spyOn(api, 'get').and.returnValue(observableOf({}));
        service.readAllNotifications()
            .subscribe(
                response => expect(response).toEqual({})
            );
        expect(spy).toHaveBeenCalledWith(jasmine.stringMatching(NotificationEmitTypes.READ_ALL_NOTIFICATIONS));
    }));

    it('get delete a specific notification', inject([GenericApi], (api: GenericApi) => {
        const spy = spyOn(api, 'get').and.returnValue(observableOf({}));
        service.deleteNotification('abc')
            .subscribe(
                response => expect(response).toEqual({})
            );
        expect(spy).toHaveBeenCalledWith(jasmine.stringMatching(NotificationEmitTypes.DELETE_NOTIFICATION));
    }));

    it('get delete all notifications', inject([GenericApi], (api: GenericApi) => {
        const spy = spyOn(api, 'get').and.returnValue(observableOf({}));
        service.deleteAllNotifications()
            .subscribe(
                response => expect(response).toEqual({})
            );
        expect(spy).toHaveBeenCalledWith(jasmine.stringMatching(NotificationEmitTypes.DELETE_ALL_NOTIFICATIONS));
    }));

});
