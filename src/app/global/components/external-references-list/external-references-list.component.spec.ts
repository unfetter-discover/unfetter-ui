import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalReferencesListComponent } from './external-references-list.component';
import { IndicatorForm } from '../../form-models/indicator';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

describe('ExternalReferencesListComponent', () => {
  let component: ExternalReferencesListComponent;
  let fixture: ComponentFixture<ExternalReferencesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ExternalReferencesListComponent,
        CapitalizePipe
      ],
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalReferencesListComponent);
    component = fixture.componentInstance;
    component.form = IndicatorForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
