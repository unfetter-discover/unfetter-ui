import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatExpansionModule, MatProgressBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from 'app/root-store/app.reducers';
import { assessmentReducer } from '../store/assess.reducers';

import { WizardComponent } from './wizard.component';
import { ComponentModule } from '../../components/component.module';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../../pipes/pipes.module';
import { GlobalModule } from '../../global/global.module';
import { GenericApi } from '../../core/services/genericapi.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('WizardComponent', () => {
  let component: WizardComponent;
  let fixture: ComponentFixture<WizardComponent>;

  beforeEach(async(() => {
    const matModules = [
      MatButtonModule,
      MatCardModule,
      MatDatepickerModule,
      MatDialogModule,
      MatExpansionModule,
      MatSnackBarModule,
      MatSelectModule,
      MatInputModule,
      MatProgressBarModule
    ];

    TestBed.configureTestingModule({
      declarations: [WizardComponent],
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        ...matModules,
        ComponentModule,
        ChartsModule,
        PipesModule,
        GlobalModule,
        FormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'assessment': combineReducers(assessmentReducer)
        }),
      ],
      providers: [ GenericApi ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
