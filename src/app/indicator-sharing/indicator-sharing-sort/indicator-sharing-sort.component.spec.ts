import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatRadioModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { IndicatorSharingSortComponent } from './indicator-sharing-sort.component';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';

describe('IndicatorSharingSortComponent', () => {
  let component: IndicatorSharingSortComponent;
  let fixture: ComponentFixture<IndicatorSharingSortComponent>;

  // TODO verify this mocking strategy works
  let mockReducer: ActionReducerMap<any> = {
    indicatorSharing: indicatorSharingReducer
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorSharingSortComponent ],
      imports: [
        MatRadioModule,
        FormsModule,
        StoreModule.forRoot(mockReducer)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorSharingSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
