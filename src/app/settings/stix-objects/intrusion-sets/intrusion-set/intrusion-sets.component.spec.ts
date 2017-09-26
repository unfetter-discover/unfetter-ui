import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Location } from '@angular/common';

// Load the implementations that should be tested
import { IntrusionSetComponent } from './intrusion-set.component';
<<<<<<< HEAD
import { StixService } from '../../../stix.service';

describe(`IntrusionSetComponent`, () => {
=======

describe(`IntrusionSetsComponent`, () => {
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72
  let comp: IntrusionSetComponent;
  let fixture: ComponentFixture<IntrusionSetComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrusionSetComponent ],
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
    fixture = TestBed.createComponent(IntrusionSetComponent);
    comp    = fixture.componentInstance;
  }));

  // synchronous beforeEach
<<<<<<< HEAD
  // beforeEach(() => {
  //   fixture.detectChanges(); // trigger initial data binding
  // });
=======
  beforeEach(() => {
    fixture = TestBed.createComponent(IntrusionSetComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
  });
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined('IntrusionSetComponent not defined');
    expect(comp).toBeDefined();
  });

});
