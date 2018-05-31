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

    it('should handle change events', inject([TacticsControlService], (service: TacticsControlService) => {
        expect(service.state.test).toBeUndefined();
        const sub$ = service.change.subscribe(
            (ev) => service.state.test = ev,
            (err) => {},
            () => sub$ && sub$.unsubscribe()
        );
        service.onChange(undefined);
        expect(service.state.test).toBeUndefined();
        service.onChange({value: true});
        expect(service.state.test).toBeDefined();
        expect(service.state.test.value).toBe(true);
    }));

});
