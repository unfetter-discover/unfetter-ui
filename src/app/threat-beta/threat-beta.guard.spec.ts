import { TestBed, async, inject } from '@angular/core/testing';

import { ThreatBetaGuard } from './threat-beta.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';

describe('ThreatBetaGuard', () => {
  beforeEach(() => {
    const mockStore = {};

    TestBed.configureTestingModule({
      providers: [ThreatBetaGuard,
                  { provide: Store, useValue: mockStore },
                ],
      imports: [ RouterTestingModule ],
    });
  });

  it('should exist', inject([ThreatBetaGuard], (guard: ThreatBetaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
