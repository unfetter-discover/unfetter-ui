import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { TacticsTooltipService } from './tactics-tooltip.service';

describe('TacticsTooltipService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TacticsTooltipService]
        });
    });

    it('should be created', inject([TacticsTooltipService], (service: TacticsTooltipService) => {
        expect(service).toBeTruthy();
    }));

    it('should handle hover events', fakeAsync(inject([TacticsTooltipService], (service: TacticsTooltipService) => {
        let hoverDetected = false;
        const sub$ = service.tooltip.subscribe(
            (ev) => hoverDetected = true,
            (err) => {},
            () => sub$ && sub$.unsubscribe()
        );
        expect(hoverDetected).toBeFalsy();
        service.onHover({});
        tick();
        expect(hoverDetected).toBeTruthy();
    })));

    it('should handle click events', fakeAsync(inject([TacticsTooltipService], (service: TacticsTooltipService) => {
        let clickDetected = false;
        const sub$ = service.tooltip.subscribe(
            (ev) => clickDetected = true,
            (err) => {},
            () => sub$ && sub$.unsubscribe()
        );
        expect(clickDetected).toBeFalsy();
        service.onClick({});
        tick();
        expect(clickDetected).toBeTruthy();
    })));

});
