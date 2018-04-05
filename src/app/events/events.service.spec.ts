import { TestBed, inject } from '@angular/core/testing';

import { EventsService } from './events.service';
import { GenericApi } from '../core/services/genericapi.service';

let mockService = {};

describe('EventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsService,
        {
          provide: GenericApi,
          useValue: mockService
        },
      ],
    });
  });

  it('should be created', inject([EventsService], (service: EventsService) => {
    expect(service).toBeTruthy();
  }));
});
