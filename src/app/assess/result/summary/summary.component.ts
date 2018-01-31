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

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {

  assessmentName: Observable<string>;
  id: string;
  summaries: Assessment[];
  summary: Assessment;
  finishedLoading = false;
  masterListOptions = {
    dataSource: null,
    columns: new MasterListDialogTableHeaders('modified', 'Modified'),
    displayRoute: '/assess/result/summary',
    modifyRoute: '/assess',
    createRoute: '/assess/create',
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
    this.id = this.route.snapshot.params['id'] || '';


    const sub1$ = this.store
      .select('summary')
      .pluck('summaries')
      .distinctUntilChanged()
      .subscribe((arr: Assessment[]) => {
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

    const sub3$ = this.userStore
      .select('users')
      .pluck('userProfile')
      .take(1)
      .subscribe((user: UserProfile) => {
        const creatorId = user._id;
        this.masterListOptions.dataSource = new SummaryDataSource(this.assessmentSummaryService, creatorId);
        this.masterListOptions.columns.id.classes = 'cursor-pointer';
        this.store.dispatch(new LoadAssessmentSummaryData(this.id));
      },
      (err) => console.log(err));

    this.assessmentName = this.store
      .select('summary')
      .pluck('summaries')
      .distinctUntilChanged()
      .map((summaries: Assessment[]) => {
        return summaries[0].name;
      });

    this.subscriptions.push(sub1$, sub2$, sub3$);
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
   * @return {void}
   */
  public onCreate(event?: UIEvent): void {
    this.router.navigateByUrl(this.masterListOptions.createRoute);
  }

  /**
   * @description
   * @param {LastModifiedAssessment} assessment - optional
   * @return {void}
   */
  public onEdit(assessment: LastModifiedAssessment): void {
    this.router.navigateByUrl(this.masterListOptions.modifyRoute);
  }

  /**
   * @description noop
   * @return {void}
   */
  public onShare(event?: UIEvent): void {
    console.log('noop');
  }

  /**
   * @description loop thru all assessments related to the given rollupId - and delete them - ask for confirmation first
   * @param {LastModifiedAssessment} assessment
   * @return {void}
   */
  public onDelete(assessment: LastModifiedAssessment): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { attributes: assessment } });
    dialogRef.afterClosed().subscribe(
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
            (err) => console.log(err)
          );
        this.subscriptions.push(sub$);
      }
    );
  }

  /**
   * @description
   * @param {LastModifiedAssessment} assessment - optional
   * @return {void}
   */
  public onCellSelected(assessment: LastModifiedAssessment): void {
    if (!assessment || !assessment.rollupId) {
      return;
    }

    this.router.navigate([this.masterListOptions.displayRoute, assessment.rollupId]);
  }

  /**
   * @description noop
   * @return {void}
   */
  public onFilterTabChanged($event?: UIEvent): void {
    console.log('noop');
  }
}
