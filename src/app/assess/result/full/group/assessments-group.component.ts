import { Component, ViewChild, OnInit, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AddAssessedObjectComponent } from './add-assessed-object/add-assessed-object.component';
import { AssessService } from '../../../services/assess.service';
import { AssessedByAttackPattern } from './models/assessed-by-attack-pattern';
import { Assessment } from '../../../../models/assess/assessment';
import { AssessmentObject } from '../../../../models/assess/assessment-object';
import { AttackPattern } from '../../../../models/attack-pattern';
import { Constance } from '../../../../utils/constance';
import { DisplayedAssessmentObject } from './models/displayed-assessment-object';
import { GroupAttackPattern } from './models/group-attack-pattern';
import { GroupPhase } from './models/group-phase';
import { FormatHelpers } from '../../../../global/static/format-helpers';
import { Stix } from '../../../../models/stix/stix';
import { SortHelper } from '../../../../global/static/sort-helper';
import { FullAssessmentResultState } from '../../store/full-result.reducers';
import { Store } from '@ngrx/store';
import { RiskByAttackPattern } from './models/risk-by-attack-pattern';
import { LoadGroupData, LoadGroupCurrentAttackPattern, PushUrl } from '../../store/full-result.actions';

@Component({
  selector: 'unf-assess-group',
  templateUrl: './assessments-group.component.html',
  styleUrls: ['./assessments-group.component.scss']
})
export class AssessGroupComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  public assessment: Assessment;

  @Input()
  public assessmentId: string;

  @Input()
  public rollupId: string;

  @Input()
  public activePhase: string;

  @Input()
  public initialAttackPatternId: string;

  @Output('phaseChanged')
  public phaseChanged = new EventEmitter<string>();

  @ViewChildren('addAssessedObjectComponent')
  public addAssessedObjectComponents: QueryList<AddAssessedObjectComponent>;
  public addAssessedObjectComponent: AddAssessedObjectComponent;

  public indicator: any;
  public courseOfAction: any;
  public xUnfetterSensor: any;

  public riskByAttackPattern: RiskByAttackPattern;
  public assessedObjects: AssessmentObject[];
  public unassessedPhases: string[];
  public currentAttackPattern: Stix;
  public displayedAssessedObjects: DisplayedAssessmentObject[];
  public unassessedAttackPatterns: Stix[];
  public attackPatternsByPhase: any[];
  public addAssessedObject: boolean;
  public addAssessedType: string;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private assessService: AssessService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private store: Store<FullAssessmentResultState>) { }

  /**
   * @description init before childern are initialized
   */
  public ngOnInit(): void {
    this.assessmentId = this.assessment.id || '';
    // TODO: translate the initialAttackPatternId to and index
    this.initData();
  }

  /**
   * @description
   * @return {void}
   */
  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
   * @param {number} attackPatternIndex
   * @returns {void}
   */
  public initData(attackPatternIndex: number = 0): void {
    this.assessment = new Assessment();
    this.listenForDataChanges(attackPatternIndex);
    // request for initial data changes
    this.store.dispatch(new LoadGroupData(this.assessmentId));
  }

  /**
   * @description setup subscriptions and observables for data changes
   * @param {number} attackPatternIndex
   * @return {void}
   */
  public listenForDataChanges(attackPatternIndex: number = 0): void {
    const sub1$ = this.store
      .select('fullAssessment')
      .pluck('group')
      .distinctUntilChanged()
      .filter((group: any) => group.finishedLoadingGroupData === true)
      .subscribe(
        (group: any) => {
          this.assessedObjects = group.assessedObjects || [];
          this.riskByAttackPattern = group.riskByAttackPattern || {};
          this.populateUnassessedPhases();
          // active phase is either the current active phase, 
          let activePhase = this.activePhase;
          if (!activePhase && this.riskByAttackPattern && this.riskByAttackPattern.phases.length > 0) {
            //  the first assess attack pattern, 
            activePhase = this.riskByAttackPattern.phases[0]._id;
          } else if (!activePhase && this.unassessedPhases && this.unassessedPhases.length > 0) {
            // or the first unassessed pattern
            activePhase = this.unassessedPhases[0];
          }
          this.setPhase(activePhase, attackPatternIndex);
        },
        (err) => console.log(err));

    const sub2$ = this.store
      .select('fullAssessment')
      .pluck('group')
      .pluck('currentAttackPattern')
      .distinctUntilChanged()
      .subscribe(
        (currentAttackPattern: Stix) => {
          this.currentAttackPattern = currentAttackPattern;
        },
        (err) => console.log(err));

    this.subscriptions.push(sub1$, sub2$);
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

  /**
   * @description set the unassessedPhases from the risks per attack pattern query
   * @return {void}
   */
  public populateUnassessedPhases(): void {
    const assessedPhases = this.riskByAttackPattern.phases
      .map((phase) => phase._id);
    this.unassessedPhases = Constance.KILL_CHAIN_PHASES
      .filter((phase) => assessedPhases.indexOf(phase) < 0);
  }

  /**
   * @description reload page with the phase and attack pattern
   * @param {string} phaseName
   * @param {number} attackPatternIndex
   */
  public setPhase(phaseName: string, attackPatternIndex: number = 0) {
    this.resetNewAssessmentObjects();
    this.activePhase = phaseName;
    this.attackPatternsByPhase = this.getAttackPatternsByPhase(this.activePhase);
    let currentAttackPatternId = '';
    if (this.attackPatternsByPhase.length > 0) {
      currentAttackPatternId = this.attackPatternsByPhase[attackPatternIndex].attackPatternId;
    }
    this.setAttackPattern(currentAttackPatternId);

    this.phaseChanged.emit(this.activePhase);
    this.updateUrlIfNeeded();
  }

  /** 
   * @description if this component has the correct settings, update the url with out rerouting
   * @return {void}
   */
  public updateUrlIfNeeded(): void {
    const rollupId = this.rollupId || '';
    const assessmentId = this.assessmentId || '';
    const phase = this.activePhase || '';
    const attackPattern = (this.currentAttackPattern && this.currentAttackPattern.id)
      ? this.currentAttackPattern.id : '';

    if (rollupId && assessmentId && phase && attackPattern) {
      this.store.dispatch(new PushUrl({ rollupId, assessmentId, phase, attackPattern }));
    }
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

  /**
   * @description
   * @param attackPatternId
   * @return {void}
   */
  public setAttackPattern(attackPatternId = ''): void {
    this.resetNewAssessmentObjects();

    if (attackPatternId !== '') {
      // Get attack pattern details
      this.store.dispatch(new LoadGroupCurrentAttackPattern(attackPatternId));

      // Get relationships for attack pattern, link to assessed objects
      const s0$ = this.assessService
        .getAttackPatternRelationships(attackPatternId)
        .subscribe(
          (res) => {
            const assessmentCanidates = res.map(
              (relationship) => relationship.attributes.source_ref
            );
            this.displayedAssessedObjects = this.assessedObjects
              .filter((assessedObj) => assessmentCanidates.indexOf(assessedObj.stix.id) > -1)
              .map((assessedObj) => {
                const retObj = Object.assign(new DisplayedAssessmentObject(), assessedObj);
                retObj.risk = this.getRisk(assessedObj.stix.id);
                retObj.editActive = false;
                retObj.questions = this.getQuestions(assessedObj.stix.id);
                return retObj;
              });
          },
          (err) => console.log(err)
        );
      this.subscriptions.push(s0$);
    }

    const assessedAps = this.getAttackPatternsByPhase(this.activePhase)
      .map((ap) => ap.attackPatternId);

    const query = { 'stix.kill_chain_phases.phase_name': this.activePhase };
    const s1$ = this.assessService.
      getAs<Stix>(`${Constance.ATTACK_PATTERN_URL}?filter=${encodeURI(JSON.stringify(query))}`)
      .subscribe(
        (data: Stix[]) => {
          // Get unassessed attack patterns
          this.unassessedAttackPatterns = data
            .filter((ap) => !assessedAps.includes(ap.id))
            .sort(SortHelper.sortDescByField('name'));
        },
        (err) => console.log(err)
      );
    this.subscriptions.push(s1$);
  }

  /**
   * @description
   * @param stixType 
   */
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

  /**
   * @description find the risk of the assessment object with the given id, otherwise -1
   * @param {string} id
   * @return {number} risk of the given assessment object
   */
  public getRisk(id: string): number {
    const defaultRisk = -1;
    if (!id) {
      return defaultRisk;
    }
    const assessObj = this.assessment.assessment_objects
      .filter((el) => el.stix !== undefined)
      .find((el) => el.stix.id === id);
    return assessObj && assessObj.risk ? assessObj.risk : defaultRisk;
  }

  /**
   * @description the questions of the assessment object with the given id, otherwise -1
   * @param {string} id
   * @return {[]} questions
   */
  public getQuestions(id: string): any[] {
    const defaultQuestions = [];
    if (!id) {
      return defaultQuestions;
    }

    const assessObj = this.assessment.assessment_objects
      .filter((el) => el.stix !== undefined)
      .find((el) => el.stix.id === id);
    return assessObj && assessObj.questions ? assessObj.questions : defaultQuestions;
  }

  /**
   * @description
   * @param {AssessmentObject} assessedObj
   */
  public editAssessedObject(assessedObj: AssessmentObject): void {
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

    const assObjToEdit = this.assessment.assessment_objects
      .find((assObj) => assObj.stix.id === assessedObj.stix.id);

    assObjToEdit.risk = assessedObj.risk;
    // assObjToEdit.questions.selected_value = assessedObj.questions.selected_value;

    this.assessment.modified = new Date().toISOString();
    const s$ = this.assessService
      .genericPatch(`${Constance.X_UNFETTER_ASSESSMENT_URL}/${this.assessment.id}`, this.assessment)
      .subscribe(
        (assessmentRes) => {
          // refresh data
          const indexOfCurAp = this.attackPatternsByPhase
            .findIndex((el) => el.attackPatternId === this.currentAttackPattern.id);
          this.resetNewAssessmentObjects();
          this.initData(indexOfCurAp);
        },
        (assessmentErr) => console.log(assessmentErr));

    this.subscriptions.push(s$);
  }

  /**
   * @description 
   * @param inputString
   * @return {string}
   */
  public whitespaceToBreak(inputString: string): string {
    return FormatHelpers.formatAll(inputString);
  }

  /**
   * @description determines if this components current attackpattern is the same as the given attackpattern
   *  Used to highlight the selected attackpattern
   * @param {string} attackPatternId
   * @return {boolean} true if the given attack pattern is selected
   */
  public isCurrentAttackPattern(attackPatternId = ''): boolean {
    return this.currentAttackPattern ? this.currentAttackPattern.id === attackPatternId : false;
  }

}
