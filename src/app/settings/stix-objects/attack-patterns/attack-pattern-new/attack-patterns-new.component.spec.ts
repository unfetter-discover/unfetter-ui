import { OverlayContainer } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatInputModule, MatSelectModule, MatSnackBar } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { of as observableOf, Observable } from 'rxjs';
import { ComponentModule } from '../../../../components/component.module';
import { CoreModule } from '../../../../core/core.module';
import { ConfigService } from '../../../../core/services/config.service';
import { GlobalModule } from '../../../../global/global.module';
import { reducers } from '../../../../root-store/app.reducers';
import { click, newEvent } from '../../../../testing/index';
import { StixService } from '../../../stix.service';
// Load the implementations that should be tested
import { AttackPatternNewComponent } from './attack-patterns-new.component';



/** Duration of the select opening animation. */
const SELECT_OPEN_ANIMATION = 200;
/** Duration of the select closing animation and the timeout interval for the backdrop. */
const SELECT_CLOSE_ANIMATION = 500;

////// Testing Vars //////
let comp: AttackPatternNewComponent;
let fixture: ComponentFixture<AttackPatternNewComponent>;
let overlayContainerElement: HTMLElement;
let de: DebugElement;
let el: HTMLInputElement;

let res = [];
let serviceMock = {
  url: '',
  load: (filter?: any): Observable<any[]> => {
    return observableOf(res);
  },

  create: (item: any): Observable<any> => {
    return observableOf([item]);
  }
};

