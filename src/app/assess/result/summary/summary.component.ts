import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SummaryState } from '../store/summary.reducers';
import { LoadAssessmentSummaryData } from '../store/summary.actions';
import { Assessment } from '../../../models/assess/assessment';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  id: string;
  summaries: Assessment[];
  summary: Assessment;
  finishedLoading = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<SummaryState>,
  ) { }

  /**
   * @description
   *  initialize this component, fetching data from backend
   */
  public ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] || '';

    this.store.dispatch(new LoadAssessmentSummaryData(this.id));

    const sub1 = this.store
      .select('summary')
      .pluck('summaries')
      .distinctUntilChanged()
      .subscribe((arr: Assessment[]) => {
        this.summaries = [...arr];
        this.summary = {...arr[0]};
      },
      (err) => console.log(err),
      () => sub1.unsubscribe());

    const sub2 = this.store
      .select('summary')
      .pluck('finishedLoading')
      .distinctUntilChanged()
      .subscribe((done: boolean) => this.finishedLoading = done,
      (err) => console.log(err),
      () => sub2.unsubscribe());
  }
}
