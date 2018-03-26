import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MatCardModule, MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from 'app/root-store/app.reducers';
import { assessmentReducer } from '../store/assess.reducers';

import { Create3Component } from './create3.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Create3Component', () => {
  let component: Create3Component;
  let fixture: ComponentFixture<Create3Component>;

  beforeEach(async(() => {
    const materialModules = [
      MatCardModule,
      MatButtonModule,
      MatCheckboxModule,
      MatInputModule,
    ];
    TestBed.configureTestingModule({
      declarations: [Create3Component],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ...materialModules,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'assess3': combineReducers(assessmentReducer)
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
