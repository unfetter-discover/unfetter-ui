import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { StixService } from '../../../stix.service';

// Load the implementations that should be tested
import { IndicatorComponent } from './indicator.component';

<<<<<<< HEAD
describe(`IndicatorComponent`, () => {
=======
describe(`IndicatorsComponent`, () => {
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72
  let comp: IndicatorComponent;
  let fixture: ComponentFixture<IndicatorComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorComponent ],
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
    fixture = TestBed.createComponent(IndicatorComponent);
    comp    = fixture.componentInstance;
  }));

  // synchronous beforeEach
<<<<<<< HEAD
  // beforeEach(() => {
  //   fixture.detectChanges(); // trigger initial data binding
  // });
=======
  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
  });
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

});
