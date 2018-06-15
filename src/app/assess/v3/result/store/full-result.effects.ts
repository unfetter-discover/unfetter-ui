
import { forkJoin as observableForkJoin, of as observableOf, empty as observableEmpty,  Observable  } from 'rxjs';

import { catchError, mergeMap, map, pluck, switchMap, filter, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { RiskByAttack } from 'stix/assess/v2/risk-by-attack';
import { Assessment } from 'stix/assess/v3/assessment';
import { Stix } from 'stix/unfetter/stix';
import { Relationship } from '../../../../models';
import { Constance } from '../../../../utils/constance';
import { AssessService } from '../../services/assess.service';
import {
    DonePushUrl, FinishedLoading, LOAD_ASSESSMENTS_BY_ROLLUP_ID, LOAD_ASSESSMENT_BY_ID, LOAD_GROUP_ATTACK_PATTERN_RELATIONSHIPS,
    LOAD_GROUP_CURRENT_ATTACK_PATTERN, LOAD_GROUP_DATA, LoadGroupData, PUSH_URL, SetAssessment, SetAssessments, SetGroupAttackPatternRelationships,
    SetGroupCurrentAttackPattern, SetGroupData, UPDATE_ASSESSMENT_OBJECT
} from './full-result.actions';

@Injectable()
export class FullResultEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected assessService: AssessService,
    ) { }

    @Effect()
    public fetchAssessmentsByRollupId = this.actions$
        .ofType(LOAD_ASSESSMENTS_BY_ROLLUP_ID).pipe(
        pluck('payload'),
        switchMap((rollupId: string) => {
            return this.assessService
                .getByRollupId(rollupId).pipe(
                mergeMap((data: Assessment[]) => [new SetAssessments(data), new FinishedLoading(true)]),
                catchError((err) => {
                    console.log(err);
                    return observableEmpty();
                }));
        }));


    @Effect()
    public fetchAssessmentById = this.actions$
        .ofType(LOAD_ASSESSMENT_BY_ID).pipe(
        pluck('payload'),
        switchMap((id: string) => {
            return this.assessService
                .getById(id).pipe(
                mergeMap((data: Assessment) => [new SetAssessment(data), new FinishedLoading(true)]),
                catchError((err) => {
                    console.log(err);
                    return observableEmpty();
                }));
        }));


    @Effect()
    public fetchAssessmentGroupData = this.actions$
        .ofType(LOAD_GROUP_DATA).pipe(
        pluck('payload'),
        switchMap((assessmentId: string) => {
            const getAssessedObjects$ = this.assessService.getAssessedObjects(assessmentId);
            const getRiskByAttackPattern$ = this.assessService.getRiskPerAttackPattern(assessmentId);
            return observableForkJoin(getAssessedObjects$, getRiskByAttackPattern$).pipe(
                map(([assessedObjects, riskByAttackPattern]) => {
                    riskByAttackPattern = riskByAttackPattern || new RiskByAttack();
                    return new SetGroupData({ assessedObjects, riskByAttackPattern });
                }),
                catchError((err) => {
                    console.log(err);
                    return observableOf([]);
                }));
        }));


    @Effect()
    public loadGroupCurrentAttackPattern = this.actions$
        // .do((action) => console.log(`v3 - full-result.effects.ts Received ${action.type}`))
        // .filter((action) => action.type === LOAD_GROUP_CURRENT_ATTACK_PATTERN)
        .ofType(LOAD_GROUP_CURRENT_ATTACK_PATTERN).pipe(
        pluck('payload'),
        switchMap((attackPatternId: string) => {
            return this.assessService
                .getAs<Stix>(`${Constance.ATTACK_PATTERN_URL}/${attackPatternId}`).pipe(
                map((data: Stix) => {
                    return new SetGroupCurrentAttackPattern({ currentAttackPattern: data });
                }),
                catchError((err) => {
                    console.log(err);
                    return observableEmpty();
                }));
        }));


    @Effect()
    public loadGroupAttackPatternRelationships = this.actions$
        .ofType(LOAD_GROUP_ATTACK_PATTERN_RELATIONSHIPS).pipe(
        pluck('payload'),
        switchMap((attackPatternId: string) => {
            return this.assessService
                .getAttackPatternRelationships(attackPatternId).pipe(
                mergeMap((relationships: Relationship[]) => {
                    return [
                        new SetGroupAttackPatternRelationships(relationships),
                        new FinishedLoading(true),
                    ];
                }),
                catchError((err) => {
                    console.log(err);
                    return observableEmpty();
                }));
        }));


    @Effect()
    public pushUrlState = this.actions$
        .ofType(PUSH_URL).pipe(
        pluck('payload'),
        filter((payload) => payload !== undefined),
        tap((payload: any) => {
            const rollupId = payload.rollupId;
            const assessmentId = payload.assessmentId;
            const phase = payload.phase;
            const attackPattern = payload.attackPattern;
            // const url = `${Constance.API_HOST}/assess-beta/result/full/${rollupId}/${assessmentId}/phase/${phase}/attackPattern/${attackPattern}`;
            const url = `${Constance.API_HOST}/assess-beta/result/full/${rollupId}/${assessmentId}/phase/${phase}`;
            this.location.replaceState(url);
        }),
        switchMap(() => observableOf(new DonePushUrl())));

    @Effect()
    public updateAssesmentObject = this.actions$
        .ofType(UPDATE_ASSESSMENT_OBJECT).pipe(
        pluck('payload'),
        filter((payload: Assessment) => payload && payload.id !== undefined),
        switchMap((assessment: Assessment) => {
            const id = assessment.id;
            const o1$ = this.assessService
                .genericPatch(`${Constance.X_UNFETTER_ASSESSMENT_URL}/${id}`, assessment)
                .pipe(
                    map((resp) => new LoadGroupData(id)),
                    catchError((err) => {
                        console.log(err);
                        return observableEmpty();
                    })
                )
            return o1$;
        }));
}
