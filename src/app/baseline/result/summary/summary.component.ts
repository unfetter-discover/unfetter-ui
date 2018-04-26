import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { LoadAssessmentSummaryData, LoadSingleAssessmentSummaryData, LoadSingleSummaryAggregationData } from '../store/summary.actions';

import { SummaryState } from '../store/summary.reducers';
import { AppState } from '../../../root-store/app.reducers';
import { Baseline } from '../../../models/baseline/baseline';
import { BaselineService } from '../../services/baseline.service';
import { ConfirmationDialogComponent } from '../../../components/dialogs/confirmation/confirmation-dialog.component';
import { MasterListDialogTableHeaders } from '../../../global/components/master-list-dialog/master-list-dialog.component';
import { LastModifiedBaseline } from '../../models/last-modified-baseline';
import { slideInOutAnimation } from '../../../global/animations/animations';
import { Constance } from '../../../utils/constance';
import { UserProfile } from '../../../models/user/user-profile';
import { SummaryDataSource } from './summary.datasource';
import { BaselineObject } from '../../../models/baseline/baseline-object';
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

  readonly baseAssessUrl = '/baseline';
  baselineName: Observable<string>;
  baselineId: string;
  summaries: Baseline[];
  summary: Baseline;
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
    private baselineService: BaselineService,
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
        this.baselineId = params.baselineId || '';
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
            this.requestData(this.baselineId, createdById);
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
      .filter((arr: Baseline[]) => arr && arr.length > 0)
      .subscribe((arr: Baseline[]) => {
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

    this.baselineName = this.store
      .select('summary')
      .pluck('summaries')
      .distinctUntilChanged()
      .map((summaries: Baseline[]) => {
        if (!summaries || summaries.length === 0) {
          return '';
        }
        if (summaries[0].object_ref) {
          // Get object reference to determine type
          let o$ = this.baselineService.getCapabilityById(summaries[0].object_ref)
            .subscribe(
              (capability) => {
                if (capability !== undefined) {
                    this.baselineName = Observable.of(summaries[0].name + ' - ' + capability.name);
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
  public requestData(baselineId: string, creatorId?: string): void {
    const isSameAssessment = (row: any) => row && (row.id === this.baselineId);
    this.masterListOptions.dataSource = new SummaryDataSource(this.baselineService, creatorId);
    this.masterListOptions.columns.id.classes =
      (row: any) => isSameAssessment(row) ? 'current-item' : 'cursor-pointer';
    this.masterListOptions.columns.id.selectable = (row: any) => !isSameAssessment(row);
    this.store.dispatch(new LoadSingleAssessmentSummaryData(baselineId));
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
      routePromise = this.router.navigate([this.masterListOptions.modifyRoute, this.baselineId]);
    } else {
      routePromise = this.router.navigate([this.masterListOptions.modifyRoute, event.baselineId]);
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
   * @description clicked currently viewed baseline, confirm delete
   * @return {void}
   */
  public onDeleteCurrent(): void {
    const id = this.baselineId;
    // this.confirmDelete({ name: this.summary.name, rollupId: id });
  }

  /**
   * @description clicked master list cell, confirm delete
   * @param {LastModifiedAssessment} baseline
   * @return {void}
   */
  public onDelete(baseline: LastModifiedBaseline): void {
    // this.confirmDelete({ name: baseline.name, rollupId: baseline.rollupId });
  }

  // /**
  //  * @description confirmation to delete
  //  *  loop thru all baselines related to the given rollupId - and delete them
  //  * @param {LastModifiedAssessment} baseline
  //  * @return {void}
  //  */
  // public confirmDelete(baseline: { name: string, rollupId: string }): void {
  //   if (!baseline || !baseline.name || !baseline.rollupId) {
  //     console.log('confirm delete requires a name and id');
  //     return;
  //   }

  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { attributes: baseline } });
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

  //         const isCurrentlyViewed = baseline.rollupId === this.rollupId ? true : false;
  //         const sub$ = this.assessService
  //           .deleteByRollupId(baseline.rollupId)
  //           .subscribe(
  //             (resp) => this.masterListOptions.dataSource.nextDataChange(resp),
  //             (err) => console.log(err),
  //             () => {
  //               if (sub$) {
  //                 sub$.unsubscribe();
  //               }

  //               // we deleted the current baseline
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
   * @param {LastModifiedAssessment} baseline - optional
   * @return {Promise<boolean>}
   */
  public onCellSelected(baseline: LastModifiedBaseline): Promise<boolean> {
    if (!baseline || !baseline.rollupId || !baseline.id) {
      return;
    }

    this.store.dispatch(new CleanAssessmentResultData());
    return this.router.navigate([this.masterListOptions.displayRoute, baseline.rollupId, baseline.id]);
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
