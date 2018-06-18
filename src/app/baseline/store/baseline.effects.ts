import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError, flatMap, map } from 'rxjs/operators';
import { AssessmentSet, Capability, Category, ObjectAssessment } from 'stix/assess/v3/baseline';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { AttackPatternService } from '../../core/services/attack-pattern.service';
import { GenericApi } from '../../core/services/genericapi.service';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { BaselineMeta } from '../../models/baseline/baseline-meta';
import { JsonApi } from '../../models/json/jsonapi';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { BaselineStateService } from '../services/baseline-state.service';
import { BaselineService } from '../services/baseline.service';
import * as baselineActions from './baseline.actions';

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
    public fetchBaseline = this.actions$
        .ofType(baselineActions.FETCH_BASELINE)
        .pluck('payload')
        .switchMap((baselineId: string) => {
            return this.baselineService.fetchAssessmentSet(baselineId);
        })
        .map((assessmentSet: AssessmentSet) => {
            return new baselineActions.SetAndReadAssessmentSet(assessmentSet);
        });
    
    @Effect()
    public setAndReadAssessmentSet = this.actions$
        .ofType(baselineActions.SET_AND_READ_ASSESSMENT_SET)
        .pluck('payload')
        .switchMap((assessmentSet: AssessmentSet) => {
            return this.baselineService.fetchObjectAssessmentsByAssessmentSet(assessmentSet);
        })
        .map((objAssessments: ObjectAssessment[]) => {
            return new baselineActions.SetAndReadObjectAssessments(objAssessments);
        });

    @Effect()
    public setAndReadObjectAssessments = this.actions$
        .ofType(baselineActions.SET_AND_READ_OBJECT_ASSESSMENTS)
        .pluck('payload')
        .switchMap((objAssessments: ObjectAssessment[]) => {
            const observables = objAssessments
                .map((objAssessment) => {
                    return this.baselineService.fetchCapability(objAssessment.object_ref);
                });

            return Observable.forkJoin(...observables).pipe(
                map((arr) => {
                    return new baselineActions.SetAndReadCapabilities(arr);
                }),
                catchError((err) => {
                    console.log(err);
                    return Observable.of(new baselineActions.FailedToLoad(true));
                })
            );
        });

    @Effect()
    public setAndReadCapabilities = this.actions$
        .ofType(baselineActions.SET_AND_READ_CAPABILITIES)
        .pluck('payload')
        .switchMap((capabilities: Capability[]) => {
            const observables = capabilities
                .map((capability) => {
                    return this.baselineService.fetchCategory(capability.category);
                });
            return Observable.forkJoin(...observables);
        })
        .mergeMap((groups) => {
            const actions: Action[] = [
                new baselineActions.SetBaselineGroups(groups),
                new baselineActions.FinishedLoading(true) ];
            return actions;
        });
        // .switchMap((capabilities: Capability[]) => {
        //     const observables = capabilities
        //         .map((capability) => {
        //             return this.baselineService.fetchCategory(capability.category);
        //         });
            
        //     return Observable.forkJoin(...observables).pipe(
        //         map((groups) => {
        //             const actions: Action[] = [];
        //             actions.push(new baselineActions.SetBaselineGroups(groups));
        //             actions.push(new baselineActions.FinishedLoading(true));
        //             return actions;
        //         }),
        //         catchError((err) => {
        //             console.log(err);
        //             return Observable.of(new baselineActions.FailedToLoad(true));
        //         })
        //     );
        // });

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
    
        /**
         * Start an assessment, persist AssessmentSet to db.
         */
    @Effect()
    public startAssessment = this.actions$
        .ofType(baselineActions.START_BASELINE)
        .pluck('payload')
        .switchMap((el: AssessmentSet) => {

            // create baselinemeta object
            let baselineMeta = new BaselineMeta;
            baselineMeta.title = el.name; 
            baselineMeta.description = el.description;
            baselineMeta.created_by_ref = el.created_by_ref;

            this.baselineStateService.saveCurrent(baselineMeta);

            const json = { data: { attributes: el } } as JsonApi<JsonApiData<AssessmentSet>>;
            let url = 'api/v3/x-unfetter-assessment-sets';
            return this.genericServiceApi.postAs<AssessmentSet>(url, json);

        })

        .do((el: AssessmentSet) => {
            this.router.navigate([
                '/baseline/wizard/new'
            ]);
        })
        .map((newAssessmentSet) => {
            return new baselineActions.SetBaseline(newAssessmentSet[0].attributes);
        })
        

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
                id: assessmentSet.id || '',
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
