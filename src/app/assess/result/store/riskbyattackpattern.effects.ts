import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AssessmentSummaryService } from '../../services/assessment-summary.service';

import { LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA, LOAD_RISK_BY_ATTACK_PATTERN_DATA, FinishedLoading, SetRiskByAttackPattern } from './riskbyattackpattern.actions';
import { GenericApi } from '../../../core/services/genericapi.service';
import { JsonApi } from '../../models/json/jsonapi';
import { JsonApiData } from '../../../models/json/jsonapi-data';
import { RiskByAttack } from '../../../models/assess/risk-by-attack';

@Injectable()
export class RiskByAttackPatternEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected genericServiceApi: GenericApi,
        protected assessmentSummaryService: AssessmentSummaryService,
    ) { }

    @Effect()
    public fetchSingleAssessmentRiskByAttackPatternData = this.actions$
        .ofType(LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA)
        .pluck('payload')
        .switchMap((assessmentId: string) => this.assessmentSummaryService.getRiskPerAttackPattern(assessmentId))
        .mergeMap((data: RiskByAttack) => [new SetRiskByAttackPattern([data]), new FinishedLoading(true)])

    @Effect()
    public fetchAssessmentRiskByAttackPatternData = this.actions$
        .ofType(LOAD_RISK_BY_ATTACK_PATTERN_DATA)
        .pluck('payload')
        .switchMap((rollupId: string) => this.assessmentSummaryService.getRiskPerAttackPatternByRollupId(rollupId))
        .mergeMap((data: RiskByAttack[]) => [ new SetRiskByAttackPattern(data), new FinishedLoading(true)])
}
