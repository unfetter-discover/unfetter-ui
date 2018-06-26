
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of as observableOf, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, finalize, pluck, take } from 'rxjs/operators';
import { AssessmentSet, Identity } from 'stix';
import { ConfirmationDialogComponent } from '../../../components/dialogs/confirmation/confirmation-dialog.component';
import { UsersService } from '../../../core/services/users.service';
import { slideInOutAnimation } from '../../../global/animations/animations';
import { MasterListDialogTableHeaders } from '../../../global/components/master-list-dialog/master-list-dialog.component';
import { UserProfile } from '../../../models/user/user-profile';
import { AppState } from '../../../root-store/app.reducers';
import { Constance } from '../../../utils/constance';
import { LastModifiedBaseline } from '../../models/last-modified-baseline';
import { BaselineService } from '../../services/baseline.service';
import { CleanBaselineResultData, LoadBaselineData } from '../store/summary.actions';
import { SummaryState } from '../store/summary.reducers';
import { SummaryCalculationService } from './summary-calculation.service';
import { SummaryDataSource } from './summary.datasource';


@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  animations: [slideInOutAnimation],
})
export class SummaryComponent implements OnInit, OnDestroy {

  readonly baseAssessUrl = '/baseline';
  baselineName: Observable<string>;
  blName: string;
  baselineId: string;

