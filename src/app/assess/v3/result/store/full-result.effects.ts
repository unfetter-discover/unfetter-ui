import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Assessment } from 'stix/assess/v2/assessment';
import { RiskByAttack } from 'stix/assess/v2/risk-by-attack';
import { Stix } from 'stix/unfetter/stix';
import { Relationship } from '../../../../models';
import { Constance } from '../../../../utils/constance';
import { AssessService } from '../../services/assess.service';
import { DonePushUrl, FinishedLoading, LOAD_ASSESSMENTS_BY_ROLLUP_ID, LOAD_ASSESSMENT_BY_ID, LOAD_GROUP_ATTACK_PATTERN_RELATIONSHIPS, 
    LOAD_GROUP_CURRENT_ATTACK_PATTERN, LOAD_GROUP_DATA, LoadGroupData, PUSH_URL, SetAssessment, SetAssessments, 
    SetGroupAttackPatternRelationships, SetGroupCurrentAttackPattern, SetGroupData, UPDATE_ASSESSMENT_OBJECT } from './full-result.actions';

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
        .ofType(LOAD_ASSESSMENTS_BY_ROLLUP_ID)
        .pluck('payload')
        .switchMap((rollupId: string) => {
            return this.assessService
                .getByRollupId(rollupId)
                .catch((ex) => Observable.empty());
        })
        .mergeMap((data: Assessment[]) => [new SetAssessments(data), new FinishedLoading(true)]);

    @Effect()
    public fetchAssessmentById = this.actions$
        .ofType(LOAD_ASSESSMENT_BY_ID)
        .pluck('payload')
        .switchMap((id: string) => {
            return this.assessService
                .getById(id)
                .catch((ex) => Observable.empty());
        })
        .mergeMap((data: Assessment) => [new SetAssessment(data), new FinishedLoading(true)]);

    @Effect()
    public fetchAssessmentGroupData = this.actions$
        .ofType(LOAD_GROUP_DATA)
        .pluck('payload')
        .switchMap((assessmentId: string) => {
            const getAssessedObjects$ = this.assessService.getAssessedObjects(assessmentId);
            const getRiskByAttackPattern$ = this.assessService.getRiskPerAttackPattern(assessmentId);
            return Observable.forkJoin(getAssessedObjects$, getRiskByAttackPattern$);
        })
        .map(([assessedObjects, riskByAttackPattern]) => {
            riskByAttackPattern = riskByAttackPattern || new RiskByAttack;
            return new SetGroupData({ assessedObjects, riskByAttackPattern });
        });

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
            // const url = `${Constance.API_HOST}/assess-beta/result/full/${rollupId}/${assessmentId}/phase/${phase}/attackPattern/${attackPattern}`;
            const url = `${Constance.API_HOST}/assess-beta/result/full/${rollupId}/${assessmentId}/phase/${phase}`;
            this.location.replaceState(url);
        })
        .switchMap(() => Observable.of(new DonePushUrl()));

    @Effect()
    public updateAssesmentObject = this.actions$
        .ofType(UPDATE_ASSESSMENT_OBJECT)
        .pluck('payload')
        .filter((payload: Assessment) => payload && payload.id !== undefined)
        .switchMap((assessment: Assessment) => {
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
