import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSelectChange, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AssessedObject } from 'stix/assess/v3';
import { PdrString, Question } from 'stix/assess/v3/baseline/question';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
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
  public selectedAttackPatterns: string[];
  public readonly answers = [
    new AnswerOption('', ''),
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
      .filter((user) => user !== undefined)
      .take(1)
      .distinctUntilChanged()
      .subscribe((user: UserProfile) => {
        this.user = user;
        const framework = this.user.preferences.killchain;
        const params = this.route.snapshot.params;
        const observables = [];
        if (params['id']) {
          const loadCat$ = this.loadCategory()
            // initial questions answers for the drop downs
            .map((category) => {
                // unrolls the questions array and adds values just for PDR/MIR dropdowns
                const assessedObjects = category.assessed_objects;
                assessedObjects.forEach((assessedObject) => {
                  const questions = assessedObject.questions || [];
                  questions.forEach((x) => {
                    const name = x.name.toLowerCase();
                    assessedObject[`${name}Score`] = x.score;
                  });
                });
                return category;
            })
            // sets the initial selected attack patterns drop down
            .do((category) => this.selectedAttackPatterns = this.resetSelectedAttackPatterns(category.assessed_objects));
          observables.push(loadCat$);
        }
        observables.push(this.loadAttackPatterns(framework));
        const sub$ = Observable
          .forkJoin(observables)
          .subscribe(
            (data) => {
              console.log(data);
            },
            (err) => console.log(err));
        this.subscriptions.push(sub$);
      },
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
   * @description used to specifiy the current list of selected attack patterns
   * @param  {AssessedObject[]} assessedObjects
   * @returns string[]
   */
  public resetSelectedAttackPatterns(assessedObjects: AssessedObject[]): string[] {
    if (!assessedObjects) {
      return [];
    }

    // return assessedObjects
    //   .map((assessedObject) => this.lookupAttackPattern(assessedObject.assessed_object_ref))
    //   .filter((el) => el !== undefined)
    //   .map((el) => el.id);
    return assessedObjects
          .map((el) => el.assessed_object_ref)
          .filter((el) => el !== undefined);
  }

  /**
   * @param  {string} questionName
   * @param  {AssessedObject} assessedObject
   * @param  {MatSelectChange} event?
   * @returns void
   */
  public onAnswer(questionName: PdrString, assessedObject: AssessedObject, event?: MatSelectChange): void {
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

    // needed to bind to drop down, didnt like mixing the view data w/ this model, but a function didnt work
    assessedObject[questionName + 'Score'] = event.value;
  }

  /**
   * @description look up attack pattern name from its id
   * @param  {string} framework
   * @param  {} id=''
   * @returns string
   */
  public lookupAttackPatternName(id = '', framework?: string): string {
    if (!id) {
      return id;
    }

    const attackPattern = this.lookupAttackPattern(id, framework);
    return attackPattern.name || id;
  }

  /**
   * @description find attack pattern with given id
   *  will search the given framework or across all frameworks
   * @param  {} id=''
   * @param  {string} framework?
   * @returns AttackPattern
   */
  public lookupAttackPattern(id = '', framework?: string, ): AttackPattern {
    let attackPatterns;
    if (framework) {
      // attack patterns from given framework
      const selectedFramework = this.frameworks.find((el) => el.framework === framework);
      attackPatterns = selectedFramework.attackPatterns || [];
    } else {
      // all attack patterns
      attackPatterns = this.frameworks
        .map((el) => el.attackPatterns)
        .reduce((acc, x) => acc.concat(x), []);
    }
    // return attack pattern w/ matching id
    return attackPatterns.find((el) => el.id === id);
  }

  /**
   * caused a lot of change detection and the drop downs didnt work
   * @param  {AssessedObject} assessedObject
   * @param  {string} curQuestion
   * @returns string
   public findQuestionScore(assessedObject: AssessedObject, curQuestion: string): string {
     if (!assessedObject || !assessedObject.questions || assessedObject.questions.length <= 0) {
       return '';
      }
      return assessedObject.questions.find((el) => el.name === curQuestion).score || '';
    }
    */


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
