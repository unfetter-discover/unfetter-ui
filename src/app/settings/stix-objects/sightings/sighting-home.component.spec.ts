import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';

// Load the implementations that should be tested
import { SightingHomeComponent } from './sighting-home.component';

describe(`SightingsComponent`, () => {
  let comp: SightingHomeComponent;
  let fixture: ComponentFixture<SightingHomeComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SightingHomeComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: []
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(SightingHomeComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

});
