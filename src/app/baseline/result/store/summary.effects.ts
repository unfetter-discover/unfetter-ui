
import { empty as observableEmpty,  Observable  } from 'rxjs';

import { catchError, mergeMap, pluck, switchMap, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { BaselineService } from '../../services/baseline.service';
import { FinishedLoading, LOAD_BASELINE_DATA, SetBaseline, SET_BASELINE, SetAttackPatterns } from './summary.actions';
import { ObjectAssessment } from 'stix/assess/v3/baseline';

@Injectable()
export class SummaryEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected baselineService: BaselineService,
    ) { }

    @Effect()
    public fetchBaselineData = this.actions$
        .ofType(LOAD_BASELINE_DATA)
        .pipe(
          pluck('payload'),
          switchMap((baselineId: string) => {
            return this.baselineService
              .getById(baselineId)
              .pipe(
                map((data: AssessmentSet) => {
                  return new SetBaseline([data]);
                }),
                catchError((err) => {
                  return observableEmpty();
                })
              );
          })
        );

    @Effect()
    public setBaseline = this.actions$
        .ofType(SET_BASELINE)
        .pipe(
            pluck('payload'),
            switchMap((assessmentSets: AssessmentSet[]) => {
                return this.baselineService.fetchObjectAssessmentsByAssessmentSet(assessmentSets[0]);
            }),
            mergeMap((objAssessments: ObjectAssessment[]) => {
                // Pull out unique list of attack patterns represented in all of these object assessments
                const apList = [];
                objAssessments.map((objAssessment) => {
                    objAssessment.assessed_objects.map((aoObj) => {
                        if (apList.indexOf(aoObj.assessed_object_ref) < 0)
                            apList.push(aoObj.assessed_object_ref);
                    })
                });

                const actions = [new FinishedLoading(true)];
                return [ new SetAttackPatterns(apList), ...actions ];
            })
        );

    // @Effect()
    // public setAndReadObjectAssessments = this.actions$
    //     .ofType(baselineActions.SET_AND_READ_OBJECT_ASSESSMENTS)
    //     .pipe(
    //         pluck('payload'),
    //         switchMap((objAssessments: ObjectAssessment[]) => {
    //             const observables = objAssessments
    //             .map((objAssessment) => {
    //                 return this.baselineService.fetchCapability(objAssessment.object_ref);
    //             });
                
    //             return observableForkJoin(...observables).pipe(
    //                 map((arr) => {
    //                     return new baselineActions.SetAndReadCapabilities(arr);
    //                 }),
    //                 catchError((err) => {
    //                     console.log(err);
    //                     return observableOf(new baselineActions.FailedToLoad(true));
    //                 })
    //             );
    //         })
    //     );

    // @Effect()
    // public setAndReadCapabilities = this.actions$
    //     .ofType(baselineActions.SET_AND_READ_CAPABILITIES)
    //     .pipe(
    //         pluck('payload'),
    //         switchMap((capabilities: Capability[]) => {
    //         // Collect unique category references
    //         const catList = new Array<string>();
    //         capabilities.map((capability) => {
    //             if (catList.indexOf(capability.category) < 0) {
    //                 catList.push(capability.category);
    //             }
    //         });
    //         const observables = catList
    //             .map((catId) => {
    //                 return this.baselineService.fetchCategory(catId);
    //             });
    //             return observableForkJoin(...observables);
    //         }),
    //         mergeMap((groups) => {
    //         const actions: Action[] = [
    //             new SetBaselineGroups(groups),
    //             new FinishedLoading(true) ];
    //             return actions;
    //         })
    //     )

    
}
