import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as fromRoot from 'app/root-store/app.reducers';

import { CategoryComponent } from './category.component';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatProgressBarModule, MatIconModule } from '@angular/material';
import { StoreModule, combineReducers } from '@ngrx/store';
import { baselineReducer } from '../../../baseline/store/baseline.reducers';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  const matModules = [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryComponent ],
      imports: [
        NoopAnimationsModule,
        ...matModules,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'baseline': combineReducers(baselineReducer)
        }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
