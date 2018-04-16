import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import * as fromRoot from '../../root-store/app.reducers';
import { IndicatorDetailsComponent } from './indicator-details.component';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';

describe('IndicatorDetailsComponent', () => {
  let component: IndicatorDetailsComponent;
  let fixture: ComponentFixture < IndicatorDetailsComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [
            IndicatorDetailsComponent
        ],
        imports: [
            RouterTestingModule,
            StoreModule.forRoot({
                ...fromRoot.reducers,
                indicatorSharing: combineReducers(indicatorSharingReducer)
            })
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
