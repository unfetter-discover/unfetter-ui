import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed,  ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { AppState } from './app.service';
import { AuthService } from './core/services/auth.service';
import { ConfigService } from './core/services/config.service';
import { GenericApi } from './core/services/genericapi.service';
import { WebAnalyticsService } from './core/services/web-analytics.service';
import { AppModule } from './app.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './root-store/app.reducers';

describe(`App`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // async beforeEach
  beforeEach(async(() => {
    const services = [
      AppState, 
      AuthService, 
      GenericApi,
      ConfigService,
      WebAnalyticsService,
    ];

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, 
        HttpModule, 
        StoreModule.forRoot(reducers)
      ],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [...services]
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
