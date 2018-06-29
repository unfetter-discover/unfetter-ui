
import { pluck, distinctUntilChanged } from 'rxjs/operators';
import { Component, EventEmitter, OnInit, Output, NgModule, ViewEncapsulation, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as assessReducers from '../../store/baseline.reducers';
import { Capability, AssessedObject, ObjectAssessment, Question, QuestionAnswerEnum } from 'stix/assess/v3';
import { PdrString } from 'stix/assess/v3/baseline/question';
import { StixEnum } from 'stix/unfetter/stix.enum';
import { AnswerOption } from '../../../settings/stix-objects/categories/categories-edit/answer-option'
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { SetCurrentBaselineObjectAssessment } from '../../store/baseline.actions';
import { BaselineSummaryService } from '../../services/baseline-summary.service';

@Component({
  selector: 'unf-baseline-wizard-capability',
  templateUrl: './capability.component.html',
  styleUrls: ['./capability.component.scss']
})
export class CapabilityComponent implements OnInit {

  pageToggle: number = 2;    // 1 for heatmap, 2 for pdr score picker

  // Attack Matrix
  public attackMatrix: string = 'ATT&CK MATRIX';
  public noAttackPatterns: string = 'You have no Attack Patterns yet';
  public addAttackPatterns: string = 'Add a Kill Chain Phase and Attack Patterns and they will show up here';
  public openAttackMatrix: string = 'Open Att&ck Matrix';


  @Output()
  public onToggleHeatMap = new EventEmitter<any>();
  public currentCapability: Capability;
  public currentCapabilityName: string;
  public currentCapabilityDescription: string;
  public currentObjectAssessment: ObjectAssessment;
  public currentAssessedObject: AssessedObject[];
  public allAttackPatterns: AttackPattern[];
  public baselineObjectAssessments: ObjectAssessment[];
  public ratioOfQuestionsAnswered: number;
  public lastKnownObjectAssessment: ObjectAssessment;  // Used to determine if datasource should update (when changing capabilities)

  // PDR Table
  currentNumberOfAttackPatterns = 0;  // keep track so that we do not reload the pdr table on score changes
  dataSource: MatTableDataSource<TableEntry>;
  displayedColumns = ['attackPattern', 'protect', 'detect', 'respond'];
  incomingListOfAttackPatterns: string[] = [];
  public readonly answers = [

    new AnswerOption(QuestionAnswerEnum.UNANSWERED, ''),
    new AnswerOption(QuestionAnswerEnum.NONE, 'NONE'),
    new AnswerOption(QuestionAnswerEnum.LOW, 'LOW'),
    new AnswerOption(QuestionAnswerEnum.MEDIUM, 'MEDIUM'),
    new AnswerOption(QuestionAnswerEnum.SIGNIFICANT, 'SIGNIFICANT'),
    new AnswerOption(QuestionAnswerEnum.NOT_APPLICABLE, 'NOT_APPLICABLE'),
  ];



  selectedAttackPatterns = new FormControl();

  constructor(private wizardStore: Store<assessReducers.BaselineState>, private _baselineSummaryService: BaselineSummaryService ) {

    this.dataSource = new MatTableDataSource<TableEntry>();

    const sub1$ = this.wizardStore
      .select('baseline').pipe(
      pluck('currentCapability'),
      distinctUntilChanged())
      .subscribe(
        (currentCapability: Capability) => {
          this.currentCapability = currentCapability;
          this.currentCapabilityName = (this.currentCapability === undefined) ? '' : this.currentCapability.name;
          this.currentCapabilityDescription = (this.currentCapability === undefined) ? '' : this.currentCapability.description;
        }, (err) => console.log(err));

    const sub2$ = this.wizardStore
      .select('baseline').pipe(
      pluck('allAttackPatterns'),
      distinctUntilChanged())
      .subscribe(
        (allAttackPatterns: AttackPattern[]) => {
          this.allAttackPatterns = allAttackPatterns;
        }, (err) => console.log(err));

    const sub21$ = this.wizardStore
      .select('baseline').pipe(
      pluck('baselineObjAssessments'),
      distinctUntilChanged())
      .subscribe(
        (baselineObjectAssessments: ObjectAssessment[]) => {
        this.baselineObjectAssessments = baselineObjectAssessments;
      }, (err) => console.log(err));

    const sub3$ = this.wizardStore
      .select('baseline').pipe(
      pluck('currentObjectAssessment'))
      // .distinctUntilChanged()
      .subscribe(
        (currentObjectAssessment: ObjectAssessment) => {
          this.currentObjectAssessment = currentObjectAssessment;
          if (this.currentObjectAssessment) {
            this.currentAssessedObject = [...currentObjectAssessment.assessed_objects];



            let numOfTotalQuestions = 0;

            let numOFAnsweredQuestions = 0;

            for (let oa of this.baselineObjectAssessments) {
              for (let ao of oa.assessed_objects) {
                for ( let question of ao.questions) {
                  numOfTotalQuestions += 1;
                  if ( question.score === QuestionAnswerEnum.LOW || question.score === QuestionAnswerEnum.MEDIUM || question.score === QuestionAnswerEnum.NOT_APPLICABLE ||
                    question.score === QuestionAnswerEnum.SIGNIFICANT || question.score === QuestionAnswerEnum.NONE) {
   
                    numOFAnsweredQuestions += 1;
                  }
                }
              }
            }


            console.log('numOfTotalQuestions == ', numOfTotalQuestions);
            console.log('numOfAnsweredQuestions == ', numOFAnsweredQuestions);

            // this._baselineSummaryService.baselinePercentComplete = numOFAnsweredQuestions / numOfTotalQuestions * 100;



            console.log(this.dataSource.data);
            console.log(this.currentAssessedObject);
            console.log(this.currentObjectAssessment);
            

            if (this.currentAssessedObject) {
              this.incomingListOfAttackPatterns = this.currentAssessedObject.map(x => x.assessed_object_ref);

              if (this.currentNumberOfAttackPatterns === 0 || this.currentNumberOfAttackPatterns !== this.currentAssessedObject.length || this.lastKnownObjectAssessment.name !== this.currentObjectAssessment.name) {
                // inital value for number of attack patterns
                this.currentNumberOfAttackPatterns = this.currentAssessedObject.length;

                console.log('Updating table for ' + this.currentObjectAssessment.name);

                this.dataSource.data = this.currentAssessedObject.map(x => ({
                  assessed_obj_id: x.id,
                  capability_id: x.assessed_object_ref,
                  capability: this.getAttackPatternName(x.assessed_object_ref),
                  protect: this.getScore(x.questions, 'protect'),
                  detect: this.getScore(x.questions, 'detect'),
                  respond: this.getScore(x.questions, 'respond'),
                  definition: this.getAttackPatternDescription(x.assessed_object_ref),
                }));
              }
            } else {
              console.log('pdr change, not reloading!   ' + this.currentNumberOfAttackPatterns );
              return;
            }
          }

          this.lastKnownObjectAssessment = this.currentObjectAssessment;
        }, (err) => console.log(err));

    // this.subscriptions.push(sub1$, sub2$, sub3$)
  }


  ngOnInit() {
    // this.ratioOfQuestionsAnswered = this._baselineSummaryService.getBaselinePercentComplete();

    
  }

  public onAttackPatternChange(event): void {
    const prevValues = this.currentAssessedObject.map(x => x.assessed_object_ref);
    if (prevValues === undefined) {
      return;
    }

    const selectedValues = event;

    // find all the attack patterns that were removed
    prevValues
      .filter(ap => !selectedValues.includes(ap))
      .forEach(ap => {
        let index = this.currentObjectAssessment.assessed_objects.findIndex(x => x.assessed_object_ref === ap);
        this.currentObjectAssessment.assessed_objects.splice(index, 1);
        this.wizardStore.dispatch(new SetCurrentBaselineObjectAssessment(this.currentObjectAssessment));
      });

    // find all the attack patterns that were added
    selectedValues
      .filter(ap => !prevValues.includes(ap))
      .forEach(ap => {
        let newAssessedObject = new AssessedObject();
        newAssessedObject.assessed_object_ref = ap;
        let p = new Question();
        let d = new Question();
        let r = new Question();
        p.name = 'protect';
        d.name = 'detect';
        r.name = 'respond';
        newAssessedObject.questions = [p, d, r];
        this.currentObjectAssessment.assessed_objects.push(newAssessedObject);
        this.wizardStore.dispatch(new SetCurrentBaselineObjectAssessment(this.currentObjectAssessment));
      });
  }

  updatePDRScore(index: number, pdr: string, value: QuestionAnswerEnum, id) {
    let correctIndex = this.currentAssessedObject.findIndex(x => x.assessed_object_ref === id);
    this.setScore(this.currentAssessedObject[correctIndex].questions, pdr, value)
    this.currentObjectAssessment.assessed_objects = this.currentAssessedObject.slice();
    this.wizardStore.dispatch(new SetCurrentBaselineObjectAssessment(this.currentObjectAssessment));
  }

  logDataSource() {
    // Debug code
    // console.log(this.dataSource.data);
    console.log(this.currentObjectAssessment);
    // console.log(this.currentAssessedObject);
    // console.log(this.selectedAttackPatterns.value);
  }

  applyFilter(filterValue: string) {
    // Code to filter the data table
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public getAttackPatternName(id: string): string {
    return this.allAttackPatterns.find(x => x.id === id).name;
  }

  public getAttackPatternDescription(id: string): string {
    return this.allAttackPatterns.find(x => x.id === id).description;
  }

  public getAttackPatternId(name: string): string {
    return this.allAttackPatterns.find(x => x.name === name).id;
  }

  public getScore(questionArray: Question[], name: string): string {
    for (let i = 0; i < questionArray.length; i++) {
      if (questionArray[i].name === name) {
        return questionArray[i].score;
      }
    }
  }

  public setScore(questionArray: Question[], name: string, score: QuestionAnswerEnum) {
    for (let i = 0; i < questionArray.length; i++) {
      if (questionArray[i].name === name) {
        questionArray[i].score = score;
      }
    }
  }

  // public ngOnDestroy(): void {
  //   this.wizardStore.dispatch(new CleanAssessmentWizardData());
  //   this.subscriptions.forEach((sub) => sub.unsubscribe());
  // }
}

export interface TableEntry {
  assessed_obj_id: string;
  capability_id: string;
  capability: string;
  protect: string;
  detect: string;
  respond: string;
  definition: string;
}
