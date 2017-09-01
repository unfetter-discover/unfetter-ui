import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentsDashboardService } from '../assessments-dashboard/assessments-dashboard.service';
import { Constance } from '../../utils/constance';
import { AttackPattern } from '../../models/attack-pattern';

@Component({
  selector: 'assessments-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class AssessmentsGroupComponent implements OnInit {
  public indicator: any;
  public courseOfAction: any;
  public xUnfetterSensor: any;

  private activePhase: string;
  private assessment: any;
  private riskByAttackPattern: { assessedByAttackPattern: AssessedByAttackPattern[], attackPatternsByKillChain: GroupAttackPattern[], phases: GroupPhase[] };
  private assessedObjects: any;
  private unassessedPhases: string[];
  private currentAttackPattern: any;
  private currentId: string;
  private currentPhase: string;
  private displayedAssessedObjects: any[];
  private unassessedAttackPatterns: any[];
  private attackPatternsByPhase: any[];
  private addAssessedObject: boolean;
  private addAssessedType: string;

  constructor(
    private assessmentsDashboardService: AssessmentsDashboardService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.resetNewAssessmentObjects();
    this.currentId = this.route.snapshot.params['id']
      ? this.route.snapshot.params['id']
      : '';
    this.currentPhase = this.route.snapshot.params['phase']
      ? this.route.snapshot.params['phase']
      : '';
    this.initData();
  }

  /**
   * @description
   *  fetch data to populate this page
   *
   * @returns {void}
   */
  public initData(): void {
    const riskByAttackPattern$ = this.assessmentsDashboardService
      .getRiskByAttackPattern(this.currentId).subscribe(
        (res) => {
          this.riskByAttackPattern = res ? res : {};
          this.populateUnassessedPhases();
          this.activePhase = this.currentPhase || this.riskByAttackPattern.phases[0]._id;
          this.setPhase(this.activePhase);
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

  public resetNewAssessmentObjects() {
    this.addAssessedObject = false;
    this.addAssessedType = '';
    this.indicator = {
      type: 'indicator',
      name: '',
      description: '',
      pattern: '',
      questions: []
    };
    this.courseOfAction = {
      type: 'course-of-action',
      name: '',
      description: '',
      questions: []
    };
    this.xUnfetterSensor = {
      type: 'x-unfetter-sensor',
      name: '',
      description: '',
      questions: []
    };

    for (const stixType in Constance.MEASUREMENTS) {
      for (const question in Constance.MEASUREMENTS[stixType]) {
        switch (stixType) {
          case 'indicator':
            this.indicator.questions.push({
              name: question,
              risk: 1,
              options: this.getOptions(
                Constance.MEASUREMENTS[stixType][question]
              ),
              selected_value: {
                name: Constance.MEASUREMENTS[stixType][question][0].name,
                risk: 1
              }
            });
            break;
          case 'course-of-action':
            this.courseOfAction.questions.push({
              name: question,
              risk: 1,
              options: this.getOptions(
                Constance.MEASUREMENTS[stixType][question]
              ),
              selected_value: {
                name: Constance.MEASUREMENTS[stixType][question][0].name,
                risk: 1
              }
            });
            break;
          case 'x-unfetter-sensor':
            this.xUnfetterSensor.questions.push({
              name: question,
              risk: 1,
              options: this.getOptions(
                Constance.MEASUREMENTS[stixType][question]
              ),
              selected_value: {
                name: Constance.MEASUREMENTS[stixType][question][0].name,
                risk: 1
              }
            });
            break;
        }
      }
    }
  }

  public getOptions(options) {
    const retVal = [];
    options.forEach((label, index) => {
      const data: any = {};
      data.name = label;
      data.risk = 1 - index / (options.length - 1);
      retVal.push(data);
    });
    return retVal;
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
    const assessedPhases = this.riskByAttackPattern.phases.map(
      (phase) => phase._id
    );
    this.unassessedPhases = Constance.KILL_CHAIN_PHASES.filter(
      (phase) => assessedPhases.indexOf(phase) < 0
    );
  }

  public setPhase(phaseName) {
    this.resetNewAssessmentObjects();
    this.activePhase = phaseName;
    this.attackPatternsByPhase = this.getAttackPatternsByPhase(
      this.activePhase
    );
    this.getAttackPatternsByPhase(this.activePhase).length > 0
      ? this.setAttackPattern(
        this.getAttackPatternsByPhase(this.activePhase)[0].attackPatternId
      )
      : this.setAttackPattern(-1);
  }

  public getAttackPatternsByPhase(phaseName) {
    return this.riskByAttackPattern.phases.find(
      (phase) => phase._id === phaseName
    )
      ? this.riskByAttackPattern.phases.find((phase) => phase._id === phaseName)
        .attackPatterns
      : [];
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

  public setAttackPattern(attackPatternId) {
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
            .filter(
            (assessedObj) =>
              assessmentCanidates.indexOf(assessedObj.stix.id) > -1
            )
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
    const assessedAps = this.getAttackPatternsByPhase(this.activePhase).map(
      (ap) => ap.attackPatternId
    );

    const query = { 'stix.kill_chain_phases.phase_name': this.activePhase };
    this.assessmentsDashboardService
      .genericGet(
      `${Constance.ATTACK_PATTERN_URL}?filter=${encodeURI(
        JSON.stringify(query)
      )}`
      )
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

  public createAssessedObject(newAssessedObject, attackPattern) {
    // Update & save questions for assessment
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < newAssessedObject.questions.length; i++) {
      newAssessedObject.questions[i].selected_value.risk =
        newAssessedObject.questions[i].risk;
      for (const option of newAssessedObject.questions[i].options) {
        if (option.risk === newAssessedObject.questions[i].risk) {
          newAssessedObject.questions[i].selected_value.name = option.name;
        }
      }
    }
    const questions = newAssessedObject.questions;
    delete newAssessedObject.questions;

    const convertedObj: any = {};
    for (const prop in newAssessedObject) {
      if (newAssessedObject[prop]) {
        convertedObj[prop] = newAssessedObject[prop];
      }
    }

    // Uploaded indicator, COA, or sensor
    this.assessmentsDashboardService
      .genericPost(`api/${convertedObj.type}s`, convertedObj)
      .subscribe(
      (assessedRes) => {
        const newId = assessedRes[0].attributes.id;
        const createdObj = assessedRes[0].attributes;

        // create relationship
        const relationshipObj: any = { type: 'relationship' };
        switch (newAssessedObject.type) {
          case 'x-unfetter-sensor':
          case 'course-of-action':
            relationshipObj.relationship_type = 'mitigates';
            break;
          case 'indicator':
            relationshipObj.relationship_type = 'indicates';
            break;
        }
        relationshipObj.source_ref = newId;
        relationshipObj.target_ref = attackPattern.id;
        this.assessmentsDashboardService
          .genericPost(Constance.RELATIONSHIPS_URL, relationshipObj)
          .subscribe(
          (relationshipRes) => {
            console.log('Relationship uploaded successfully');
          },
          (relationshipErr) => console.log(relationshipErr)
          );

        // update assessment
        const tempAssessmentObject: any = {};
        tempAssessmentObject.questions = questions;
        tempAssessmentObject.stix = {
          id: newId,
          type: convertedObj.type,
          name: convertedObj.name
        };
        if (convertedObj.description !== undefined) {
          tempAssessmentObject.stix.description = convertedObj.description;
        }
        tempAssessmentObject.risk =
          questions
            .map((question) => question.risk)
            .reduce((prev, cur) => (prev += cur), 0) / questions.length;

        this.assessment.attributes.assessment_objects.push(
          tempAssessmentObject
        );
        const assessmentToUpload: any = this.assessment.attributes;
        assessmentToUpload.modified = new Date().toISOString();
        console.log(assessmentToUpload);
        this.assessmentsDashboardService
          .genericPatch(
          `${Constance.X_UNFETTER_ASSESSMENT_URL}/${this.assessment.id}`,
          assessmentToUpload
          )
          .subscribe(
          (assessmentRes) => {
            console.log('Assessment updated successfully');
            this.displayedAssessedObjects.push(tempAssessmentObject);
            this.assessedObjects.push({ stix: createdObj });
            this.resetNewAssessmentObjects();
          },
          (assessmentErr) => console.log(assessmentErr)
          );
      },
      (assessedErr) => console.log(assessedErr)
      );
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

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.assessment.attributes.assessment_objects.length; i++) {
      if (this.assessment.attributes.assessment_objects[i].stix.id === assessedObj.stix.id) {
        this.assessment.attributes.assessment_objects[i].risk =
          assessedObj.risk;
        this.assessment.attributes.assessment_objects[i].questions =
          assessedObj.questions;
        break;
      }
    }
    const objToPatch = this.assessment.attributes;
    objToPatch.modified = new Date().toISOString();
    console.log(objToPatch);
    this.assessmentsDashboardService
      .genericPatch(`${Constance.X_UNFETTER_ASSESSMENT_URL}/${this.assessment.id}`, objToPatch)
      .subscribe((assessmentRes) => {
        console.log('Assessment updated successfully');
        // refresh data
        this.resetNewAssessmentObjects();
        this.initData();
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