////// Tests //////
describe('AttackPatternNewComponent', () => {
  describe('Test', componetInitialized);
  describe('Test', buttons);
  describe('Test', formFields)
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

//////////////////////////////////
function buttons() {
  moduleSetup();
  describe('ADD, CANCEL, and SAVE buttons', () => {
    createComponent();

    it('should disable save button if name field is empty', () => {
      comp.attackPattern.attributes.name = null;
      fixture.detectChanges(); // runs initial lifecycle hooks
      de = fixture.debugElement.query(By.css('#save-btn'))
      // should not create attack-pattern
      expect(de.nativeElement.disabled).toBe(true, 'should disable save button if name field is empty');
    });

    it('should enable save button if name and created_by_ref fields are not empty', () => {
      comp.attackPattern.attributes.name = 'Test Attack Pattern name';
      comp.attackPattern.attributes.created_by_ref = 'identity-1234';
      fixture.detectChanges(); // runs initial lifecycle hooks
      de = fixture.debugElement.query(By.css('#save-btn'))
      // should not create attack-pattern
      expect(de.nativeElement.disabled).toBe(false, 'should enable save button if name field is not empty');
    });

    it('should save attack pattern whenn clicked', () => {
      const location: Location = fixture.debugElement.injector.get(Location);
      const locationSpy = spyOn(location, 'back');

      const stixService = fixture.debugElement.injector.get(StixService);
      const saveSpy = spyOn(stixService, 'create').and.callThrough();

      comp.attackPattern.attributes.name = 'Test Attack Pattern name';
      fixture.detectChanges(); // runs initial lifecycle hooks
      de = fixture.debugElement.query(By.css('#save-btn'));
      click(de);
      // should create attack-pattern
      expect(saveSpy.calls.any()).toBe(true, 'StixService.create called');

      // should not create attack-pattern
      expect(locationSpy.calls.any()).toBe(true, 'should navigate back after saving');
    });

    it('should navigate back if cancel button click', () => {
      const location: Location = fixture.debugElement.injector.get(Location);
      const locationSpy = spyOn(location, 'back');

      fixture.detectChanges(); // runs initial lifecycle hooks
      de = fixture.debugElement.query(By.css('#canel-btn'))
      click(de)
      // should not create attack-pattern
      expect(locationSpy.calls.any()).toBe(true, 'should navigate back if cancel button click');
    });

    it('should add kill chain when add button is clicked', () => {
      fixture.detectChanges(); // runs initial lifecycle hooks
      expect(comp.attackPattern.attributes.kill_chain_phases.length).toBeLessThanOrEqual(0, 'kill chain not equal zero');
      de = fixture.debugElement.query(By.css('#add-kill-chain'));
      click(de)
      // attack pattern model should be updated
      expect(comp.attackPattern.attributes.kill_chain_phases.length).toBeGreaterThan(0, 'should add kill chain when add button is clicked');
    });

    it('should add external references when add button is clicked', () => {
      fixture.detectChanges(); // runs initial lifecycle hooks
      expect(comp.attackPattern.attributes.external_references.length).toBeLessThanOrEqual(0, 'external references not equal zero');
      de = fixture.debugElement.query(By.css('#add-external-references'))
      click(de)
      // attack pattern model should be updated
      expect(comp.attackPattern.attributes.external_references.length).toBeGreaterThan(0, 'should add external references when add button is clicked');
    });
  })

}
//////////////////////////////////
function formFields() {
  moduleSetup();
  // async beforeEach
  describe('update model when form field is populated', () => {
    createComponent();

    it('should add name to model', () => {
      const testName = 'Test Attack Pattern Name';
      fixture.detectChanges(); // runs initial lifecycle hooks
      expect(comp.attackPattern.attributes.name).toBe('', 'model should not have name value');

      // simulate user entering new name into the input box
      el = fixture.debugElement.query(By.css('#attack-pattern-name')).nativeElement;
      el.value = testName;

      el.dispatchEvent(newEvent('input'));

      expect(comp.attackPattern.attributes.name).toBe(testName, 'should add name to model');
    });

    it('should add description to model', () => {
      const description = 'Test Attack Pattern description';
      fixture.detectChanges(); // runs initial lifecycle hooks

      expect(comp.attackPattern.attributes.description).toBeUndefined('model should not have description value');

      // simulate user entering new description into the text box
      el = fixture.debugElement.query(By.css('#attack-pattern-desc')).nativeElement
      el.value = description;
      el.dispatchEvent(newEvent('input'));

      // attack pattern model description field should be updated
      expect(comp.attackPattern.attributes.description).toBe(description, 'should add name to model');
    });

    it('should add sophistication level to model', fakeAsync(() => {
      const novice = comp.x_unfetter_sophistication_levels[0].id;
      fixture.detectChanges(); // runs initial lifecycle hooks

      expect(comp.attackPattern.attributes.x_unfetter_sophistication_level).toBeUndefined('model should not have sophistication value');

      el = fixture.debugElement.query(By.css('#sophistication-level .mat-select-trigger')).nativeElement;
      el.click();
      fixture.detectChanges();
      tick(SELECT_OPEN_ANIMATION);
      let option = overlayContainerElement.querySelector('.sophistication-option') as HTMLElement;
      option.click();
      fixture.detectChanges();
      tick(SELECT_CLOSE_ANIMATION);

      // attack pattern model sophistication field should be updated
      expect(comp.attackPattern.attributes.x_unfetter_sophistication_level).toBe(novice, 'should add name to model');
    }));

    it('should add kill chain to model', fakeAsync(() => {
      const killChainName = 'kill-chain-name';
      const phaseName = 'Phase name';
      fixture.detectChanges(); // runs initial lifecycle hooks

      expect(comp.attackPattern.attributes.kill_chain_phases.length).toBeLessThanOrEqual(0, 'kill chain not equal zero');
      de = fixture.debugElement.query(By.css('#add-kill-chain'))
      click(de);
      fixture.detectChanges();
      tick(200);

      // simulate user entering new kill chain into the text box
      el = fixture.debugElement.query(By.css('#kill-chain-name')).nativeElement;
      el.value = killChainName;
      el.dispatchEvent(newEvent('input'));

      // simulate user entering new phase name into the text box
      el = fixture.debugElement.query(By.css('#phase-name')).nativeElement;
      el.value = phaseName;
      el.dispatchEvent(newEvent('input'));

      // attack pattern model should be updated
      const kill_chain_phases = comp.attackPattern.attributes.kill_chain_phases[0]
      expect(kill_chain_phases.kill_chain_name).toEqual(killChainName, 'should add kill chain when add button is clicked');
      expect(kill_chain_phases.phase_name).toEqual(phaseName, 'should add kill chain when add button is clicked')

    }));

    it('should add external reference to model', fakeAsync(() => {
      const sourceName = 'source name';
      const urlName = 'test@abc.com';
      fixture.detectChanges(); // runs initial lifecycle hooks

      expect(comp.attackPattern.attributes.external_references.length).toBeLessThanOrEqual(0, 'kill chain not equal zero');
      de = fixture.debugElement.query(By.css('#add-external-references'))
      click(de);

      fixture.detectChanges();
      tick(200);

      // simulate user entering new kill chain into the text box
      el = fixture.debugElement.query(By.css('#externalReference-source-name')).nativeElement;
      el.value = sourceName;
      el.dispatchEvent(newEvent('input'));

      // simulate user entering new phase name into the text box
      el = fixture.debugElement.query(By.css('#externalReference-url')).nativeElement;
      el.value = urlName;
      el.dispatchEvent(newEvent('input'));

      // attack pattern model should be updated
      const external_reference = comp.attackPattern.attributes.external_references[0]
      expect(external_reference.source_name).toEqual(sourceName, 'should add kill chain when add button is clicked');
      expect(external_reference.url).toEqual(urlName, 'should add kill chain when add button is clicked')

    }));
  })
}

function moduleSetup() {
  const matModules = [
    MatInputModule,
    MatSelectModule
  ];
  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        GlobalModule,
        CoreModule.forRoot(),
        ComponentModule,
        FormsModule,
        StoreModule.forRoot(reducers),
        ...matModules,
      ],
      declarations: [AttackPatternNewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: StixService, useValue: serviceMock },
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: Location, useValue: { back: (): void => { } } },
        { provide: MatSnackBar, useValue: { open: () => {} } },
        {
          provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div') as HTMLElement;
            overlayContainerElement.classList.add('cdk-overlay-container');

            document.body.appendChild(overlayContainerElement);

            // remove body padding to keep consistent cross-browser
            document.body.style.padding = '0';
            document.body.style.margin = '0';

            return { getContainerElement: () => overlayContainerElement };
          }
        },
        ConfigService
      ]
    });
  })
  );
}

function createComponent() {
  beforeEach(() => {
    fixture = TestBed.createComponent(AttackPatternNewComponent);
    comp = fixture.componentInstance; // AttackPatternNewComponent test
  });
}
