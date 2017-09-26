import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';
import { SightingComponent } from './index';

// Load the implementations that should be tested
<<<<<<< HEAD
import { SightingHomeComponent } from './sighting-home.component';

describe(`SightingsComponent`, () => {
  let comp: SightingHomeComponent;
  let fixture: ComponentFixture<SightingHomeComponent>;
=======

describe(`SightingsComponent`, () => {
  let comp: SightingComponent;
  let fixture: ComponentFixture<SightingComponent>;
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [ SightingHomeComponent ],
=======
      declarations: [ SightingComponent ],
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72
      schemas: [NO_ERRORS_SCHEMA],
      providers: []
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
<<<<<<< HEAD
    fixture = TestBed.createComponent(SightingHomeComponent);
=======
    fixture = TestBed.createComponent(SightingComponent);
>>>>>>> 283ec9c049b98e2f29a9b31f1772293727fdeb72
    comp    = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

});
