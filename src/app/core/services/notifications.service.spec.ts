import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { of as observableOf, Observable } from 'rxjs';

import { NotificationsService } from './notifications.service';
import { GenericApi } from './genericapi.service';
import { StixMockFactory } from '../../models/stix/stix-mock';
import { StixLabelEnum } from '../../models/stix/stix-label.enum';

fdescribe('NotificationsService should', () => {

    let service: NotificationsService;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
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

    it('get user from token', inject([GenericApi], (api: GenericApi) => {
        // const profile = UserProfileMockFactory.mockOne();
        // spyOn(api, 'get').and.returnValue(observableOf(profile));
        // service.getUserFromToken().subscribe(response => expect(response).toEqual(profile));
    }));

});
