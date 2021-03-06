import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { distinctUntilChanged, filter, pluck, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { AssessAttackPatternMeta } from 'stix/assess/v2/assess-attack-pattern-meta';
import { AssessmentObject } from 'stix/assess/v2/assessment-object';
import { AssessmentQuestion } from 'stix/assess/v2/assessment-question';
import { RiskByAttack } from 'stix/assess/v2/risk-by-attack';
import { Assessment } from 'stix/assess/v3/assessment';
import { AssessmentEvalTypeEnum } from 'stix/assess/v3/assessment-eval-type.enum';
import { Category } from 'stix/assess/v3/baseline/category';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { Stix } from 'stix/unfetter/stix';
import { AuthService } from '../../../../../core/services/auth.service';
import { Tactic } from '../../../../../global/components/tactics-pane/tactics.model';
import { AngularHelper } from '../../../../../global/static/angular-helper';
import { FormatHelpers } from '../../../../../global/static/format-helpers';
import { SortHelper } from '../../../../../global/static/sort-helper';
import { StixPermissions } from '../../../../../global/static/stix-permissions';
import { Relationship } from '../../../../../models';
import { AppState } from '../../../../../root-store/app.reducers';
import { Constance } from '../../../../../utils/constance';
import { LoadGroupAttackPatternRelationships, LoadGroupCurrentAttackPattern, PushUrl, UpdateAssessmentObject } from '../../store/full-result.actions';
import { FullAssessmentResultState } from '../../store/full-result.reducers';
import { AddAssessedObjectComponent } from './add-assessed-object/add-assessed-object.component';
import { DisplayedAssessmentObject } from './models/displayed-assessment-object';
import { FullAssessmentGroup } from './models/full-assessment-group';
import { AssessmentGroup } from 'stix/assess/v3/baseline/assessment-group';
import { getVisualizationData } from '../../../../../root-store/stix/stix.selectors';

@Component({
  selector: 'unf-assess-group',
  templateUrl: './assessments-group.component.html',
  styleUrls: ['./assessments-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AssessGroupComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public activePhase: string;
  @Input() public assessment: Assessment;
  @Input() public assessmentGroup: Observable<FullAssessmentGroup>;
  @Input() public assessmentId: string;
  @Input() public categoryLookup: Observable<Category[]>;
  @Input() public initialAttackPatternId: string;
  @Input() public rollupId: string;
  @Input() public unassessedPhases: string[];
  @Output() public onRiskByAttackPatternChanged = new EventEmitter<RiskByAttack>();
  @Output() public onAddedAssessmentObject = new EventEmitter<boolean>();
  @ViewChildren('addAssessedObjectComponent') public addAssessedObjectComponents: QueryList<AddAssessedObjectComponent>;

  public addAssessedObjectComponent: AddAssessedObjectComponent;
  public addAssessedType: string;
  public assessedObjects: AssessmentObject[];
  public attackPatternsByPhase: AssessAttackPatternMeta[];
  public canAddAssessedObjects: boolean = false;
  public currentAttackPattern: AttackPattern;
  public displayedAssessedObjects: DisplayedAssessmentObject[];
  public riskByAttackPattern: RiskByAttack;
  public unassessedAttackPatterns: AttackPattern[];

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private appStore: Store<AppState>,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef,
    private store: Store<FullAssessmentResultState>,
  ) { }

  /**
   * @description init before childern are initialized
   */
  public ngOnInit(): void {
    this.assessmentId = this.assessment.id || '';
    // TODO: translate the initialAttackPatternId to an index
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
   * @description init after child views initialize, called once
   */
  public ngAfterViewInit(): void {
    if (!this.addAssessedObjectComponents) {
      return;
    }
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
          // this.changeDetector.detectChanges();
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
    this.assessment = this.assessment || new Assessment();
    this.unassessedPhases = this.unassessedPhases || [];
    const stixPermissions: StixPermissions = this.authService.getStixPermissions();
    this.canAddAssessedObjects = stixPermissions.canCreate(this.assessment);
    this.listenForDataChanges(attackPatternIndex);
  }

  /**
   * @description trigger that we added an inline assessment object
   * @returns void
   */
  public onAddAssessment(): void {
    // clear objects for the observable will detect a change
    this.displayedAssessedObjects = undefined;
    this.onAddedAssessmentObject.emit(true);
  }

  /**
   * @description setup subscriptions and observables for data changes
   * @param {number} attackPatternIndex
   * @returns {void}
   */
  public listenForDataChanges(attackPatternIndex: number = 0): void {
    const sub1$ = this.assessmentGroup
      .pipe(
        distinctUntilChanged(),
        filter((group: FullAssessmentGroup) => {
          // TODO: stop an infinite loop of network requests
          //  figure out a better way to short circuit
          return group.finishedLoadingGroupData === true
            && this.displayedAssessedObjects === undefined;
        })
      ).subscribe(
        (group: FullAssessmentGroup) => {
          // initialize the displayed assessed objects, 
          //  used also to stop loop of network calls
          this.displayedAssessedObjects = [];
          this.assessedObjects = group.assessedObjects || [];
          this.riskByAttackPattern = group.riskByAttackPattern || new RiskByAttack();
          this.loadDisplayedObjects(attackPatternIndex);
          // this.changeDetector.detectChanges();

        },
        (err) => console.log(err)
      );

    const sub2$ = this.assessmentGroup
      .pipe(
        pluck<any, AttackPattern>('currentAttackPattern'),
        distinctUntilChanged(),
        filter((attackPattern) => attackPattern.id !== undefined)
      )
      .subscribe(
        (currentAttackPattern) => this.currentAttackPattern = currentAttackPattern,
        (err) => console.log(err)
      );

    const sub3$ = this.assessmentGroup
      .pipe(
        filter((group: FullAssessmentGroup) => {
          const hasAttackPattern = this.currentAttackPattern !== undefined && this.currentAttackPattern.id !== undefined;
          const hasDisplayObject = this.displayedAssessedObjects !== undefined;
          const isFinishedLoading = group.finishedLoadingGroupData !== undefined && group.finishedLoadingGroupData === true;
          return (isFinishedLoading && hasDisplayObject && hasAttackPattern);
        })
      )
      .subscribe(
        (group: FullAssessmentGroup) => {
          this.displayedAssessedObjects = this.populateDisplayedAssessedObjects(group, this.currentAttackPattern);
          // this.changeDetector.detectChanges();
        },
        (err) => console.log(err)
      );

    this.subscriptions.push(sub1$, sub2$, sub3$);
  }

  /**
   * @description builds the displayed object to display the inline edit cards in the groups section
   *  this method uses the relationships endpoint for mitigations and indicator assessments
   *  for capability assessment, this method will inspect the local ngrx store group data
   * @param {FullAssessmentGroup} group
   * @param {AttackPattern} currentAttackPattern optional only needed is this a capability assessment
   * @returns void
   */
  public populateDisplayedAssessedObjects(group: FullAssessmentGroup, currentAttackPattern?: AttackPattern): DisplayedAssessmentObject[] {
    const assessedObjects = group.assessedObjects;
    const assessmentType = this.assessment.determineAssessmentType() || '';
    const stixIdSet = (assessmentType !== AssessmentEvalTypeEnum.CAPABILITIES) ?
      this.relationshipsToStixIds(group.attackPatternRelationships) :
      this.assessedObjectToStixIds(assessedObjects, currentAttackPattern);
    // match the assessed ids with assessed objects to populate the grouping section cards
    const displayedAssessedObjects = assessedObjects
      .filter((assessedObj) => stixIdSet.has(assessedObj.stix.id))
      .filter((assessedObj) => assessedObj.risk >= 0 && assessedObj.risk <= 100)
      .map((assessedObj) => {
        const retObj = Object.assign(new DisplayedAssessmentObject(), assessedObj);
        retObj.risk = this.getRisk(assessedObj.stix.id);
        retObj.editActive = false;
        retObj.questions = this.getQuestions(assessedObj.stix.id);
        return retObj;
      });
    return displayedAssessedObjects;
  }

  /**
   * @description return set of ids that were assessed for an attack pattern
   * @param  {Relationship[]} relationships
   * @returns Set
   */
  public relationshipsToStixIds(relationships: Relationship[]): Set<string> {
    const ids = relationships
      .map((el) => el.attributes)
      .map((relationship) => relationship.source_ref);
    return new Set<string>(ids);
  }

  /**
   * @description return set of ids that were assessed for an attack pattern
   * @param  {AssessmentObject[]} assessedObjects
   * @returns Set
   */
  public assessedObjectToStixIds(assessedObjects: AssessmentObject[], attackPattern: AttackPattern): Set<string> {
    if (!assessedObjects || !attackPattern || !attackPattern.id) {
      return new Set();
    }

    const ids = this.assessedObjects
      .filter((assessedObject) => {
        const el: any = assessedObject;
        const assessesAttackPattern = el.stix.assessed_objects.filter((_) => attackPattern.id === _.assessed_object_ref);
        return assessesAttackPattern && assessesAttackPattern.length > 0;
      })
      .map((assessedObject) => assessedObject.stix.id)
      .filter((_) => _ !== undefined)
      .reduce((acc, cur) => acc.concat(cur), []);
    return new Set(ids);
  }

  /**
   * @description load new phase and displayed assessed objects
   * @param {number} attackPatternIndex
   * @returns {void}
   */
  public loadDisplayedObjects(attackPatternIndex: number): void {
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
    this.onRiskByAttackPatternChanged.emit(this.riskByAttackPattern);
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
   * @description reload page with the phase and attack pattern
   * @param {string} phaseName
   * @param {number} attackPatternIndex
   */
  public setPhase(phaseName: string, attackPatternIndex: number = 0) {
    this.resetNewAssessmentObjects();
    this.unassessedAttackPatterns = [];
    this.activePhase = phaseName;
    this.currentAttackPattern = undefined;
    this.attackPatternsByPhase = this.getAttackPatternsByPhase(this.activePhase);
    let currentAttackPatternId = '';
    if (this.attackPatternsByPhase.length > 0) {
      currentAttackPatternId = this.attackPatternsByPhase[attackPatternIndex].attackPatternId;
    }
    this.setAttackPattern(currentAttackPatternId);

  }

  /**
   * @description if this component has the correct settings, update the url with out rerouting
   * @param  {string} rollUpId
   * @param  {string} assessmentId
   * @param  {string} phase
   * @param  {} attackPattern=''
   * @returns void
   */
  public updateUrlIfNeeded(rollupId: string, assessmentId: string, phase: string, attackPattern = ''): void {
    if (rollupId && assessmentId && phase) {
      this.store.dispatch(new PushUrl({ rollupId, assessmentId, phase, attackPattern }));
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
    return ranked;
  }

  /**
   * @description finds given attack pattern in risk by attack pattern collection 
   *  returns the current risk if found other wise returns 1
   * @param {string} attackPatternId
   * @returns {number} 0 - 1 based on risk
   */
  public getRiskByAttackPatternId(attackPatternId: string): number {
    const risk = this.riskByAttackPattern
      .assessedByAttackPattern
      .filter((ap) => ap._id === attackPatternId)
      .filter((ap) => ap && !Number.isNaN(ap.risk))
      .filter((ap) => ap.risk >= 0 && ap.risk <= 1)
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
    const sum = phaseObj.assessedObjects
      .map((ao) => ao.risk)
      .filter((risk) => risk >= 0 && risk <= 1)
      .reduce((currentSum, risk) => {
        count++;
        return currentSum + risk;
      }, 0);
    return (count !== 0) ? (sum / count) : defaultRisk;
  }

  /**
   * @description load the data for given attack pattern, update page
   * @param attackPatternId
   * @return {void}
   */
  public setAttackPattern(attackPatternId = ''): void {
    this.resetNewAssessmentObjects();

    if (attackPatternId !== '') {
      // Get attack pattern details
      this.store.dispatch(new LoadGroupCurrentAttackPattern(attackPatternId));
      // Get relationships for attack pattern, link to assessed objects
      this.dispatchOptionalRelationships(attackPatternId);
    }

    const assessedAps = this.getAttackPatternsByPhase(this.activePhase)
      .map((ap) => ap.attackPatternId);

    const s$ = this.appStore
      .select(getVisualizationData)
      .pipe(
        filter(() => this.activePhase !== undefined && this.activePhase.length > 0),
        switchMap(
          (visualizationData) => {
            // get all the phases across the frameworks
            const phases = Object.keys(visualizationData)
              .map((curFramework) => visualizationData[curFramework].phases)
              .reduce((acc, val) => acc.concat(val), []);
            // look for the currently viewed phase
            // TODO: there is potential to get the wrong phase if the phase id exists in two frameworks
            const curPhase = phases.filter((phase) => phase.id === this.activePhase)[0];
            return observableOf(curPhase.tactics);
          })
      )
      .subscribe(
        (tactics: Tactic[]) => {
          // Give tactics for this current phase
          //  Get unassessed and transform to attack patterns
          const unassessedAttackPatterns = tactics
            .filter((tactic) => !assessedAps.includes(tactic.id))
            .map((tactic) => Object.assign(new AttackPattern(), tactic))
            .sort(SortHelper.sortDescByField('name'));

          // if the current attack pattern is empty and we are entering an unassessed phase
          //  select the first unassessed attack pattern, this is kind of buried place to put this
          //  logic, but it was easiest to get to at the time
          if (!this.currentAttackPattern || !this.currentAttackPattern.id) {
            const assessedPhases = this.riskByAttackPattern.phases;
            const isAssessedPhase = assessedPhases.find((phase) => phase._id === this.activePhase) !== undefined;
            if (isAssessedPhase === false) {
              const firstUnassessedAttackPattern = unassessedAttackPatterns[0];
              this.currentAttackPattern = firstUnassessedAttackPattern;
            }
          }

          this.unassessedAttackPatterns = unassessedAttackPatterns;
          this.displayedAssessedObjects = [];
          // trigger change detection when finished
          // this.changeDetector.markForCheck();
          // this.changeDetector.detectChanges();

        },
        (err) => console.log(err));
    this.subscriptions.push(s$);

    this.updateUrlIfNeeded(this.rollupId, this.assessmentId, this.activePhase);
  }

  /**
   * @description non capability assessments need to fetch relationship objects
   *  to populate this components displayed object cards
   *  if the current assessment is not a capability,
   *  then this method will dispatch to fetch those relationships
   * @param attackPatternId 
   */
  public dispatchOptionalRelationships(attackPatternId: string): void {
    if (!attackPatternId) {
      return;
    }

    const assessmentType = this.assessment.determineAssessmentType();
    if (assessmentType !== AssessmentEvalTypeEnum.CAPABILITIES) {
      this.store.dispatch(new LoadGroupAttackPatternRelationships(attackPatternId));
    }
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
   * @description find the risk of the assessment object with the given id, otherwise -1
   * @param {string} stixId
   * @return {number} risk of the given assessment object
   */
  public getRisk(stixId: string): number {
    const defaultRisk = -1;
    if (!stixId) {
      return defaultRisk;
    }
    const assessObj = this.assessment.assessment_objects
      .filter((el) => el.stix !== undefined)
      .find((el) => el.stix.id === stixId);
    return assessObj && !Number.isNaN(assessObj.risk)
      ? assessObj.risk : defaultRisk;
  }

  /**
   * @description the questions of the assessment object with the given id, otherwise -1
   * @param {string} id
   * @return {AssessmentQuestion[]} questions
   */
  public getQuestions(id: string): AssessmentQuestion[] {
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
   * @param {DisplayedAssessmentObject} assessedObj
   */
  public editAssessedObject(assessedObj: DisplayedAssessmentObject): void {
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
      .find((el) => el.stix.id === assessedObj.stix.id);

    assObjToEdit.risk = assessedObj.risk;
    this.assessment.modified = new Date().toISOString();
    assessedObj.editActive = false;
    this.resetNewAssessmentObjects();
    // important, clear out displayed assessment objects, 
    //  so the observables can react and rebuild the scores and cards
    this.displayedAssessedObjects = undefined;
    this.store.dispatch(new UpdateAssessmentObject(this.assessment));
    // const s$ = this.assessService
    //   .genericPatch(`${Constance.X_UNFETTER_ASSESSMENT_URL}/${this.assessment.id}`, this.assessment)
    //   .subscribe(
    //     (assessmentRes) => {
    //       // refresh data
    //       this.resetNewAssessmentObjects();
    //       this.displayedAssessedObjects = undefined;
    //       // const currentAttackPatternIndex = this.attackPatternsByPhase
    //       // .findIndex((el) => el.attackPatternId === this.currentAttackPattern.id);
    //       // this.initData(indexOfCurAp);
    //       // this.loadDisplayedObjects(currentAttackPatternIndex);
    //       // assessedObj.editActive = false;
    //       // this.riskByAttackPatternChanged.emit(this.riskByAttackPattern);
    //       this.store.dispatch(new LoadGroupData(this.assessmentId));
    //     },
    //     (assessmentErr) => console.log(assessmentErr));

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

  /**
   * @description angular track by list function, 
   *  uses the items id iff (if and only if) it exists, 
   *  otherwise uses the index
   * @param {number} index
   * @param {item}
   * @return {number}
   */
  public trackByFn(index: number, item: any): number {
    return AngularHelper.genericTrackBy(index, item);
  }

}
