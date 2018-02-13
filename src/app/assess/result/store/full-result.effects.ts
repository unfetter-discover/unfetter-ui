import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { Assessment } from '../../../models/assess/assessment';
import { AssessService } from '../../services/assess.service';
import { LOAD_ASSESSMENT_RESULT_DATA, SetAssessments, FinishedLoading, SetGroupAssessedObjects, SetGroupRiskByAttackPattern, SetGroupData, LOAD_GROUP_DATA, LOAD_GROUP_CURRENT_ATTACK_PATTERN, SetGroupCurrentAttackPattern } from './full-result.actions';
import { fullAssessmentResultReducer } from './full-result.reducers';
import { Constance } from '../../../utils/constance';
import { Stix } from '../../../models/stix/stix';


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
        .switchMap((rollupId: string) => this.assessService.getByRollupId(rollupId))
        .mergeMap((data: Assessment[]) => [new SetAssessments(data), new FinishedLoading(true)]);

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
            riskByAttackPattern = riskByAttackPattern || {};
            return new SetGroupData({ assessedObjects, riskByAttackPattern });
        });

        @Effect()
        public loadGroupCurrentAttackPattern = this.actions$
            .ofType(LOAD_GROUP_CURRENT_ATTACK_PATTERN)
            .pluck('payload')
            .switchMap((attackPatternId: string ) => {
                return this.assessService.getAs<Stix>(`${Constance.ATTACK_PATTERN_URL}/${attackPatternId}`);
            })
            .map((data: Stix) => {
                return new SetGroupCurrentAttackPattern({ currentAttackPattern: data });
            });

}
