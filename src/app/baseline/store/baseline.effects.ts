import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { forkJoin as observableForkJoin, of as observableOf, Observable } from 'rxjs';
import { catchError, filter, map, mergeMap, pluck, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AssessmentSet, Capability, Category, ObjectAssessment } from 'stix/assess/v3/baseline';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { ExpandedStix } from 'stix/unfetter/stix';
import { StixEnum } from 'stix/unfetter/stix.enum';
import { AttackPatternService } from '../../core/services/attack-pattern.service';
import { GenericApi } from '../../core/services/genericapi.service';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { BaselineMeta } from '../../models/baseline/baseline-meta';
import { JsonApi } from '../../models/json/jsonapi';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { Constance } from '../../utils/constance';
import { BaselineStateService } from '../services/baseline-state.service';
import { BaselineService } from '../services/baseline.service';
import * as baselineActions from './baseline.actions';
import { BaselineFeatureState } from './baseline.reducers';

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
                
                // Pass along empty array if there are no object assessments yet
                if (observables.length === 0) {
                    return observableOf(new baselineActions.SetAndReadCapabilities(new Capability[0]));
                } else {
                    return observableForkJoin(...observables).pipe(
                        map((arr) => {
                            return new baselineActions.SetAndReadCapabilities(arr);
                        }),
                        catchError((err) => {
                            console.log(err);
                            return observableOf(new baselineActions.FailedToLoad(true));
                        })
                    );
                }
            })
        );

    @Effect()
    public setAndReadCapabilities = this.actions$
        .ofType(baselineActions.SET_AND_READ_CAPABILITIES)
        .pipe(
            pluck('payload'),
            switchMap((capabilities: Capability[]) => {
                // Collect unique category references
                const catList = new Array<string>();
                capabilities.map((capability) => {
                    if (catList.indexOf(capability.category) < 0) {
                        catList.push(capability.category);
                    }
                });

                // If not categories, send an empty group list
                if (catList.length === 0) {
                    return observableOf(new Array<Category>());
                } else {
                    const observables = catList
                        .map((catId) => {
                            return this.baselineService.fetchCategory(catId);
                        });
                    return observableForkJoin(...observables);
                }
            }),
            map((groups) => {
                // baseline groups must be received first by wizard component
                // before proceeding with FinishedLoading, so we'll set groups
                // with its own action, and have the resulting effect do the
                // 'FinishedLoading' action
                return new baselineActions.SetInitialBaselineGroups(groups);
                // const actions: Action[] = [
                //     new baselineActions.SetBaselineGroups(groups),
                //     new baselineActions.FinishedLoading(true) ];
                // return actions;
            })
        )

    @Effect()
    public setInitialBaselineGroups = this.actions$
        .ofType(baselineActions.SET_INITIAL_BASELINE_GROUPS)
        .pipe(
            pluck('payload'),
            map((groups: Category[]) => {
                return new baselineActions.FinishedLoading(true);
            })
        )
    
    @Effect({ dispatch: false })
    public setCurrentBaselineObjectAssessment = this.actions$
        .ofType(baselineActions.SET_CURRENT_BASELINE_OBJECT_ASSESSMENT)
        .pipe(
            pluck('payload'),
            filter(objAssessment => objAssessment !== undefined),
            switchMap((objAssessment: ObjectAssessment) => {
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
            }),
            // required to send an empty element on non dispatched effects
            switchMap(() => observableOf({}))
        )

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
        .pipe(
            pluck('payload'),
            switchMap((baseline: AssessmentSet) => {
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
            }),
            map((assessmentSet) => {
                return new baselineActions.FinishedSaving({
                    finished: true,
                    id: assessmentSet.id || '',
                });
            })
        )

    @Effect()
    public addCapabilityGroup = this.actions$
        .ofType(baselineActions.ADD_CAPABILITY_GROUP)
        .pipe(
            pluck('payload'),
            switchMap(( category: Category) => {
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
            }),
            map((category) => {
                return new baselineActions.FetchCapabilityGroups();
            })
        )

    @Effect()
    public removeCapabilityGroupFromBaseline = this.actions$
        .ofType(baselineActions.REMOVE_CAPABILITY_GROUP_FROM_BASELINE)
        .pipe(
            pluck('payload'),
            withLatestFrom(this.store.select('baseline').pipe(pluck('baselineCapabilities'))),
            map(( [ category, baselineCapabilities ]: [ Category, Capability[] ]) => {
                // Gather related capabilities for this group
                const capsToRemove = baselineCapabilities.filter((cap) => cap.category === category.id);

                // Send action to remove object assessments for these capabilities from the baseline
                return new baselineActions.RemoveCapabilitiesFromBaseline(capsToRemove);
            })
        )
    
    @Effect()
    public addCapabilityToBaselineCapabilities = this.actions$
        .ofType(baselineActions.ADD_CAPABILITY_TO_BASELINE)
        .pipe(
            pluck('payload'),
            withLatestFrom(this.store.select('baseline').pipe(pluck('capabilityGroups'))),
            mergeMap(( [ capability, capabilityGroups ]: [ Capability, Category[] ]) => {
                const newOA = this.createObjAssessment(capability);
                
                // Update object assessment with assessed objects from relevant capability group
                const capGroup = capabilityGroups.find((group) => group.id === capability.category);
                newOA.assessed_objects = capGroup.assessed_objects;
                
                // Save ObjectAssessment to DB
                const json = {
                    data: { attributes: newOA }
                } as JsonApi<JsonApiData<ObjectAssessment>>;
                let url = Constance.X_UNFETTER_OBJECT_ASSESSMENTS_URL;
                return this.genericServiceApi.postAs<ObjectAssessment>(url, json)
                    .pipe(
                        map(RxjsHelpers.mapAttributes),
                        map((objectAssessments) => new baselineActions.AddObjectAssessmentToBaseline(objectAssessments[0])),
                        catchError((err) => {
                            console.log(err);
                            return observableOf();
                        })
                    );
                }),
        );
    
    @Effect()
    public replaceCapabilityInBaseline = this.actions$
        .ofType(baselineActions.REPLACE_CAPABILITY_IN_BASELINE)
        .pipe(
            pluck('payload'),
            withLatestFrom(this.store.select('baseline').pipe(pluck('baselineObjAssessments'))),
            mergeMap(([ oldAndNewCaps, baselineOA ]: [ Capability[], ObjectAssessment[] ]) => {
                // Return action to remove the old OA and create the new OA
                const newOA = this.createObjAssessment(oldAndNewCaps[1]);
                const oldOA = baselineOA.filter((oa) => oa.object_ref === oldAndNewCaps[0].id);
                return [
                    new baselineActions.AddObjectAssessmentToBaseline(newOA),
                    new baselineActions.RemoveObjectAssessmentsFromBaseline(oldOA),
                ];
            })
        );

    @Effect()
    public addObjectAssessmentToBaseline = this.actions$
        .ofType(baselineActions.ADD_OBJECT_ASSESSMENT_TO_BASELINE)
        .pipe(
            pluck('payload'),
            withLatestFrom(this.store.select('baseline').pipe(pluck('baseline'))),
            mergeMap(([objAssessment, baseline]: [ObjectAssessment, AssessmentSet]) => {
                let url = Constance.X_UNFETTER_ASSESSMENT_SETS_URL;
                const json = {
                    data: { attributes: baseline }
                } as JsonApi<JsonApiData<AssessmentSet>>;
                url = `${url}/${baseline.id}`;
                return this.genericServiceApi
                    .patchAs<AssessmentSet>(url, json)
                    .pipe(
                        map(RxjsHelpers.mapAttributes),
                        map((newBaseline) => new baselineActions.SetBaseline(newBaseline)),
                        catchError((err) => {
                            console.log(err);
                            return observableOf();
                        })
                    );
                }),
        );

    @Effect()
    public removeCapabilitiesFromBaselineCapabilities = this.actions$
        .ofType(baselineActions.REMOVE_CAPABILITIES_FROM_BASELINE)
        .pipe(
            pluck('payload'),
            withLatestFrom(this.store.select('baseline').pipe(pluck('baselineObjAssessments'))),
            mergeMap(( [ capabilities, baselineOA ]: [ Capability[], ObjectAssessment[] ] ) => {
                const oasToRemove = new Array<ObjectAssessment>();
                const observables = capabilities
                    .map((capability) => {
                        // Get object assessment associated with this capability
                        const oaForCap = baselineOA.find((oa) => oa.object_ref === capability.id);
                        oasToRemove.push(oaForCap);

                        // Remove ObjectAssessment from baseline and delete it
                        let url = Constance.X_UNFETTER_OBJECT_ASSESSMENTS_URL + '/' + oaForCap.id;

                        return this.genericServiceApi.delete(url);
                    });
                return observableForkJoin(...observables).pipe(
                    map((arr) => {
                        return new baselineActions.RemoveObjectAssessmentsFromBaseline(oasToRemove);
                    }),
                    catchError((err) => {
                        console.log(err);
                        return observableOf(new baselineActions.FailedToLoad(true));
                    })
                );
            }),
        );

    @Effect()
    public removeObjectAssessmentsFromBaseline = this.actions$
        .ofType(baselineActions.REMOVE_OBJECT_ASSESSMENTS_FROM_BASELINE)
        .pipe(
            pluck('payload'),
            withLatestFrom(this.store.select('baseline').pipe(pluck('baseline'))),
            mergeMap(([ objAssessments, baseline ]: [ ObjectAssessment[], AssessmentSet ]) => {
                const jsonBL = {
                    data: { attributes: baseline }
                } as JsonApi<JsonApiData<AssessmentSet>>;
                const url = `${Constance.X_UNFETTER_ASSESSMENT_SETS_URL}/${baseline.id}`;
                return this.genericServiceApi.patch(url, jsonBL)
                    .pipe(
                        map(RxjsHelpers.mapAttributes),
                        map((newBaseline) => new baselineActions.SetBaseline(newBaseline)),
                        catchError((err) => {
                            console.log(err);
                            return observableOf();
                        })
                    );
                }),
        );

    private createObjAssessment(capability: Capability): ObjectAssessment {
        const newOA = new ObjectAssessment();
        newOA.object_ref = capability.id;
        newOA.assessed_objects = [];
        const stix = new ExpandedStix();
        stix.type = StixEnum.OBJECT_ASSESSMENT;
        stix.description = capability.description;
        stix.name = capability.name;
        stix.created_by_ref = capability.created_by_ref;
        Object.assign(newOA, stix);

        return newOA;
    }
}
