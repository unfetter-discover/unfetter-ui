import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { StixService } from '../../../stix.service';

// Load the implementations that should be tested
import { IdentityComponent } from './identity.component';

describe(`IdentityComponent`, () => {
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
        {provide: MatDialog, useValue: {} },
        {provide: Location, useValue: {} },
        {provide: MatSnackBar, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(IdentityComponent);
    comp    = fixture.componentInstance;
  }));

  // synchronous beforeEach
  // beforeEach(() => {
  //   fixture.detectChanges(); // trigger initial data binding
  // });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

});
