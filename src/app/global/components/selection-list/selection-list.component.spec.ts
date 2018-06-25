import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionListComponent } from './selection-list.component';
import { MatInputModule, MatListModule, MatCheckboxModule } from '@angular/material';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldSortPipe } from '../../pipes/field-sort.pipe';

describe('SelectionListComponent', () => {
  let component: SelectionListComponent;
  let fixture: ComponentFixture<SelectionListComponent>;

  let mockStix = [
    {
      id: '123',
      name: 'bob'
    },
    {
      id: '456',
      name: 'jim'
    },
    {
      id: '789',
      name: 'fred'
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SelectionListComponent,
        FieldSortPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [        
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
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
