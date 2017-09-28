import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

// Load the implementations that should be tested
import { CourseOfActionComponent } from './course-of-action.component';
import { StixService } from '../../../stix.service';

describe(`CoursesOfActionComponent`, () => {
  let comp: CourseOfActionComponent;
  let fixture: ComponentFixture<CourseOfActionComponent>;

  // async beforeEach
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseOfActionComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: StixService, useValue: {} },
        {provide: ActivatedRoute, useValue: {} },
        {provide: Router, useValue: {} },
        {provide: MdDialog, useValue: {} },
        {provide: Location, useValue: {} },
        {provide: MdSnackBar, useValue: {} }
      ]
    });
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
