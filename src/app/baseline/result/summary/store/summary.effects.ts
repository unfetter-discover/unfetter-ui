import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { BaselineService } from '../../../services/baseline.service';

import {
    LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA, LOAD_ASSESSMENT_SUMMARY_DATA, FinishedLoading, SetAssessments,
    LOAD_SINGLE_SUMMARY_AGGREGATION_DATA, SetSummaryAggregationData,
    FinishedLoadingSummaryAggregationData, LOAD_SUMMARY_AGGREGATION_DATA
} from './summary.actions';
import { Baseline } from '../../../../models/baseline/baseline';
import { GenericApi } from '../../../core/services/genericapi.service';
import { JsonApi } from '../../models/json/jsonapi';
import { JsonApiData } from '../../../models/json/jsonapi-data';
import { SummaryAggregation } from '../../../models/baseline/summary-aggregation';

@Injectable()
export class SummaryEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected baselineService: BaselineService,
    ) { }

    @Effect()
    public fetchSingleAssessmentSummaryData = this.actions$
        .ofType(LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA)
        .pluck('payload')
        .switchMap((baselineId: string) => {
            return this.baselineService
                .getById(baselineId)
                .catch((ex) => Observable.of({}));
        })
        .mergeMap((data: Baseline) => {
            const actions = [new FinishedLoading(true)];
            if (!data || !data.id) {
                return actions
            }
            return [new SetAssessments([data]), ...actions];
        });

    // @Effect()
    // public fetchAssessmentSummaryData = this.actions$
    //     .ofType(LOAD_ASSESSMENT_SUMMARY_DATA)
    //     .pluck('payload')
    //     .switchMap((rollupId: string) => this.assessService.getByRollupId(rollupId))
    //     .mergeMap((data: Assessment3[]) => [new SetAssessments(data), new FinishedLoading(true)]);

    // @Effect()
    // public fetchSummaryAggregationData = this.actions$
    //     .ofType(LOAD_SUMMARY_AGGREGATION_DATA)
    //     .pluck('payload')
    //     .switchMap((rollupId: string) => this.assessService.getSummaryAggregationByRollup(rollupId))
    //     .mergeMap((data: SummaryAggregation[]) => [new SetSummaryAggregationData(data), new FinishedLoadingSummaryAggregationData(true)])
}
