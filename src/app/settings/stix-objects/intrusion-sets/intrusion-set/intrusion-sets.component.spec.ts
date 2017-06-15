import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';

// Load the implementations that should be tested
import { IntrusionSetsComponent } from './intrusion-sets.component';

describe(`IntrusionSetsComponent`, () => {
  let comp: IntrusionSetsComponent;
  let fixture: ComponentFixture<IntrusionSetsComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrusionSetsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: []
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(IntrusionSetsComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

});
