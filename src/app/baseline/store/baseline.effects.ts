import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { catchError, map } from 'rxjs/operators';
import { AssessmentSet, Capability, Category, ObjectAssessment } from 'stix/assess/v3/baseline';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { Stix } from 'stix/unfetter/stix';
import { StixEnum } from 'stix/unfetter/stix.enum';
import { AttackPatternService } from '../../core/services/attack-pattern.service';
import { GenericApi } from '../../core/services/genericapi.service';
import { BaselineMeta } from '../../models/baseline/baseline-meta';
import { JsonApi } from '../../models/json/jsonapi';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { Constance } from '../../utils/constance';
import { BaselineStateService } from '../services/baseline-state.service';
import { BaselineService } from '../services/baseline.service';
import * as baselineActions from './baseline.actions';
import { BaselineFeatureState, BaselineState } from './baseline.reducers';
import { AppState } from '../../root-store/app.reducers';
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
        protected store: Store<BaselineFeatureState>
    ) { }


    @Effect()
    public fetchBaseline = this.actions$
        .ofType(baselineActions.FETCH_BASELINE)
        .pipe(
            pluck('payload'),            
            switchMap((baselineId: string) => {
                return this.baselineService.fetchAssessmentSet(baselineId);
            }),            
            map((assessmentSet: AssessmentSet) => {
                return new baselineActions.SetAndReadAssessmentSet(assessmentSet);
            })
        );
    
    @Effect()
    public setAndReadAssessmentSet = this.actions$
        .ofType(baselineActions.SET_AND_READ_ASSESSMENT_SET)
        .pipe(
            pluck('payload'),
            switchMap((assessmentSet: AssessmentSet) => {
                return this.baselineService.fetchObjectAssessmentsByAssessmentSet(assessmentSet);
            }),
            map((objAssessments: ObjectAssessment[]) => {
                return new baselineActions.SetAndReadObjectAssessments(objAssessments);
            })
        );

    @Effect()
    public setAndReadObjectAssessments = this.actions$
        .ofType(baselineActions.SET_AND_READ_OBJECT_ASSESSMENTS)
        .pipe(
            pluck('payload'),
            switchMap((objAssessments: ObjectAssessment[]) => {
                const observables = objAssessments
                .map((objAssessment) => {
                    return this.baselineService.fetchCapability(objAssessment.object_ref);
                });
                
                return observableForkJoin(...observables).pipe(
                    map((arr) => {
                        return new baselineActions.SetAndReadCapabilities(arr);
                    }),
                    catchError((err) => {
                        console.log(err);
                        return Observable.of(new baselineActions.FailedToLoad(true));
                    })
                );
            })
        );

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

    @Effect({ dispatch: false })
    public setCurrentBaselineObjectAssessment = this.actions$
        .ofType(baselineActions.SET_CURRENT_BASELINE_OBJECT_ASSESSMENT)
        .pluck('payload')
        .filter(objAssessment => objAssessment !== undefined)
        .switchMap((objAssessment: ObjectAssessment) => {
            // Save object assessment to DB on each PDR weighting update
            const json = {
                data: { attributes: objAssessment }
            } as JsonApi<JsonApiData<ObjectAssessment>>;
            let url = Constance.X_UNFETTER_OBJECT_ASSESSMENTS_URL;
            if (objAssessment.id) {
                url = `${url}/${objAssessment.id}`;
                return this.genericServiceApi
                .patchAs<ObjectAssessment>(url, json);
            } else {
                return this.genericServiceApi
                .postAs<ObjectAssessment>(url, json);
            }
        })
        // required to send an empty element on non dispatched effects
        .switchMap(() => Observable.of({}));

    @Effect()
    public fetchCapabilityGroups = this.actions$
        .ofType(baselineActions.FETCH_CAPABILITY_GROUPS)
        .pipe(
            switchMap(() => this.baselineService.getCategories()),
            map((arr: Category[]) => new baselineActions.SetCapabilityGroups(arr))
        );

    @Effect()
    public fetchCapabilities = this.actions$
        .ofType(baselineActions.FETCH_CAPABILITIES)
        .pipe(
            switchMap(() => this.baselineService.getCapabilities()),
            map((arr: Category[]) => new baselineActions.SetCapabilities(arr))
        );

    @Effect()
    public fetchAttackPatterns = this.actions$
        .ofType(baselineActions.FETCH_ATTACK_PATTERNS)
        .pipe(

            pluck('payload'),
            switchMap((selectedFramework: string) => {
                const o1$ = observableOf(selectedFramework);
                // select all the attack patterns
                const o2$ = this.attackPatternService.fetchAttackPatterns()
                    .pipe(
                        catchError((ex) => observableOf([] as AttackPattern[]))
                    );
                // merge selected framework and all system attack patterns                
                return observableForkJoin(o1$, o2$);
            }),
            mergeMap(([framework, allAttackPatterns]) => {
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
            })
        )
    
        /**
         * Start an assessment, persist AssessmentSet to db.
         */
    @Effect()
    public startAssessment = this.actions$
        .ofType(baselineActions.START_BASELINE)
        .pipe(
            pluck('payload'),
            switchMap((el: AssessmentSet) => {
                
                // create baselinemeta object
                let baselineMeta = new BaselineMeta;
                baselineMeta.title = el.name; 
                baselineMeta.description = el.description;
                baselineMeta.created_by_ref = el.created_by_ref;
                
                this.baselineStateService.saveCurrent(baselineMeta);
                
                const json = { data: { attributes: el } } as JsonApi<JsonApiData<AssessmentSet>>;
                let url = 'api/v3/x-unfetter-assessment-sets';
                return this.genericServiceApi.postAs<AssessmentSet>(url, json);
                
            }),           
            tap((el: AssessmentSet) => {
                this.router.navigate([
                    '/baseline/wizard/new'
                ]);
            }),
            map((newAssessmentSet) => {
                return new baselineActions.SetBaseline(newAssessmentSet[0].attributes);
            })
        );
        

    @Effect()
    public saveBaseline = this.actions$
        .ofType(baselineActions.SAVE_BASELINE)
        .pluck('payload')
        .switchMap((baseline: AssessmentSet) => {
            const json = {
                data: { attributes: baseline }
            } as JsonApi<JsonApiData<AssessmentSet>>;
            let url = Constance.X_UNFETTER_ASSESSMENT_SETS_URL;
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
            let url = Constance.X_UNFETTER_CATEGORY_URL;
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
    public addCapabilityToBaselineCapabilities = this.actions$
        .ofType(baselineActions.ADD_CAPABILITY_TO_BASELINE)
        .pluck('payload')
        .withLatestFrom(this.store.select('baseline').pluck('capabilityGroups'))
        .switchMap(( [ capability, capabilityGroups ]: [ Capability, Category[] ]) => {
            const newOA = this.createObjAssessment(capability);
 
            // Update object assessment with assessed objects from relevant capability group
            const capGroup = capabilityGroups.find((group) => group.id === capability.category);
            newOA.assessed_objects = capGroup.assessed_objects;

            console.log(JSON.stringify(newOA));

            // Save ObjectAssessment to DB
            const json = {
                data: { attributes: newOA }
            } as JsonApi<JsonApiData<ObjectAssessment>>;
            let url = Constance.X_UNFETTER_OBJECT_ASSESSMENTS_URL;
            return this.genericServiceApi
                .postAs<ObjectAssessment>(url, json)
                .map(RxjsHelpers.mapAttributes);
        })
        .map((objAssessment) => {
            return new baselineActions.AddObjectAssessmentToBaseline(objAssessment[0]);
        });
    
    @Effect({ dispatch: false })
    public addObjectAssessmentToBaseline = this.actions$
        .ofType(baselineActions.ADD_OBJECT_ASSESSMENT_TO_BASELINE)
        .pluck('payload')
        .withLatestFrom(this.store.select('baseline').pluck('baseline'))
        .do(([objAssessment, baseline]: [ObjectAssessment, AssessmentSet]) => {
            let url = Constance.X_UNFETTER_ASSESSMENT_SETS_URL;
            const json = {
                data: { attributes: baseline }
            } as JsonApi<JsonApiData<AssessmentSet>>;
            url = `${url}/${baseline.id}`;
            return this.genericServiceApi
            .patchAs<AssessmentSet>(url, json)
            .map(RxjsHelpers.mapAttributes);
        })
        // required to send an empty element on non dispatched effects
        .switchMap(() => Observable.of({}));

    private createObjAssessment(capability: Capability): ObjectAssessment {
        const newOA = new ObjectAssessment();
        newOA.object_ref = capability.id;
        newOA.assessed_objects = [];
        const stix = new Stix();
        stix.type = StixEnum.OBJECT_ASSESSMENT;
        stix.description = capability.description;
        stix.name = capability.name;
        stix.created_by_ref = capability.created_by_ref;
        Object.assign(newOA, stix);

        return newOA;
    }
}
