import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { SummaryState } from '../store/summary.reducers';
import { LoadAssessmentSummaryData } from '../store/summary.actions';

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
import { Constance } from '../../../utils/constance';

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
  finishedLoading = false;
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
    private userStore: Store<AppState>,
    private assessmentSummaryService: AssessmentSummaryService,
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
      .subscribe((done: boolean) => this.finishedLoading = done,
        (err) => console.log(err));

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

    this.subscriptions.push(sub1$, sub2$);
  }

  /**
   * @description
   * @param {string} creatorId - optional
   */
  public requestData(rollupId: string, creatorId?: string): void {
    this.masterListOptions.dataSource = new SummaryDataSource(this.assessmentSummaryService, creatorId);
    this.masterListOptions.columns.id.classes = 'cursor-pointer';
    this.store.dispatch(new LoadAssessmentSummaryData(rollupId));
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
          const sub$ = this.assessmentSummaryService
            .deleteByRollupId(assessment.rollupId)
            .subscribe(
              (resp) => {
                if (isCurrentlyViewed === true) {
                  // deleted currently viewed, route to next in last mod, or create page
                  this.router.navigate([Constance.X_UNFETTER_ASSESSMENT_NAVIGATE_URL]);
                } else {
                  this.masterListOptions.dataSource.nextDataChange(resp)
                }
              },
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
}
