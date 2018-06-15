import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of as observableOf, Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

import { AdminService } from './admin.service';
import { GenericApi } from '../core/services/genericapi.service';
import { UserProfile } from '../models/user/user-profile';

describe('Admin Service', () => {

    let subscriptions: Subscription[];
    beforeEach(() => {
        subscriptions = [];

        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [AdminService, GenericApi]
        });
    });

    afterEach(() => {
        if (subscriptions) {
            subscriptions
                .filter((sub) => sub !== undefined)
                .filter((sub) => !sub.closed)
                .forEach((sub) => sub.unsubscribe());
        }
    });

    it('should be created', inject([AdminService], (service) => {
        expect(service).toBeTruthy();
    }));

    it('should get users pending approval',
            fakeAsync(inject([AdminService, GenericApi], (service: AdminService, api: GenericApi) => {
        expect(api).toBeDefined();
        const userProfile = {
            userName: 'tester',
            firstName: 'Teresa',
            lastName: 'Stern',
        } as UserProfile;
        const spy = spyOn(api, 'getAs').and.returnValue(observableOf([{attributes: userProfile}]));
        let getUsers$ = service.getUsersPendingApproval()
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

    it('should get current users',
            fakeAsync(inject([AdminService, GenericApi], (service: AdminService, api: GenericApi) => {
        const userProfile = {
            userName: 'tester',
            firstName: 'Teresa',
            lastName: 'Stern',
        } as UserProfile;
        const spy = spyOn(api, 'getAs').and.returnValue(observableOf([{attributes: userProfile}]));
        let getUsers$ = service.getCurrentUsers()
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

    it('should get org leader applicants',
            fakeAsync(inject([AdminService, GenericApi], (service: AdminService, api: GenericApi) => {
        const userProfile = {
            userName: 'tester',
            firstName: 'Teresa',
            lastName: 'Stern',
        } as UserProfile;
        const spy = spyOn(api, 'get').and.returnValue(observableOf([userProfile]));
        let getUsers$ = service.getOrgLeaderApplicants()
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

    it('should get website visits',
            fakeAsync(inject([AdminService, GenericApi], (service: AdminService, api: GenericApi) => {
        const spy = spyOn(api, 'get').and.returnValue(observableOf([3]));
        let getVisits$ = service.getWebsiteVisits()
            .subscribe(
                (visit) => {
                    expect(visit).toBeDefined();
                    expect(visit.length).toEqual(1);
                    expect(visit[0]).toEqual(3);
                },
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(getVisits$);
    })));

    it('should get a website visit graph',
            fakeAsync(inject([AdminService, GenericApi], (service: AdminService, api: GenericApi) => {
        const visits = [{day: '1', visits: 6}, {day: '2', visits: 11}, {day: '3', visits: 8}];
        const spies = spyOn(api, 'get').and.returnValue(observableOf(visits));
        let getGraph$ = service.getWebsiteVisitsGraph(3)
            .subscribe(
                (graph) => {
                    expect(graph).toBeDefined();
                    expect(graph.length).toEqual(3);
                    expect(graph[1].visits).toEqual(11);
                },
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(getGraph$);
    })));

    it('should change user status',
            fakeAsync(inject([AdminService, GenericApi], (service: AdminService, api: GenericApi) => {
        const spies = spyOn(api, 'post').and.returnValue(observableOf(true));
        let editUser$ = service.changeUserStatus({})
            .subscribe(
                (result) => expect(result).toBeTruthy(),
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(editUser$);
    })));

    it('should get configuration',
            fakeAsync(inject([AdminService, GenericApi], (service: AdminService, api: GenericApi) => {
        const configs = {
            server: 'server.xyz.com',
            items: 3,
            updated: true,
        };

        let response: Observable<any> = observableOf(configs);
        const spy = spyOn(api, 'get').and.returnValue(response);

        let getConfigs$ = service.getConfig()
            .subscribe(
                (result) => {
                    expect(result).toBeDefined();
                    expect(result.updated).toEqual(configs.updated);
                },
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(getConfigs$);

        response = observableOf(configs.server);
        spy.and.returnValue(response);
        let getConfig$ = service.getSingleConfig('server')
            .subscribe(
                (result) => {
                    expect(result).toEqual(configs.server);
                },
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(getConfig$);

        const newProperty = { date: Date.now() };
        response = observableOf(Object.assign({}, configs, newProperty));
        spyOn(api, 'post').and.returnValue(response);
        let addConfig$ = service.addConfig(newProperty)
            .subscribe(
                (result) => {
                    expect(result).toBeDefined();
                    expect(result.date).toEqual(newProperty.date);
                },
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(getConfig$);

        delete configs.items;
        response = observableOf(configs);
        spyOn(api, 'delete').and.returnValue(response);
        let deleteConfig$ = service.deleteSingleConfig('items')
            .subscribe(
                (result) => {
                    expect(result).toBeDefined();
                    expect(result.items).toBeUndefined();
                },
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(deleteConfig$);
    })));

    it('should process changed data',
            fakeAsync(inject([AdminService, GenericApi], (service: AdminService, api: GenericApi) => {
        const spies = spyOn(api, 'patch').and.returnValue(observableOf(true));
        let processChange$ = service.processChangedData({}, '')
            .subscribe(
                (result) => expect(result).toBeTruthy(),
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(processChange$);
    })));

    it('should get organizations',
            fakeAsync(inject([AdminService, GenericApi], (service: AdminService, api: GenericApi) => {
        const orgs = [{name: 'org1'}, {name: 'org2'}, {name: 'org3'}];
        const spies = spyOn(api, 'get').and.returnValue(observableOf(orgs));
        let getOrgs$ = service.getOrganizations()
            .subscribe(
                (result) => {
                    expect(result).toBeDefined();
                    expect(result.length).toBe(3);
                },
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(getOrgs$);
    })));

    it('should process org applicants',
            fakeAsync(inject([AdminService, GenericApi], (service: AdminService, api: GenericApi) => {
        const userProfile = {
            userName: 'tester',
            firstName: 'Teresa',
            lastName: 'Stern',
        } as UserProfile;
        const spies = spyOn(api, 'post').and.returnValue(observableOf(true));
        let processChange$ = service.processOrgApplicant(userProfile, 'theOrg')
            .subscribe(
                (result) => expect(result).toBeTruthy(),
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(processChange$);
    })));

    it('should get heartbeat',
            fakeAsync(inject([AdminService, GenericApi], (service: AdminService, api: GenericApi) => {
        const spies = spyOn(api, 'get').and.returnValue(observableOf(true));
        let processChange$ = service.getHeartbeat()
            .subscribe(
                (result) => expect(result).toBeTruthy(),
                (err) => console.log(`error`, err),
                () => {});
        subscriptions.push(processChange$);
    })));

});
