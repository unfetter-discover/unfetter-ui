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
import { Indicator } from '../../models/stix/indicator';
import { Observable } from 'rxjs/Observable';
import { CourseOfAction } from '../../models/stix/course-of-action';
import { Sensor } from '../../models/unfetter/sensor';

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

  it('should know the first side panel with data, if it is indicators', () => {
    const indicators = [new Indicator()];
    const coa = [new CourseOfAction()];
    component.indicators = indicators;
    component.mitigations = coa;
    expect(component).toBeTruthy();
    const firstPanel = component.determineFirstOpenSidePanel();
    expect(firstPanel).toBeDefined();
    expect(firstPanel).toEqual('indicators');
  });

  it('should know the first side panel with data, if it is mitigations', () => {
    const coa = [new CourseOfAction()];
    component.mitigations = coa;
    expect(component).toBeTruthy();
    const firstPanel = component.determineFirstOpenSidePanel();
    expect(firstPanel).toBeDefined();
    expect(firstPanel).toEqual('mitigations');
  });

  it('should know the next side panel with data, case 1', () => {
    const indicators = [new Indicator()];
    const coa = [new CourseOfAction()];
    component.indicators = indicators;
    component.mitigations = coa;
    component.openedSidePanel = 'indicators';
    expect(component).toBeTruthy();
    const nextPanel = component.determineNextSidePanel();
    expect(nextPanel).toBeDefined();
    expect(nextPanel).toEqual('mitigations');
  });

  it('should know the next side panel with data, case 2', () => {
    const indicators = [new Indicator()];
    const sensors = [new Sensor()];
    component.indicators = indicators;
    component.sensors = sensors;
    component.openedSidePanel = 'indicators';
    expect(component).toBeTruthy();
    const nextPanel = component.determineNextSidePanel();
    expect(nextPanel).toBeDefined();
    expect(nextPanel).toEqual('sensors');
  });

  it('should know the next side panel with data, case 3', () => {
    const indicators = [new Indicator()];
    const sensors = [new Sensor()];
    component.indicators = indicators;
    component.sensors = sensors;
    component.openedSidePanel = 'sensors';
    expect(component).toBeTruthy();
    const nextPanel = component.determineNextSidePanel();
    expect(nextPanel).toBeDefined();
    expect(nextPanel).toEqual('summary');
  });

});
