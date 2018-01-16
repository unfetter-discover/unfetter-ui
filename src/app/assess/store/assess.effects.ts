import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as assessActions from './assess.actions';

import { FetchAssessment, StartAssessment } from './assess.actions';

import { AssessService } from '../services/assess.service';
import { AssessStateService } from '../services/assess-state.service';
import { AssessmentMeta } from '../../models/assess/assessment-meta';

@Injectable()
export class AssessEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected assessService: AssessService,
        protected assessStateService: AssessStateService,
    ) { }

    @Effect()
    public fetchAssessment = this.actions$
        .ofType(assessActions.FETCH_ASSESSMENT)
        .switchMap(() => this.assessService.load())
        .map((arr: any[]) => new assessActions.FetchAssessment(arr[0]));

    @Effect({ dispatch: false })
    public startAssessment = this.actions$
        .ofType(assessActions.START_ASSESSMENT)
        .pluck('payload')
        .map((el: AssessmentMeta) => {
            console.log('in assess effects ', assessActions.START_ASSESSMENT, el);
            return this.assessStateService.saveCurrent(el);
        })
        .do(() => {
            console.log('routing to new wizard');
            this.router.navigate(['/assess/wizard/new']);
        })
        .switchMap(() => Observable.of({ }));

}
