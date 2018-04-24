import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { Baseline } from '../../../models/baseline/baseline';
import { BaselineService } from '../../services/baseline.service';
import {
    LOAD_ASSESSMENT_RESULT_DATA, SetAssessments,
    FinishedLoading, SetGroupAssessedObjects, SetGroupRiskByAttackPattern,
    SetGroupData, LOAD_GROUP_DATA, LOAD_GROUP_CURRENT_ATTACK_PATTERN, SetGroupCurrentAttackPattern,
    PUSH_URL, DonePushUrl, LOAD_GROUP_ATTACK_PATTERN_RELATIONSHIPS, SetGroupAttackPatternRelationships, ReloadAfterAssessmentObjectUpdate, UPDATE_ASSESSMENT_OBJECT, LoadGroupData
} from './full-result.actions';
import { fullAssessmentResultReducer } from './full-result.reducers';
import { Constance } from '../../../utils/constance';
import { Stix } from '../../../models/stix/stix';
import { RiskByAttack3 } from '../../../models/baseline/risk-by-attack3';
import { Relationship } from '../../../models';


@Injectable()
export class FullResultEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected baselineService: BaselineService,
    ) { }

    @Effect()
    public fetchAssessmentResultData = this.actions$
        .ofType(LOAD_ASSESSMENT_RESULT_DATA)
        .pluck('payload')
        .switchMap((rollupId: string) => this.baselineService.getByRollupId(rollupId))
        .mergeMap((data: Baseline[]) => [new SetAssessments(data), new FinishedLoading(true)]);

    @Effect()
    public fetchAssessmentGroupData = this.actions$
        .ofType(LOAD_GROUP_DATA)
        .pluck('payload')
        .switchMap((baselineId: string) => {
            const getAssessedObjects$ = this.baselineService.getAssessedObjects(baselineId);
            const getRiskByAttackPattern$ = this.baselineService.getRiskPerAttackPattern(baselineId);
            return Observable.forkJoin(getAssessedObjects$, getRiskByAttackPattern$);
        })
        .map(([assessedObjects, riskByAttackPattern]) => {
            riskByAttackPattern = riskByAttackPattern || new RiskByAttack3;
            return new SetGroupData({ assessedObjects, riskByAttackPattern });
        });

    @Effect()
    public loadGroupCurrentAttackPattern = this.actions$
        .ofType(LOAD_GROUP_CURRENT_ATTACK_PATTERN)
        .pluck('payload')
        .switchMap((attackPatternId: string) => {
            return this.baselineService.getAs<Stix>(`${Constance.ATTACK_PATTERN_URL}/${attackPatternId}`);
        })
        .map((data: Stix) => {
            return new SetGroupCurrentAttackPattern({ currentAttackPattern: data });
        });

    @Effect()
    public loadGroupAttackPatternRelationships = this.actions$
        .ofType(LOAD_GROUP_ATTACK_PATTERN_RELATIONSHIPS)
        .pluck('payload')
        .switchMap((attackPatternId: string) => {
            return this.baselineService.getAttackPatternRelationships(attackPatternId);
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
            // const rollupId = payload.rollupId;
            const baselineId = payload.baselineId;
            const phase = payload.phase;
            const attackPattern = payload.attackPattern;
            // const url = `${Constance.API_HOST}/baseline/result/full/${rollupId}/${baselineId}/phase/${phase}/attackPattern/${attackPattern}`;
            // TODO: is the rollup ID needed?  Not sure yet.
            const url = `${Constance.API_HOST}/baseline/result/full/${baselineId}/phase/${phase}`;
            // const url = `${Constance.API_HOST}/baseline/result/full/${rollupId}/${baselineId}/phase/${phase}`;
            this.location.replaceState(url);
        })
        .switchMap(() => Observable.of(new DonePushUrl()));

    @Effect()
    public updateAssesmentObject = this.actions$
        .ofType(UPDATE_ASSESSMENT_OBJECT)
        .pluck('payload')
        .filter((payload: Baseline) => payload && payload.id !== undefined)
        .switchMap((baseline: Baseline) => {
            const id = baseline.id;
            const o1$ = this.baselineService
                .genericPatch(`${Constance.X_UNFETTER_ASSESSMENT_URL}/${id}`, baseline)
                .map((resp) => new LoadGroupData(id))
                .catch((err) => {
                    // TODO: better error handling action
                    console.log(err);
                    return Observable.empty();
                });
            return o1$;
        })
}
