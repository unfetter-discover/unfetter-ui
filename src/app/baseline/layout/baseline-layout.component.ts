
import { pluck, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { fadeInOut } from '../../global/animations/fade-in-out';
import * as baselineReducers from '../store/baseline.reducers';
import { AssessmentSet } from 'stix/assess/v3/baseline';
import { Router } from '@angular/router';

@Component({
  selector: 'baseline-layout',
  templateUrl: './baseline-layout.component.html',
  styleUrls: ['./baseline-layout.component.scss'],
  animations: [fadeInOut],
})
export class BaselineLayoutComponent implements OnInit, AfterViewInit {

  public title = new BehaviorSubject('').asObservable();
  public showBackButton = new BehaviorSubject(false).asObservable();

  private baselineId;

  
  public constructor(
    private store: Store<baselineReducers.BaselineState>,
    private location: Location,
    private router: Router,
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
      .select('baseline').pipe(
      filter((el) => el !== undefined),
      distinctUntilChanged(),
      pluck('baseline'),
      pluck('name'));

    this.showBackButton = this.store
      .select('baseline').pipe(
      pluck<object, boolean>('backButton'),
      filter((el) => (el && typeof el === 'boolean')),
      distinctUntilChanged(),
      map((el) => {
        this.changeDetectorRef.detectChanges();
        return el;
      }));
    this.changeDetectorRef.detectChanges();

    const baselinesRetrieve$ = this.store
    .select('baseline').pipe(
    pluck('baseline'),
    distinctUntilChanged())
    .subscribe(
      (baseline: AssessmentSet) => {
        this.baselineId = baseline.id;
      },
      (err) => console.log(err));
  }

  /**
   * @description go back
   * @param event
   */
  onBack(event: UIEvent): void {
    // this.location.back();
    this.router.navigate(['/baseline/result/summary/' + this.baselineId]);
  }

}
