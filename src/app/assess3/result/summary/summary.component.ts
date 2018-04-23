import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { LoadAssessmentSummaryData, LoadSingleAssessmentSummaryData, LoadSingleSummaryAggregationData } from '../store/summary.actions';

import { SummaryState } from '../store/summary.reducers';
import { AppState } from '../../../root-store/app.reducers';
import { Assessment3 } from '../../../models/assess/assessment3';
import { AssessService } from '../../services/assess.service';
import { ConfirmationDialogComponent } from '../../../components/dialogs/confirmation/confirmation-dialog.component';
import { MasterListDialogTableHeaders } from '../../../global/components/master-list-dialog/master-list-dialog.component';
import { LastModifiedAssessment3 } from '../../models/last-modified-assessment3';
import { slideInOutAnimation } from '../../../global/animations/animations';
import { Constance } from '../../../utils/constance';
import { UserProfile } from '../../../models/user/user-profile';
import { SummaryDataSource } from './summary.datasource';
import { Assessment3Object } from '../../../models/assess/assessment3-object';
import { CleanAssessmentResultData } from '../store/summary.actions';
import { Capability } from '../../../models/unfetter/capability';
import { Identity } from 'stix';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  animations: [slideInOutAnimation],
})
export class SummaryComponent implements OnInit, OnDestroy {

  readonly baseAssessUrl = '/assess3';
  assessmentName: Observable<string>;
  assessmentId: string;
  summaries: Assessment3[];
  summary: Assessment3;
  finishedLoading = false;
  private identities: Identity[];

  masterListOptions = {
    dataSource: null,
    columns: new MasterListDialogTableHeaders('modified', 'Date Modified')
        .addColumn('capabilities', '# of Capabilities', 'master-list-capabilities', false, (value) => value || '0')
        .addColumn('created_by_ref', 'Organization', 'master-list-organization', false, (value) => {
          let author: Identity = null;
          if (value) {
            author = this.identities.find(id => id.id === value)
          }
          return author ? author.name : 'Unknown';
        })
        .addColumn('framework', 'Type', 'master-list-extra', false, (value) => value || 'ATT&CK')
        .addColumn('industry', 'Industry', 'master-list-extra', false, (value) => value || 'Local')
        .addColumn('published', 'Status', 'master-list-extra', false, (published) => published ? 'Public' : 'Draft')
        ,
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
    private userStore: Store<AppState>,
    private assessService: AssessService,
    private usersService: UsersService,
  ) { }

  public getDialog(): MatDialog {
    return this.dialog;
  }

  /**
   * @description
   *  initialize this component, fetching data from backend
   */
  public ngOnInit(): void {
    const idParamSub$ = this.route.params
      .distinctUntilChanged()
      .subscribe((params) => {
        this.assessmentId = params.assessmentId || '';
        this.summary = undefined;
        this.summaries = undefined;
        this.finishedLoading = false;
        this.store.dispatch(new CleanAssessmentResultData());
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
      (err) => console.log(err));

    const subIdentitie$ = this.userStore
      .select('identities')
      .pluck('identities')
      .finally(() => subIdentitie$ && subIdentitie$.unsubscribe())
      .subscribe(
        (identities: Identity[]) => this.identities = identities,
        (error) => console.log(`(${new Date().toISOString()}) error retrieving identities from app store`, error)
      );

    this.listenForDataChanges();

    this.subscriptions.push(idParamSub$);
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
      .filter((arr: Assessment3[]) => arr && arr.length > 0)
      .subscribe((arr: Assessment3[]) => {
        this.summaries = [...arr];
        this.summary = { ...arr[0] };
      },
        (err) => console.log(err));

    const sub2$ = this.store
      .select('summary')
      .pluck('finishedLoading')
      .distinctUntilChanged()
      .filter((el) => el === true)
      .subscribe((done: boolean) => {
        if (this.summary === undefined) {
          // fetching the summary failed, set all flags to done
          this.setLoadingToDone();
          return;
        }
        this.finishedLoading = done;
        // this.transformSummary()
      }, (err) => console.log(err));

    const sub8$ = this.store
      .select('summary')
      .pluck('finishedLoadingSummaryAggregationData')
      .distinctUntilChanged()
      .subscribe((done: boolean) => {
        // this.finishedLoadingSAD = done;
        // if (done) {
        //   this.transformSAD();
        // }
      }, (err) => console.log(err));

    this.assessmentName = this.store
      .select('summary')
      .pluck('summaries')
      .distinctUntilChanged()
      .map((summaries: Assessment3[]) => {
        if (!summaries || summaries.length === 0) {
          return '';
        }
        if (summaries[0].object_ref) {
          // Get object reference to determine type
          let o$ = this.assessService.getCapabilityById(summaries[0].object_ref)
            .subscribe(
              (capability) => {
                if (capability !== undefined) {
                    this.assessmentName = Observable.of(summaries[0].name + ' - ' + capability.name);
                }
              },
              (err) => console.log('error getting capability reference from object assessment', err)
            );
        }
        return summaries[0].name;
      });

    this.subscriptions.push(sub1$, sub2$, sub8$);
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
  public onDeleteCurrent(): void {
    const id = this.assessmentId;
    // this.confirmDelete({ name: this.summary.name, rollupId: id });
  }

  /**
   * @description clicked master list cell, confirm delete
   * @param {LastModifiedAssessment} assessment
   * @return {void}
   */
  public onDelete(assessment: LastModifiedAssessment3): void {
    // this.confirmDelete({ name: assessment.name, rollupId: assessment.rollupId });
  }

  // /**
  //  * @description confirmation to delete
  //  *  loop thru all assessments related to the given rollupId - and delete them
  //  * @param {LastModifiedAssessment} assessment
  //  * @return {void}
  //  */
  // public confirmDelete(assessment: { name: string, rollupId: string }): void {
  //   if (!assessment || !assessment.name || !assessment.rollupId) {
  //     console.log('confirm delete requires a name and id');
  //     return;
  //   }

  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { attributes: assessment } });
  //   const dialogSub$ = dialogRef.afterClosed()
  //     .subscribe(
  //       (result) => {
  //         const isBool = typeof result === 'boolean';
  //         const isString = typeof result === 'string';
  //         if (!result ||
  //           (isBool && result !== true) ||
  //           (isString && result !== 'true')) {
  //           return;
  //         }

  //         const isCurrentlyViewed = assessment.rollupId === this.rollupId ? true : false;
  //         const sub$ = this.assessService
  //           .deleteByRollupId(assessment.rollupId)
  //           .subscribe(
  //             (resp) => this.masterListOptions.dataSource.nextDataChange(resp),
  //             (err) => console.log(err),
  //             () => {
  //               if (sub$) {
  //                 sub$.unsubscribe();
  //               }

  //               // we deleted the current assessment
  //               if (isCurrentlyViewed) {
  //                 return this.router.navigate([Constance.X_UNFETTER_ASSESSMENT_NAVIGATE_URL]);
  //               }
  //             });
  //       },
  //       (err) => console.log(err),
  //       () => dialogSub$.unsubscribe());
  // }

  /**
   * @description
   * @param {LastModifiedAssessment} assessment - optional
   * @return {Promise<boolean>}
   */
  public onCellSelected(assessment: LastModifiedAssessment3): Promise<boolean> {
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

  /**
   * @description set all the flags to finished loading
   * @returns {void}
   */
  public setLoadingToDone(): void {
    this.finishedLoading = true;
  }
}
