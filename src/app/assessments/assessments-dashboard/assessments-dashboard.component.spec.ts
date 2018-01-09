import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTooltipModule, MatProgressSpinnerModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'

import { RouterTestingModule } from '@angular/router/testing';

import { AssessmentsDashboardComponent } from './assessments-dashboard.component';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { RiskIconComponent } from '../../global/components/risk-icon/risk-icon.component';
import { PhaseListComponent } from './phase-list/phase-list.component';
import { RiskBreakdownComponent } from './risk-breakdown/risk-breakdown.component';
import { LoadingSpinnerComponent } from '../../global/components/loading-spinner/loading-spinner.component';
import { GenericApi } from '../../core/services/genericapi.service';
import { AssessmentsDashboardService } from './assessments-dashboard.service';

describe('AssessmentsDashboardComponent', () => {
  let component: AssessmentsDashboardComponent;
  let fixture: ComponentFixture<AssessmentsDashboardComponent>;
  
  const materialModules = [
    MatTooltipModule,
    MatProgressSpinnerModule
  ];

  const mockService = {
    getById: (id: string): Observable<any> => {
      return Observable.of(MockAssessment.mock());
    },
  
    getRiskByAttackPattern: (id: string): Observable<any> => {
      return Observable.of(MockPhase.mockPhasesAndAttackPatterns());
    }
  }

  const questionName: ReadonlyArray<string> = ['question_name1', 'question_name2'];
  const risk: ReadonlyArray<number> = [.11, .33, .55, .77];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
                RouterModule,
                materialModules,
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
          useValue: mockService
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

  it('should be readily initialized', () => {
    expect(component).toBeTruthy();
  });

  it('should get assessment information', () => {
    expect(component.assessment['attributes']).toBeTruthy();
  });

  it('should have risk by attack pattern', () => {
    expect(component.riskByAttackPattern).toBeTruthy();
  });

  it('should populate a risktree object given a phase', () => {
    // Undefined phase
    let expectedRiskTree: any = {};
    expect(component.populatePhaseRiskTree(MockPhase.mockUndefined)).toEqual(expectedRiskTree);

    expectedRiskTree = {};
    expect(component.populatePhaseRiskTree(MockPhase.mockEmpty)).toEqual(expectedRiskTree);

    let currentQuestions: ReadonlyArray<string> = [];
    let currentRisks: ReadonlyArray<number> = [];
    expectedRiskTree = {};
    expect(component.populatePhaseRiskTree(MockPhase.mockQuestionsAndRisks(currentQuestions, currentRisks))).toEqual(expectedRiskTree);

    currentQuestions = [questionName[0]];
    currentRisks = [risk[0], risk[1]];
    expectedRiskTree = {[questionName[0]]: [risk[0], risk[1]]};
    expect(component.populatePhaseRiskTree(MockPhase.mockQuestionsAndRisks(currentQuestions, currentRisks))).toEqual(expectedRiskTree);

    currentQuestions = [questionName[0], questionName[1]];
    currentRisks = [risk[0], risk[1]];
    expectedRiskTree = {[questionName[0]]: [risk[0], risk[1]], [questionName[1]]: [risk[0], risk[1]]};
    expect(component.populatePhaseRiskTree(MockPhase.mockQuestionsAndRisks(currentQuestions, currentRisks))).toEqual(expectedRiskTree);

    currentQuestions = questionName;
    currentRisks = risk;
    expectedRiskTree = { };
    questionName.forEach(questionElement => {
      expectedRiskTree[questionElement] = [];
      risk.forEach(riskElement => {
        expectedRiskTree[questionElement].push(riskElement);
      });
    });
    expect(component.populatePhaseRiskTree(MockPhase.mockQuestionsAndRisks(currentQuestions, currentRisks))).toEqual(expectedRiskTree);
  });

  it('should calculate risk breakdown for a phase by question given', () => {
    // Undefined phase risk tree
    let questionSet = new Set<string>();
    let expectedRiskBreakdown: any = {};
    expect(component.calculateRiskBreakdownByQuestionForPhase(MockPhaseRiskTree.mockUndefined(), questionSet))
          .toEqual(expectedRiskBreakdown);
    expect(questionSet).toEqual(new Set<string>());

    // Undefined questionSet
    questionSet = undefined;
    expectedRiskBreakdown = {};
    expect(component.calculateRiskBreakdownByQuestionForPhase(MockPhaseRiskTree.mockQuestionsAndRisks(), questionSet))
          .toEqual(expectedRiskBreakdown);
    expect(questionSet).toEqual(undefined);

    // Empty phase risk tree
    questionSet = new Set<string>();
    const emptyRiskBreakdown = {};
    expect(component.calculateRiskBreakdownByQuestionForPhase(MockPhaseRiskTree.mockEmpty(), questionSet))
    .toEqual(emptyRiskBreakdown);

    // 1 question, 1 risk
    questionSet = new Set<string>();
    let currentQuestions: ReadonlyArray<string> = [questionName[0]];
    let currentRisks: ReadonlyArray<number> = [risk[0]];
    let expectedRiskCalculation: number = calculateRisk(currentRisks, currentQuestions.length);
    expectedRiskBreakdown = {[currentQuestions[0]]: expectedRiskCalculation};
    expect(component.calculateRiskBreakdownByQuestionForPhase(MockPhaseRiskTree.mockQuestionsAndRisks(currentQuestions, currentRisks), questionSet))
    .toEqual(expectedRiskBreakdown);
    expect(questionSet).toContain(currentQuestions[0]);

    // 1 question, 2 risks
    questionSet = new Set<string>();
    currentQuestions = [questionName[0]];
    currentRisks = [risk[0], risk[1]];
    expectedRiskCalculation = calculateRisk(currentRisks, currentQuestions.length);
    expectedRiskBreakdown = {[currentQuestions[0]]: expectedRiskCalculation};
    expect(component.calculateRiskBreakdownByQuestionForPhase(MockPhaseRiskTree.mockQuestionsAndRisks(currentQuestions, currentRisks), questionSet))
    .toEqual(expectedRiskBreakdown);
    expect(questionSet).toContain(currentQuestions[0]);

    // 1 question, full array of risks
    questionSet = new Set<string>();
    currentQuestions = [questionName[0]];
    currentRisks = risk;
    expectedRiskCalculation = calculateRisk(currentRisks, currentQuestions.length);
    expectedRiskBreakdown = {[currentQuestions[0]]: expectedRiskCalculation};
    expect(component.calculateRiskBreakdownByQuestionForPhase(MockPhaseRiskTree.mockQuestionsAndRisks(currentQuestions, currentRisks), questionSet))
    .toEqual(expectedRiskBreakdown);
    expect(questionSet).toContain(currentQuestions[0]);

    // 2 questions, 1 risk
    questionSet = new Set<string>();
    currentQuestions = [questionName[0], questionName[1]];
    currentRisks = [risk[0]];
    expectedRiskCalculation = calculateRisk(currentRisks, currentQuestions.length);
    expectedRiskBreakdown = {[currentQuestions[0]]: expectedRiskCalculation, [currentQuestions[1]]: expectedRiskCalculation};
    expect(component.calculateRiskBreakdownByQuestionForPhase(MockPhaseRiskTree.mockQuestionsAndRisks(currentQuestions, currentRisks), questionSet))
    .toEqual(expectedRiskBreakdown);
    expect(questionSet).toContain(currentQuestions[0]);
    expect(questionSet).toContain(currentQuestions[1]);

    // 2 questions, 2 risks
    questionSet = new Set<string>();
    currentQuestions = [questionName[0], questionName[1]];
    currentRisks = [risk[0], risk[1]];
    expectedRiskCalculation = calculateRisk(currentRisks, currentQuestions.length);
    expectedRiskBreakdown = {[currentQuestions[0]]: expectedRiskCalculation, [currentQuestions[1]]: expectedRiskCalculation};
    expect(component.calculateRiskBreakdownByQuestionForPhase(MockPhaseRiskTree.mockQuestionsAndRisks(currentQuestions, currentRisks), questionSet))
    .toEqual(expectedRiskBreakdown);
    expect(questionSet).toContain(currentQuestions[0]);
    expect(questionSet).toContain(currentQuestions[1]);

    // Full array of questions, full array of risks
    questionSet = new Set<string>();
    currentQuestions = questionName;
    currentRisks = risk;
    expectedRiskCalculation = calculateRisk(currentRisks, currentQuestions.length);
    expectedRiskBreakdown = {[currentQuestions[0]]: expectedRiskCalculation, [currentQuestions[1]]: expectedRiskCalculation};
    expect(component.calculateRiskBreakdownByQuestionForPhase(MockPhaseRiskTree.mockQuestionsAndRisks(currentQuestions, currentRisks), questionSet))
    .toEqual(expectedRiskBreakdown);
    currentQuestions.forEach(question => {
      expect(questionSet).toContain(question);
    });

    function calculateRisk (risks: ReadonlyArray<number>, numberQuestions: number) {
      const numRisks: number = risks.length;
      const riskSum: number = risks.reduce((total, cur) => total += cur, 0);
      const calculation = riskSum / numRisks * ( 1 / numberQuestions);
      return calculation;
    }
  });

  it('should calculate risk breakdown by question in the assessment', () => {
    // Undefined assessmentObject
    let questionSet = new Set<string>();
    let expectedRiskBreakdown: any = {};
    component.riskBreakdownTemp = {};
    
    component.populateRiskBreakdownByQuestionForAssessedQuestions(undefined, questionSet)
    expect(component.riskBreakdownTemp).toEqual(expectedRiskBreakdown);
    expect(questionSet).toEqual(new Set<string>());

    // Undefined questionSet
    questionSet = undefined;
    expectedRiskBreakdown = {};
    component.riskBreakdownTemp = {};
    
    component.populateRiskBreakdownByQuestionForAssessedQuestions(MockAssessment.mockAssessementObjectQuestionsWithRisks(), questionSet)
    expect(component.riskBreakdownTemp).toEqual(expectedRiskBreakdown);
    expect(questionSet).toEqual(undefined);

    // Empty assessmentObject
    questionSet = new Set<string>();
    let currentQuestions: ReadonlyArray<string> = [];
    let currentRisks: ReadonlyArray<number> = [];
    expectedRiskBreakdown = {};
    component.riskBreakdownTemp = {};
    
    component.populateRiskBreakdownByQuestionForAssessedQuestions(MockAssessment.mockAssessementObjectQuestionsWithRisks(currentQuestions, currentRisks), questionSet)
    expect(component.riskBreakdownTemp).toEqual(expectedRiskBreakdown);
    expect(questionSet).toEqual(new Set<string>());

    // 1 question, 1 risk
    questionSet = new Set<string>();
    currentQuestions = [questionName[0]];
    currentRisks = [risk[0]];
    expectedRiskBreakdown = {[currentQuestions[0]]: [risk[0]]};
    component.riskBreakdownTemp = {};
    
    component.populateRiskBreakdownByQuestionForAssessedQuestions(MockAssessment.mockAssessementObjectQuestionsWithRisks(currentQuestions, currentRisks), questionSet)
    expect(component.riskBreakdownTemp).toEqual(expectedRiskBreakdown);
    expect(questionSet).toContain(currentQuestions[0]);

    // 2 questions, 1 risk
    questionSet = new Set<string>();
    currentQuestions = [questionName[0], questionName[1]];
    currentRisks = [risk[0]];
    expectedRiskBreakdown = {[questionName[0]]: [risk[0]], [questionName[1]]: [risk[0]]};
    component.riskBreakdownTemp = {};
    
    component.populateRiskBreakdownByQuestionForAssessedQuestions(MockAssessment.mockAssessementObjectQuestionsWithRisks(currentQuestions, currentRisks), questionSet)
    expect(component.riskBreakdownTemp).toEqual(expectedRiskBreakdown);
    expect(questionSet).toContain(currentQuestions[0]);
    expect(questionSet).toContain(currentQuestions[1]);

    // 2 questions, 2 risks
    questionSet = new Set<string>();
    currentQuestions = [questionName[0], questionName[1]];
    currentRisks = [risk[0], risk[1]];
    expectedRiskBreakdown = {[questionName[0]]: [risk[0], risk[1]], [questionName[1]]: [risk[0], risk[1]]};
    component.riskBreakdownTemp = {};
    
    component.populateRiskBreakdownByQuestionForAssessedQuestions(MockAssessment.mockAssessementObjectQuestionsWithRisks(currentQuestions, currentRisks), questionSet)
    expect(component.riskBreakdownTemp).toEqual(expectedRiskBreakdown);
    expect(questionSet).toContain(currentQuestions[0]);
    expect(questionSet).toContain(currentQuestions[1]);

    // Full array of questions, full array of risks
    questionSet = new Set<string>();
    currentQuestions = questionName;
    currentRisks = risk;
    expectedRiskBreakdown = {};
    questionName.forEach(name => {
      expectedRiskBreakdown[name] = currentRisks;
    });
    component.riskBreakdownTemp = {};
    
    component.populateRiskBreakdownByQuestionForAssessedQuestions(MockAssessment.mockAssessementObjectQuestionsWithRisks(currentQuestions, currentRisks), questionSet)
    expect(component.riskBreakdownTemp).toEqual(expectedRiskBreakdown);
    currentQuestions.forEach(question => {
      expect(questionSet).toContain(question);
    });
  });

  it('should calculate average risk breakdown for a question', () => {
    // Undefined riskArray
    let totalNumberOfQuestions = 0;
    let expectedAverageRiskBreakdown: number = 0;
    expect(component.calculateAverageRiskBreakdownForQuestion(undefined, totalNumberOfQuestions))
          .toEqual(expectedAverageRiskBreakdown);
  
    // < 1 number of questions
    totalNumberOfQuestions = 0;
    expectedAverageRiskBreakdown = 0;
    expect(component.calculateAverageRiskBreakdownForQuestion(risk, totalNumberOfQuestions))
          .toEqual(expectedAverageRiskBreakdown);
  
    // Empty riskArray
    totalNumberOfQuestions = 10;
    let currentRisks: ReadonlyArray<number> = [];
    expectedAverageRiskBreakdown = 0;
    expect(component.calculateAverageRiskBreakdownForQuestion(currentRisks, totalNumberOfQuestions))
          .toEqual(expectedAverageRiskBreakdown);
  
    // 1 question, 1 risk
    totalNumberOfQuestions = 1;
    currentRisks = [risk[0]];
    expectedAverageRiskBreakdown = calculateExpectedAvgRiskBreakdown(currentRisks, totalNumberOfQuestions);
    expect(component.calculateAverageRiskBreakdownForQuestion(currentRisks, totalNumberOfQuestions))
    .toEqual(expectedAverageRiskBreakdown);

    // 2 questions, 1 risk
    totalNumberOfQuestions = 2;
    currentRisks = [risk[0]];
    expectedAverageRiskBreakdown = calculateExpectedAvgRiskBreakdown(currentRisks, totalNumberOfQuestions);
    expect(component.calculateAverageRiskBreakdownForQuestion(currentRisks, totalNumberOfQuestions))
    .toEqual(expectedAverageRiskBreakdown);
  
    // 2 questions, 2 risks
    totalNumberOfQuestions = 2;
    currentRisks = [risk[0], risk[1]];
    expectedAverageRiskBreakdown = calculateExpectedAvgRiskBreakdown(currentRisks, totalNumberOfQuestions);
    expect(component.calculateAverageRiskBreakdownForQuestion(currentRisks, totalNumberOfQuestions))
    .toEqual(expectedAverageRiskBreakdown);
  
    // all questions, full array of risks
    totalNumberOfQuestions = questionName.length;
    currentRisks = risk;
    expectedAverageRiskBreakdown = calculateExpectedAvgRiskBreakdown(currentRisks, totalNumberOfQuestions);
    expect(component.calculateAverageRiskBreakdownForQuestion(currentRisks, totalNumberOfQuestions))
    .toEqual(expectedAverageRiskBreakdown);

    function calculateExpectedAvgRiskBreakdown(risks: ReadonlyArray<number>, totalValues: number) {
      return risks.reduce((total, cur) => total += cur, 0) / risks.length / (1 * totalValues);
    }
  });
});

