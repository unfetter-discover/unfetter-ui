import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BaseComponentService } from './base-service.component';
import { GenericApi } from '../core/services/genericapi.service';

describe('BaseComponentService', () => {

    let subscriptions: Subscription[];
    const userProfile = {
        userName: 'tester',
        firstName: 'Teresa',
        lastName: 'Stern',
    };

    beforeEach(async(() => {
        subscriptions = [];
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
            ],
            providers: [
                GenericApi,
                BaseComponentService,
            ]
        });
    }));

    afterEach(() => {
        if (subscriptions) {
            subscriptions
                .filter((sub) => sub !== undefined)
                .filter((sub) => !sub.closed)
                .forEach((sub) => sub.unsubscribe());
        }
    });

    it('should be created', inject([BaseComponentService], (service) => {
        expect(service).toBeTruthy();
    }));

    it('should call get',
            fakeAsync(inject([BaseComponentService, GenericApi], (service: BaseComponentService, api: GenericApi) => {
        expect(api).toBeDefined();
        const spy = spyOn(api, 'get').and.returnValue(Observable.of([userProfile]));
        let getUsers$ = service.get('user/profile')
            .subscribe(
                (users) => {
                    expect(users).toBeDefined();
                    expect(users.length).toEqual(1);
                    expect(users[0].userName).toEqual(userProfile.userName);
                },
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(getUsers$);
    })));

    it('should call save',
            fakeAsync(inject([BaseComponentService, GenericApi], (service: BaseComponentService, api: GenericApi) => {
        expect(api).toBeDefined();
        const spy = spyOn(api, 'post').and.returnValue(Observable.of({success: true}));
        let newUser$ = service.save('user/profile', userProfile)
            .subscribe(
                (result) => {
                    expect(result).toBeDefined();
                    expect(result.success).toBeTruthy();
                },
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(newUser$);
    })));

    it('should call delete',
            fakeAsync(inject([BaseComponentService, GenericApi], (service: BaseComponentService, api: GenericApi) => {
        expect(api).toBeDefined();
        const spy = spyOn(api, 'delete').and.returnValue(Observable.of({success: false}));
        let deleteUser$ = service.delete('user/profile', userProfile.userName)
            .subscribe(
                (result) => {
                    expect(result).toBeDefined();
                    expect(result.success).toBeFalsy();
                },
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(deleteUser$);
    })));

    it('should call autoComplete',
            fakeAsync(inject([BaseComponentService, GenericApi], (service: BaseComponentService, api: GenericApi) => {
        expect(api).toBeDefined();
        const spy = spyOn(api, 'get').and.returnValue(Observable.of([userProfile]));
        let getUsers$ = service.autoComplete('user/profile')
            .subscribe(
                (users) => {
                    expect(users).toBeDefined();
                    expect(users.length).toEqual(1);
                    expect(users[0].userName).toEqual(userProfile.userName);
                },
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(getUsers$);
    })));

});
