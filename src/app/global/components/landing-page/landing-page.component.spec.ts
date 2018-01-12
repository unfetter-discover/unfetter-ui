import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LandingPageComponent } from './landing-page.component';
import { AuthService } from '../../../core/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../../../core/services/config.service';
import { GenericApi } from '../../../core/services/genericapi.service';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientTestingModule  
        ],
        declarations: [ LandingPageComponent ],
        schemas: [ NO_ERRORS_SCHEMA ],
        providers: [ 
            AuthService,
            ConfigService,
            GenericApi
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
