
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of as observableOf, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, pluck, take, tap } from 'rxjs/operators';
import { AssessmentEvalTypeEnum } from 'stix';
import { RiskByAttack } from 'stix/assess/v2/risk-by-attack';
import { SummaryAggregation } from 'stix/assess/v2/summary-aggregation';
import { Assessment } from 'stix/assess/v3/assessment';
import { RiskByKillChain } from 'stix/assess/v3/risk-by-kill-chain';
import { ConfirmationDialogComponent } from '../../../../components/dialogs/confirmation/confirmation-dialog.component';
import { slideInOutAnimation } from '../../../../global/animations/animations';
import { MasterListDialogTableHeaders } from '../../../../global/components/master-list-dialog/master-list-dialog.component';
import { AngularHelper } from '../../../../global/static/angular-helper';
import { UserProfile } from '../../../../models/user/user-profile';
import { AppState } from '../../../../root-store/app.reducers';
import { Constance } from '../../../../utils/constance';
import { LastModifiedAssessment } from '../../models/last-modified-assessment';
import { AssessService } from '../../services/assess.service';
import { getFailedToLoad } from '../../store/assess.selectors';
import { CleanAssessmentRiskByAttackPatternData, LoadSingleAssessmentRiskByAttackPatternData } from '../store/riskbyattackpattern.actions';
import { RiskByAttackPatternState } from '../store/riskbyattackpattern.reducers';
import { CleanAssessmentResultData, LoadSingleAssessmentSummaryData, LoadSingleRiskPerKillChainData, LoadSingleSummaryAggregationData } from '../store/summary.actions';
import { SummaryState } from '../store/summary.reducers';
import { getFinishedLoadingAssessment, getFinishedLoadingKillChainData, getFinishedLoadingSummaryAggregationData, getFullAssessmentName, getKillChainData, getSummary, getSummaryAggregationData } from '../store/summary.selectors';
import { SummaryCalculationService } from './summary-calculation.service';
import { SummaryDataSource } from './summary.datasource';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  animations: [slideInOutAnimation],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SummaryComponent implements OnInit, OnDestroy {

  readonly baseAssessUrl = '/assess-beta';

  assessmentName$: Observable<string>;
  refassessmentName: string;
  rollupId: string;
  assessmentId: string;
  summaries$: Observable<Assessment[]>;
  summary$: Observable<Assessment>;
  summary: Assessment;
  riskByAttack: RiskByAttack;
  riskByKillChain$: Observable<RiskByKillChain>;
  summaryAggregation$: Observable<SummaryAggregation>;
  failedToLoad$: Observable<boolean>;
  finishedLoadingAll$: Observable<boolean>;
  finishedLoadingAssessment$: Observable<boolean>;
  finishedLoadingRBAP = false;
  finishedLoadingKCD$: Observable<boolean>;
  finishedLoadingSAD$: Observable<boolean>;
  masterListOptions = {
    dataSource: null,
    columns: new MasterListDialogTableHeaders('modified', 'Modified'),
    displayRoute: this.baseAssessUrl + '/result/summary',
    modifyRoute: this.baseAssessUrl + '/wizard/edit',
    createRoute: this.baseAssessUrl + '/create',
  };

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private assessService: AssessService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private riskByAttackPatternStore: Store<RiskByAttackPatternState>,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<SummaryState>,
    private summaryCalculationService: SummaryCalculationService,
    private userStore: Store<AppState>,
  ) { }

  public getDialog(): MatDialog {
    return this.dialog;
  }

  // For testing only
  public getSummaryCalculationService(): SummaryCalculationService {
    return this.summaryCalculationService;
  }

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
        this.riskByAttack = undefined;
        const sub$ = this.userStore
          .select('users')
          .pipe(
            pluck('userProfile'),
            take(1)
          )
          .subscribe((user: UserProfile) => {
            this.requestData(this.assessmentId);
          },
            (err) => console.log(err));
        this.subscriptions.push(sub$);
        this.changeDetectorRef.detectChanges();
      },
        (err) => console.log(err));

    this.listenForDataChanges();
    this.subscriptions.push(idParamSub$);
  }

  public requestAncillaryDataLoad(assessment: Assessment): void {
    const id = this.assessmentId;
    const assessmentType = assessment.determineAssessmentType();
    if (assessmentType === AssessmentEvalTypeEnum.CAPABILITIES) {
      this.summaryCalculationService.isCapability = true;
    } else {
      this.summaryCalculationService.isCapability = false;
    }
    this.riskByAttackPatternStore.dispatch(new LoadSingleAssessmentRiskByAttackPatternData({ id: this.assessmentId, isCapability: this.summaryCalculationService.isCapability }));
    this.store.dispatch(new LoadSingleRiskPerKillChainData(this.assessmentId));
    this.store.dispatch(new LoadSingleSummaryAggregationData({ id: this.assessmentId, isCapability: this.summaryCalculationService.isCapability }));

  }

  /**
   * @description setup subscriptions and observables for data changes
   * @return {void}
   */
  public listenForDataChanges(): void {
    this.summary$ = this.store
      .select(getSummary)
      .pipe(
        distinctUntilChanged(),
        tap((summary) => {
          if (summary) {
            this.requestAncillaryDataLoad(summary);
            this.transformSummary(summary);
            this.summary = summary;
          }
        }),
    );

    this.finishedLoadingAll$ = this.store
      .select(getFinishedLoadingAssessment) // TODO Fix
      .pipe(distinctUntilChanged(),
        tap((finished) => console.log(`ALL ALL am i finished loading assessment? ${finished}`)));

    this.failedToLoad$ = this.store
      .select(getFailedToLoad)
      .pipe(distinctUntilChanged());

    this.riskByKillChain$ = this.store
      .select(getKillChainData)
      .pipe(
        distinctUntilChanged(),
        filter((el) => el !== undefined),
        tap((killChainData) => {
          console.log('kill chain data is here', killChainData);
          this.transformKCD(killChainData)
        })
      );

    const sX$ = this.riskByKillChain$
      .subscribe(
        () => console.log('subscribe to riskByKillChain fired'),
        (err) => console.log(err),
        () => sX$.unsubscribe()
      );

    this.summaryAggregation$ = this.store
      .select(getSummaryAggregationData)
      .pipe(distinctUntilChanged(),
        tap((summaryAggregationData) => this.transformSAD(summaryAggregationData)),
    );

    this.assessmentName$ = this.store
      .select(getFullAssessmentName)
      .pipe(
        distinctUntilChanged(),
        tap((name) => this.refassessmentName = name),
    );

    this.finishedLoadingAssessment$ = this.store
      .select(getFinishedLoadingAssessment)
      .pipe(distinctUntilChanged(),
        tap((finished) => console.log(`am i finished loading assessment? ${finished}`)));

    this.finishedLoadingKCD$ = this.store
      .select(getFinishedLoadingKillChainData)
      .pipe(distinctUntilChanged(),
        tap((finished) => console.log(`am i finished loading KCD? ${finished}`)));

    this.finishedLoadingSAD$ = this.store
      .select(getFinishedLoadingSummaryAggregationData)
      .pipe(distinctUntilChanged());

    const sub1$ = this.riskByAttackPatternStore
      .select('riskByAttackPattern')
      .pipe(
        pluck('riskByAttackPatterns'),
        distinctUntilChanged(),
        filter((arr: RiskByAttack[]) => arr && arr.length > 0)
      )
      .subscribe((arr: RiskByAttack[]) => {
        this.riskByAttack = { ...arr[0] };
      },
        (err) => console.log(err));

    const sub2$ = this.riskByAttackPatternStore
      .select('riskByAttackPattern')
      .pipe(
        pluck('finishedLoading'),
        distinctUntilChanged()
      )
      .subscribe((done: boolean) => {
        this.finishedLoadingRBAP = done;
        if (done) {
          this.transformRBAP();
        }
      },
        (err) => console.log(err));

    this.subscriptions.push(sub1$, sub2$);
  }

  /**
   * @description
   * @param {string} assessmentId
   */
  public requestData(assessmentId: string): void {
    const isSameAssessment = (row: any) => row && (row.id === this.assessmentId);
    this.masterListOptions.dataSource = new SummaryDataSource(this.assessService);
    this.masterListOptions.columns.id.classes =
      (row: any) => isSameAssessment(row) ? 'current-item' : 'cursor-pointer';
    this.masterListOptions.columns.id.selectable = (row: any) => !isSameAssessment(row);
    this.store.dispatch(new LoadSingleAssessmentSummaryData(assessmentId));
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
    this.riskByAttackPatternStore.dispatch(new CleanAssessmentRiskByAttackPatternData());
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
  public onDeleteCurrent(): void {
    const rollupId = this.rollupId;
    const name = this.refassessmentName;
    this.confirmDelete({ name, rollupId });
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
    if (!assessment || !assessment.name || !assessment.rollupId) {
      console.log('confirm delete requires a name and id');
      return;
    }

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
    this.store.dispatch(new CleanAssessmentResultData());
    this.riskByAttackPatternStore.dispatch(new CleanAssessmentRiskByAttackPatternData());
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
    return AngularHelper.genericTrackBy(index, item);
  }

  public transformSummary(summary: Assessment) {
    if (summary && summary.assessment_objects) {
      this.summaryCalculationService.setAverageRiskPerAssessedObject(summary.assessment_objects);
      if (summary.assessment_objects[0] && summary.assessment_objects[0].questions && summary.assessment_objects[0].questions[0]) {
        this.summaryCalculationService.calculateThresholdOptionNames(summary.assessment_objects[0].questions[0])
      }
    }
  }

  public transformRBAP() {
    this.summaryCalculationService.calculateWeakness(this.riskByAttack);
  }

  public transformKCD(riskByKillChain) {
    this.summaryCalculationService.calculateTopRisks(riskByKillChain);
  }

  /**
   * @description
   * @returns {void}
   */
  public transformSAD(summaryAggregation): void {
    this.summaryCalculationService.summaryAggregation = summaryAggregation;
    if (this.summary) {
      this.summaryCalculationService.populateAssessmentsGrouping(this.summary.assessment_objects);
      this.summaryCalculationService.populateTechniqueBreakdown(this.summary.assessment_objects);
    }
  }

  /**
   * @description set all the flags to finished loading
   * @returns {void}
   */
  public setLoadingToDone(): void {
    this.finishedLoadingKCD$ = observableOf(true);
    this.finishedLoadingRBAP = true;
    this.finishedLoadingSAD$ = observableOf(true);
    this.finishedLoadingAssessment$ = observableOf(true);
    this.finishedLoadingAll$ = observableOf(true);
  }
}
