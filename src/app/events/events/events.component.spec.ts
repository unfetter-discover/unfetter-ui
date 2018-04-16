import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSidenavModule } from '@angular/material';
import { GlobalModule } from '../../global/global.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { eventsReducer } from '../store/events.reducers';
import { usersReducer } from '../../root-store/users/users.reducers';
import { EventsService } from '../events.service';
import { IPGeoService } from '../ipgeo.service';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  const mockService = {
  };

  const mockReducer: ActionReducerMap<any> = {
    events: eventsReducer,
    user: usersReducer,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsComponent ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        GlobalModule,
        StoreModule.forRoot(mockReducer),
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).overrideComponent(EventsComponent, {
      set: {
        providers: [
          {
            provide: EventsService,
            useValue: mockService
          },
          {
            provide: IPGeoService,
            useValue: mockService
          },
        ],
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
