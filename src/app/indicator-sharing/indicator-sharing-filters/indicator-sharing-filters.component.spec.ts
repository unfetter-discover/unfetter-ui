// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { StoreModule, Store, combineReducers } from '@ngrx/store';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MatSelectModule } from '@angular/material';

// import { IndicatorSharingFiltersComponent } from './indicator-sharing-filters.component';
// import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
// import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
// import * as fromRoot from '../../root-store/app.reducers';
// import '../../../rxjs-operators';
// import { makeRootMockStore, makeMockIndicatorSharingStore } from '../../testing/mock-store';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// describe('IndicatorSharingFiltersComponent', () => {
//   let component: IndicatorSharingFiltersComponent;
//   let fixture: ComponentFixture<IndicatorSharingFiltersComponent>;
//   let store;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         IndicatorSharingFiltersComponent, 
//         CapitalizePipe 
//       ],
//       imports: [
//         ReactiveFormsModule,
//         FormsModule,
//         MatSelectModule,
//         BrowserAnimationsModule,        
//         StoreModule.forRoot({
//             ...fromRoot.reducers,
//             indicatorSharing: combineReducers(indicatorSharingReducer)
//         })
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(IndicatorSharingFiltersComponent);
//     component = fixture.componentInstance;
//     store = component.store;
//     makeRootMockStore(store);
//     makeMockIndicatorSharingStore(store);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
