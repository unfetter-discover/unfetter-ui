import { TestBed, async, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserPreferencesService } from './user-preferences.service';
import { UserProfileMockFactory } from '../../models/user/user-profile.mock';
import { UserProfile } from '../../models/user/user-profile';
import { reducers } from '../../root-store/app.reducers';
import { GenericApi } from './genericapi.service';

describe('UserPreferencesService', () => {

    let service: UserPreferencesService;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(reducers),
                HttpClientTestingModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [UserPreferencesService, GenericApi]
        });
    }));

    // synchronous beforeEach
    beforeEach(() => {
        service = TestBed.get(UserPreferencesService);
    });

    it('gets remote public configuration', inject([GenericApi], (api: GenericApi) => {
        const profile = UserProfileMockFactory.mockOne();
        spyOn(api, 'postAs').and.returnValue(Observable.of({ attributes: profile }));
        service.setUserPreferences('bob', profile.preferences).subscribe(response => expect(response).toEqual(profile));
    }));

    it('handles missing user id', () => {
        const spy = spyOn(console, 'log');
        service.setUserPreferences(undefined, undefined);
        expect(spy).toHaveBeenCalledWith('cannot update preferences on empty user id');
    });

});
