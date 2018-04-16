import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatRadioModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { IndicatorSharingSortComponent } from './indicator-sharing-sort.component';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { makeMockIndicatorSharingStore } from '../../testing/mock-store';
import { By } from '@angular/platform-browser';
import { SortTypes } from '../models/sort-types.enum';

describe('IndicatorSharingSortComponent', () => {
  let component: IndicatorSharingSortComponent;
  let fixture: ComponentFixture<IndicatorSharingSortComponent>;
  let store;

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
    store = component.store;
    makeMockIndicatorSharingStore(store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should updated ngrx sortBy to COMMENTS', () => { 
    const commentRadio = fixture.debugElement.query(By.css('#sortComments label')).nativeElement as HTMLElement;
    commentRadio.click();
    fixture.detectChanges();

    const displayInd$ = component.store.select('indicatorSharing')
      .pluck('sortBy')
      .subscribe(
        (sortBy: SortTypes) => {
          expect(sortBy).toEqual(SortTypes.COMMENTS);
        },
        (err) => {
          console.log(err);
        },
        () => {
          if (displayInd$) {
            displayInd$.unsubscribe();
          }
        }
      );
  });

});
