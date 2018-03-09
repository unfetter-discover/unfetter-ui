import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { SummaryState } from '../store/summary.reducers';
import { RiskByAttackPatternState } from '../store/riskbyattackpattern.reducers';
import { LoadAssessmentSummaryData, LoadSingleAssessmentSummaryData, LoadSingleRiskPerKillChainData, LoadSingleSummaryAggregationData } from '../store/summary.actions';

import { AppState } from '../../../root-store/app.reducers';
import { Assessment } from '../../../models/assess/assessment';
import { AssessService } from '../../services/assess.service';
import { ConfirmationDialogComponent } from '../../../components/dialogs/confirmation/confirmation-dialog.component';
import { MasterListDialogTableHeaders } from '../../../global/components/master-list-dialog/master-list-dialog.component';
import { LastModifiedAssessment } from '../../models/last-modified-assessment';
import { slideInOutAnimation } from '../../../global/animations/animations';
import { Constance } from '../../../utils/constance';
import { UserProfile } from '../../../models/user/user-profile';
import { SummaryDataSource } from './summary.datasource';
import { SummaryCalculationService } from './summary-calculation.service';
import { AssessmentObject } from '../../../models/assess/assessment-object';
import { AssessmentsDashboardService } from '../../../assessments/assessments-dashboard/assessments-dashboard.service';
import { RiskByAttack } from '../../../models/assess/risk-by-attack';
import { LoadAssessmentRiskByAttackPatternData, LoadSingleAssessmentRiskByAttackPatternData } from '../store/riskbyattackpattern.actions';
import { RiskByKillChain } from '../../../models/assess/risk-by-kill-chain';
import { SummaryAggregation } from '../../../models/assess/summary-aggregation';
import { CleanAssessmentResultData } from '../store/summary.actions';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  animations: [slideInOutAnimation],
})
export class SummaryComponent implements OnInit, OnDestroy {

