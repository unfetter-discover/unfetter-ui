import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Action, StoreModule, ActionReducerMap, Store, } from '@ngrx/store';

import { AssessmentSummaryService } from '../../services/assessment-summary.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import { SummaryComponent } from './summary.component';
import { summaryReducer, SummaryState } from '../store/summary.reducers';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material';
import { AssessService } from '../../services/assess.service';
import { SummaryCalculationService } from './summary-calculation.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentModule } from '../../../components';
import { dispatch } from 'd3';
import { ConfirmationDialogComponent } from '../../../components/dialogs/confirmation/confirmation-dialog.component';
import { usersReducer, UserState } from '../../../root-store/users/users.reducers';
import { riskByAttackPatternReducer, RiskByAttackPatternState } from '../store/riskbyattackpattern.reducers';
import { Subject } from 'rxjs/Subject';
import { SummaryActions } from '../store/summary.actions';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  let mockReducer: ActionReducerMap<any> = {
    summary: summaryReducer,
    riskByAttackPattern: riskByAttackPatternReducer,
    user: usersReducer
  };

  const mockService = {};
  const mockAssessService = { deleteByRollupId: () => { } };

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
      providers: [GenericApi, AssessService,
        {
          provide: SummaryCalculationService,
          use: mockService
        },
        {
          provide: AssessService,
          use: mockAssessService
        }],
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

    component.rollupId = 'rollUp';
    component.confirmDelete({ name: 'name', rollupId: 'rollUp' });
    expect(dialog.open).toHaveBeenCalled();
    openDialog = dialog.openDialogs;
    openDialog[0].close(true);
    fixture.detectChanges();
    flush();
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

    component.onCellSelected({ _id: null, id: 'id', name: null, type: null, modified: null, rollupId: 'rollupId' });
    expect(store.dispatch).toHaveBeenCalled();
  });

});
