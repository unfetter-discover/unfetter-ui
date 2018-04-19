import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule, MatProgressSpinnerModule, MatSelectModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from 'app/root-store/app.reducers';
import { BaseComponentService } from '../../../../components/base-service.component';
import { PageHeaderComponent } from '../../../../components/page/page-header.component';
import { RelationshipListComponent } from '../../../../components/relationship-list/relationship-list.component';
import { ValidationErrorsComponent } from '../../../../components/validation-errors/validation-errors.component';
import { CoreModule } from '../../../../core/core.module';
import { GenericApi } from '../../../../core/services/genericapi.service';
import { CreatedByRefComponent } from '../../../../global/components/created-by-ref/created-by-ref.component';
import { PublishedCheckboxComponent } from '../../../../global/components/published-checkbox/published-checkbox.component';
import { usersReducer } from '../../../../root-store/users/users.reducers';
import { StixService } from '../../../stix.service';
import { RelationshipNewComponent, RelationshipsComponent } from '../../relationships';
import { CategoriesEditComponent } from './categories-edit.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CategoriesEditComponent', () => {
  let component: CategoriesEditComponent;
  let fixture: ComponentFixture<CategoriesEditComponent>;

  beforeEach(async(() => {
    const materialModules = [
      MatAutocompleteModule,
      MatButtonModule,
      MatCardModule,
      MatChipsModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatExpansionModule,
      MatSnackBarModule,
      MatInputModule,
      MatListModule,
      MatNativeDateModule,
      MatProgressSpinnerModule,
      MatSelectModule,
    ];

    const stixComponents = [
      RelationshipsComponent,
      RelationshipNewComponent,
      RelationshipListComponent,
      PageHeaderComponent,
      PublishedCheckboxComponent,
      ValidationErrorsComponent,
      CreatedByRefComponent,
    ]

    TestBed.configureTestingModule({
      declarations: [
        CategoriesEditComponent,
        ...stixComponents,
      ],
      imports: [
        NoopAnimationsModule,
        CommonModule,
        CoreModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ...materialModules,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'users': combineReducers(usersReducer),
        }),
      ],
      providers: [
        BaseComponentService,
        GenericApi,
        StixService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
