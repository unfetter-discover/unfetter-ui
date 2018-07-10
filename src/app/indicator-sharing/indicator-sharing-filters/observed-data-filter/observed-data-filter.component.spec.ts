import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ObservedDataFilterComponent } from './observed-data-filter.component';
import { MatDialogModule, MatButtonModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { PatternHandlerPatternObject } from '../../../global/models/pattern-handlers';

describe('ObservedDataFilterComponent', () => {
  let component: ObservedDataFilterComponent;
  let fixture: ComponentFixture<ObservedDataFilterComponent>;
  const mockPatternHandlerObjs: PatternHandlerPatternObject[] = [
    {
      name: 'foo',
      action: 'bar',
      property: 'wham'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservedDataFilterComponent ],
      imports: [
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {}
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            formCtrl: new FormControl([...mockPatternHandlerObjs])
          }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservedDataFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update form on accept', () => {
    const newObj = {
      name: 'bob',
      action: 'jim',
      property: 'fred'
    };
    component.observedDataPath.push(newObj);
    component.accept();
    const expected = [...mockPatternHandlerObjs, newObj];
    expect(component.observedDataPath).toEqual(expected);
  });
});
