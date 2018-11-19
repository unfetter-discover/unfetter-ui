import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf } from 'rxjs';
import { StoreModule } from '@ngrx/store';

import { ReportFormComponent } from './report-form.component';
import { ExtractTextService } from '../../core/services/extract-text.service';
import { ThreatDashboardBetaService } from '../threat-beta.service';
import mockThreatReducer from '../testing/mock-reducer';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';

describe('ReportFormComponent', () => {
  let component: ReportFormComponent;
  let fixture: ComponentFixture<ReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ReportFormComponent, 
        CapitalizePipe,
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(mockThreatReducer),
      ],
      providers: [
        {
          provide: Location,
          useValue: { back () {} }
        },
        {
          provide: ExtractTextService,
          useValue: {
            extractTextFromFile() { return observableOf({extractedText: 'foo'}) },
            extractTextFromUrl() { return observableOf({extractedText: 'foo'}) },
          }
        },
        {
          provide: ThreatDashboardBetaService,
          useValue: {
            createReport() { return observableOf({ id: '123' }) },
            updateBoard() { return observableOf({ id: '123' }) },
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
