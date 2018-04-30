import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as assessReducers from '../store/assess.reducers';

@Component({
  selector: 'assess-layout',
  templateUrl: './assess-layout.component.html',
  styleUrls: ['./assess-layout.component.scss'],
})
export class AssessLayoutComponent implements OnInit, AfterViewInit {

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
  public ngOnInit(): void { }

  /**
   * @description wait for childern to populate the store, then render
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
