import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { catchError, map, flatMap } from 'rxjs/operators';
import { AssessmentSet, Category, ObjectAssessment } from 'stix/assess/v3/baseline';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { AttackPatternService } from '../../core/services/attack-pattern.service';
import { GenericApi } from '../../core/services/genericapi.service';
import { BaselineMeta } from '../../models/baseline/baseline-meta';
import { JsonApi } from '../../models/json/jsonapi';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { BaselineStateService } from '../services/baseline-state.service';
import { BaselineService } from '../services/baseline.service';
import * as baselineActions from './baseline.actions';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';

@Injectable()
export class BaselineEffects {

    public constructor(
        protected actions$: Actions,
        protected attackPatternService: AttackPatternService,
        protected baselineService: BaselineService,
        protected baselineStateService: BaselineStateService,
        protected genericServiceApi: GenericApi,
        protected location: Location,
        protected router: Router,
    ) { }

    @Effect()
    public fetchAssessmentWizardData = this.actions$
        .ofType(baselineActions.LOAD_BASELINE_WIZARD_DATA)
        .pluck('payload')
        // .switchMap((meta: Partial<Assessment3Meta>) => {
        //     const includeMeta = `?metaproperties=true`;
        //     let url = `${Constance.X_UNFETTER_ASSESSMENT3_URL}${includeMeta}`;
        //     const observables = new Array<Observable<Array<JsonApiData<Stix>>>>();

        //     return Observable.forkJoin(...observables);
        // })
        .mergeMap(() => {
            return [
                new baselineActions.FinishedLoading(true)
            ];
        });

    @Effect()
    public fetchAssessment = this.actions$
        .ofType(baselineActions.FETCH_BASELINE)
        .switchMap(() => this.baselineService.load())
        .map((arr: any[]) => new baselineActions.FetchBaseline(arr[0]));

    @Effect()
    public fetchCapabilityGroups = this.actions$
        .ofType(baselineActions.FETCH_CAPABILITY_GROUPS)
        .switchMap(() => this.baselineService.getCategories())
        .map((arr: Category[]) => new baselineActions.SetCapabilityGroups(arr));

    @Effect()
    public fetchCapabilities = this.actions$
        .ofType(baselineActions.FETCH_CAPABILITIES)
        .switchMap(() => this.baselineService.getCapabilities())
        .map((arr: Category[]) => new baselineActions.SetCapabilities(arr));

    @Effect()
    public fetchAttackPatterns = this.actions$
        .ofType(baselineActions.FETCH_ATTACK_PATTERNS)
        .pluck('payload')
        .switchMap((selectedFramework: string) => {
            const o1$ = Observable.of(selectedFramework);
            // select all the attack patterns
            const o2$ = this.attackPatternService
                .fetchAttackPatterns()
                .catch((ex) => Observable.of([] as AttackPattern[]));
            // merge selected framework and all system attack patterns                
            return Observable.forkJoin(o1$, o2$);
        })
        .mergeMap(([framework, allAttackPatterns]) => {
            // if no framework given, use all attack patterns
            let selectedAttackPatterns = allAttackPatterns;
            if (framework) {
                // filter if we are given a selected framework
                const isFromSelectedFramework = (el) => {
                    return el 
                        && el.kill_chain_phases
                        .findIndex((_) => _.kill_chain_name === framework) > -1;
                };
                selectedAttackPatterns = allAttackPatterns
                    .filter(isFromSelectedFramework);
            }

            // tell reducer to set the attack pattern states
            return [
                new baselineActions.SetAttackPatterns(allAttackPatterns),
                new baselineActions.SetSelectedFrameworkAttackPatterns(selectedAttackPatterns),
            ];
        });
    
    @Effect({ dispatch: false })
    public startAssessment = this.actions$
        .ofType(baselineActions.START_BASELINE)
        .pluck('payload')
        .map((el: BaselineMeta) => {
            this.baselineStateService.saveCurrent(el);
            return el;
        })
        .do((el: BaselineMeta) => {
            this.router.navigate([
                '/baseline/wizard/new'
            ]);
        })
        // required to send an empty element on non dispatched effects
        .switchMap(() => Observable.of({}));


    @Effect()
    public saveBaseline = this.actions$
        .ofType(baselineActions.SAVE_BASELINE)
        .pluck('payload')
        .switchMap((baseline: AssessmentSet) => {
            const json = {
                data: { attributes: baseline }
            } as JsonApi<JsonApiData<AssessmentSet>>;
            let url = 'api/v3/x-unfetter-assessment-sets';
            if (baseline.id) {
                url = `${url}/${baseline.id}`;
                return this.genericServiceApi
                .patchAs<AssessmentSet>(url, json);
            } else {
                return this.genericServiceApi
                .postAs<AssessmentSet>(url, json);
            }
        })
        .map((assessmentSet) => {
            return new baselineActions.FinishedSaving({
                finished: true,
                id: assessmentSet[0].id || '',
            });
        });

    @Effect()
    public addCapabilityGroup = this.actions$
        .ofType(baselineActions.ADD_CAPABILITY_GROUP)
        .pluck('payload')
        .switchMap(( category: Category) => {
            const json = {
                data: { attributes: category }
            } as JsonApi<JsonApiData<Category>>;
            let url = 'api/v3/x-unfetter-categories';
            if (category.id) {
                url = `${url}/${category.id}`;
                return this.genericServiceApi
                .patchAs<Category>(url, json);
            } else {
                return this.genericServiceApi
                .postAs<Category>(url, json);
            }
        })
        .map((category) => {
            return new baselineActions.FetchCapabilityGroups();
        });


  @Effect()
  public saveObjectAssessments = this.actions$
    .ofType(baselineActions.SAVE_OBJECT_ASSESSMENTS)
    .pluck('payload')
    .switchMap(( objAssessments: ObjectAssessment[] ) => {
      let url = 'api/v3/x-unfetter-object-assessments';
      const observables = objAssessments
        .map((objAssessment) => {
            const json = {
              data: { attributes: objAssessment }
            } as JsonApi<JsonApiData<ObjectAssessment>>;
            if (objAssessment.id) {
              url = `${url}/${objAssessment.id}`;
              return this.genericServiceApi
                .patchAs<ObjectAssessment[]>(url, json)
                .map<any[], ObjectAssessment[]>(RxjsHelpers.mapArrayAttributes);
            } else {
              return this.genericServiceApi
                .postAs<ObjectAssessment[]>(url, json)
                .map<any[], ObjectAssessment[]>(RxjsHelpers.mapArrayAttributes);
            }
      });

      return Observable.forkJoin(...observables).pipe(
        flatMap((arr: ObjectAssessment[][]) => arr),
        map((arr) => {
          const idArr = arr.map(objAssess => objAssess.id);
          return new baselineActions.AddObjectAssessmentsToBaseline(
            idArr,
          );
        }),
        catchError((err) => {
          console.log(err);
          return Observable.of(new baselineActions.FailedToLoad(true));
        })
      );
    });
  
}
