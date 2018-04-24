import { Component, ViewChild, OnInit, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AddAssessedObjectComponent } from './add-assessed-object/add-assessed-object.component';
import { Baseline } from '../../../../models/baseline/baseline';
import { AssessAttackPatternMeta } from '../../../../models/assess/assess-attack-pattern-meta';
import { BaselineObject } from '../../../../models/baseline/baseline-object';
import { BaselineQuestion } from '../../../../models/baseline/baseline-question';
import { BaselineService } from '../../../services/baseline.service';
import { Constance } from '../../../../utils/constance';
import { DisplayedBaselineObject } from './models/displayed-baseline-object';
import { FormatHelpers } from '../../../../global/static/format-helpers';
import { Stix } from '../../../../models/stix/stix';
import { SortHelper } from '../../../../global/static/sort-helper';
import { FullBaselineResultState } from '../../store/full-result.reducers';
import { LoadGroupData, LoadGroupCurrentAttackPattern, PushUrl, LoadGroupAttackPatternRelationships, UpdateAssessmentObject } from '../../store/full-result.actions';
import { RiskByAttack3 } from '../../../../models/baseline/risk-by-attack3';
import { Relationship } from '../../../../models';
import { FullBaselineGroup } from './models/full-baseline-group';

@Component({
  selector: 'unf-assess-group',
  templateUrl: './baselines-group.component.html',
  styleUrls: ['./baselines-group.component.scss']
})
export class BaselineGroupComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  public baseline: Baseline;

  @Input()
  public baselineId: string;

  @Input()
  public activePhase: string;

  @Input()
  public initialAttackPatternId: string;

  @Input()
  public baselineGroup: Observable<FullBaselineGroup>;

  @Output('riskByAttackPatternChanged')
  public riskByAttackPatternChanged = new EventEmitter<RiskByAttack3>();

  @ViewChildren('addAssessedObjectComponent')
  public addAssessedObjectComponents: QueryList<AddAssessedObjectComponent>;
  public addAssessedObjectComponent: AddAssessedObjectComponent;

  public indicator: any;
  public courseOfAction: any;
  public xUnfetterSensor: any;

  public riskByAttackPattern: RiskByAttack3;
  public assessedObjects: BaselineObject[];
  public unassessedPhases: string[];
  public currentAttackPattern: Stix;
  public displayedAssessedObjects: DisplayedBaselineObject[];
  public unassessedAttackPatterns: Stix[];
  public attackPatternsByPhase: AssessAttackPatternMeta[];
  public addAssessedObject: boolean;
  public addAssessedType: string;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private baselineService: BaselineService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private store: Store<FullBaselineResultState>) { }

  /**
   * @description init before childern are initialized
   */
  public ngOnInit(): void {
    this.baselineId = this.baseline.id || '';
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
    this.baseline = this.baseline || new Baseline();
    this.listenForDataChanges(attackPatternIndex);
    // request for initial data changes
    this.requestDataLoad(this.baselineId);
  }
  
  /**
   * @description request data
   * @returns {void}
   */
  public requestDataLoad(baselineId: string): void {
    this.store.dispatch(new LoadGroupData(baselineId));
  }

  public onAddAssessment(): void {
    // clear objects for the observable will detect a change
    this.displayedAssessedObjects = undefined;
    this.requestDataLoad(this.baselineId);
  }

  /**
   * @description setup subscriptions and observables for data changes
   * @param {number} attackPatternIndex
   * @returns {void}
   */
  public listenForDataChanges(attackPatternIndex: number = 0): void {
    const sub1$ = this.baselineGroup
      .distinctUntilChanged()
      .filter((group: FullBaselineGroup) => {
        // TODO: stop an infinite loop of network requests
        //  figure out a better way to short circuit
        return group.finishedLoadingGroupData === true
          && this.displayedAssessedObjects === undefined;
      })
      .subscribe((group: FullBaselineGroup) => {
        // initialize the displayed assessed objects, 
        //  used also to stop loop of network calls
        this.displayedAssessedObjects = [];
        this.assessedObjects = group.assessedObjects || [];
        this.riskByAttackPattern = group.riskByAttackPattern || new RiskByAttack3();
        this.loadDisplayedObjects(attackPatternIndex);
      },
        (err) => console.log(err));

    const sub2$ = this.baselineGroup
      .pluck('currentAttackPattern')
      .distinctUntilChanged()
      .subscribe((currentAttackPattern: Stix) => this.currentAttackPattern = currentAttackPattern,
        (err) => console.log(err));

    const sub3$ = this.baselineGroup
      .filter((group: FullBaselineGroup) => group.finishedLoadingGroupData === true)
      .pluck('attackPatternRelationships')
      .distinctUntilChanged()
      .subscribe((relationships: Relationship[]) => {
        const baselineCandidates = relationships
          .map((el) => el.attributes)
          .map((relationship) => relationship.source_ref);
        this.displayedAssessedObjects = this.assessedObjects
          .filter((assessedObj) => baselineCandidates.indexOf(assessedObj.stix.id) > -1)
          .map((assessedObj) => {
            const retObj = Object.assign(new DisplayedBaselineObject(), assessedObj);
            // retObj.risk = this.getRisk(assessedObj.stix.id);
            retObj.editActive = false;
            retObj.questions = this.getQuestions(assessedObj.stix.id);
            return retObj;
          });
      },
        (err) => console.log(err));

    this.subscriptions.push(sub1$, sub2$, sub3$);
  }

  /**
   * @description load new phase and displayed assessed objects
   * @param {number} attackPatternIndex
   * @returns {void}
   */
  public loadDisplayedObjects(attackPatternIndex: number): void {
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
    this.riskByAttackPatternChanged.emit(this.riskByAttackPattern);
  }

  /**
   * @description call sub components to reset it self
   * @returns {void}
   */
  public resetNewAssessmentObjects(): void {
    if (this.addAssessedObjectComponent) {
      this.addAssessedObjectComponent.resetNewAssessmentObjects();
    }
  }

  /**
   * @description look up the given phase name in the risk by attack patterns
   *  get number of patterns in the given phase, otherwise 0 if phase name not found
   * @param {string} phaseName
   * @returns {number}
   */
  public getNumAttackPatterns(phaseName: string): number {
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

    this.updateUrlIfNeeded();
  }

  /** 
   * @description if this component has the correct settings, update the url with out rerouting
   * @return {void}
   */
  public updateUrlIfNeeded(): void {
    const baselineId = this.baselineId || '';
    const phase = this.activePhase || '';
    const attackPattern = (this.currentAttackPattern && this.currentAttackPattern.id)
      ? this.currentAttackPattern.id : '';

    if (baselineId && phase && attackPattern) {
      this.store.dispatch(new PushUrl({ baselineId, phase, attackPattern }));
    }
  }

  /**
   * @description
   * @param {string} phaseName
   * @returns {AssessAttackPatternMeta[]}
   */
  public getAttackPatternsByPhase(phaseName: string): AssessAttackPatternMeta[] {
    const phase = this.riskByAttackPattern.phases.find((el) => el._id === phaseName);
    const attackPatterns = (phase && phase.attackPatterns) ? phase.attackPatterns : [];
    const ranked = attackPatterns.sort((a, b) => {
      const rank1 = this.getRiskByAttackPatternId(a.attackPatternId);
      const rank2 = this.getRiskByAttackPatternId(b.attackPatternId);
      if (rank1 > rank2) {
        return -1;
      } else if (rank1 === rank2) {
        return 0;
      } else {
        return 1;
      }
    });
    return attackPatterns;
  }

  /**
   * @description finds given attack pattern in risk by attack pattern collection 
   *  returns the current risk if found other wise returns 1
   * @param {string} attackPatternId
   * @returns {number} 0 - 1 based on risk
   */
  public getRiskByAttackPatternId(attackPatternId: string): number {
    const risk = this.riskByAttackPattern
      .assessed3ByAttackPattern
      .filter((ap) => ap._id === attackPatternId)
      .filter((ap) => ap && !Number.isNaN(ap.risk))
      .map((ap) => ap.risk)[0];
    return (risk !== undefined && !Number.isNaN(risk) ? risk : 1);
  }

  /**
   * @description
   * @param {string} phaseName
   * @returns {number}
   */
  public getRiskByPhase(phaseName: string): number {
    const defaultRisk = 1;
    const phaseObj = this.riskByAttackPattern
      .phases
      .find((phase) => phase._id === phaseName);
    if (!phaseObj) {
      return defaultRisk;
    }

    let count = 0;
    const sum = phaseObj.assessedObjects.length;
    //   .map((ao) => ao.risk)
    //   .reduce((currentSum, risk) => {
    //     count++;
    //     return currentSum + risk;
    //   }, 0);
    return (count !== 0) ? (sum / count) : defaultRisk;
  }

  /**
   * @description load the data for given attack pattern, update page
   * @param {string} attackPatternId
   * @return {void}
   */
  public setAttackPattern(attackPatternId = ''): void {
    this.resetNewAssessmentObjects();

    if (attackPatternId !== '') {
      // Get attack pattern details
      this.store.dispatch(new LoadGroupCurrentAttackPattern(attackPatternId));
      // Get relationships for attack pattern, link to assessed objects
      this.store.dispatch(new LoadGroupAttackPatternRelationships(attackPatternId));
    }

    const assessedAps = this.getAttackPatternsByPhase(this.activePhase)
      .map((ap) => ap.attackPatternId);

    const query = { 'stix.kill_chain_phases.phase_name': this.activePhase };
    const s1$ = this.baselineService
      .getAs<Stix>(`${Constance.ATTACK_PATTERN_URL}?filter=${encodeURI(JSON.stringify(query))}`)
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
  public getStixIcon(stixType: string): string {
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
   * @description find the risk of the baseline object with the given id, otherwise -1
   * @param {string} stixId
   * @return {number} risk of the given baseline object
   */
  public getRisk(stixId: string): number {
    const defaultRisk = -1;
    if (!stixId) {
      return defaultRisk;
    }
    const assessObj = this.baseline.baseline_objects
      .filter((el) => el.stix !== undefined)
      .find((el) => el.stix.id === stixId);
    return defaultRisk;
    // return assessObj && !Number.isNaN(assessObj.risk)
    //   ? assessObj.risk : defaultRisk;
  }

  /**
   * @description the questions of the baseline object with the given id, otherwise -1
   * @param {string} id
   * @return {BaselineQuestion[]} questions
   */
  public getQuestions(id: string): BaselineQuestion[] {
    const defaultQuestions = [];
    if (!id) {
      return defaultQuestions;
    }

    const assessObj = this.baseline.baseline_objects
      .filter((el) => el.stix !== undefined)
      .find((el) => el.stix.id === id);
    return assessObj && assessObj.questions ? assessObj.questions : defaultQuestions;
  }

  /**
   * @description
   * @param {DisplayedAssessmentObject} assessedObj
   */
  public editAssessedObject(assessedObj: DisplayedBaselineObject): void {
    // Set new question value
    // tslint:disable-next-line:prefer-for-of
    // TODO: update for baselines 3.0
    // for (let i = 0; i < assessedObj.questions.length; i++) {
    //   assessedObj.questions[i].selected_value.risk = assessedObj.questions[i].risk;
    //   for (const option of assessedObj.questions[i].options) {
    //     if (option.risk === assessedObj.questions[i].risk) {
    //       assessedObj.questions[i].selected_value.name = option.name;
    //       break;
    //     }
    //   }
    // }

    // Recalculate risk
    // TODO: Update for baselines 3.0
    // assessedObj.risk =
    //   assessedObj.questions
    //     .map((question) => question.risk)
    //     .reduce((prev, cur) => (prev += cur), 0) / assessedObj.questions.length;

    const assObjToEdit = this.baseline.baseline_objects
      .find((el) => el.stix.id === assessedObj.stix.id);

    // TODO: update for baselines 3.0
    // assObjToEdit.risk = assessedObj.risk;
    this.baseline.modified = new Date().toISOString();
    assessedObj.editActive = false;
    this.resetNewAssessmentObjects();
    // important, clear out displayed baseline objects, 
    //  so the observables can react and rebuild the scores and cards
    this.displayedAssessedObjects = undefined;
    this.store.dispatch(new UpdateAssessmentObject(this.baseline));
    // const s$ = this.assessService
    //   .genericPatch(`${Constance.X_UNFETTER_ASSESSMENT_URL}/${this.baseline.id}`, this.baseline)
    //   .subscribe(
    //     (baselineRes) => {
    //       // refresh data
    //       this.resetNewAssessmentObjects();
    //       this.displayedAssessedObjects = undefined;
    //       // const currentAttackPatternIndex = this.attackPatternsByPhase
    //       // .findIndex((el) => el.attackPatternId === this.currentAttackPattern.id);
    //       // this.initData(indexOfCurAp);
    //       // this.loadDisplayedObjects(currentAttackPatternIndex);
    //       // assessedObj.editActive = false;
    //       // this.riskByAttackPatternChanged.emit(this.riskByAttackPattern);
    //       this.store.dispatch(new LoadGroupData(this.baselineId));
    //     },
    //     (baselineErr) => console.log(baselineErr));

    // this.subscriptions.push(s$);
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
