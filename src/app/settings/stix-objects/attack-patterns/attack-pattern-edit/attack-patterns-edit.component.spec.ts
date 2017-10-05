import {
    NO_ERRORS_SCHEMA,
    DebugElement,
    ChangeDetectorRef
  } from '@angular/core';
import {
    inject,
    async,
    fakeAsync,
    TestBed,
    ComponentFixture,
    tick
  } from '@angular/core/testing';
import {
    MdDialog,
    MdSnackBar,
    MaterialModule,
    MdInputModule,
    MdSelectModule
  } from '@angular/material';
// Only implements params and part of snapshot.paramMap
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap } from '@angular/router';

import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, LocationStrategy, CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { StixService } from '../../../stix.service';
import { GlobalModule } from '../../../../global/global.module';
import { ComponentModule } from '../../../../components/component.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';

// Load the implementations that should be tested
import { AttackPatternEditComponent } from './attack-patterns-edit.component';
import { AttackPattern } from '../../../../models/attack-pattern';
import { ExternalReference } from '../../../../models/externalReference';
import { KillChainPhase } from '../../../../models/kill-chain-phase';

////// Testing Vars //////
const id = 'attack-pattern-9999999'
let comp: AttackPatternEditComponent;
let fixture: ComponentFixture<AttackPatternEditComponent>;
let overlayContainerElement: HTMLElement;
let de: DebugElement;
let el: HTMLInputElement;
let activatedRoute: ActivatedRouteStub;
let stixServiceStub = {
  get: (i: string): Observable<any> => {
    const external = new ExternalReference();
    external.description = 'test desc';
    external.source_name = 'test source';
    external.url = 'someUrl.com';

    const killChainPhase = new KillChainPhase();
    killChainPhase.kill_chain_name = 'test kill_chain_name';
    killChainPhase.phase_name = 'test phase_name';

    const data = {'id': id, attributes: {
      name: 'Attach Pattern Name',
      description: 'Attack pattern test desc',
      external_references: [external],
      kill_chain_phases: [killChainPhase],
      x_unfetter_sophistication_level: 1
    }};
    return Observable.of(data);
  },

  load: (filter?: any): Observable<any[]> => {
    return Observable.of([]);
  },

  create: (item: any): Observable<any> => {
    return Observable.of(item);
  }
}

////// Tests //////
describe('AttackPatternEditComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParamMap = { 'id': id } ;
  });
  describe('Test', componetInitialized);
  describe('Test', displayInfo);
  describe('Test', updating);

});

//////////////////////////////////
function componetInitialized() {
  moduleSetup();

  describe('component creation', () => {
    createComponent();

    it('should be readly initialized', () => {
          expect(fixture).toBeDefined();
          expect(comp).toBeDefined();
    });
  });
}
/////////////////////////////////////
function updating() {
  moduleSetup();

  describe('updating attack pattern data', () => {
    createComponent();

    it('should update attack pattern name', () => {
          fixture.detectChanges(); // runs initial lifecycle hooks
          fixture.whenStable().then(() => {
            const oldName = comp.attackPattern.attributes.name;

            el = fixture.debugElement.query(By.css('.attack-pattern-name')).nativeElement;
            expect(el.value).toBe(comp.attackPattern.attributes.name);

            // simulate user entering new name into the text box
            el.value = 'new attack pattern name';
            el.dispatchEvent(newEvent('input'));

            // attack pattern model description field should be updated
            expect(comp.attackPattern.attributes.name).not.toEqual(oldName, 'should update attack pattern name');
            expect(comp.attackPattern.attributes.name).toEqual(el.value, 'should update attack pattern name');
          });

    });

    it('should update attack pattern description', () => {
      fixture.detectChanges(); // runs initial lifecycle hooks
      fixture.whenStable().then(() => {
        const oldDescription = comp.attackPattern.attributes.description;

        el = fixture.debugElement.query(By.css('.attack-pattern-desc')).nativeElement;
        expect(el.value).toBe(comp.attackPattern.attributes.description);

        // simulate user entering new description into the text box
        el.value = 'new attack pattern description';
        el.dispatchEvent(newEvent('input'));

        // attack pattern model description field should be updated
        expect(comp.attackPattern.attributes.description).not.toEqual(oldDescription, 'should update attack pattern description');
        expect(comp.attackPattern.attributes.description).toEqual(el.value, 'should update attack pattern description');
      });
    });

    it('should update attack pattern kill chains', () => {
      fixture.detectChanges(); // runs initial lifecycle hooks
      fixture.whenStable().then(() => {
        const oldKill_chain_phases = comp.attackPattern.attributes.kill_chain_phases[0];

        el = fixture.debugElement.query(By.css('#kill-chain-name')).nativeElement;
        expect(el.value).toBe(oldKill_chain_phases.kill_chain_name);
        el.value = 'killChainName';
        el.dispatchEvent(newEvent('input'));

        el = fixture.debugElement.query(By.css('.attack-pattern-desc')).nativeElement;
        expect(el.value).toBe(comp.attackPattern.attributes.description);

        // attack pattern model kill_chain_phases field should be updated
        expect(comp.attackPattern.attributes.kill_chain_phases[0].kill_chain_name).not.toEqual(el.value, 'should update attack pattern description');
        // expect(comp.attackPattern.attributes.description).toEqual(el.value, 'should update attack pattern description');
      });
    });
  })
}

