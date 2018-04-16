import { TestBed, inject } from '@angular/core/testing';

import { IntrusionSetHighlighterService } from './intrusion-set-highlighter.service';

describe('IntrusionSetHighlighterService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IntrusionSetHighlighterService]
        });
    });

    it('should be created', inject([IntrusionSetHighlighterService], (service: IntrusionSetHighlighterService) => {
        expect(service).toBeTruthy();
    }));

});
