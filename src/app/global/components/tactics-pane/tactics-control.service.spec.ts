import { TestBed, inject } from '@angular/core/testing';

import { TacticsControlService } from './tactics-control.service';

describe('TacticControlService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TacticsControlService]
        });
    });

    it('should be created', inject([TacticsControlService], (service: TacticsControlService) => {
        expect(service).toBeTruthy();
    }));

});
