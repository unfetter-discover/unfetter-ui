import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { UserCitationService } from './user-citations.service';
import { reducers } from '../../root-store/app.reducers';

describe('UserCitationService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(reducers),
            ],
            providers: [
                UserCitationService,
            ],
        });
    });

    it('should be created', () => {
        const service: UserCitationService = TestBed.get(UserCitationService);
        expect(service).toBeTruthy();
    });

});
