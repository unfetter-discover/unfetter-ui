import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionListComponent } from './selection-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { MatInputModule, MatListModule, MatCheckboxModule } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('SelectionListComponent', () => {
  let component: SelectionListComponent;
  let fixture: ComponentFixture<SelectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [        
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatListModule,
        MatCheckboxModule,
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
