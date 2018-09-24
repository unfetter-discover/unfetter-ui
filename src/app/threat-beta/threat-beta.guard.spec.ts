import { TestBed, async, inject } from '@angular/core/testing';

import { ThreatBetaGuard } from './threat-beta.guard';

describe('ThreatBetaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThreatBetaGuard]
    });
  });

  it('should ...', inject([ThreatBetaGuard], (guard: ThreatBetaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
