import { TestBed, async, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserPreferencesService } from './user-preferences.service';
import { reducers } from '../../root-store/app.reducers';
import * as fromConfig from '../../root-store/config/config.reducers';
import * as configActions from '../../root-store/config/config.actions';
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
        const preferences = {
            killchain: 'TacticXYZ'
        };
        const profile = {
            _id: '1',
            email: 'bob@company.com',
            userName: 'bob',
            lastName: 'B',
            firstName: 'Bo',
            created: '2018',
            identity: {
                id: '2',
                name: 'bob',
            },
            registered: true,
            preferences: preferences,
        };
        spyOn(api, 'postAs').and.returnValue(Observable.of({attributes: profile}));
        service.setUserPreferences('bob', preferences).subscribe(response => expect(response).toEqual(profile));
    }));

    it('handles missing user id', () => {
        const spy = spyOn(console, 'log');
        service.setUserPreferences(undefined, undefined);
        expect(spy).toHaveBeenCalledWith('cannot update preferences on empty user id');
    });

});
