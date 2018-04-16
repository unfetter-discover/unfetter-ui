import { DatePipe } from '@angular/common';
import { TestBed, inject } from '@angular/core/testing';
import { GenericApi } from '../core/services/genericapi.service';
import { EventsService } from './events.service';


let mockService = {};

const mockDatePipe = {};

describe('EventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsService,
        {
          provide: GenericApi,
          useValue: mockService
        },
        {
          provide: DatePipe,
          useValue: mockDatePipe,
        }
      ],
    });
  });

  it('should be created', inject([EventsService], (service: EventsService) => {
    expect(service).toBeTruthy();
  }));
});
