import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as assessActions from './assess.actions';

import { AssessService } from '../assess.service';
import { FetchAssessment } from './assess.actions';

@Injectable()
export class AssessEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected assessService: AssessService,
    ) {

    }
    @Effect()
    public fetchAssessment = this.actions$
        .ofType(assessActions.FETCH_ASSESSMENT)
        .switchMap(() => this.assessService.load())
        .map((arr: any[]) => new assessActions.FetchAssessment(arr[0]));


    @Effect({ dispatch: false })
    public startAssessment = this.actions$
        .ofType(assessActions.START_ASSESSMENT)
        .map((el) => {
            console.log('in effects for ', assessActions.START_ASSESSMENT, el);
            return el;
        });
//         @Effect({ dispatch: false })
// navigate$ = this.actions$.pipe(
//   ofType(RouterActions.GO),
//   map((action: RouterActions.Go) => action.payload),
//   tap(({ path, query: queryParams, extras})
//     => this.router.navigate(path, { queryParams, ...extras }))
// )

}
