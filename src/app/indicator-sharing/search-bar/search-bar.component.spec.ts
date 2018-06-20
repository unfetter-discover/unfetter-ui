import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { SearchBarComponent } from './search-bar.component';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import { makeMockIndicatorSharingStore } from '../../testing/mock-store';
import { filter, pluck } from 'rxjs/operators';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let store;
  
  let mockReducer: ActionReducerMap<any> = {
    indicatorSharing: indicatorSharingReducer
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forRoot(mockReducer)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
      component = fixture.componentInstance;
      store = component.store;
      makeMockIndicatorSharingStore(store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return search results', () => {
      component.searchTerm.setValue('zfake');
      fixture.detectChanges();
      let counter: number = 0;
      const displayInd$ = component.store.select('indicatorSharing')
          .pipe(
            filter((state: any) => state.searchTerm !== ''),
            pluck('displayedIndicators')
          )
          .subscribe(
              (indicators: any[]) => {
                  counter++;
                //   Multiple actions are dispatched on search
                  if (counter >= 3) {
                    expect(indicators.length).toEqual(1);
                    expect(indicators[0].name).toEqual('zfake');
                  }
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
