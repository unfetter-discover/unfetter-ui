import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as assessActions from '../store/assess.actions';
import * as assessReducers from '../store/assess.reducers';

import { AssessStateService } from '../services/assess-state.service';

@Component({
  selector: 'assess-layout',
  templateUrl: './assess-layout.component.html',
  styleUrls: ['./assess-layout.component.scss'],
})
export class AssessLayoutComponent implements OnInit {
  public title: Observable<string>;

  public constructor(
    private store: Store<assessReducers.AssessState>,
  ) { }

  /**
   * @description
   */
  public ngOnInit(): void {
    this.title = this.store
      .select('assessment')
      .filter((el) => el !== undefined)
      .pluck('assessment')
      .pluck('assessmentMeta')
      .pluck('title');
  }

}