/////////////////////////////////////
function displayInfo() {
  moduleSetup();

  describe('display attack pattern data', () => {
    createComponent();

    it('should display attack pattern name', () => {
      fixture.detectChanges(); // runs initial lifecycle hooks
      fixture.whenStable().then(() => {
        el = fixture.debugElement.query(By.css('.attack-pattern-name')).nativeElement;
        expect(el.value).toBe(comp.attackPattern.attributes.name);
      });

    });

    it('should display attack pattern description', () => {
      fixture.detectChanges(); // runs initial lifecycle hooks
      fixture.whenStable().then(() => {
        el = fixture.debugElement.query(By.css('.attack-pattern-desc')).nativeElement;
        expect(el.value).toBe(comp.attackPattern.attributes.description);
      });
    });

    it('should display attack pattern kill chains', () => {
      fixture.detectChanges(); // runs initial lifecycle hooks
      fixture.whenStable().then(() => {
        el = fixture.debugElement.query(By.css('#kill-chain-name')).nativeElement;
        expect(el.value).toBe(comp.attackPattern.attributes.kill_chain_phases[0].kill_chain_name);

        el = fixture.debugElement.query(By.css('#phase-name')).nativeElement;
        expect(el.value).toBe(comp.attackPattern.attributes.kill_chain_phases[0].phase_name);
      });
    });

    it('should display attack pattern external reference', () => {
      fixture.detectChanges(); // runs initial lifecycle hooks
      fixture.whenStable().then(() => {
        el = fixture.debugElement.query(By.css('#externalReference-source-name')).nativeElement;
        expect(el.value).toBe(comp.attackPattern.attributes.external_references[0].source_name);

        el = fixture.debugElement.query(By.css('#externalReference-url')).nativeElement;
        expect(el.value).toBe(comp.attackPattern.attributes.external_references[0].url);
      });
    });
  });
}

function click(e: DebugElement ) {
  // query for the save element selector
  e.triggerEventHandler('click', null);
}

function moduleSetup() {
   // async beforeEach
   beforeEach( async(() => {
      TestBed.configureTestingModule({
        imports: [
          GlobalModule, ComponentModule, FormsModule, NoopAnimationsModule, MdSelectModule
        ],
        declarations: [AttackPatternEditComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: StixService, useValue: stixServiceStub},
          { provide: ActivatedRoute, useValue: activatedRoute },
          { provide: Router, useValue: {} },
          { provide: MdDialog, useValue: {} },
          { provide: Location, useValue: {back: (): void => {} } },
          { provide: MdSnackBar, useValue: {} },
          { provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div') as HTMLElement;
            overlayContainerElement.classList.add('cdk-overlay-container');

            document.body.appendChild(overlayContainerElement);

            // remove body padding to keep consistent cross-browser
            document.body.style.padding = '0';
            document.body.style.margin = '0';

            return {getContainerElement: () => overlayContainerElement};
          }},
        ]
      });
    })
  );
}

function createComponent() {
  beforeEach(() => {
    fixture = TestBed.createComponent(AttackPatternEditComponent);
    comp = fixture.componentInstance; // AttackPatternNewComponent test
  });
}

function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

class ActivatedRouteStub {
  // ActivatedRoute.paramMap is Observable
  public  subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
  public params = this.subject.asObservable();

  // Test parameters
  private _testParamMap: ParamMap;
  get testParamMap() { return this._testParamMap; }
  set testParamMap(params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }

  // ActivatedRoute.snapshot.paramMap
  get snapshot() {
    return { paramMap: this.testParamMap };
  }
}
