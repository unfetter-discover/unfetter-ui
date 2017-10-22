import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { AppState } from './app.service';
import { AuthService } from './global/services/auth.service';
import { GenericApi } from './global/services/genericapi.service';

describe(`App`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule],
      declarations: [ AppComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AppState, AuthService, GenericApi]
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

});
