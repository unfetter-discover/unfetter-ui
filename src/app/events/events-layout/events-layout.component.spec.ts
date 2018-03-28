import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsLayoutComponent } from './events-layout.component';

describe('EventsLayoutComponent', () => {
  let component: EventsLayoutComponent;
  let fixture: ComponentFixture<EventsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsLayoutComponent ]
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
