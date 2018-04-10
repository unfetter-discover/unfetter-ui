import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatCardModule, MatTableModule } from '@angular/material';
import { EventsService } from '../events.service';
import { EventsContentComponent } from './events-content.component';

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
