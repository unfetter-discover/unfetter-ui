import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { SummaryComponent } from './summary.component';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { GenericApi } from '../../../core/services/genericapi.service';
import { summaryReducer } from '../store/summary.reducers';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  // TODO verify this mocking strategy works
  let mockReducer: ActionReducerMap<any> = {
    summary: summaryReducer
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SummaryComponent],

      imports: [
        RouterTestingModule,
        StoreModule.forRoot(mockReducer),
      ],
    providers: [GenericApi],
    })
  .compileComponents();
  }));

beforeEach(() => {
  fixture = TestBed.createComponent(SummaryComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

it('should create', () => {
  expect(component).toBeTruthy();
});
});
