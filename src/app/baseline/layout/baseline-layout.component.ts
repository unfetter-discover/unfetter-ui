import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { fadeInOut } from '../../global/animations/fade-in-out';
import * as baselineReducers from '../store/baseline.reducers';

@Component({
  selector: 'baseline-layout',
  templateUrl: './baseline-layout.component.html',
  styleUrls: ['./baseline-layout.component.scss'],
  animations: [fadeInOut],
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
      .pluck('name');

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
