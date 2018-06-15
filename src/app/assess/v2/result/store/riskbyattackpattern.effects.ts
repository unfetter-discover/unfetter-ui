
import { switchMap, pluck, mergeMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { RiskByAttack } from 'stix/assess/v2/risk-by-attack';
import { GenericApi } from '../../../../core/services/genericapi.service';
import { AssessService } from '../../services/assess.service';
import { FinishedLoading, LOAD_RISK_BY_ATTACK_PATTERN_DATA, LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA, SetRiskByAttackPattern } from './riskbyattackpattern.actions';

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
        .ofType(LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA).pipe(
        pluck('payload'),
        switchMap((assessmentId: string) => this.assessService.getRiskPerAttackPattern(assessmentId)),
        mergeMap((data: RiskByAttack) => [new SetRiskByAttackPattern([data]), new FinishedLoading(true)]))

    @Effect()
    public fetchAssessmentRiskByAttackPatternData = this.actions$
        .ofType(LOAD_RISK_BY_ATTACK_PATTERN_DATA).pipe(
        pluck('payload'),
        switchMap((rollupId: string) => this.assessService.getRiskPerAttackPatternByRollupId(rollupId)),
        mergeMap((data: RiskByAttack[]) => [new SetRiskByAttackPattern(data), new FinishedLoading(true)]))
}
