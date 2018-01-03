import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { RouterTestingModule } from '@angular/router/testing';

import { AssessmentsDashboardComponent } from './assessments-dashboard.component';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { RiskIconComponent } from '../../global/components/risk-icon/risk-icon.component';
import { PhaseListComponent } from './phase-list/phase-list.component';
import { RiskBreakdownComponent } from './risk-breakdown/risk-breakdown.component';
import { LoadingSpinnerComponent } from '../../global/components/loading-spinner/loading-spinner.component';
import { GenericApi } from '../../core/services/genericapi.service';
import { AssessmentsDashboardService } from './assessments-dashboard.service';
import { MockAssessmentsDashboardService } from './mock-assessments-dashboard.service';

describe('AssessmentsDashboardComponent', () => {
  let component: AssessmentsDashboardComponent;
  let fixture: ComponentFixture<AssessmentsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
                RouterModule,
                MatTooltipModule,
                ChartsModule,
                HttpModule,
                HttpClientModule],
      declarations: [ CapitalizePipe,
                      RiskIconComponent,
                      PhaseListComponent,
                      RiskBreakdownComponent,
                      LoadingSpinnerComponent,
                      AssessmentsDashboardComponent ],
      providers: [
        GenericApi,
        {
          provide: AssessmentsDashboardService, 
          useClass: MockAssessmentsDashboardService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {id: 'test_id'}}
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should be readily initialized', () => {
    expect(component).toBeTruthy();
  });

  fit('should get assessment information', () => {
    expect(component.assessment['attributes']).toBeTruthy();
  })

  fit('should have risk by attack pattern', () => {
    expect(component.riskByAttackPattern.test).toBeTruthy();
  })

  fit('should populate a risktree object given a phase', () => {
    const undefinedPhase = undefined;
    const undefinedPhaseRiskTree = {};
    expect(component.populatePhaseRiskTree(undefinedPhase)).toEqual(undefinedPhaseRiskTree);

    const emptyPhase = {};
    const emptyPhaseRiskTree = {};
    expect(component.populatePhaseRiskTree(emptyPhase)).toEqual(emptyPhaseRiskTree);

    const noQuestionsPhase = {assessedObjects: [{questions: []}]};
    const noQuestionsPhaseRiskTree = {};
    expect(component.populatePhaseRiskTree(noQuestionsPhase)).toEqual(noQuestionsPhaseRiskTree);

    const risks: ReadonlyArray<number> = [.11, .33, .55, .77] ;
    const multipleRisksPerQuestionPhase = {assessedObjects: [{questions: [{name: 'question_type1', risk: risks[0]}, {name: 'question_type1', risk: risks[1]}]}]};
    const multipleRisksPerQuestionPhaseRiskTree = {question_type1: [risks[0], risks[1]]};
    expect(component.populatePhaseRiskTree(multipleRisksPerQuestionPhase)).toEqual(multipleRisksPerQuestionPhaseRiskTree);

    const multipleQuestionsMultipleRisksPhase = {assessedObjects: [{questions: [{name: 'question_type1', risk: risks[0]}, {name: 'question_type1', risk: risks[1]}]},
                                                                    {questions: [{name: 'question_type2', risk: risks[2]}, {name: 'question_type2', risk: risks[3]}]}]};
    const multipleQuestionsMultipleRisksPhaseRiskTree = {question_type1: [risks[0], risks[1]], question_type2: [risks[2], risks[3]]};
    expect(component.populatePhaseRiskTree(multipleQuestionsMultipleRisksPhase)).toEqual(multipleQuestionsMultipleRisksPhaseRiskTree)
  })
});
