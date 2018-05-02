import { TestBed, inject } from '@angular/core/testing';

import { TacticControlService } from './tactic-control.service';

describe('TacticControlService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TacticControlService]
        });
    });

    it('should be created', inject([TacticControlService], (service: TacticControlService) => {
        expect(service).toBeTruthy();
    }));

});
