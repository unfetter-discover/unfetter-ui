
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { empty as observableEmpty, forkJoin as observableForkJoin } from 'rxjs';
import { catchError, mergeMap, pluck, switchMap } from 'rxjs/operators';
import { Capability, ObjectAssessment } from 'stix/assess/v3/baseline';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { BaselineService } from '../../services/baseline.service';
import { FinishedLoading, LOAD_BASELINE_DATA, SetAndReadCapabilities, SetAttackPatterns, SetBaseline, SetBaselineGroups, SetBaselines, SetBaselineWeightings, SET_AND_READ_CAPABILITIES, SET_BASELINE } from './summary.actions';
import { AttackPatternService } from '../../../core/services/attack-pattern.service';

@Injectable()
export class SummaryEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected baselineService: BaselineService,
        protected attackPatternService: AttackPatternService,
    ) { }

    // @Effect()
    // public fetchAttackPatterns = this.actions$
    //     .ofType(FETCH_ATTACK_PATTERNS)
    //     .pipe(

    //         pluck('payload'),
    //         switchMap((selectedFramework: string) => {
    //             const o1$ = observableOf(selectedFramework);
    //             // select all the attack patterns
    //             const o2$ = this.attackPatternService.fetchAttackPatterns()
    //                 .pipe(
    //                     catchError((ex) => observableOf([] as AttackPattern[]))
    //                 );
    //             // merge selected framework and all system attack patterns                
    //             return observableForkJoin(o1$, o2$);
    //         }),
    //         mergeMap(([framework, allAttackPatterns]) => {
    //             // if no framework given, use all attack patterns
    //             let selectedAttackPatterns = allAttackPatterns;
    //             if (framework) {
    //                 // filter if we are given a selected framework
    //                 const isFromSelectedFramework = (el) => {
    //                     return el 
    //                     && el.kill_chain_phases
    //                     .findIndex((_) => _.kill_chain_name === framework) > -1;
    //                 };
    //                 selectedAttackPatterns = allAttackPatterns
    //                 .filter(isFromSelectedFramework);
    //             }
                
    //             // tell reducer to set the attack pattern states
    //             return [
    //                 new baselineActions.SetAttackPatterns(allAttackPatterns),
    //                 new baselineActions.SetSelectedFrameworkAttackPatterns(selectedAttackPatterns),
    //             ];
    //         })
    //     )
    
    @Effect()
    public fetchBaselineData = this.actions$
        .ofType(LOAD_BASELINE_DATA)
        .pipe(
          pluck('payload'),
          switchMap((baselineId: string) => {
            // Get all baselines and save them as well as the one which is current
            return this.baselineService.fetchBaselines(true)
              .pipe(
                mergeMap((data: AssessmentSet[]) => {
                  const baseline = data.find((bl) => bl.id === baselineId);
                  return [ new SetBaselines(data), new SetBaseline(baseline) ];
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
            switchMap((baseline: AssessmentSet) => {
                return this.baselineService.fetchObjectAssessmentsByAssessmentSet(baseline);
            }),
            mergeMap((objAssessments: ObjectAssessment[]) => {
                // Pull out unique list of attack patterns represented in all of these object assessments
                const apList = [];
                let apTotal = 0;
                let completeAPs: number = 0;
                let completeWeightings: number = 0;
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
                            if (question.name === 'protect' && question.score !== '') {
                                protWeightings += this.toWeight(question.score);
                                completeWeightings++;
                            }
                            if (question.name === 'detect' && question.score !== '') {
                                detWeightings += this.toWeight(question.score);
                                completeWeightings++;
                            }
                            if (question.name === 'respond' && question.score !== '') {
                                respWeightings += this.toWeight(question.score);
                                completeWeightings++;
                            }
                        })

                        // If this is a complete weighted AP, keep track of it
                        if (aoObj.questions[0].score !== '' && aoObj.questions[1].score !== '' && aoObj.questions[2].score !== '') {
                            completeAPs += 1;
                        }
                    })

                    return this.baselineService.fetchCapability(objAssessment.object_ref);
                });

                if (observables.length === 0) {
                    return [ new SetAttackPatterns({ apList, completeAPs, completeWeightings }), new SetAndReadCapabilities([]) ];
                } else {
                    return observableForkJoin(...observables).pipe(
                        mergeMap((arr) => {
                            const protPct = protWeightings;
                            const detPct = detWeightings;
                            const respPct = respWeightings;
                            return [ new SetAttackPatterns({ apList, completeAPs, completeWeightings }), 
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

    /**
     * @description Returns the weight of the given score
     * @param  {PdrString} name
     * @returns number
     */
    private toWeight(name: string): number {
        if (!name) {
            return 0;
        }
        var lowerCaseName = name.toLowerCase();
        switch (lowerCaseName) {
            case ('s'):
                return .9;
            case ('m'):
                return .6;
            case ('l'):
                return .3;
            default:
                return 0;
        }
    };

}
