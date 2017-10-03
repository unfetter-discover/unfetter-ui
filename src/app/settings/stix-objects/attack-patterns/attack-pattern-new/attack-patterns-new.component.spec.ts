import {
    NO_ERRORS_SCHEMA,
    DebugElement,
    ChangeDetectorRef
  } from '@angular/core';
import {
    inject,
    async,
    TestBed,
    ComponentFixture
  } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Location, LocationStrategy } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { StixService } from '../../../stix.service';
import { GlobalModule } from '../../../../global/global.module';

// Load the implementations that should be tested
import { AttackPatternNewComponent } from './attack-patterns-new.component';
import { ComponentModule } from '../../../../components/component.module';

let comp: AttackPatternNewComponent;
let fixture: ComponentFixture<AttackPatternNewComponent>;
let de: DebugElement;
let el: HTMLElement;
let spy: jasmine.Spy;
let locationSpy: jasmine.Spy;
let res = [];
let serviceMock = {
  url: '',
  load: (filter?: any): Observable<any[]> => {
    return Observable.of(res);
  },

  create: (item: any): Observable<any> => {
    return Observable.of(item);
  }
};

fdescribe(`AttackPatternNewComponent`, () => {
  // async beforeEach
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          GlobalModule, ComponentModule
        ],
        declarations: [AttackPatternNewComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: StixService, useValue: serviceMock},
          { provide: ActivatedRoute, useValue: {} },
          { provide: Router, useValue: {} },
          { provide: MdDialog, useValue: {} },
          { provide: Location, useValue: {back: (): void => {} } },
          { provide: MdSnackBar, useValue: {} },
          // { provide: ChangeDetectorRef, useValue: {} },
          // { provide: LocationStrategy, useValue: {} },
        ]
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AttackPatternNewComponent);
    comp = fixture.componentInstance; // AttackPatternNewComponent test
     // TwainService actually injected into the component
    const stixService = fixture.debugElement.injector.get(StixService);
    const location  = fixture.debugElement.injector.get(Location);
    spy = spyOn(stixService, 'create');
    locationSpy = spyOn(location, 'back');

  });
  tests();

});

function tests() {
  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should disable save button if name field is empty`, () => {
    comp.attackPattern.attributes.name = null;
    fixture.detectChanges(); // runs initial lifecycle hooks
    de = fixture.debugElement.query(By.css('#save-btn'))
    // click(de)
    // should not create attack-pattern
    expect(de.nativeElement.disabled).toBe(true, 'save button not disabled');
  });

  it(`should enable save button if name field is not empty`, () => {
    comp.attackPattern.attributes.name = 'Test Attack Pattern name';
    fixture.detectChanges(); // runs initial lifecycle hooks
    de = fixture.debugElement.query(By.css('#save-btn'))
    // click(de)
    // should not create attack-pattern
    expect(de.nativeElement.disabled).toBe(false, 'save button not enabled');
  });

  it(`should navigate back if cancel button click`, () => {
    fixture.detectChanges(); // runs initial lifecycle hooks
    de = fixture.debugElement.query(By.css('#canel-btn'))
    click(de)
    // should not create attack-pattern
    expect(locationSpy.calls.any()).toBe(true, 'attack pettern not created');
  });

  it(`should add kill chain`, () => {
    fixture.detectChanges(); // runs initial lifecycle hooks
    expect(comp.attackPattern.attributes.kill_chain_phases.length).toBeLessThanOrEqual(0, 'kill chain not equal zero');
    de = fixture.debugElement.query(By.css('#add-kill-chain'))
    click(de)
    // should not create attack-pattern
    expect(comp.attackPattern.attributes.kill_chain_phases.length).toBeGreaterThan(0, 'kill chain not added');
  });
}

function click(e: DebugElement ) {
  // query for the save element selector
  e.triggerEventHandler('click', null);
}
