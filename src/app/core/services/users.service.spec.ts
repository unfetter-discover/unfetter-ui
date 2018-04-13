import { TestBed, async, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UsersService } from './users.service';
import { GenericApi } from './genericapi.service';

fdescribe('UsersService', () => {

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

    it('gets remote public configuration', inject([GenericApi], (api: GenericApi) => {
        // const preferences = {
        //     killchain: 'TacticXYZ'
        // };
        // const profile = {
        //     _id: '1',
        //     email: 'bob@company.com',
        //     userName: 'bob',
        //     lastName: 'B',
        //     firstName: 'Bo',
        //     created: '2018',
        //     identity: {
        //         id: '2',
        //         name: 'bob',
        //     },
        //     registered: true,
        //     preferences: preferences,
        // };
        // spyOn(api, 'postAs').and.returnValue(Observable.of({attributes: profile}));
        // service.setUserPreferences('bob', preferences).subscribe(response => expect(response).toEqual(profile));
    }));

});