  dates: any[];
  summaries: AssessmentSet[];

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
    protected calculationService: SummaryCalculationService,
  ) { }

  public getDialog(): MatDialog {
    return this.dialog;
  }

  /**
   * @description
   *  initialize this component, fetching data from backend
   */
  public ngOnInit(): void {
    const idParamSub$ = this.route.params.pipe(
      distinctUntilChanged())
      .subscribe((params) => {
        this.baselineId = params.baselineId || '';
        this.summaries = undefined;
        this.finishedLoading = false;
        this.calculationService.baseline = undefined;
        this.store.dispatch(new CleanBaselineResultData());
        const sub$ = this.userStore
          .select('users').pipe(
          pluck('userProfile'),
          take(1))
          .subscribe((user: UserProfile) => {
            const creatorId = user._id;
            const createdById = user.organizations[0].id;
            this.requestBaseline(this.baselineId, createdById);
          },
            (err) => console.log(err));
        this.subscriptions.push(sub$);
      },
        (err) => console.log(err));

    const subIdentitie$ = this.userStore
      .select('identities').pipe(
      pluck('identities'),
      finalize(() => subIdentitie$ && subIdentitie$.unsubscribe()))
      .subscribe(
        (identities: Identity[]) => this.identities = identities,
        (error) => console.log(`(${new Date().toISOString()}) error retrieving identities from app store`, error)
      );

    this.getBaseline();
    this.listenForDataChanges();

    this.subscriptions.push(idParamSub$);
    this.dates = ['Yesterday, 09:36:40 AM', 'Monday, 03:11:15 PM', 'Mar 15, 2018 01:14:55 PM'];
  }

  /**
   * @description
   * @param {string} creatorId - optional
   */
  public requestBaseline(baselineId: string, creatorId?: string): void {
    const isSameBaseline = (row: any) => row && (row.id === this.baselineId);
    this.masterListOptions.dataSource = new SummaryDataSource(this.baselineService, creatorId);
    this.masterListOptions.columns.id.classes =
      (row: any) => isSameBaseline(row) ? 'current-item' : 'cursor-pointer';
    this.masterListOptions.columns.id.selectable = (row: any) => !isSameBaseline(row);
    this.store.dispatch(new LoadBaselineData(baselineId));
  }

  // TODO unsubscribes

  public getBaseline(): void {
    const baselineRetrieve$ = this.store
      .select('summary').pipe(
      pluck('baseline'),
      distinctUntilChanged(),
      filter((arr: AssessmentSet[]) => arr && arr.length > 0))
      .subscribe((arr: AssessmentSet[]) => {this.calculationService.baseline = arr[0]; return this.calculationService.baseline},
        (err) => console.log(err));

    const apRetrieve$ = this.store
      .select('summary').pipe(
      pluck('blAttackPatterns'),
      distinctUntilChanged(),
      filter((arr: string[]) => arr && arr.length > 0))
      .subscribe((arr: string[]) => {this.calculationService.blAttackPatterns = arr; return this.calculationService.blAttackPatterns},
        (err) => console.log(err));

    const groupRetrieve$ = this.store
      .select('summary').pipe(
      pluck('blGroups'),
      distinctUntilChanged(),
      filter((arr: string[]) => arr && arr.length > 0))
      .subscribe((arr: string[]) => {this.calculationService.blGroups = arr; return this.calculationService.blGroups},
        (err) => console.log(err));

    this.subscriptions.push(baselineRetrieve$, apRetrieve$, groupRetrieve$);
  }

  /**
   * @description setup subscriptions and observables for data changes
   * @return {void}
   */
  public listenForDataChanges(): void {
    const sub1$ = this.store
      .select('summary').pipe(
      pluck('summaries'),
      distinctUntilChanged(),
      filter((arr: AssessmentSet[]) => arr && arr.length > 0))
      .subscribe((arr: AssessmentSet[]) => {
        this.summaries = [...arr];
      },
        (err) => console.log(err));

    const sub2$ = this.store
      .select('summary').pipe(
      pluck('finishedLoading'),
      distinctUntilChanged(),
      filter((el) => el === true))
      .subscribe((done: boolean) => {
        if (this.calculationService.baseline === undefined) {
          // fetching the summary failed, set all flags to done
          this.setLoadingToDone();
          return;
        }
        this.finishedLoading = done;
        // this.transformSummary()
      }, (err) => console.log(err));

    const sub8$ = this.store
      .select('summary').pipe(
      pluck('finishedLoadingSummaryAggregationData'),
      distinctUntilChanged())
      .subscribe((done: boolean) => {
        // this.finishedLoadingSAD = done;
        // if (done) {
        //   this.transformSAD();
        // }
      }, (err) => console.log(err));

    const sub9$ = this.store
      .select('summary').pipe(
      pluck('baseline'),
      distinctUntilChanged())
      .subscribe((arr: AssessmentSet[]) => {
        if (!arr || arr.length === 0) {
          this.blName = '';
        } else {
          this.blName = arr[0].name;
        }
        this.baselineName = observableOf(this.blName);
      }, (err) => console.log(err));

    this.subscriptions.push(sub1$, sub2$, sub8$, sub9$);
  }


  /**
   * @description close open subscriptions, clean up resources when we destroy this component
   * @return {void}
   */
  public ngOnDestroy(): void {
    this.subscriptions
      .filter((el) => el !== undefined)
      .forEach((sub) => sub.unsubscribe());
    this.store.dispatch(new CleanBaselineResultData());
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
      routePromise = this.router.navigate([this.masterListOptions.modifyRoute, event.id]);
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
    this.confirmDelete({ name: this.blName, id: this.baselineId });
  }

  /**
   * @description clicked master list cell, confirm delete
   * @param {LastModifiedAssessment} baseline
   * @return {void}
   */
  public onDelete(baseline: LastModifiedBaseline): void {
    this.confirmDelete({ name: baseline.name, id: baseline.id });
  }

  // /**
  //  * @description confirmation to delete
  //  * @param {LastModifiedAssessment} baseline
  //  * @return {void}
  //  */
  public confirmDelete(baseline: { name: string, id: string }): void {
    if (!baseline || !baseline.id) {
      console.log('confirm delete requires an id');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { attributes: baseline } });
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

          const isCurrentlyViewed = baseline.id === this.baselineId ? true : false;
          const sub$ = this.baselineService
            .delete(baseline)
            .subscribe(
              (resp) => this.masterListOptions.dataSource.nextDataChange(resp),
              (err) => console.log(err),
              () => {
                if (sub$) {
                  sub$.unsubscribe();
                }

                // we deleted the current baseline
                if (isCurrentlyViewed) {
                  return this.router.navigate([Constance.X_UNFETTER_ASSESSMENT3_BASELINE_NAVIGATE_URL]);
                }
              });
        },
        (err) => console.log(err),
        () => dialogSub$.unsubscribe());
  }

  /**
   * @description
   * @param {LastModifiedAssessment} baseline - optional
   * @return {Promise<boolean>}
   */
  public onCellSelected(baseline: LastModifiedBaseline): Promise<boolean> {
    if (!baseline || !baseline.id) {
      return;
    }

    this.store.dispatch(new CleanBaselineResultData());
    return this.router.navigate([this.masterListOptions.displayRoute, baseline.id]);
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
