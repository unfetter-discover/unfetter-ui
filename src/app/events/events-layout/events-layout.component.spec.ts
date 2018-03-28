import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsLayoutComponent } from './events-layout.component';
<<<<<<< HEAD
import { RouterTestingModule } from '@angular/router/testing';
=======
>>>>>>> new events dashboard initial check-in; themed and routing properly

describe('EventsLayoutComponent', () => {
  let component: EventsLayoutComponent;
  let fixture: ComponentFixture<EventsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [ EventsLayoutComponent ],
      imports: [ RouterTestingModule ],
=======
      declarations: [ EventsLayoutComponent ]
>>>>>>> new events dashboard initial check-in; themed and routing properly
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
