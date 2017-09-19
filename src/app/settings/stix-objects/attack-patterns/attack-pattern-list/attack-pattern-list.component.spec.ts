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
  };
  let attackPatternsService;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttackPatternComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: StixService, useValue: MockAttackPatternsService}
      ]
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
      fixture = TestBed.createComponent(AttackPatternComponent);
      comp    = fixture.componentInstance;

      // UserService actually injected into the component
      attackPatternsService = fixture.debugElement.injector.get(StixService);
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should load attach patterns`, () => {
    fixture.detectChanges(); // trigger initial data binding
    expect(comp.attackPattern).toBeDefined('should load a attack pattern');
  });

});
