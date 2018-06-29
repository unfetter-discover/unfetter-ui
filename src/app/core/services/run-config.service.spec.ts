import { TestBed, async, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { of as observableOf, Observable } from 'rxjs';

import { UsersService } from './users.service';
import { GenericApi } from './genericapi.service';
import { UserProfileMockFactory } from '../../models/user/user-profile.mock';
import { StixMockFactory } from '../../models/stix/stix-mock';
import { StixLabelEnum } from '../../models/stix/stix-label.enum';

describe('UsersService should', () => {

    let service: UsersService;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [UsersService, GenericApi]
        });
    }));

    // synchronous beforeEach
    beforeEach(() => {
        service = TestBed.get(UsersService);
    });

    it('get user from token', inject([GenericApi], (api: GenericApi) => {
        const profile = UserProfileMockFactory.mockOne();
        spyOn(api, 'get').and.returnValue(observableOf(profile));
        service.getUserFromToken().subscribe(response => expect(response).toEqual(profile));
    }));

    it('get user by id', inject([GenericApi], (api: GenericApi) => {
        const profile = UserProfileMockFactory.mockOne();
        spyOn(api, 'get').and.returnValue(observableOf(profile));
        service.getUserProfileById(profile._id).subscribe(response => expect(response).toEqual(profile));
    }));

    it('refresh token', inject([GenericApi], (api: GenericApi) => {
        spyOn(api, 'get').and.returnValue(observableOf({attributes: {token: 'pass'}}));
        service.refreshToken().subscribe(response => expect(response).toEqual('pass'));
    }));

    it('determine if user name is available', inject([GenericApi], (api: GenericApi) => {
        spyOn(api, 'get').and.returnValue(observableOf({attributes: {available: true}}));
        service.userNameAvailable('bob').subscribe(response => expect(response).toBeTruthy());
    }));

    it('determine if email is available', inject([GenericApi], (api: GenericApi) => {
        spyOn(api, 'get').and.returnValue(observableOf({attributes: {available: false}}));
        service.emailAvailable('bob').subscribe(response => expect(response).toBeFalsy());
    }));

    it('finalize registration', inject([GenericApi], (api: GenericApi) => {
        const profile = UserProfileMockFactory.mockOne();
        spyOn(api, 'post').and.returnValue(observableOf(profile));
        service.finalizeRegistration(profile).subscribe(response => expect(response).toEqual(profile));
    }));

    it('get organizations', inject([GenericApi], (api: GenericApi) => {
        const orgs = StixMockFactory.mockMany(3)
            .map(stix => { return { attributes: {...stix, type: StixLabelEnum.IDENTITY}}});
        spyOn(api, 'getAs').and.returnValue(observableOf(orgs));
        service.getOrganizations().subscribe(response => {
            expect(response).toBeDefined();
            expect(response.length).toBe(3);
        });
    }));

    it('request organization membership', inject([GenericApi], (api: GenericApi) => {
        const org = StixMockFactory.mockOne();
        const profile = UserProfileMockFactory.mockOne();
        spyOn(api, 'get').and.returnValue(observableOf({success: true}));
        service.requestOrgMembership(profile._id, org.id).subscribe(response => {
            expect(response).toBeDefined();
            expect(response.success).toBeTruthy();
        });
    }));

    it('request organization leadership', inject([GenericApi], (api: GenericApi) => {
        const org = StixMockFactory.mockOne();
        const profile = UserProfileMockFactory.mockOne();
        spyOn(api, 'get').and.returnValue(observableOf({success: true}));
        service.requestOrgLeadership(profile._id, org.id).subscribe(response => {
            expect(response).toBeDefined();
            expect(response.success).toBeTruthy();
        });
    }));

    it('change organization subscription', inject([GenericApi], (api: GenericApi) => {
        const org = StixMockFactory.mockOne();
        const profile = UserProfileMockFactory.mockOne();
        spyOn(api, 'get').and.returnValue(observableOf({success: true}));
        service.changeOrgSubscription(profile._id, org.id, false).subscribe(response => {
            expect(response).toBeDefined();
            expect(response.success).toBeTruthy();
        });
    }));

});
