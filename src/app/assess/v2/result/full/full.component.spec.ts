import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { GenericApi } from '../../../core/services/genericapi.service';
import { GlobalModule } from '../../../global/global.module';
import { AssessService } from '../../services/assess.service';
import { fullAssessmentResultReducer } from '../store/full-result.reducers';
import { FullComponent } from './full.component';

describe('FullComponent', () => {
  let component: FullComponent;
  let fixture: ComponentFixture<FullComponent>;

  const materialModules = [
    MatSidenavModule
  ];

  beforeEach(async(() => {
    let mockReducer: ActionReducerMap<any> = {
      fullAssessment: fullAssessmentResultReducer,
    };
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        GlobalModule,
        ...materialModules,
        StoreModule.forRoot(mockReducer),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FullComponent],
      providers: [
        AssessService,
        GenericApi,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
