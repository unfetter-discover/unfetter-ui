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
import { RouterTestingModule } from '@angular/router/testing';
import { PageHeaderComponent } from '../../../../components/page/page-header.component';
import { RelationshipListComponent } from '../../../../components/relationship-list/relationship-list.component';
import { ValidationErrorsComponent } from '../../../../components/validation-errors/validation-errors.component';
import { CoreModule } from '../../../../core/core.module';
import { GenericApi } from '../../../../core/services/genericapi.service';
import { GlobalModule } from '../../../../global/global.module';
import { StixService } from '../../../stix.service';
import { RelationshipNewComponent, RelationshipsComponent } from '../../relationships';
import { CategoriesComponent } from './categories.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

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
      ValidationErrorsComponent,
    ]

    TestBed.configureTestingModule({
      declarations: [
        CategoriesComponent,
        ...stixComponents,
      ],
      imports: [
        CommonModule,
        CoreModule,
        GlobalModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ...materialModules,
      ],
      providers: [
        StixService,
        GenericApi,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
