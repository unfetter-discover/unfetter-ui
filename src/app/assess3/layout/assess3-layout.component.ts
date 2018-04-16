import { Component, OnInit, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as assessActions from '../store/assess.actions';
import * as assessReducers from '../store/assess.reducers';

import { AssessStateService } from '../assess-state.service';

@Component({
  selector: 'assess3-layout',
  templateUrl: './assess3-layout.component.html',
  styleUrls: ['./assess3-layout.component.scss'],
})
export class Assess3LayoutComponent implements OnInit, AfterViewInit {

  public title = new BehaviorSubject('').asObservable();
  public showBackButton = new BehaviorSubject(false).asObservable();

  public constructor(
    private store: Store<assessReducers.AssessState>,
    private location: Location,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  /**
   * @description
   * @returns {void}
   */
  public ngOnInit(): void {
  }

  /**
   * @description wait for children to populate the store, then render
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    this.title = this.store
      .select('assessment')
      .filter((el) => el !== undefined)
      .distinctUntilChanged()
      .pluck('assessment')
      .pluck('assessmentMeta')
      .pluck('title');

    this.showBackButton = this.store
      .select('assessment')
      .pluck<object, boolean>('backButton')
      .filter((el) => (el && typeof el === 'boolean'))
      .distinctUntilChanged()
      .map((el) => {
        this.changeDetectorRef.detectChanges();
        return el;
      });
    this.changeDetectorRef.detectChanges();
  }

  /**
   * @description go back
   * @param event
   */
  onBack(event: UIEvent): void {
    this.location.back();
  }

}
