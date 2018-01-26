import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';


import { AssessmentsSummaryService } from '../summary/assessments-summary.service';
import { LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA, LOAD_ASSESSMENT_SUMMARY_DATA, FinishedLoading, SetAssessments } from './summary.actions';
import { Assessment } from '../../../models/assess/assessment';
import { GenericApi } from '../../../core/services/genericapi.service';
import { JsonApi } from '../../models/json/jsonapi';
import { JsonApiData } from '../../../models/json/jsonapi-data';

@Injectable()
export class SummaryEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected genericServiceApi: GenericApi,
        protected assessmentSummaryService: AssessmentsSummaryService,
    ) { }

    @Effect()
    public fetchSingleAssessmentSummaryData = this.actions$
        .ofType(LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA)
        .pluck('payload')
        .switchMap((assessmentId: string) => this.assessmentSummaryService.getById(assessmentId))
        .map((data: JsonApiData<Assessment>) => new SetAssessments([data.attributes]))

    @Effect()
    public fetchAssessmentSummaryData = this.actions$
        .ofType(LOAD_ASSESSMENT_SUMMARY_DATA)
        .pluck('payload')
        .switchMap((rollupId: string) => this.assessmentSummaryService.getByRollupId(rollupId))
        .map((data) => [ ...data.map((el) => el.attributes))
        .mergeMap((data: Assessment[]) => [ new SetAssessments(data), new FinishedLoading(true)])
}