  readonly baseAssessUrl = '/assess';
  assessmentName: Observable<string>;
  rollupId: string;
  assessmentId: string;
  summaries: Assessment[];
  summary: Assessment;
  riskByAttacks: RiskByAttack[];
  riskByAttack: RiskByAttack;
  riskByKillChains: RiskByKillChain[];
  riskByKillChain: RiskByKillChain;
  summaryAggregation: SummaryAggregation;
  summaryAggregations: SummaryAggregation[];
  finishedLoading = false;
  finishedLoadingRBAP = false;
  finishedLoadingKCD = false;
  finishedLoadingSAD = false;
  masterListOptions = {
    dataSource: null,
    columns: new MasterListDialogTableHeaders('modified', 'Modified'),
    displayRoute: this.baseAssessUrl + '/result/summary',
    modifyRoute: this.baseAssessUrl + '/wizard/edit',
    createRoute: this.baseAssessUrl + '/create',
  };

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<SummaryState>,
    private riskByAttackPatternStore: Store<RiskByAttackPatternState>,
    private userStore: Store<AppState>,
    private assessService: AssessService,
    private summaryCalculationService: SummaryCalculationService
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
      .distinctUntilChanged()
      .subscribe((params) => {
        this.rollupId = params.rollupId || '';
        this.assessmentId = params.assessmentId || '';
        this.listenForDataChanges();
        const sub$ = this.userStore
          .select('users')
          .pluck('userProfile')
          .take(1)
          .subscribe((user: UserProfile) => {
            const creatorId = user._id;
            const createdById = user.organizations[0].id;
            this.requestData(this.assessmentId, createdById);
          },
            (err) => console.log(err));
        this.subscriptions.push(sub$);
      },
        (err) => console.log(err),
        () => idParamSub$.unsubscribe());
  }

  /**
   * @description setup subscriptions and observables for data changes
   * @return {void}
   */
  public listenForDataChanges(): void {
    const sub1$ = this.store
      .select('summary')
      .pluck('summaries')
      .distinctUntilChanged()
      .filter((arr: Assessment[]) => arr && arr.length > 0)
      .subscribe((arr: Assessment[]) => {
        this.summaries = [...arr];
        this.summary = { ...arr[0] };
        this.riskByAttackPatternStore.dispatch(new LoadSingleAssessmentRiskByAttackPatternData(this.assessmentId));
        this.store.dispatch(new LoadSingleRiskPerKillChainData(this.assessmentId));
        this.store.dispatch(new LoadSingleSummaryAggregationData(this.assessmentId));
      },
        (err) => console.log(err));

    const sub2$ = this.store
      .select('summary')
      .pluck('finishedLoading')
      .distinctUntilChanged()
      .filter((el) => el === true)
      .subscribe((done: boolean) => {
        this.finishedLoading = done;
        if (this.summary === undefined) {
          this.setLoadingToDone();
        } else {
          this.transformSummary()
        }
      }, (err) => console.log(err));

    const sub3$ = this.riskByAttackPatternStore
      .select('riskByAttackPattern')
      .pluck('riskByAttackPatterns')
      .distinctUntilChanged()
      .subscribe((arr: RiskByAttack[]) => {
        if (!arr || arr.length === 0) {
          this.riskByAttack = undefined;
          this.riskByAttacks = [];
          return;
        }

        this.riskByAttacks = [...arr];
        this.riskByAttack = { ...arr[0] };
      },
        (err) => console.log(err));

    const sub4$ = this.riskByAttackPatternStore
      .select('riskByAttackPattern')
      .pluck('finishedLoading')
      .distinctUntilChanged()
      .subscribe((done: boolean) => {
        this.finishedLoadingRBAP = done;
        if (done) {
          this.transformRBAP();
        }
      },
        (err) => console.log(err));

    const sub5$ = this.store
      .select('summary')
      .pluck('killChainData')
      .distinctUntilChanged()
      .subscribe((arr: RiskByKillChain[]) => {
        if (!arr || arr.length === 0) {
          this.riskByKillChain = undefined;
          this.riskByKillChains = [];
          return;
        }

        this.riskByKillChain = { ...arr[0] };
        this.riskByKillChains = [...arr];
      })

    const sub6$ = this.store
      .select('summary')
      .pluck('finishedLoadingKillChainData')
      .distinctUntilChanged()
      .subscribe((done: boolean) => {
        this.finishedLoadingKCD = done;
        if (done) {
          this.transformKCD();
        }
      }, (err) => console.log(err));

    const sub7$ = this.store
      .select('summary')
      .pluck('summaryAggregations')
      .distinctUntilChanged()
      .subscribe((arr: SummaryAggregation[]) => {
        if (!arr || arr.length === 0) {
          this.summaryAggregation = undefined;
          this.summaryAggregations = [];
          return;
        }
        this.summaryAggregation = { ...arr[0] };
        this.summaryAggregations = [...arr];
      })

    const sub8$ = this.store
      .select('summary')
      .pluck('finishedLoadingSummaryAggregationData')
      .distinctUntilChanged()
      .subscribe((done: boolean) => {
        this.finishedLoadingSAD = done;
        if (done) {
          this.transformSAD();
        }
      }, (err) => console.log(err));

    this.assessmentName = this.store
      .select('summary')
      .pluck('summaries')
      .distinctUntilChanged()
      .map((summaries: Assessment[]) => {
        if (!summaries || summaries.length === 0) {
          return '';
        }
        return summaries[0].name;
      });

    this.subscriptions.push(sub1$, sub2$, sub3$, sub4$, sub5$, sub6$, sub7$, sub8$);
  }

  /**
   * @description
   * @param {string} creatorId - optional
   */
  public requestData(assessmentId: string, creatorId?: string): void {
    this.masterListOptions.dataSource = new SummaryDataSource(this.assessService, creatorId);
    this.masterListOptions.columns.id.classes = 'cursor-pointer';
    this.store.dispatch(new LoadSingleAssessmentSummaryData(assessmentId));
  }

  /**
   * @description close open subscriptions, clean up resources when we destroy this component
   * @return {void}
   */
  public ngOnDestroy(): void {
    this.cleanSubscriptions();
  }

  /**
   * @description for any subscriptions, unsubscribe and clean out the list
   */
  public cleanSubscriptions(): void {
    this.subscriptions
      .filter((el) => el !== undefined)
      .filter((el) => !el.closed)
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
    if (!event || (event instanceof UIEvent)) {
      return this.router.navigate([this.masterListOptions.modifyRoute, this.rollupId]);
    }
    return this.router.navigate([this.masterListOptions.modifyRoute, event.rollupId]);
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
    const id = this.rollupId;
    this.confirmDelete({ name: this.summary.name, rollupId: id });
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
      return;
    }

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
    let value = index;
    if (item && (item.id || item.id === 0)) {
      value = item.id || index;
    }
    return value
  }

  public transformSummary() {
    if (this.summary && this.summary.assessment_objects) {
      this.summaryCalculationService.setAverageRiskPerAssessedObject(this.summary.assessment_objects);
      if (this.summary.assessment_objects[0] && this.summary.assessment_objects[0].questions && this.summary.assessment_objects[0].questions[0]) {
        this.summaryCalculationService.calculateThresholdOptionNames(this.summary.assessment_objects[0].questions[0])
      }
    }
  }

  public transformRBAP() {
    this.summaryCalculationService.calculateWeakness(this.riskByAttack);
  }

  public transformKCD() {
    this.summaryCalculationService.calculateTopRisks(this.riskByKillChain);
  }

  /**
   * @description
   * @returns {void}
   */
  public transformSAD(): void {
    if (!this.summary) {
      return;
    }
    this.summaryCalculationService.summaryAggregation = this.summaryAggregation;
    if (this.summary) {
      this.summaryCalculationService.populateAssessmentsGrouping(this.summary.assessment_objects);
      this.summaryCalculationService.populateTechniqueBreakdown(this.summary.assessment_objects);
    }
  }

  /**
   * @description set all the flags to finsihd loadin
   * @returns {void}
   */
  public setLoadingToDone(): void {
    this.finishedLoadingKCD = true;
    this.finishedLoadingRBAP = true;
    this.finishedLoadingSAD = true;
    this.finishedLoading = true;
  }
}
