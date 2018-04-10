import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AssessService } from '../../services/assess.service';

import { LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA, LOAD_RISK_BY_ATTACK_PATTERN_DATA, FinishedLoading, SetRiskByAttackPattern } from './riskbyattackpattern.actions';
import { GenericApi } from '../../../core/services/genericapi.service';
import { JsonApi } from '../../models/json/jsonapi';
import { JsonApiData } from '../../../models/json/jsonapi-data';
import { RiskByAttack3 } from '../../../models/assess/risk-by-attack3';

@Injectable()
export class RiskByAttackPatternEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected genericServiceApi: GenericApi,
        protected assessService: AssessService,
    ) { }

    @Effect()
    public fetchSingleAssessmentRiskByAttackPatternData = this.actions$
        .ofType(LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA)
        .pluck('payload')
        .switchMap((assessmentId: string) => this.assessService.getRiskPerAttackPattern(assessmentId))
        .mergeMap((data: RiskByAttack3) => [new SetRiskByAttackPattern([data]), new FinishedLoading(true)])

    @Effect()
    public fetchAssessmentRiskByAttackPatternData = this.actions$
        .ofType(LOAD_RISK_BY_ATTACK_PATTERN_DATA)
        .pluck('payload')
        .switchMap((rollupId: string) => this.assessService.getRiskPerAttackPatternByRollupId(rollupId))
        .mergeMap((data: RiskByAttack3[]) => [ new SetRiskByAttackPattern(data), new FinishedLoading(true)])
}
