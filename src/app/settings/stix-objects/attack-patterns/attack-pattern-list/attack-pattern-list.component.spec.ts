<<<<<<< HEAD
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { StixService } from '../../../stix.service';

// Load the implementations that should be tested
import { AttackPatternListComponent } from './attack-pattern-list.component';
import { GlobalModule } from '../../../../global/global.module';

describe(`AttackPatternListComponent`, () => {
  let comp: AttackPatternListComponent;
  let fixture: ComponentFixture<AttackPatternListComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let res = [];
  let serviceMock = {
    url: '',
    load: (filter?: any): Observable<any[]> => {
      return Observable.of(res);
    }
=======
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';
import { AttackPatternComponent } from '../attack-pattern/attack-pattern.component';

// Load the implementations that should be tested
import { AttackPattern } from '../../../../models/attack-pattern';

import { Observable } from 'rxjs/Observable';
import { StixService } from '../../../stix.service';

describe(`AttackPatternsComponent`, () => {
  let comp: AttackPatternComponent;
  let fixture: ComponentFixture<AttackPatternComponent>;
  let MockAttackPatternsService = {
     get: (): Observable<AttackPattern> => {
        let pattern: AttackPattern;
        pattern =  new AttackPattern();
        pattern.id = Math.round((Math.random() * 100)).toString();
        pattern.attributes.name = 'pattern' + pattern.id;
        return Observable.of(pattern);
     }
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72
  };

  // async beforeEach
<<<<<<< HEAD
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          GlobalModule
        ],
        declarations: [AttackPatternListComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: StixService, useValue: serviceMock },
          { provide: ActivatedRoute, useValue: {} },
          { provide: Router, useValue: {} },
          { provide: MdDialog, useValue: {} },
          { provide: Location, useValue: {} },
          { provide: MdSnackBar, useValue: {} }
        ]
      });
=======
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttackPatternComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: StixService, useValue: MockAttackPatternsService}
      ]
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72
    })
  );

  beforeEach(() => {
<<<<<<< HEAD
    fixture = TestBed.createComponent(AttackPatternListComponent);
    comp = fixture.componentInstance; // AttackPatternListComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
=======
      fixture = TestBed.createComponent(AttackPatternComponent);
      comp    = fixture.componentInstance;

      // UserService actually injected into the component
      attackPatternsService = fixture.debugElement.injector.get(StixService);
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72
  });

  it('should display one attack pattern', () => {
    const attackPatternId = 'abcd-123';
    const data = createData(attackPatternId);

    res.push(data);
    fixture.detectChanges();
    expect(comp.attackPatterns.length).toEqual(1);

<<<<<<< HEAD
    de = fixture.debugElement.query(By.css('p-accordiontab'));
    alert('*******');
    alert(de);
    de.triggerEventHandler('click', null);
    const elId = '#' + attackPatternId;
    de = fixture.debugElement.query(By.css(elId));
    el = de.nativeElement;
    expect(comp.attackPatterns.length).toEqual(1);
    expect(el.textContent).toEqual(data.attributes.name);
=======
  it(`should load attach patterns`, () => {
    fixture.detectChanges(); // trigger initial data binding
    expect(comp.attackPattern).toBeDefined('should load a attack pattern');
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72
  });

  function createData(dataId: string) {
    return {
      id: dataId,
      attributes: {
        name: 'Attack Pattern One'
      }
    };
  }
});
