
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { AssessedObject, Capability, ObjectAssessment, Question, QuestionAnswerEnum, Category } from 'stix/assess/v3';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { RxjsHelpers } from '../../../global/static/rxjs-helpers';
import { AnswerOption } from '../../../settings/stix-objects/categories/categories-edit/answer-option';
import * as assessReducers from '../../store/baseline.reducers';
import { SetCurrentBaselineObjectAssessment } from '../../store/baseline.actions';

@Component({
  selector: 'unf-baseline-wizard-capability',
  templateUrl: './capability.component.html',
  styleUrls: ['./capability.component.scss']
})
export class CapabilityComponent {

  pageToggle: number = 2;    // 1 for heatmap, 2 for pdr score picker

  // Attack Matrix
  public heatMapMatrix: string = 'HEAT MAP MATRIX';
  public noAttackPatterns: string = 'You have no Attack Patterns yet';
  public addAttackPatterns: string = 'Add a Kill Chain Phase and Attack Patterns and they will show up here';
  public openHeatMapMatrix: string = 'Open Heat Map Matrix';


  @Output()
  public onToggleHeatMap = new EventEmitter<any>();
  private currentCapabilityGroup: Category;
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

  constructor(private wizardStore: Store<assessReducers.BaselineState>) {

    this.dataSource = new MatTableDataSource<TableEntry>();

    this.wizardStore
      .select('baseline').pipe(
      pluck('currentCapabilityGroup'),
      distinctUntilChanged())
      .subscribe(
        (currentCapabilityGroup: Category) => {
          this.currentCapabilityGroup = currentCapabilityGroup;
        }, (err) => console.log(err));
  
    this.wizardStore
      .select('baseline').pipe(
      pluck('currentCapability'),
      distinctUntilChanged())
      .subscribe(
        (currentCapability: Capability) => {
          this.currentCapability = currentCapability;
          this.currentCapabilityName = (this.currentCapability === undefined) ? '' : this.currentCapability.name;
          this.currentCapabilityDescription = (this.currentCapability === undefined) ? '' : this.currentCapability.description;
        }, (err) => console.log(err));

      this.wizardStore
      .select('baseline')
      .pipe(
        pluck('allAttackPatterns'),
        RxjsHelpers.sortByField('name', 'ASCENDING'),
        distinctUntilChanged()
      )
      .subscribe(
        (allAttackPatterns: AttackPattern[]) => {
          this.allAttackPatterns = allAttackPatterns;
          // Once we have these, we can update our data source
          if (this.allAttackPatterns && this.allAttackPatterns.length > 0) {
            // this.updateDataSource();
          }
        }, (err) => console.log(err));

    this.wizardStore
      .select('baseline').pipe(
      pluck('baselineObjAssessments'),
      distinctUntilChanged())
      .subscribe(
        (baselineObjectAssessments: ObjectAssessment[]) => {
        this.baselineObjectAssessments = baselineObjectAssessments;
      }, (err) => console.log(err));

    this.wizardStore
      .select('baseline').pipe(
      pluck('currentObjectAssessment'))
      .subscribe(
        (currentObjectAssessment: ObjectAssessment) => {
          this.currentObjectAssessment = currentObjectAssessment;

          if (this.allAttackPatterns.length > 0) {
            this.updateDataSource();
            this.lastKnownObjectAssessment = this.currentObjectAssessment;
          }
         

          
        }, (err) => console.log(err));
  }

  private updateDataSource() {
    if (this.currentObjectAssessment) {
      this.currentAssessedObject = this.currentObjectAssessment.assessed_objects;
    }

    if (this.currentAssessedObject) {
      this.incomingListOfAttackPatterns = this.currentAssessedObject.map(x => x.assessed_object_ref);

      if (this.currentNumberOfAttackPatterns === 0 || this.currentNumberOfAttackPatterns !== this.currentAssessedObject.length || this.checkForOAChange()) {
        // inital value for number of attack patterns
        this.currentNumberOfAttackPatterns = this.currentAssessedObject.length;
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
      // console.log('pdr change, not reloading!   ' + this.currentNumberOfAttackPatterns );
      return;
    }
  }

  public onAttackPatternChange(event): void {
    if (!this.currentAssessedObject) {
      return;
    }

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
    let ap = this.allAttackPatterns.find(x => x.id === id);
    return (ap ? ap.name : '');
  }

  public getAttackPatternDescription(id: string): string {
    let ap = this.allAttackPatterns.find(x => x.id === id);
    return (ap ? ap.description : '');
  }

  public getAttackPatternId(name: string): string {
    let ap = this.allAttackPatterns.find(x => x.name === name);
    return (ap ? ap.id : '');
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

  public checkForOAChange() {
    try {
      return this.lastKnownObjectAssessment.name !== this.currentObjectAssessment.name
    } catch (TypeError) {
      return false;
    }  
  }

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
