import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';

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
  public showBackButton: Observable<boolean>;

  public constructor(
    private store: Store<assessReducers.AssessState>,
    private location: Location,
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

    this.showBackButton = this.store
      .select('assessment')
      .filter((el) => el !== undefined)
      .pluck('backButton');
  }

  /**
   * @description go back
   * @param event
   */
  onBack(event: UIEvent): void {
    this.location.back();
  }

}
