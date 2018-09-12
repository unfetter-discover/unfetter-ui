import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatButtonModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import * as fromRoot from '../../../root-store/app.reducers';
import { AddLabelAltComponent } from './add-label-alt.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { IndicatorForm } from '../../form-models/indicator';

describe('AddLabelAltComponent', () => {
  let component: AddLabelAltComponent;
  let fixture: ComponentFixture<AddLabelAltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AddLabelAltComponent,
        CapitalizePipe
      ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatAutocompleteModule,
        StoreModule.forRoot(fromRoot.reducers)
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabelAltComponent);
    component = fixture.componentInstance;
    component.parentForm = IndicatorForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add label to parent form', () => {
    component.newLabel.setValue('test2');
    component.addToParent();
    fixture.detectChanges();
    expect(component.newLabel.value).toBe('');
    expect(component.parentForm.get('labels').value.includes('test2')).toBeTruthy();
  });
});
