import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog, MdSnackBar } from '@angular/material';
import { StixService } from '../../../stix.service';

// Load the implementations that should be tested
import { IdentityComponent } from './identity.component';

<<<<<<< HEAD
describe(`IdentityComponent`, () => {
=======
describe(`IndentitiesComponent`, () => {
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72
  let comp: IdentityComponent;
  let fixture: ComponentFixture<IdentityComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityComponent ],
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
    fixture = TestBed.createComponent(IdentityComponent);
    comp    = fixture.componentInstance;
  }));

  // synchronous beforeEach
<<<<<<< HEAD
  // beforeEach(() => {
  //   fixture.detectChanges(); // trigger initial data binding
  // });
=======
  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
  });
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

});
