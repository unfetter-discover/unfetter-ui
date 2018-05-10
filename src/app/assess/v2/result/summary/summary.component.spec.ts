import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async, fakeAsync, flush } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionReducerMap, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AssessmentMockFactory } from 'stix/assess/v2/assessment.mock';
import { ComponentModule } from '../../../../components';
import { GenericApi } from '../../../../core/services/genericapi.service';
import { usersReducer } from '../../../../root-store/users/users.reducers';
import { Constance } from '../../../../utils/constance';
import { AssessService } from '../../services/assess.service';
import { riskByAttackPatternReducer } from '../store/riskbyattackpattern.reducers';
import { summaryReducer } from '../store/summary.reducers';
import { SummaryCalculationService } from './summary-calculation.service';
import { SummaryComponent } from './summary.component';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  let mockReducer: ActionReducerMap<any> = {
    summary: summaryReducer,
    riskByAttackPattern: riskByAttackPatternReducer,
    users: usersReducer,
    user: usersReducer,
  };

  const mockService = {
    summaryAggregation: null, populateAssessmentsGrouping: () => null, populateTechniqueBreakdown: () => null,
    calculateTopRisks: () => null, calculateWeakness: () => null, calculateThresholdOptionNames: () => null,
    setAverageRiskPerAssessedObject: () => null
  };
  const mockAssessService = { deleteByRollupId: () => Observable.of({}) };

  beforeEach(async(() => {
    const matModules = [
      MatDialogModule,
    ];

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SummaryComponent],

      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ...matModules,
        ComponentModule,
        StoreModule.forRoot(mockReducer),
      ],
    }).overrideComponent(SummaryComponent, {
      set: {
        providers: [GenericApi,
          {
            provide: SummaryCalculationService,
            useValue: mockService
          },
          {
            provide: AssessService,
            useValue: mockAssessService
          }]
      }
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request data', () => {
    component.requestData(null);
    expect(component.masterListOptions.dataSource != null);
  });

  it('should confirm deletion of an assessment', fakeAsync(() => {
    const dialog: MatDialog = component.getDialog();
    spyOn(dialog, 'open').and.callThrough();

    component.confirmDelete(null);
    expect(dialog.open).not.toHaveBeenCalled();

    component.confirmDelete({ name: null, rollupId: null });
    expect(dialog.open).not.toHaveBeenCalled();

    component.confirmDelete({ name: '', rollupId: '' });
    expect(dialog.open).not.toHaveBeenCalled();

    component.confirmDelete({ name: 'name', rollupId: null });
    expect(dialog.open).not.toHaveBeenCalled();

    spyOn(mockAssessService, 'deleteByRollupId');
    component.confirmDelete({ name: 'name', rollupId: 'rollUp' });
    expect(dialog.open).toHaveBeenCalled();
    let openDialog: MatDialogRef<any, any>[] = dialog.openDialogs;
    openDialog[0].close(false);
    fixture.detectChanges();
    flush();
    expect(mockAssessService.deleteByRollupId).not.toHaveBeenCalled();

    component.confirmDelete({ name: 'name', rollupId: 'rollUp' });
    expect(dialog.open).toHaveBeenCalled();
    openDialog = dialog.openDialogs;
    openDialog[0].close('false');
    fixture.detectChanges();
    flush();
    expect(mockAssessService.deleteByRollupId).not.toHaveBeenCalled();

    component.confirmDelete({ name: 'name', rollupId: 'rollUp' });
    expect(dialog.open).toHaveBeenCalled();
    openDialog = dialog.openDialogs;
    openDialog[0].close(true);
    fixture.detectChanges();
    flush();
    // TODO figure out what to 'expect'

    const spy = spyOn(TestBed.get(Router), 'navigate');
    component.rollupId = 'rollUp';
    component.confirmDelete({ name: 'name', rollupId: 'rollUp' });
    expect(dialog.open).toHaveBeenCalled();
    openDialog = dialog.openDialogs;
    openDialog[0].close(true);
    fixture.detectChanges();
    flush();
    expect(spy).toHaveBeenCalledWith([Constance.X_UNFETTER_ASSESSMENT_NAVIGATE_URL]);
    // TODO figure out what to 'expect'
  }));

  it('should respond when cell is selected', () => {
    const store = TestBed.get(Store);
    spyOn(store, 'dispatch');

    component.onCellSelected(null);
    expect(store.dispatch).not.toHaveBeenCalled();

    component.onCellSelected({ _id: null, id: null, name: null, type: null, modified: null, rollupId: null });
    expect(store.dispatch).not.toHaveBeenCalled();

    component.onCellSelected({ _id: null, id: null, name: null, type: null, modified: null, rollupId: 'rollupId' });
    expect(store.dispatch).not.toHaveBeenCalled();

    const spy = spyOn(TestBed.get(Router), 'navigate');
    component.onCellSelected({ _id: null, id: 'id', name: null, type: null, modified: null, rollupId: 'rollupId' });
    expect(store.dispatch).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith([component.masterListOptions.displayRoute, 'rollupId', 'id']);
  });

  it('should tranform Summary data', () => {
    const service = component.getSummaryCalculationService();
    spyOn(service, 'calculateThresholdOptionNames');
    spyOn(service, 'setAverageRiskPerAssessedObject');

    component.summary = null;
    component.transformSummary();
    expect(service.setAverageRiskPerAssessedObject).not.toHaveBeenCalled();
    expect(service.calculateThresholdOptionNames).not.toHaveBeenCalled();

    component.summary = AssessmentMockFactory.mockOne();
    component.transformSummary();
    expect(service.setAverageRiskPerAssessedObject).not.toHaveBeenCalled();
    expect(service.calculateThresholdOptionNames).not.toHaveBeenCalled();

    component.summary = AssessmentMockFactory.mockOne();
    component.transformSummary();
    expect(service.setAverageRiskPerAssessedObject).toHaveBeenCalled();
    expect(service.calculateThresholdOptionNames).not.toHaveBeenCalled();

    component.summary = AssessmentMockFactory.mockOne();
    component.transformSummary();
    expect(service.setAverageRiskPerAssessedObject).toHaveBeenCalled();
    expect(service.calculateThresholdOptionNames).not.toHaveBeenCalled();

    component.summary = AssessmentMockFactory.mockOne();
    component.transformSummary();
    expect(service.setAverageRiskPerAssessedObject).toHaveBeenCalled();
    expect(service.calculateThresholdOptionNames).not.toHaveBeenCalled();

    component.summary = AssessmentMockFactory.mockOne();
    component.transformSummary();
    expect(service.setAverageRiskPerAssessedObject).toHaveBeenCalled();
    expect(service.calculateThresholdOptionNames).toHaveBeenCalled();

  });

  it('should transform Summary Aggregation Data (SAD)', () => {
    const service = component.getSummaryCalculationService();
    spyOn(service, 'populateAssessmentsGrouping');
    spyOn(service, 'populateTechniqueBreakdown');
    component.summaryAggregation = {
      assessedAttackPatternCountBySophisicationLevel: null,
      attackPatternsByAssessedObject: null,
      totalAttackPatternCountBySophisicationLevel: null
    };
    component.summary = AssessmentMockFactory.mockOne();

    component.transformSAD();
    expect(component.getSummaryCalculationService().summaryAggregation).toEqual({
      assessedAttackPatternCountBySophisicationLevel: null,
      attackPatternsByAssessedObject: null,
      totalAttackPatternCountBySophisicationLevel: null
    });
    expect(service.populateAssessmentsGrouping).toHaveBeenCalledTimes(1);
    expect(service.populateTechniqueBreakdown).toHaveBeenCalledTimes(1);

    component.summary = null;
    component.transformSAD();
    expect(service.populateAssessmentsGrouping).toHaveBeenCalledTimes(1);
    expect(service.populateTechniqueBreakdown).toHaveBeenCalledTimes(1);
  });

  it('should transform Kill Chain Data (KCD)', () => {
    const service = component.getSummaryCalculationService();
    spyOn(service, 'calculateTopRisks');
    component.transformKCD();
    expect(service.calculateTopRisks).toHaveBeenCalled();
  });

  it('should transform Risk By Attack Pattern (RBAP) data', () => {
    const service = component.getSummaryCalculationService();
    spyOn(service, 'calculateWeakness');
    component.transformRBAP();
    expect(service.calculateWeakness).toHaveBeenCalled();
  });

  it('should be able to track by an id or an index', () => {
    expect(component.trackByFn(null, null)).toBe(null);
    expect(component.trackByFn(null, { id: null })).toBe(null);
    expect(component.trackByFn(null, { id: 3 })).toBe(3);
    // This seems off...
    expect(component.trackByFn(null, { id: 0 })).toBe(null);
    // This seems off...
    expect(component.trackByFn(3, { id: 0 })).toBe(3);
  });

  it('should set all loading flags to done', () => {
    component.setLoadingToDone();
    expect(component.finishedLoading).toBe(true);
    expect(component.finishedLoadingKCD).toBe(true);
    expect(component.finishedLoadingRBAP).toBe(true);
    expect(component.finishedLoadingSAD).toBe(true);
  });

});
