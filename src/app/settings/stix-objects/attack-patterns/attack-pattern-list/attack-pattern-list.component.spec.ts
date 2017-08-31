import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';
import { AttackPatternsService } from '../../../services';

// Load the implementations that should be tested
import { AttackPatternsComponent } from '../attack-patterns.component';
import { AttackPattern } from '../../../models/attack-pattern';

import { Observable } from 'rxjs/Observable';

describe(`AttackPatternsComponent`, () => {
  let comp: AttackPatternsComponent;
  let fixture: ComponentFixture<AttackPatternsComponent>;
  let MockAttackPatternsService = {
     getAttackPatterns: (): Observable<AttackPattern[]> => {
        let pattern: AttackPattern;
        let attackPatterens = [ ];
        for (let i = 0; i < 2; i++) {
            pattern =  new AttackPattern();
            pattern.id = i;
            pattern.name = 'pattern' + i;
            attackPatterens.push(pattern);
        }
        return Observable.of(attackPatterens);
     }
  };
  let attackPatternsService;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttackPatternsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: AttackPatternsService, useValue: MockAttackPatternsService}
      ]
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
      fixture = TestBed.createComponent(AttackPatternsComponent);
      comp    = fixture.componentInstance;

      // UserService actually injected into the component
      attackPatternsService = fixture.debugElement.injector.get(AttackPatternsService);
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should load attach patterns`, () => {
    fixture.detectChanges(); // trigger initial data binding
    expect(comp.attackPatterns.length).toEqual(2, 'should load two attack patterns');
  });

});
