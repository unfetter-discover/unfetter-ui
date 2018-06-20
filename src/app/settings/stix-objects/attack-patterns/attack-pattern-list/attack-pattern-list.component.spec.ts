import { Location, LocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatDialog, MatSnackBar } from '@angular/material';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { of as observableOf, Observable } from 'rxjs';
import { CoreModule } from '../../../../core/core.module';
import { GlobalModule } from '../../../../global/global.module';
import { reducers } from '../../../../root-store/app.reducers';
import { StixService } from '../../../stix.service';
// Load the implementations that should be tested
import { AttackPatternListComponent } from './attack-pattern-list.component';


describe(`AttackPatternListComponent`, () => {
  let comp: AttackPatternListComponent;
  let fixture: ComponentFixture<AttackPatternListComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let res = [];
  let serviceMock = {
    url: '',
    load: (filter?: any): Observable<any[]> => {
      return observableOf(res);
    }
  };

  // async beforeEach
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          GlobalModule,
          CoreModule.forRoot(),
          HttpClientTestingModule,
          StoreModule.forRoot(reducers),
        ],
        declarations: [AttackPatternListComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: StixService, useValue: serviceMock },
          { provide: ActivatedRoute, useValue: {} },
          { provide: Router, useValue: {} },
          { provide: MatDialog, useValue: {} },
          { provide: Location, useValue: {} },
          { provide: MatSnackBar, useValue: {} },
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
