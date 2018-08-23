import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule } from '@angular/material';

import { ImplementationsListComponent } from './implementations-list.component';
import { IndicatorForm } from '../../form-models/indicator';

describe('ImplementationsListComponent', () => {
  let component: ImplementationsListComponent;
  let fixture: ComponentFixture<ImplementationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule
      ],
      declarations: [ ImplementationsListComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementationsListComponent);
    component = fixture.componentInstance;
    component.form = IndicatorForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
