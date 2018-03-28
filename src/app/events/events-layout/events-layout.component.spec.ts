import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsLayoutComponent } from './events-layout.component';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { RouterTestingModule } from '@angular/router/testing';
=======
>>>>>>> new events dashboard initial check-in; themed and routing properly
=======
>>>>>>> new events dashboard initial check-in; themed and routing properly
=======
import { RouterTestingModule } from '@angular/router/testing';
>>>>>>> fix broken tests

describe('EventsLayoutComponent', () => {
  let component: EventsLayoutComponent;
  let fixture: ComponentFixture<EventsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      declarations: [ EventsLayoutComponent ],
      imports: [ RouterTestingModule ],
=======
      declarations: [ EventsLayoutComponent ]
>>>>>>> new events dashboard initial check-in; themed and routing properly
=======
      declarations: [ EventsLayoutComponent ]
>>>>>>> new events dashboard initial check-in; themed and routing properly
=======
      declarations: [ EventsLayoutComponent ],
      imports: [ RouterTestingModule ],
>>>>>>> fix broken tests
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
