import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { StixService } from '../../../stix.service';

// Load the implementations that should be tested
import { ThreatActorsComponent } from './threat-actors.component';

describe(`ThreatActorsComponent`, () => {
  let comp: ThreatActorsComponent;
  let fixture: ComponentFixture<ThreatActorsComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreatActorsComponent ],
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

  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatActorsComponent);
    comp    = fixture.componentInstance;
  });

  // synchronous beforeEach
  // beforeEach(() => {
  //   fixture.detectChanges(); // trigger initial data binding
  // });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

});
