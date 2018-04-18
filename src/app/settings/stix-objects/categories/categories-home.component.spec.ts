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
import { RelationshipNewComponent } from '../relationships/relationship-new/relationship-new.component';
import { RelationshipsComponent } from '../relationships/relationships.component';
import { CategoriesHomeComponent } from './categories-home.component';
import { PageHeaderComponent } from '../../../components/page/page-header.component';
import { RelationshipListComponent } from '../../../components/relationship-list/relationship-list.component';
import { ValidationErrorsComponent } from '../../../components/validation-errors/validation-errors.component';
import { CoreModule } from '../../../core/core.module';
import { GlobalModule } from '../../../global/global.module';
import { StixService } from '../../stix.service';
import { GenericApi } from '../../../core/services/genericapi.service';

describe('CategoriesHomeComponent', () => {
  let component: CategoriesHomeComponent;
  let fixture: ComponentFixture<CategoriesHomeComponent>;

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
        CategoriesHomeComponent,
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
