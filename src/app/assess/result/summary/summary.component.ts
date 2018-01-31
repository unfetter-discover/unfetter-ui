import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    columns: new MasterListDialogTableHeaders('date', 'Modified'),
    displayRoute: '/assess/view',
    modifyRoute: '/assess/xxxx',
  };

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
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

    this.masterListOptions.dataSource = new SummaryDataSource(this.assessmentSummaryService);

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
      .subscribe((user: object) => {
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

  public onCreate(event?: UIEvent): void {
    console.log('noop');
  }

  public onEdit(event?: UIEvent): void {
    console.log('noop');
  }

  public onShare(event?: UIEvent): void {
    console.log('noop');
  }

  public onDelete(event?: UIEvent): void {
    console.log('noop');
  }

  public onCellSelected(event?: UIEvent): void {
    console.log('noop');
  }

  public onFilterTabChanged($event?: UIEvent): void {
    console.log('noop');
  }
}
