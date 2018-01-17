// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { IndicatorSharingFiltersComponent } from './indicator-sharing-filters.component';
// import { ActionReducerMap, StoreModule, Store } from '@ngrx/store';
// import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MatSelectModule } from '@angular/material';
// import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';

// describe('IndicatorSharingFiltersComponent', () => {
//   let component: IndicatorSharingFiltersComponent;
//   let fixture: ComponentFixture<IndicatorSharingFiltersComponent>;
//   let mockReducer: ActionReducerMap<any> = {
//     indicatorSharing: indicatorSharingReducer
//   };
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
//         StoreModule.forRoot(mockReducer)
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(IndicatorSharingFiltersComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
