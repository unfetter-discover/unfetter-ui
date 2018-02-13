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
    modifyRoute: this.baseAssessUrl,
    createRoute: this.baseAssessUrl + '/create',
  };

  public assessmentsGroupingTotal: any; // TODO specify
  public assessmentsGroupingFiltered: any; // TODO specify
  public selectedRisk: number;
  public techniqueBreakdown: any; // TODO specify

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

  /**
   * @description
   *  initialize this component, fetching data from backend
   */
  public ngOnInit(): void {
    this.selectedRisk = 0.5;
    const idParamSub$ = this.route.params
      .pluck('rollupId')
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
  public requestData(rollupId: string, creatorId?: string): void {
    this.masterListOptions.dataSource = new SummaryDataSource(this.assessService, creatorId);
    this.masterListOptions.columns.id.classes = 'cursor-pointer';
    // TODO fix
    this.store.dispatch(new LoadSingleAssessmentSummaryData(rollupId));
    this.riskByAttackPatternStore.dispatch(new LoadSingleAssessmentRiskByAttackPatternData(rollupId));
    // TODO this.store.dispatch(new LoadAssessmentSummaryData(rollupId));
    this.store.dispatch(new LoadSingleRiskPerKillChainData(rollupId));
    // TODO this.store.dispatch(new LoadRiskPerKillChainData(rollupId));
    this.store.dispatch(new LoadSingleSummaryAggregationData(rollupId));
    // TODO this.store.dispatch(new LoadAssessmentSummaryData(rollupId));
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
    // // this.summary.assessment_objects = allAssessmentObjects; // Maybe??
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
    // // this.riskByAttack = allRiskByAttackObjects // Maybe??
    // this.summaryCalculationService.calculateWeakness(allRiskByAttackObjects);
  }

  public transformKCD() {
    // single
    this.summaryCalculationService.calculateTopRisks(this.riskByKillChain);
    // all
    // let allRiskByKillChains: Array<RiskByKillChain> = [];
    // for (let riskByKillChain of this.riskByKillChains) {
    //   allRiskByKillChains = allRiskByKillChainObjects.concat(riskByKillChain);
    // }
    // // this.riskByKillChain = allRiskByKillChains; // Maybe??
    // this.summaryCalculationService.calculateTopRisks(allRiskByKillChains);
  }

  public transformSAD() {
    // single
    this.summaryCalculationService.summaryAggregation = this.summaryAggregation;
    // all
    // let allSummaryAggregations: Array<SummaryAggregation> = [];
    // for (let eachSummaryAggregation of this.summaryAggregations) {
    //   allSummaryAggregations = allSummaryAggregations.concat(eachSummaryAggregation);
    // }
    // // this.summaryAggregation = allSummaryAggregations; // Maybe??
    // this.summaryCalculationService.setSummaryAggregation(allSummaryAggregations);
    this.populateAssessmentsGrouping();
    this.populateTechniqueBreakdown();
  }
  /**
   * @description
   *  populate kill chain grouping and assessment object tallies for assessment grouping chart
   * @returns {void}
   */
  public populateAssessmentsGrouping(): void {
    const includedIds = this.filterOnRisk();
    const killChainTotal = {};
    const killChainFiltered = {};

    const tally = (tallyObject: object) => {
      return (assessedObject) => {
        // flat map kill chain names
        const killChainNames = assessedObject.attackPatterns
          .reduce((memo, pattern) => memo.concat(pattern['kill_chain_phases']), []);
        const names: string[] = killChainNames.map((chain) => chain['phase_name'].toLowerCase() as string);
        const uniqNames: string[] = Array.from(new Set(names));
        names.forEach((name) => tallyObject[name] = tallyObject[name] ? tallyObject[name] + 1 : 1);
        return assessedObject;
      };
    };

    // Find assessed-objects to kill chain maps grouping
    this.summaryAggregation.attackPatternsByAssessedObject
      // tally totals
      .map(tally(killChainTotal))
      .filter((aoToApMap) => includedIds.includes(aoToApMap._id))
      // tally filtered objects
      .map(tally(killChainFiltered));

    this.assessmentsGroupingTotal = killChainTotal;
    this.assessmentsGroupingFiltered = killChainFiltered;
  }

  /**
 * @description
 *  Find IDs that meet risk threshold
 *  TODO should be <= risk or < risk?
 * @returns {string[]}
 */
  public filterOnRisk(): string[] {
    const includedIds: string[] = this.summary.assessment_objects // TODO fix...or active...or this is a roll-up?
      .filter((ao) => ao.risk <= this.selectedRisk)
      .map((ao) => ao.stix.id);
    return includedIds;
  }

  /**
 * @description
 *  populate grouping and assessment object tallies for technique by skill chart
 * @returns {void}
 */
  public populateTechniqueBreakdown(): void {
    // Total assessed objects to calculated risk
    const assessedRiskMapping = this.summaryAggregation.assessedAttackPatternCountBySophisicationLevel;
    const includedIds = this.filterOnRisk();
    const attackPatternSet = new Set();
    // Find assessed-objects-to-attack-patterns maps that meet those Ids
    this.summaryAggregation.attackPatternsByAssessedObject
      .filter((aoToApMap) => includedIds.includes(aoToApMap._id))
      .forEach((aoToApMap) => {
        aoToApMap.attackPatterns.forEach((ap) => {
          attackPatternSet.add(JSON.stringify(ap));
        });
      });

    const attackPatternSetMap = {};
    attackPatternSet.forEach((ap) => {
      const curAp = JSON.parse(ap);
      if (attackPatternSetMap[curAp['x_unfetter_sophistication_level']] === undefined) {
        attackPatternSetMap[curAp['x_unfetter_sophistication_level']] = 0;
      }
      ++attackPatternSetMap[curAp['x_unfetter_sophistication_level']];
    });

    this.techniqueBreakdown = {};
    for (const prop in Object.keys(assessedRiskMapping)) {
      if (attackPatternSetMap[prop] === undefined) {
        this.techniqueBreakdown[prop] = 0;
      } else {
        this.techniqueBreakdown[prop] = attackPatternSetMap[prop] / (assessedRiskMapping[prop]);
      }
    }
  }
}
