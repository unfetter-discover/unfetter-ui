import { Component, ViewChild, OnInit, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentsDashboardService } from '../assessments-dashboard/assessments-dashboard.service';
import { Constance } from '../../utils/constance';
import { AttackPattern } from '../../models/attack-pattern';
import { AddAssessedObjectComponent } from './add-assessed-object/add-assessed-object.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'assessments-group',
  templateUrl: './assessments-group.component.html',
  styleUrls: ['./assessments-group.component.css']
})
export class AssessmentsGroupComponent implements OnInit, AfterViewInit {

  @ViewChildren('addAssessedObjectComponent')
  public addAssessedObjectComponents: QueryList<AddAssessedObjectComponent>;
  public addAssessedObjectComponent: AddAssessedObjectComponent;

  public indicator: any;
  public courseOfAction: any;
  public xUnfetterSensor: any;

  public activePhase: string;
  public assessment = {} as any;
  public riskByAttackPattern: { assessedByAttackPattern: AssessedByAttackPattern[], attackPatternsByKillChain: GroupAttackPattern[], phases: GroupPhase[] };
  public assessedObjects: any;
  public unassessedPhases: string[];
  public currentAttackPattern: any;
  public currentId: string;
  public currentPhase: string;
  public displayedAssessedObjects: any[];
  public unassessedAttackPatterns: any[];
  public attackPatternsByPhase: any[];
  public addAssessedObject: boolean;
  public addAssessedType: string;

  constructor(private assessmentsDashboardService: AssessmentsDashboardService,
              private route: ActivatedRoute,
              private changeDetector: ChangeDetectorRef) { }

  /**
   * @description init before childern are initialized
   */
  public ngOnInit(): void {
    this.currentId = this.route.snapshot.params['id']
      ? this.route.snapshot.params['id'] : '';
    this.currentPhase = this.route.snapshot.params['phase']
      ? this.route.snapshot.params['phase'] : '';
    this.initData();
  }

  /**
   * @description init after view
   */
  public ngAfterViewInit(): void {
    const sub = this.addAssessedObjectComponents.changes
      .subscribe(
        (comps: QueryList<AddAssessedObjectComponent>) => {
          this.addAssessedObjectComponent = comps.first;
          this.resetNewAssessmentObjects();
          // When binding to a child component,
          //  and updating that binding in a parent ngInit method
          //  and in development mode, ie enableProdMode() not called
          // one may encounter the
          //  "expression changed after it was checked"
          // this is one fix for that state
          this.changeDetector.detectChanges();
      },
      (err) => console.log(err),
      () => sub.unsubscribe());
  }

  /**
   * @description
   *  fetch data to populate this page
   *
   * @returns {void}
   */
  public initData(curApIndex: number = 0): void {
    const riskByAttackPattern$ = this.assessmentsDashboardService
        .getRiskByAttackPattern(this.currentId).subscribe(
          (res) => {
            this.riskByAttackPattern = res ? res : {};
            this.populateUnassessedPhases();
            this.activePhase = this.activePhase || this.currentPhase || this.riskByAttackPattern.phases[0]._id;
            this.setPhase(this.activePhase, curApIndex);
          },
          (err) => console.log(err),
          () => riskByAttackPattern$.unsubscribe()
      );

    const assessedObjects$ = this.assessmentsDashboardService
      .getAssessedObjects(this.currentId).subscribe(
        (res) => {
          this.assessedObjects = res ? res : {};
        },
        (err) => console.log(err),
        () => assessedObjects$.unsubscribe()
      );

    this.assessment = {};
    this.assessment['attributes'] = {};
    const getById$ = this.assessmentsDashboardService
      .getById(this.currentId).subscribe(
        (res) => {
          this.assessment = res ? res : {};
        },
        (err) => console.log(err),
        () => getById$.unsubscribe()
      );

  }

  public resetNewAssessmentObjects(): void {
    if (this.addAssessedObjectComponent) {
      this.addAssessedObjectComponent.resetNewAssessmentObjects();
    }
  }

  public getNumAttackPatterns(phaseName) {
    const attackPatternsByKillChain = this.riskByAttackPattern
      .attackPatternsByKillChain;

    for (const killPhase of attackPatternsByKillChain) {
      if (
        killPhase._id === phaseName &&
        killPhase.attackPatterns !== undefined
      ) {
        return killPhase.attackPatterns.length;
      }
    }
    return 0;
  }

  public populateUnassessedPhases() {
    const assessedPhases = this.riskByAttackPattern.phases
      .map((phase) => phase._id);
    this.unassessedPhases = Constance.KILL_CHAIN_PHASES
      .filter((phase) => assessedPhases.indexOf(phase) < 0);
  }

  public setPhase(phaseName, curApIndex: number = 0) {
    this.resetNewAssessmentObjects();
    this.activePhase = phaseName;
    this.attackPatternsByPhase = this.getAttackPatternsByPhase(this.activePhase);
    const currentAttackPatternId: any = this.attackPatternsByPhase.length > 0 ? this.attackPatternsByPhase[curApIndex].attackPatternId : -1;
    this.setAttackPattern(currentAttackPatternId);
  }

  public getAttackPatternsByPhase(phaseName) {
    const phase = this.riskByAttackPattern.phases.find((el) => el._id === phaseName);
    return phase && phase.attackPatterns ? phase.attackPatterns : [];
  }

