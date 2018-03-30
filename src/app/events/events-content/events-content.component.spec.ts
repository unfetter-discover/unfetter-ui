import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsContentComponent } from './events-content.component';
import { MatCardModule } from '@angular/material';

describe('EventsContentComponent', () => {
  let component: EventsContentComponent;
  let fixture: ComponentFixture<EventsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsContentComponent ],
      imports: [ MatCardModule ],
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
