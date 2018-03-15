import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { IndicatorSharingLayoutComponent } from './indicator-sharing-layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { makeMockIndicatorSharingStore } from '../../testing/mock-store';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

describe('IndicatorSharingLayoutComponent', () => {
  let component: IndicatorSharingLayoutComponent;
  let fixture: ComponentFixture < IndicatorSharingLayoutComponent > ;

    let store;

    let mockReducer: ActionReducerMap<any> = {
        indicatorSharing: indicatorSharingReducer
    };

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [
            IndicatorSharingLayoutComponent
        ],
        imports: [
            RouterTestingModule,
            StoreModule.forRoot(mockReducer)
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorSharingLayoutComponent);
    component = fixture.componentInstance;
    store = component.store;
    makeMockIndicatorSharingStore(store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
