
import {pluck,  catchError ,  distinctUntilChanged ,  filter ,  map ,  take } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable ,  Subscription } from 'rxjs';
import { RiskByAttack } from 'stix/assess/v2/risk-by-attack';
import { Assessment } from 'stix/assess/v3/assessment';
import { ConfirmationDialogComponent } from '../../../../components/dialogs/confirmation/confirmation-dialog.component';
import { MasterListDialogTableHeaders } from '../../../../global/components/master-list-dialog/master-list-dialog.component';
import { UserProfile } from '../../../../models/user/user-profile';
import { AppState } from '../../../../root-store/app.reducers';
import { Constance } from '../../../../utils/constance';
import { LastModifiedAssessment } from '../../models/last-modified-assessment';
import { AssessService } from '../../services/assess.service';
import { CleanAssessmentResultData, LoadAssessmentById } from '../store/full-result.actions';
import { FullAssessmentResultState } from '../store/full-result.reducers';
import { SummaryDataSource } from '../summary/summary.datasource';
import { FullAssessmentGroup } from './group/models/full-assessment-group';

@Component({
  selector: 'unf-assess-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullComponent implements OnInit, OnDestroy {

  public readonly baseAssessUrl = '/assess-beta';

  public activePhase: string;
  public assessment: Observable<Assessment>;
  public assessmentGroup: Observable<FullAssessmentGroup>;
  public assessmentId: string;
  public assessmentName: Observable<string>;
  public attackPatternId: string;
  public finishedLoading: Observable<boolean>;
  public phase: string;
  public riskBreakdown: any;
  public rollupId: string;
  public masterListOptions = {
    dataSource: null,
    columns: new MasterListDialogTableHeaders('modified', 'Modified'),
    displayRoute: this.baseAssessUrl + '/result/full',
    modifyRoute: this.baseAssessUrl + '/wizard/edit',
    createRoute: this.baseAssessUrl + '/create',
  };

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
      .pipe(distinctUntilChanged())
      .subscribe((params) => {
        this.rollupId = params.rollupId || '';
        this.assessmentId = params.assessmentId || '';
        this.phase = params.phase || '';
        this.attackPatternId = params.attackPatternId || '';
        const sub$ = this.userStore
          .select('users').pipe(
          pluck('userProfile'))
          .pipe(take(1))
          .subscribe((user: UserProfile) => {
            this.requestData(this.rollupId);
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

    this.assessment = this.store
      .select('fullAssessment').pipe(
      pluck<object, Assessment>('fullAssessment'))
      .pipe(distinctUntilChanged());

    this.finishedLoading = this.store
      .select('fullAssessment').pipe(
      pluck<Assessment, boolean>('finishedLoading'))
      .pipe(distinctUntilChanged());

    this.assessmentGroup = this.store
      .select('fullAssessment').pipe(
      pluck<object, FullAssessmentGroup>('group'))
      .pipe(distinctUntilChanged());

    const sub$ = this.store
      .select('fullAssessment').pipe(
      pluck('group'))
      .pipe(
        distinctUntilChanged(),
        filter((group: any) => group.finishedLoadingGroupData === true)
      )
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
      .select('fullAssessment').pipe(
      pluck<object, Assessment>('fullAssessment'))
      .pipe(
        distinctUntilChanged(),
        map((assessment: Assessment) => {
          const assessmentType = assessment.determineAssessmentType();
          return `${assessment.name} - ${assessmentType}`;
        }),
        catchError((err, caught) => {
          console.log(err);
          return caught;
        }),
    );

    this.subscriptions.push(sub$);
  }

  /**
   * @description
   * @param {string} rollupId
   */
  public requestData(rollupId: string): void {
    const isSameAssessment = (row: any) => row && (row.id === this.assessmentId);
    this.masterListOptions.dataSource = new SummaryDataSource(this.assessService);
    this.masterListOptions.columns.id.classes =
      (row: any) => isSameAssessment(row) ? 'current-item' : 'cursor-pointer';
    this.masterListOptions.columns.id.selectable = (row: any) => !isSameAssessment(row);
    this.store.dispatch(new LoadAssessmentById(this.assessmentId));
  }

  /**
   * @description close open subscriptions, clean up resources when we destroy this component
   * @return {void}
   */
  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
      routePromise = this.router.navigate([this.masterListOptions.modifyRoute, this.rollupId]);
    } else {
      routePromise = this.router.navigate([this.masterListOptions.modifyRoute, event.rollupId]);
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
  public onDeleteCurrent(assessment: LastModifiedAssessment): void {
    const id = this.rollupId;
    this.confirmDelete({ name: assessment.name, rollupId: id });
  }

  /**
   * @description clicked master list cell, confirm delete
   * @param {LastModifiedAssessment} assessment
   * @return {void}
   */
  public onDelete(assessment: LastModifiedAssessment): void {
    this.confirmDelete({ name: assessment.name, rollupId: assessment.rollupId });
  }

  /**
   * @description confirmation to delete
   *  loop thru all assessments related to the given rollupId - and delete them
   * @param {LastModifiedAssessment} assessment
   * @return {void}
   */
  public confirmDelete(assessment: { name: string, rollupId: string }): void {
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

          const isCurrentlyViewed = assessment.rollupId === this.rollupId ? true : false;
          const sub$ = this.assessService
            .deleteByRollupId(assessment.rollupId)
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
   * @param {LastModifiedAssessment} assessment - optional
   * @return {Promise<boolean>}
   */
  public onCellSelected(assessment: LastModifiedAssessment): Promise<boolean> {
    if (!assessment || !assessment.rollupId || !assessment.id) {
      return Promise.resolve(false);
    }

    // this.activePhase = undefined;
    // this.rollupId = undefined;
    // this.assessment = undefined;
    // this.assessmentTypes = undefined;
    // this.attackPatternId = undefined;
    this.store.dispatch(new CleanAssessmentResultData());
    return this.router.navigate([this.masterListOptions.displayRoute, assessment.rollupId, assessment.id]);
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

  /**
   * @param  {RiskByAttack} riskByAttackPattern
   * @returns void
   */
  public calculateRiskBreakdown(riskByAttackPattern: RiskByAttack): void {
    if (!riskByAttackPattern || !Object.keys(riskByAttackPattern).length) {
      return;
    }

    const phases = riskByAttackPattern.phases;
    const assessedByAttackPattern = riskByAttackPattern.assessedByAttackPattern;

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

  /**
   * @param  {any} phase?
   * @returns number
   */
  public populatePhaseRiskTree(phase?: any): { [key: string]: number[] } {
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

  /**
   * @param  {any} phaseRiskTree
   * @param  {Set<string>} questions
   * @returns number
   */
  public calculateRiskBreakdownByQuestionForPhase(phaseRiskTree: any, questions: Set<string>): { [key: string]: number } {
    const riskBreakdownPhase = {};
    if (questions !== undefined && phaseRiskTree !== undefined) {
      for (let question in phaseRiskTree) {
        questions.add(question);
        // Average risk for each question-category,
        //  then multiply it by 1 / the number of question-categories.
        //  This will show how much each question contributes to absolute overall risk
        riskBreakdownPhase[question] = (phaseRiskTree[question].reduce((prev, cur) => prev += cur, 0)
          / phaseRiskTree[question].length) * (1 / Object.keys(phaseRiskTree).length);
      }
    }
    return riskBreakdownPhase;
  }
}
