import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsLayoutComponent } from './events-layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { eventsReducer } from '../store/events.reducers';

describe('EventsLayoutComponent', () => {
  let component: EventsLayoutComponent;
  let fixture: ComponentFixture<EventsLayoutComponent>;

  const mockReducer: ActionReducerMap<any> = {
    events: eventsReducer
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsLayoutComponent ],
      imports: [ 
        RouterTestingModule,
        StoreModule.forRoot(mockReducer) 
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
