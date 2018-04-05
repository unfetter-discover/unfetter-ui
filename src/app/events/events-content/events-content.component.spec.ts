import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsContentComponent } from './events-content.component';
import { MatCardModule, MatTableModule } from '@angular/material';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { eventsReducer } from '../store/events.reducers';
import { usersReducer, UserState } from '../../root-store/users/users.reducers';
import { OrganizationIdentity } from '../../models/user/organization-identity';
import { LoginUser, SetToken } from '../../root-store/users/user.actions';

fdescribe('EventsContentComponent', () => {
  let mockReducer: ActionReducerMap<any> = {
    events: eventsReducer,
    user: usersReducer,
  };

  let component: EventsContentComponent;
  let fixture: ComponentFixture<EventsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventsContentComponent],
      imports: [MatCardModule,
        MatTableModule, 
        StoreModule.forRoot(mockReducer),
      ],
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
