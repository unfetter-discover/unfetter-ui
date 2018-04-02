import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { Assessment3 } from '../../../../models/assess/assessment3';
import { AssessService } from '../../../services/assess.service';
import {
    LOAD_ASSESSMENT_RESULT_DATA, SetAssessments,
    FinishedLoading, SetGroupAssessedObjects, SetGroupRiskByAttackPattern,
    SetGroupData, LOAD_GROUP_DATA, LOAD_GROUP_CURRENT_ATTACK_PATTERN, SetGroupCurrentAttackPattern,
    PUSH_URL, DonePushUrl, LOAD_GROUP_ATTACK_PATTERN_RELATIONSHIPS, SetGroupAttackPatternRelationships, ReloadAfterAssessmentObjectUpdate, UPDATE_ASSESSMENT_OBJECT, LoadGroupData
} from './full-result.actions';
import { fullAssessmentResultReducer } from './full-result.reducers';
import { Constance } from '../../../utils/constance';
import { Stix } from '../../../../models/stix/stix';
import { RiskByAttack3 } from '../../../../models/assess/risk-by-attack3';
import { Relationship } from '../../../../models';


@Injectable()
export class FullResultEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected assessService: AssessService,
    ) { }

    @Effect()
    public fetchAssessmentResultData = this.actions$
        .ofType(LOAD_ASSESSMENT_RESULT_DATA)
        .pluck('payload')
        // .switchMap((rollupId: string) => this.assessService.getByRollupId(rollupId))
        .mergeMap((data: Assessment3[]) => [new SetAssessments(data), new FinishedLoading(true)]);

    @Effect()
    public fetchAssessmentGroupData = this.actions$
        .ofType(LOAD_GROUP_DATA)
        .pluck('payload')
        .switchMap((assessmentId: string) => {
            const getAssessedObjects$ = this.assessService.getAssessedObjects(assessmentId);
            // const getRiskByAttackPattern$ = this.assessService.getRiskPerAttackPattern(assessmentId);
            return Observable.forkJoin(getAssessedObjects$);
            // return Observable.forkJoin(getAssessedObjects$, getRiskByAttackPattern$);
        });
        // .map(([assessedObjects, riskByAttackPattern]) => {
        //     riskByAttackPattern = riskByAttackPattern || new RiskByAttack3;
        //     return new SetGroupData({ assessedObjects, riskByAttackPattern });
        // });

    @Effect()
    public loadGroupCurrentAttackPattern = this.actions$
        .ofType(LOAD_GROUP_CURRENT_ATTACK_PATTERN)
        .pluck('payload')
        .switchMap((attackPatternId: string) => {
            return this.assessService.getAs<Stix>(`${Constance.ATTACK_PATTERN_URL}/${attackPatternId}`);
        })
        .map((data: Stix) => {
            return new SetGroupCurrentAttackPattern({ currentAttackPattern: data });
        });

    @Effect()
    public loadGroupAttackPatternRelationships = this.actions$
        .ofType(LOAD_GROUP_ATTACK_PATTERN_RELATIONSHIPS)
        .pluck('payload')
        .switchMap((attackPatternId: string) => {
            return this.assessService.getAttackPatternRelationships(attackPatternId);
        })
        .mergeMap((relationships: Relationship[]) => {
            return [
                new SetGroupAttackPatternRelationships(relationships),
                new FinishedLoading(true),
            ];
        });

    @Effect()
    public pushUrlState = this.actions$
        .ofType(PUSH_URL)
        .pluck('payload')
        .filter((payload) => payload !== undefined)
        .do((payload: any) => {
            const rollupId = payload.rollupId;
            const assessmentId = payload.assessmentId;
            const phase = payload.phase;
            const attackPattern = payload.attackPattern;
            // const url = `${Constance.API_HOST}/assess3/result/full/${rollupId}/${assessmentId}/phase/${phase}/attackPattern/${attackPattern}`;
            const url = `${Constance.API_HOST}/assess3/result/full/${rollupId}/${assessmentId}/phase/${phase}`;
            this.location.replaceState(url);
        })
        .switchMap(() => Observable.of(new DonePushUrl()));

    @Effect()
    public updateAssesmentObject = this.actions$
        .ofType(UPDATE_ASSESSMENT_OBJECT)
        .pluck('payload')
        .filter((payload: Assessment3) => payload && payload.id !== undefined)
        .switchMap((assessment: Assessment3) => {
            const id = assessment.id;
            const o1$ = this.assessService
                .genericPatch(`${Constance.X_UNFETTER_ASSESSMENT_URL}/${id}`, assessment)
                .map((resp) => new LoadGroupData(id))
                .catch((err) => {
                    // TODO: better error handling action
                    console.log(err);
                    return Observable.empty();
                });
            return o1$;
        })
}
