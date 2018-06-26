
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { empty as observableEmpty, forkJoin as observableForkJoin } from 'rxjs';
import { catchError, map, mergeMap, pluck, switchMap } from 'rxjs/operators';
import { Capability, ObjectAssessment } from 'stix/assess/v3/baseline';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { BaselineService } from '../../services/baseline.service';
import { FinishedLoading, LOAD_BASELINE_DATA, SetAndReadCapabilities, SetAttackPatterns, SetBaseline, SetBaselineGroups, SET_AND_READ_CAPABILITIES, SET_BASELINE, SetBaselineWeightings } from './summary.actions';

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
                let apTotal = 0;
                let protWeightings = 0;
                let detWeightings = 0;
                let respWeightings = 0;
                const observables = objAssessments.map((objAssessment) => {
                    objAssessment.assessed_objects.map((aoObj) => {
                        if (apList.indexOf(aoObj.assessed_object_ref) < 0) {
                            apList.push(aoObj.assessed_object_ref);
                        }

                        // Collect weighting summaries for P, D, and R
                        apTotal++;
                        aoObj.questions.map((question) => {
                            protWeightings += (question.name === 'protect') ? 1 : 0;
                            detWeightings += (question.name === 'detect') ? 1 : 0;
                            respWeightings += (question.name === 'respond') ? 1 : 0;
                        })
                    })

                    return this.baselineService.fetchCapability(objAssessment.object_ref);
                });

                if (observables.length === 0) {
                    return [ new SetAttackPatterns(apList), new SetAndReadCapabilities([]) ];
                } else {
                    return observableForkJoin(...observables).pipe(
                        mergeMap((arr) => {
                            const protPct = Math.round(protWeightings / apTotal * 100);
                            const detPct = Math.round(detWeightings / apTotal * 100);
                            const respPct = Math.min(respWeightings / apTotal * 100, 100 - protPct - detPct);
                            return [ new SetAttackPatterns(apList), 
                                    new SetBaselineWeightings({ protPct, detPct, respPct }),
                                    new SetAndReadCapabilities(arr),
                                ];
                        }),
                        catchError((err) => {
                            console.log(err);
                            return observableEmpty();
                        })
                    );
                }
            })
        );

    @Effect()
    public setAndReadCapabilities = this.actions$
        .ofType(SET_AND_READ_CAPABILITIES)
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

                return [ new SetBaselineGroups(catList), new FinishedLoading(true) ];
            })
        );
}
