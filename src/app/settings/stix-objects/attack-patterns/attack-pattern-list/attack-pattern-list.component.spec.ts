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
  };

  // async beforeEach
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
          { provide: MdSnackBar, useValue: {} },
          { provide: ChangeDetectorRef, useValue: {} },
          { provide: LocationStrategy, useValue: {} },
        ]
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AttackPatternListComponent);
    comp = fixture.componentInstance; // AttackPatternListComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
  });

  xit('should display one attack pattern', () => {
    const attackPatternId = 'abcd-123';
    const data = createData(attackPatternId);

    res.push(data);
    fixture.detectChanges();
    expect(comp.attackPatterns.length).toEqual(1);

    de = fixture.debugElement.query(By.css('p-accordiontab'));
    alert('*******');
    alert(de);
    de.triggerEventHandler('click', null);
    const elId = '#' + attackPatternId;
    de = fixture.debugElement.query(By.css(elId));
    el = de.nativeElement;
    expect(comp.attackPatterns.length).toEqual(1);
    expect(el.textContent).toEqual(data.attributes.name);
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
