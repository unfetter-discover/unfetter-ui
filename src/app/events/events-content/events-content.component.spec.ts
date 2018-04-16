import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatCardModule, MatSelectModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { EventsService } from '../events.service';
import { EventsContentComponent } from './events-content.component';


describe('EventsContentComponent', () => {


  const mockService = {
    recentSightings: [],
  };

  let component: EventsContentComponent;
  let fixture: ComponentFixture<EventsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventsContentComponent],
      imports: [MatCardModule,
        MatTableModule,
        MatSelectModule,
        ChartsModule,
        BrowserAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA, ],

    }).overrideComponent(EventsContentComponent, {
      set: {
        providers: [
          {
            provide: EventsService,
            useValue: mockService,
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
