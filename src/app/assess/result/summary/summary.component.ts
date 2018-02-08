import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { SummaryState } from '../store/summary.reducers';
import { RiskByAttackPatternState } from '../store/riskbyattackpattern.reducers';
import { LoadAssessmentSummaryData, LoadSingleAssessmentSummaryData, LoadSingleRiskPerKillChainData } from '../store/summary.actions';

import { AppState } from '../../../root-store/app.reducers';
import { Assessment } from '../../../models/assess/assessment';
import { MasterListDialogTableHeaders } from '../../../global/components/master-list-dialog/master-list-dialog.component';
import { AssessmentSummaryService } from '../../services/assessment-summary.service';
import { SummaryDataSource } from './summary.datasource';
import { UserProfile } from '../../../models/user/user-profile';
import { LastModifiedAssessment } from '../../models/last-modified-assessment';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../../components/dialogs/confirmation/confirmation-dialog.component';
import { slideInOutAnimation } from '../../../global/animations/animations';
import { SummaryCalculationService } from './summary-calculation.service';
import { AssessmentObject } from '../../../models/assess/assessment-object';
import { AssessmentsDashboardService } from '../../../assessments/assessments-dashboard/assessments-dashboard.service';
import { RiskByAttack } from '../../../models/assess/risk-by-attack';
import { LoadAssessmentRiskByAttackPatternData, LoadSingleAssessmentRiskByAttackPatternData } from '../store/riskbyattackpattern.actions';
import { RiskByKillChain } from '../../../models/assess/risk-by-kill-chain';

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
  summaries: Assessment[];
  summary: Assessment;
  riskByAttacks: RiskByAttack[];
  riskByAttack: RiskByAttack;
  riskByKillChains: RiskByKillChain[];
  riskByKillChain: RiskByKillChain;
  finishedLoading = false;
  finishedLoadingRBAP = false;
  finishedLoadingKCD = false;
  masterListOptions = {
    dataSource: null,
    columns: new MasterListDialogTableHeaders('modified', 'Modified'),
    displayRoute: this.baseAssessUrl + '/result/summary',
    modifyRoute: this.baseAssessUrl,
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
    private assessmentSummaryService: AssessmentSummaryService,
    private summaryCalculationService: SummaryCalculationService
  ) { }

  /**
   * @description
   *  initialize this component, fetching data from backend
   */
  public ngOnInit(): void {
    const idParamSub$ = this.route.params
      .pluck('id')
      .subscribe((id: string) => {
        this.rollupId = id || '';
        this.listenForDataChanges();
        const sub$ = this.userStore
          .select('users')
          .pluck('userProfile')
          .take(1)
          .subscribe((user: UserProfile) => {
            const creatorId = user._id;
            this.requestData(this.rollupId, creatorId);
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
      .subscribe((arr: Assessment[]) => {
        if (!arr || arr.length === 0) {
          this.summary = undefined;
          this.summaries = [];
          return;
        }

        this.summaries = [...arr];
        this.summary = { ...arr[0] };
      },
      (err) => console.log(err));

    const sub2$ = this.store
      .select('summary')
      .pluck('finishedLoading')
      .distinctUntilChanged()
      .subscribe((done: boolean) => {
        this.finishedLoading = done;
        if (done) {
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

    this.subscriptions.push(sub1$, sub2$, sub3$, sub4$, sub5$, sub6$);
  }

  /**
   * @description
   * @param {string} creatorId - optional
   */
  public requestData(rollupId: string, creatorId?: string): void {
    this.masterListOptions.dataSource = new SummaryDataSource(this.assessmentSummaryService, creatorId);
    this.masterListOptions.columns.id.classes = 'cursor-pointer';
    // TODO fix
    this.store.dispatch(new LoadSingleAssessmentSummaryData(rollupId));
    this.riskByAttackPatternStore.dispatch(new LoadSingleAssessmentRiskByAttackPatternData(rollupId));
    // TODO this.store.dispatch(new LoadAssessmentSummaryData(rollupId));
    this.store.dispatch(new LoadSingleRiskPerKillChainData(rollupId));
    // TODO this.store.dispatch(new LoadRiskPerKillChainData(rollupId))
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
   * @param {LastModifiedAssessment} assessment - optional
   * @return {Promise<boolean>}
   */
  public onEdit(assessment: LastModifiedAssessment): Promise<boolean> {
    return this.router.navigateByUrl(this.masterListOptions.modifyRoute);
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

        const sub$ = this.assessmentSummaryService
          .deleteByRollupId(assessment.rollupId)
          .subscribe(
          (resp) => this.masterListOptions.dataSource.nextDataChange(resp),
          (err) => console.log(err),
          () => {
            if (sub$) {
              sub$.unsubscribe();
            }

            // we deleted the current assessment
            if (this.rollupId === assessment.rollupId) {
              return this.router.navigateByUrl(this.baseAssessUrl + '/navigate');
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
    if (!assessment || !assessment.rollupId) {
      return;
    }

    return this.router.navigate([this.masterListOptions.displayRoute, assessment.rollupId]);
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

  public transformSummary() {
    // single
    this.summaryCalculationService.setAverageRiskPerAssessedObject(this.summary.assessment_objects);
    // all
    // let allAssessmentObjects: Array<AssessmentObject> = []; 
    // for (let assessment of this.summaries) {
    //   allAssessmentObjects = allAssessmentObjects.concat(assessment.assessment_objects);
    // }
    // this.summaryCalculationService.setAverageRiskPerAssessedObject(allAssessmentObjects);
  }

  public transformRBAP() {
    // single
    this.summaryCalculationService.calculateWeakness(this.riskByAttack);
    // all
    // let allRiskByAttackObjects: Array<RiskByAttack> = [];
    // for (let riskByAttack of this.riskByAttacks) {
    //   allRiskByAttackObjects = allRiskByAttackObjects.concat(riskByAttack);
    // }
    // this.summaryCalculationService.calculateWeakness(allRiskByAttackObjects);
  }

  public transformKCD() {
    // single
    this.summaryCalculationService.calculateTopRisks(this.riskByKillChain);
    // all
    // let allRiskByKillChainObjects: Array<RiskByKillChain> = [];
    // for (let riskByKillChain of this.riskByKillChains) {
    //   allRiskByKillChainObjects = allRiskByKillChainObjects.concat(riskByKillChain);
    // }
  }
}
