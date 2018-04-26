import { Component, OnInit, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as baselineActions from '../store/baseline.actions';
import * as baselineReducers from '../store/baseline.reducers';

import { BaselineStateService } from '../baseline-state.service';

@Component({
  selector: 'baseline-layout',
  templateUrl: './baseline-layout.component.html',
  styleUrls: ['./baseline-layout.component.scss'],
})
export class BaselineLayoutComponent implements OnInit, AfterViewInit {

  public title = new BehaviorSubject('').asObservable();
  public showBackButton = new BehaviorSubject(false).asObservable();

  public constructor(
    private store: Store<baselineReducers.BaselineState>,
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
      .select('baseline')
      .filter((el) => el !== undefined)
      .distinctUntilChanged()
      .pluck('baseline')
      .pluck('baselineMeta')
      .pluck('title');

    this.showBackButton = this.store
      .select('baseline')
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