  public getRiskByAttackPatternId(attackPatternId) {
    for (const ap of this.riskByAttackPattern.assessedByAttackPattern) {
      if (ap._id === attackPatternId) {
        return ap.risk;
      }
    }
    return 1;
  }

  public getRiskByPhase(phaseName) {
    const phaseObj = this.riskByAttackPattern.phases.find((phase) => phase._id === phaseName);
    if (phaseObj) {
      let sum = 0;
      let count = 0;
      for (const ao of phaseObj.assessedObjects) {
        sum += ao.risk;
        count++;
      }
      return sum / count;
    } else {
      return 1;
    }
  }

  public setAttackPattern(attackPatternId): void {
    this.resetNewAssessmentObjects();

    if (attackPatternId !== -1) {
      // Get attack pattern details
      this.assessmentsDashboardService
        .genericGet(`${Constance.ATTACK_PATTERN_URL}/${attackPatternId}`)
        .subscribe(
        (res) => {
          const dat: any = res;
          this.currentAttackPattern = dat.attributes;
        },
        (err) => console.log(err)
        );

      // Get relationships for attack pattern, link to assessed objects
      this.assessmentsDashboardService
        .getAttackPatternRelationships(attackPatternId)
        .subscribe(
        (res) => {
          const assessmentCanidates = res.map(
            (relationship) => relationship.attributes.source_ref
          );
          this.displayedAssessedObjects = this.assessedObjects
            .filter((assessedObj) => assessmentCanidates.indexOf(assessedObj.stix.id) > -1)
            .map((assessedObj) => {
              const retObj = assessedObj;
              retObj.risk = this.getRisk(assessedObj.stix.id);
              retObj.editActive = false;
              retObj.questions = this.getQuestions(assessedObj.stix.id);
              return retObj;
            });
        },
        (err) => console.log(err)
        );
    }

    // Get unassessed attack patterns
    const assessedAps = this.getAttackPatternsByPhase(this.activePhase)
      .map((ap) => ap.attackPatternId);

    const query = { 'stix.kill_chain_phases.phase_name': this.activePhase };
    this.assessmentsDashboardService
      .genericGet(`${Constance.ATTACK_PATTERN_URL}?filter=${encodeURI(JSON.stringify(query))}`)
      .subscribe(
        (res) => {
          const dat: any = res;
          this.unassessedAttackPatterns =
            dat.filter((ap) => !assessedAps.includes(ap.id));
        },
        (err) => console.log(err)
      );
  }

  public getStixIcon(stixType) {
    const convertedStixType = stixType
      .replace(/-/g, '_')
      .toUpperCase()
      .concat('_ICON');
    if (Constance[convertedStixType] !== undefined) {
      return Constance[convertedStixType];
    } else {
      // Return error icon?
      return '';
    }
  }

  public getRisk(id) {
    for (const assessment_object of this.assessment.attributes
      .assessment_objects) {
      if (assessment_object.stix.id === id) {
        return assessment_object.risk;
      }
    }
  }

  public getQuestions(id) {
    for (const assessment_object of this.assessment.attributes
      .assessment_objects) {
      if (assessment_object.stix.id === id) {
        return assessment_object.questions;
      }
    }
  }

  public editAssessedObject(assessedObj) {
    // Set new question value
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < assessedObj.questions.length; i++) {
      assessedObj.questions[i].selected_value.risk = assessedObj.questions[i].risk;
      for (const option of assessedObj.questions[i].options) {
        if (option.risk === assessedObj.questions[i].risk) {
          assessedObj.questions[i].selected_value.name = option.name;
          break;
        }
      }
    }

    // Recalculate risk
    assessedObj.risk =
      assessedObj.questions
        .map((question) => question.risk)
        .reduce((prev, cur) => (prev += cur), 0) / assessedObj.questions.length;

    const assObjToEdit = this.assessment.attributes.assessment_objects
      .find((assObj) => assObj.stix.id === assessedObj.stix.id);

    assObjToEdit.risk = assessedObj.risk;
    // assObjToEdit.questions.selected_value = assessedObj.questions.selected_value;

    const objToPatch = this.assessment.attributes;
    objToPatch.modified = new Date().toISOString();
    this.assessmentsDashboardService
      .genericPatch(`${Constance.X_UNFETTER_ASSESSMENT_URL}/${this.assessment.id}`, objToPatch)
      .subscribe((assessmentRes) => {
        // refresh data
        let indexOfCurAp = 0;

        for (let i = 0; i < this.attackPatternsByPhase.length; i++) {
          if (this.attackPatternsByPhase[i].attackPatternId === this.currentAttackPattern.id) {
            indexOfCurAp = i;
          }
        }

        this.resetNewAssessmentObjects();
        this.initData(indexOfCurAp);
      },
      (assessmentErr) => console.log(assessmentErr)
      );
  }
}

interface GroupPhase {
  _id: string;
  assessedObjects: any[];
  attackPatterns: any[];
}

interface AssessedByAttackPattern {
  assessedObjects: any[];
  risk: number;
  _id: string;
}

interface GroupAttackPattern {
  attackPatterns: AttackPattern[];
  _id: string;
}
