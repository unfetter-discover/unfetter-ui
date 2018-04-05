import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsContentComponent } from './events-content.component';
import { MatCardModule, MatTableModule } from '@angular/material';
import { OrganizationIdentity } from '../../models/user/organization-identity';
import { EventsService } from '../events.service';

describe('EventsContentComponent', () => {


  const mockService = {
  };

  let component: EventsContentComponent;
  let fixture: ComponentFixture<EventsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventsContentComponent],
      imports: [MatCardModule,
        MatTableModule, 
      ],

    }).overrideComponent(EventsContentComponent, {
      set: {
        providers: [
          {
            provide: EventsService,
            useValue: mockService
          },
        ],
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
