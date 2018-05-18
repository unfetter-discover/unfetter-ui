import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { fadeInOut } from '../../../global/animations/fade-in-out';
import * as assessReducers from '../store/assess.reducers';
import { defaultIfEmpty } from 'rxjs/operators/defaultIfEmpty';
import { take } from 'rxjs/operators/take';

@Component({
  selector: 'assess-layout',
  templateUrl: './assess-layout.component.html',
  styleUrls: ['./assess-layout.component.scss'],
  animations: [fadeInOut],
})
export class AssessLayoutComponent implements OnInit, AfterViewInit {

  public title = new BehaviorSubject('').asObservable();
  public showBackButton = new BehaviorSubject(false).asObservable();
  public failedToLoad = new BehaviorSubject(false).asObservable();
  public finishedLoading = new BehaviorSubject(false).asObservable();
  public loadingDoneOrFailed = new BehaviorSubject(false).asObservable();

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
      .select(assessReducers.getAssessmentMetaTitle)
      .pipe(distinctUntilChanged());

    this.showBackButton = this.store
      .select(assessReducers.getBackButton)
      .pipe(
        filter((el) => (el && typeof el === 'boolean')),
        distinctUntilChanged(),
        tap(() => this.changeDetectorRef.detectChanges())
      );

    this.failedToLoad = this.store
      .select(assessReducers.getFailedToLoad)
      .pipe(distinctUntilChanged(), take(2));

    // this.finishedLoading = this.store
    //   .select(assessReducers.getFinishedLoading)
    //   .pipe(distinctUntilChanged());

    // this.loadingDoneOrFailed = this.finishedLoading.pipe(
    //   combineLatest(this.failedToLoad),
    //   map(([v1, v2]) => {
    //     console.log(v1, v2);
    //     return v1 === true || v2 === true;
    //   }),
    //   distinctUntilChanged()
    // );

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
