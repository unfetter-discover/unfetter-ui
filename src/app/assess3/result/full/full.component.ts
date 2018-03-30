import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../../../root-store/app.reducers';
import { Assessment3 } from '../../../models/assess/assessment3';
import { AssessService } from '../../services/assess.service';
import { ConfirmationDialogComponent } from '../../../components/dialogs/confirmation/confirmation-dialog.component';
import { LastModifiedAssessment3 } from '../../models/last-modified-assessment3';
import { LoadAssessmentResultData, CleanAssessmentResultData } from '../store/full-result.actions';
import { MasterListDialogTableHeaders } from '../../../global/components/master-list-dialog/master-list-dialog.component';
import { SummaryDataSource } from '../summary/summary.datasource';
import { UserProfile } from '../../../models/user/user-profile';
import { FullAssessmentResultState } from '../store/full-result.reducers';
import { Assessed3ByAttackPattern } from './group/models/assessed3-by-attack-pattern';
import { Constance } from '../../../utils/constance';
import { RiskByAttackPattern } from './group/models/risk-by-attack-pattern';
import { RiskByAttack3 } from '../../../models/assess/risk-by-attack3';
import { FullAssessmentGroup } from './group/models/full-assessment-group';

@Component({
  selector: 'unf-assess-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullComponent implements OnInit, OnDestroy {

  readonly baseAssessUrl = '/assess';
  assessmentTypes: Observable<Assessment3[]>;
  assessment: Observable<Assessment3>;
  assessmentName: Observable<string>;
  assessmentGroup: Observable<FullAssessmentGroup>;
  assessmentId: string;
  phase: string;
  attackPatternId: string;
  finishedLoading: Observable<boolean>;
  masterListOptions = {
    dataSource: null,
    columns: new MasterListDialogTableHeaders('modified', 'Modified'),
    displayRoute: this.baseAssessUrl + '/result/full',
    modifyRoute: this.baseAssessUrl + '/wizard/edit',
    createRoute: this.baseAssessUrl + '/create',
  };
  activePhase: string;
  public riskBreakdown: any;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<FullAssessmentResultState>,
    private userStore: Store<AppState>,
    private assessService: AssessService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  /**
   * @description
   *  initialize this component, fetching data from backend
   */
  public ngOnInit(): void {
    const idParamSub$ = this.route.params
      .distinctUntilChanged()
      .subscribe((params) => {
        this.assessmentId = params.assessmentId || '';
        this.phase = params.phase || '';
        this.attackPatternId = params.attackPatternId || '';
        const sub$ = this.userStore
          .select('users')
          .pluck('userProfile')
          .take(1)
          .subscribe((user: UserProfile) => {
            // const creatorId = user._id;
            const createdById = user.organizations[0].id;
            this.requestData(this.assessmentId, createdById);
          },
            (err) => console.log(err));
        this.subscriptions.push(sub$);
      },
        (err) => console.log(err));

    this.listenForDataChanges();
    this.subscriptions.push(idParamSub$);
  }

  /**
   * @description setup subscriptions and observables for data changes
   * @return {void}
   */
  public listenForDataChanges(): void {

    this.assessmentTypes = this.store
      .select('fullAssessment')
      .pluck<object, Assessment3[]>('assessmentTypes')
      .distinctUntilChanged()
      .filter((arr) => arr && arr.length > 0);

    this.assessment = this.store
      .select('fullAssessment')
      .pluck<object, Assessment3[]>('assessmentTypes')
      .distinctUntilChanged()
      .filter((arr) => arr && arr.length > 0)
      .map((arr) => arr[0]);

    this.finishedLoading = this.store
      .select('fullAssessment')
      .pluck<Assessment3, boolean>('finishedLoading')
      .distinctUntilChanged();

    this.assessmentGroup = this.store
      .select('fullAssessment')
      .pluck<object, FullAssessmentGroup>('group')
      .distinctUntilChanged();

    const sub$ = this.store
      .select('fullAssessment')
      .pluck('group')
      .distinctUntilChanged()
      .filter((group: any) => group.finishedLoadingGroupData === true)
      .subscribe(
        (group: any) => {
          const riskByAttackPattern = group.riskByAttackPattern || {};
          // active phase is either the current active phase, 
          let activePhase = this.activePhase;
          if (!activePhase && riskByAttackPattern && riskByAttackPattern.phases.length > 0) {
            //  the first assess attack pattern, 
            activePhase = riskByAttackPattern.phases[0]._id;
          }
          this.activePhase = activePhase;
          this.changeDetectorRef.markForCheck();
        },
        (err) => console.log(err));

    this.assessmentName = this.store
      .select('fullAssessment')
      .pluck<object, Assessment3[]>('assessmentTypes')
      .filter((arr) => arr && arr.length > 0)
      .distinctUntilChanged()
      .map((arr: Assessment3[]) => {
        if (arr[0].assessment_objects && arr[0].assessment_objects.length) {
          let retVal = arr[0].name + ' - ';
          const assessedType = arr[0].assessment_objects[0].stix.type;
          switch (assessedType) {
            case 'course-of-action':
              retVal += 'Mitigations';
              break;
            case 'indicator':
              retVal += 'Indicators';
              break;
            case 'x-unfetter-sensor':
              retVal += 'Sensors';
              break;
            case Constance.X_UNFETTER_CAPABILITY_TYPE:
              retVal += 'Capability';
              break;
          }
          return retVal;
        } else {
          return arr[0].name;
        }
      });

    this.subscriptions.push(sub$);
  }

  /**
   * @description
   * @param {string} creatorId - optional
   */
  public requestData(assessmentId: string, creatorId?: string): void {
    const isSameAssessment = (row: any) => row && (row.id === this.assessmentId);
    this.masterListOptions.dataSource = new SummaryDataSource(this.assessService, creatorId);
    this.masterListOptions.columns.id.classes =
      (row: any) => isSameAssessment(row) ? 'current-item' : 'cursor-pointer';
    this.masterListOptions.columns.id.selectable = (row: any) => !isSameAssessment(row);
    this.store.dispatch(new LoadAssessmentResultData(assessmentId));
  }

  /**
   * @description close open subscriptions, clean up resources when we destroy this component
   * @return {void}
   */
  public ngOnDestroy(): void {
    this.subscriptions
      .filter((el) => el !== undefined)
      .forEach((sub) => sub.unsubscribe());
    this.store.dispatch(new CleanAssessmentResultData());
  }

  /**
   * @description router to the create page
   * @param {event} UIEvent - optional 
   * @return {Promise<boolean>}
   */
  public onCreate(event?: UIEvent): Promise<boolean> {
    return this.router.navigateByUrl(this.masterListOptions.createRoute);
  }

  /**
   * @description
   * @return {Promise<boolean>}
   */
  public onEdit(event?: any): Promise<boolean> {
    let routePromise: Promise<boolean>;
    if (!event || (event instanceof UIEvent)) {
      routePromise = this.router.navigate([this.masterListOptions.modifyRoute, this.assessmentId]);
    } else {
      routePromise = this.router.navigate([this.masterListOptions.modifyRoute, event.assessmentId]);
    }

    routePromise.catch((e) => console.log(e));
    return routePromise;
  }

  /**
   * @description noop
   * @return {Promise<boolean>}
   */
  public onShare(event?: UIEvent): Promise<boolean> {
    console.log('noop');
    return Promise.resolve(false);
  }

  /**
   * @description clicked currently viewed assessment, confirm delete
   * @return {void}
   */
  public onDeleteCurrent(assessment: LastModifiedAssessment3): void {
    const id = this.assessmentId;
    this.confirmDelete({ name: assessment.name, assessmentId: id });
  }

  /**
   * @description clicked master list cell, confirm delete
   * @param {LastModifiedAssessment3} assessment
   * @return {void}
   */
  public onDelete(assessment: LastModifiedAssessment3): void {
    this.confirmDelete({ name: assessment.name, assessmentId: assessment.assessmentId });
  }

  /**
   * @description confirmation to delete
   *  loop thru all assessments related to the given assessmentId - and delete them
   * @param {LastModifiedAssessment3} assessment
   * @return {void}
   */
  public confirmDelete(assessment: { name: string, assessmentId: string }): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { attributes: assessment } });
    const dialogSub$ = dialogRef.afterClosed()
      .subscribe(
        (result) => {
          const isBool = typeof result === 'boolean';
          const isString = typeof result === 'string';
          if (!result ||
            (isBool && result !== true) ||
            (isString && result !== 'true')) {
            return;
          }

          const isCurrentlyViewed = assessment.assessmentId === this.assessmentId ? true : false;
          const sub$ = this.assessService
            .delete(assessment.assessmentId)
            .subscribe(
              (resp) => this.masterListOptions.dataSource.nextDataChange(resp),
              (err) => console.log(err),
              () => {
                if (sub$) {
                  sub$.unsubscribe();
                }

                // we deleted the current assessment
                if (isCurrentlyViewed) {
                  return this.router.navigate([Constance.X_UNFETTER_ASSESSMENT_NAVIGATE_URL]);
                }
              });
        },
        (err) => console.log(err),
        () => dialogSub$.unsubscribe());
  }

  /**
   * @description
   * @param {LastModifiedAssessment3} assessment - optional
   * @return {Promise<boolean>}
   */
  public onCellSelected(assessment: LastModifiedAssessment3): Promise<boolean> {
    if (!assessment || !assessment.assessmentId || (this.assessmentId === assessment.id)) {
      return;
    }

    // this.activePhase = undefined;
    // this.assessmentId = undefined;
    // this.assessment = undefined;
    // this.assessmentTypes = undefined;
    // this.attackPatternId = undefined;
    this.store.dispatch(new CleanAssessmentResultData());
    return this.router.navigate([this.masterListOptions.displayRoute, assessment.id]);
  }

  /**
   * @description noop
   * @return {Promise<boolean>}
   */
  public onFilterTabChanged($event?: UIEvent): Promise<boolean> {
    console.log('noop');
    return Promise.resolve(false);
  }

  /**
   * @description angular track by list function, uses the items id if
   *  it exists, otherwise uses the index
   * @param {number} index
   * @param {item}
   * @return {number}
   */
  public trackByFn(index: number, item: any): number {
    return item.id || index;
  }

  /**
   * @description determines if this components current phase is the same as the given phase
   *  Used to highlight the selected phase
   * @param {string} phase
   * @return {boolean} true if the given phase is selected
   */
  public isCurrentPhase(phase = ''): boolean {
    return this.activePhase ? this.activePhase === phase : false;
  }

  public calculateRiskBreakdown(riskByAttackPattern: RiskByAttack3) {

    if (!riskByAttackPattern || !Object.keys(riskByAttackPattern).length) {
      return;
    }

    const phases = riskByAttackPattern.phases;
    const assessedByAttackPattern = riskByAttackPattern.assessed3ByAttackPattern;

    const riskTree = {};

    if (phases !== undefined && assessedByAttackPattern !== undefined) {

      // Group data by kill chain phase, then question => set value array of risk values
      phases.forEach((phase) => {
        riskTree[phase._id] = this.populatePhaseRiskTree(phase);
      });

      // Calculate average risk per question
      // TODO delete this
      const questionSet: any = new Set();
      this.riskBreakdown = {};
      for (let phase in riskTree) {
        this.riskBreakdown[phase] = this.calculateRiskBreakdownByQuestionForPhase(riskTree[phase], questionSet);
      }
    }

  }

  public populatePhaseRiskTree(phase: any) {
    const riskTree = {};

    // Assessed Objects per phase
    if (phase !== undefined && phase.assessedObjects !== undefined) {
      phase.assessedObjects.forEach((assessedObject) => {
        // Questions per assessed object
        if (assessedObject.questions !== undefined) {
          assessedObject.questions.forEach((question) => {
            if (riskTree[question.name] === undefined) {
              riskTree[question.name] = [];
            }
            riskTree[question.name].push(question.risk);
          });
        }
      });
    }
    return riskTree;
  }

  public calculateRiskBreakdownByQuestionForPhase(phaseRiskTree: any, questions: Set<string>) {
    const riskBreakdownPhase = {};
    if (questions !== undefined && phaseRiskTree !== undefined) {
      for (let question in phaseRiskTree) {
        questions.add(question);
        /* Average risk for each question-category,
        then multiply it by 1 / the number of question-categories.
        This will show how much each question contributes to absolute overall risk. */
        riskBreakdownPhase[question] = (phaseRiskTree[question]
          .reduce((prev, cur) => prev += cur, 0)
          / phaseRiskTree[question].length) * (1 / Object.keys(phaseRiskTree).length);
      }
    }
    return riskBreakdownPhase;
  }
}
