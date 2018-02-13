import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../../../root-store/app.reducers';
import { Assessment } from '../../../models/assess/assessment';
import { AssessService } from '../../services/assess.service';
import { ConfirmationDialogComponent } from '../../../components/dialogs/confirmation/confirmation-dialog.component';
import { LastModifiedAssessment } from '../../models/last-modified-assessment';
import { LoadAssessmentResultData } from '../store/full-result.actions';
import { MasterListDialogTableHeaders } from '../../../global/components/master-list-dialog/master-list-dialog.component';
import { SummaryDataSource } from '../summary/summary.datasource';
import { UserProfile } from '../../../models/user/user-profile';
import { FullAssessmentResultState } from '../store/full-result.reducers';
import { AssessedByAttackPattern } from './group/models/assessed-by-attack-pattern';
import { GroupAttackPattern } from './group/models/group-attack-pattern';
import { GroupPhase } from './group/models/group-phase';
import { Constance } from '../../../utils/constance';

@Component({
  selector: 'unf-assess-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit, OnDestroy {

  readonly baseAssessUrl = '/assess';
  assessmentTypes: Assessment[];
  assessment: Assessment;
  assessmentName: Observable<string>;
  rollupId: string;
  finishedLoading = false;
  masterListOptions = {
    dataSource: null,
    columns: new MasterListDialogTableHeaders('modified', 'Modified'),
    displayRoute: this.baseAssessUrl + '/result/summary',
    modifyRoute: this.baseAssessUrl,
    createRoute: this.baseAssessUrl + '/create',
  };
  activePhase: string;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<FullAssessmentResultState>,
    private userStore: Store<AppState>,
    private assessService: AssessService,
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
      .select('fullAssessment')
      .pluck('assessmentTypes')
      .distinctUntilChanged()
      .subscribe((arr: Assessment[]) => {
        if (!arr || arr.length === 0) {
          this.assessment = undefined;
          this.assessmentTypes = [];
          return;
        }

        this.assessmentTypes = [...arr];
        this.assessment = { ...arr[0] };
      },
        (err) => console.log(err));

    const sub2$ = this.store
      .select('fullAssessment')
      .pluck('finishedLoading')
      .distinctUntilChanged()
      .subscribe((done: boolean) => this.finishedLoading = done,
        (err) => console.log(err));

    this.assessmentName = this.store
      .select('fullAssessment')
      .pluck('assessmentTypes')
      .distinctUntilChanged()
      .map((arr: Assessment[]) => {
        if (!arr || arr.length === 0) {
          return '';
        }
        return arr[0].name;
      });

    this.subscriptions.push(sub1$, sub2$);
  }

  /**
   * @description
   * @param {string} creatorId - optional
   */
  public requestData(rollupId: string, creatorId?: string): void {
    this.masterListOptions.dataSource = new SummaryDataSource(this.assessService, creatorId);
    this.masterListOptions.columns.id.classes = 'cursor-pointer';
    this.store.dispatch(new LoadAssessmentResultData(rollupId));
  }

  /**
   * @description close open subscriptions, clean up resources when we destroy this component
   * @return {void}
   */
  public ngOnDestroy(): void {
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
    this.confirmDelete({ name: this.assessment.name, rollupId: id });
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

  /**
   * @description the child component assessments group contains the current phase, capture a change to phases
   *  so we can highlight the currently selected
   * @param {string} event optional
   * @return {void}
   */
  public onPhaseChanged(event?: string): void {
    if (!event) {
      return;
    }

    this.activePhase = event;
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
}