class MockPhaseRiskTree {
  public static mockUndefined(): any { return undefined; }

  public static mockEmpty(): any { return []; }

  public static mockQuestionsAndRisks(questionName: ReadonlyArray<string> = ['question_name'], risk: ReadonlyArray<number> = [.11]) {
    const mock = { };
    for (let i = 0; i < questionName.length; i++) {
      mock[questionName[i]] = risk;
    }
    return mock;
  }
}

class MockPhase {
  public static mockUndefined(): any { return undefined; }

  public static mockEmpty(): any { return {}; }

  public static mockNoQuestions(): any { return {assessedObjects: [{questions: []}]}; }

  public static mockQuestionsAndRisks(questionName: ReadonlyArray<string> = ['question_name'], risk: ReadonlyArray<number> = [.11]) {
    const mock = { assessedObjects: [ { questions: []}]};
    for (let i = 0; i < questionName.length; i++) {
      for (let j = 0; j < risk.length; j++) {
        mock['assessedObjects'][0]['questions'].push({name: questionName[i], risk: risk[j]})
      }
    }
    return mock;
  }

  public static mockPhasesAndAttackPatterns(numPhases: number = 10, numApbkc: number = 1, numAbap: number = 1): any {
    const mockAttackPattern: Array<any> = [
                                            {attackPatternId: '1', attackPatternName: 'name-1'},
                                            {attackPatternId: '2', attackPatternName: 'name-2'}];
    const mockQuestion: Array<any> = [{name: 'questionName', risk: .33}];

    const mockPhase: Array<any> = [];
    for (let i = 0; i < numPhases; i++) {
      mockPhase.push({
        _id: i.toString(),
        assessedObjects: [{questions: mockQuestion}],
        attackPatterns: mockAttackPattern
      })
    }

    const mockApbkc: Array<any> = [];
    for (let i = 0; i < numApbkc; i++) {
      mockApbkc.push({_id: i.toString(), attackPatterns: ['name-1', 'name-2', 'name-3']});
    }

    const mockAbap: Array<any> = [];
    for (let i = 0; i < numAbap; i++) {
      mockAbap.push({_id: i, risk: .43});
    }
    
    return {
              phases: mockPhase,
              attackPatternsByKillChain: mockApbkc,
              assessedByAttackPattern: mockAbap
            };
  }
}

class MockAssessment {
  public static mockAssessementObjectQuestionsWithRisks(questionName: ReadonlyArray<string> = ['question_name'], risk: ReadonlyArray<number> = [.11]) {
    const mock = { questions: []};
    for (let i = 0; i < questionName.length; i++) {
      for (let j = 0; j < risk.length; j++) {
        mock['questions'].push({name: questionName[i], risk: risk[j]});
      }
    }
    return mock;
  }

  public static mock(): any {
    return {
              test: 'testData',
              attributes: {assessment_objects: [{questions: [{name: 'type_of_question', risk: 55}]}]}
            }
  }
}
