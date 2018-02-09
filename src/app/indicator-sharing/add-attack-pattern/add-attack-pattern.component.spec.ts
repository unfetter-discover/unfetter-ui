import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatChipsModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, combineReducers } from '@ngrx/store';

import { AddAttackPatternComponent } from './add-attack-pattern.component';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import * as fromRoot from '../../root-store/app.reducers';
import { FieldSortPipe } from '../../global/pipes/field-sort.pipe';
import { makeRootMockStore, makeMockIndicatorSharingStore } from '../../testing/mock-store';

describe('AddAttackPatternComponent', () => {
  let component: AddAttackPatternComponent;
  let fixture: ComponentFixture < AddAttackPatternComponent > ;
  let store;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [
          AddAttackPatternComponent,
          FieldSortPipe
        ],
        imports: [
          MatButtonModule,
          MatChipsModule,
          MatSelectModule,
          FormsModule,
          BrowserAnimationsModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            indicatorSharing: combineReducers(indicatorSharingReducer)
          })
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttackPatternComponent);
    component = fixture.componentInstance;
    store = component.store;
    makeRootMockStore(store);
    makeMockIndicatorSharingStore(store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
