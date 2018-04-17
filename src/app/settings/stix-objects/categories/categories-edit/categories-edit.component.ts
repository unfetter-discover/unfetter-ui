import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSelectChange, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AssessedObject } from 'stix/dist/assess/v3/assessed-object';
import { AttackPattern } from 'stix/dist/unfetter/attack-pattern';
import { Question } from '../../../../../../../stix/dist/assess/v3/question';
import { AppState } from '../../../../app.service';
import { GenericApi } from '../../../../core/services/genericapi.service';
import { SortHelper } from '../../../../global/static/sort-helper';
import { UserProfile } from '../../../../models/user/user-profile';
import { Constance } from '../../../../utils/constance';
import { StixService } from '../../../stix.service';
import { CategoriesComponent } from '../categories/categories.component';
import { AnswerOption } from './answer-option';
import { Framework } from './framework';

@Component({
  selector: 'categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent extends CategoriesComponent implements OnInit, OnDestroy {

  public frameworks: Framework[] = [];
  public user: UserProfile;
  public loading = false;
  public readonly answers = [
    new AnswerOption('L', 'LOW'),
    new AnswerOption('M', 'MEDIUM'),
    new AnswerOption('S', 'SIGNIFICANT'),
    new AnswerOption('NA', 'NOT_APPLICABLE'),
  ];
  private readonly subscriptions: Subscription[] = [];

  constructor(
    public stixService: StixService,
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    public location: Location,
    public snackBar: MatSnackBar,
    public genericApiService: GenericApi,
    private userStore: Store<AppState>,
  ) {
    super(stixService, genericApiService, route, router, dialog, location, snackBar);
  }

  /**
   * @returns void
   */
  public ngOnInit(): void {
    this.loadPage();
  }

  /**
   * @description load the data for this page and render
   * @returns void
   */
  public loadPage(): void {
    this.loading = true;
    const getUser$ = this.userStore
      .select<any>('users')
      .pluck<any, UserProfile>('userProfile')
      .take(1)
      .distinctUntilChanged()
      .do(() => {
        const params = this.route.snapshot.params;
        if (params['id']) {
          this.loadCategory();
        }
      })
      .switchMap((user: UserProfile) => {
        this.user = user;
        const framework = this.user.preferences.killchain;
        return this.loadAttackPatterns(framework);
      })
      .subscribe(
        (attackPatterns) => { },
        (err) => console.log(err),
        () => this.loading = false);
    this.subscriptions.push(getUser$);
  }

  /**
   * @description load attack patterns, filtered by a given kill chain framework
   * @param  {string} framework optional
   * @returns Observable<AttackPattern[]>
   */
  public loadAttackPatterns(framework?: string): Observable<AttackPattern[]> {
    if (this.frameworks) {
      // have we loaded this framework?
      const index = this.frameworks.findIndex((el) => el.framework === framework);
      if (index >= 0) {
        return Observable.of(this.frameworks[index].attackPatterns);
      }
    }

    const sort = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
    let filter = '';
    if (framework) {
      const userFrameworkFilter = { 'stix.kill_chain_phases.kill_chain_name': { $exists: true, $eq: framework } };
      filter = 'filter=' + encodeURIComponent(JSON.stringify(userFrameworkFilter));
    }
    let url = '';
    if (filter) {
      url = `${Constance.ATTACK_PATTERN_URL}?${filter}&${sort}`;
    } else {
      url = `${Constance.ATTACK_PATTERN_URL}?${sort}`;
    }

    return this.genericApiService.get(url)
      // stip the json data attributes
      .map((attackPatterns) => attackPatterns.map((el) => el.attributes) as AttackPattern[])
      // sort them by name
      .map((attackPatterns) => {
        return attackPatterns
          .sort(SortHelper.sortDescByField<AttackPattern, 'name'>('name'))
      })
      // add them to the frameworks data array as display and cache
      .map((attackPatterns) => {
        this.frameworks.push(new Framework(framework, attackPatterns));
        return attackPatterns;
      });
  }

  /**
   * @description build up attack pattern question list, based on the users selected attack patterns
   * @param  {MatSelectChange} event
   * @returns void
   */
  public onAttackPatternChange(event: MatSelectChange): void {
    console.log(event);
    if (!event || !event.value) {
      return;
    }
    const values = event.value || [];
    const selectedValues = new Set(values);
    // const selectedFramework = this.frameworks.find((el) => el.framework === framework);
    // const attackPatterns = selectedFramework.attackPatterns || [];

    let curAssessedObjects = this.category.assessed_objects || [];
    // keep only the current objects, that are selected, ie remove unselected values
    curAssessedObjects = curAssessedObjects.filter((el) => selectedValues.has(el.assessed_object_ref));
    // add the new values
    curAssessedObjects = [
      ...curAssessedObjects,
      ...values
        .filter((el) => {
          return curAssessedObjects.findIndex((assessedObject) => assessedObject.assessed_object_ref === el) < 0;
        })
        .map((el) => {
          const assessedObject = new AssessedObject();
          assessedObject.assessed_object_ref = el;
          return assessedObject;
        })
    ];
    this.category.assessed_objects = curAssessedObjects;
  }

  /**
   * @param  {string} questionName
   * @param  {AssessedObject} assessedObject
   * @param  {MatSelectChange} event?
   * @returns void
   */
  public onAnswer(questionName: 'mitigate' | 'indicate' | 'respond', assessedObject: AssessedObject, event?: MatSelectChange): void {
    if (!event) {
      return;
    }

    const questions = assessedObject.questions;
    const question = questions.find((el) => el.name === questionName);
    if (question) {
      question.score = event.value;
    } else {
      const answered = new Question();
      answered.name = questionName;
      answered.score = event.value;
      assessedObject.questions.push(answered);
    }
  }

  /**
   * @description look up attack pattern name from its id
   * @param  {string} framework
   * @param  {} id=''
   * @returns string
   */
  public lookupAttackPatternName(framework: string, id = ''): string {
    if (!id) {
      return id;
    }

    const selectedFramework = this.frameworks.find((el) => el.framework === framework);
    const attackPatterns = selectedFramework.attackPatterns || [];
    const attackPattern = attackPatterns.find((el) => el.id === id);
    return attackPattern.name || id;
  }

  public findQuestionScore(assessedObject: AssessedObject, curQuestion: string): string {
    return assessedObject.questions.find((el) => el.name === curQuestion).score || '';
  }


  /**
   * @returns void
   */
  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions
        .filter((el) => el !== undefined)
        .forEach((sub) => sub.unsubscribe());
    }
  }

}
