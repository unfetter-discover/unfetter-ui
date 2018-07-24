import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { mergeMap, switchMap } from 'rxjs/operators';

import { MarkingDefinition } from 'stix';
import * as MarkingActions from './marking.actions';
import { GenericApi } from '../../core/services/genericapi.service';
import { Constance } from '../../utils/constance';

@Injectable()
export class MarkingEffects {

    @Effect()
    public fetchMarkings = this.actions$
        .ofType(MarkingActions.FETCH_MARKINGS)
        .pipe(
            switchMap(() => {
                const sort = `sort=${encodeURIComponent(JSON.stringify({ name: '1' }))}`;
                const projections = {
                    'stix.id': 1,
                    'stix.definition_type': 1,
                    'stix.definition': 1,
                };
                const project = `project=${encodeURI(JSON.stringify(projections))}`;
                const url = `${Constance.MARKINGS_URL}?${project}&${sort}`;
                console.log('querying for markings', url);
                return this.genericApi.getAs<MarkingDefinition[]>(url);
            }),
            mergeMap(markings => [ new MarkingActions.SetMarkings(markings) ])
        );

    constructor(
        private actions$: Actions,
        private genericApi: GenericApi,
    ) {
    }

}
