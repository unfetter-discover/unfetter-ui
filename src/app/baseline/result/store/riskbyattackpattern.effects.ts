import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { GenericApi } from '../../../core/services/genericapi.service';
import { RiskByAttack3 } from '../../../models/baseline/risk-by-attack3';
import { BaselineService } from '../../services/baseline.service';
import {
    FinishedLoading,
    LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA, SetRiskByAttackPattern
} from './riskbyattackpattern.actions';

@Injectable()
export class RiskByAttackPatternEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected genericServiceApi: GenericApi,
        protected baselineService: BaselineService,
    ) { }

    @Effect()
    public fetchSingleAssessmentRiskByAttackPatternData = this.actions$
        .ofType(LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA)
        .pluck('payload')
        .switchMap((baselineId: string) => this.baselineService.getRiskPerAttackPattern(baselineId))
        .mergeMap((data: RiskByAttack3) => [new SetRiskByAttackPattern([data]), new FinishedLoading(true)])

}
