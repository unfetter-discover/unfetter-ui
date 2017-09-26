import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

// Load the implementations that should be tested
import { CourseOfActionComponent } from './course-of-action.component';
<<<<<<< HEAD
import { StixService } from '../../../stix.service';
=======
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72

describe(`CoursesOfActionComponent`, () => {
  let comp: CourseOfActionComponent;
  let fixture: ComponentFixture<CourseOfActionComponent>;

  // async beforeEach
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseOfActionComponent ],
      schemas: [NO_ERRORS_SCHEMA],
<<<<<<< HEAD
      providers: [
        {provide: StixService, useValue: {} },
        {provide: ActivatedRoute, useValue: {} },
        {provide: Router, useValue: {} },
        {provide: MdDialog, useValue: {} },
        {provide: Location, useValue: {} },
        {provide: MdSnackBar, useValue: {} }
      ]
    });
=======
      providers: []
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72
    fixture = TestBed.createComponent(CourseOfActionComponent);
    comp    = fixture.componentInstance;
  });

  // // synchronous beforeEach
  // beforeEach(() => {
  //   fixture.detectChanges(); // trigger initial data binding
  // });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

});
