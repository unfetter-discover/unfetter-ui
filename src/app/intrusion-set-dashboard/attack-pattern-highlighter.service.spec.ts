import { TestBed, inject } from '@angular/core/testing';

import { AttackPatternHighlighterService } from './attack-pattern-highlighter.service';

describe('AttackPatternHighlighterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttackPatternHighlighterService]
    });
  });

  it('should be created', inject([AttackPatternHighlighterService], (service: AttackPatternHighlighterService) => {
    expect(service).toBeTruthy();
  }));
});
