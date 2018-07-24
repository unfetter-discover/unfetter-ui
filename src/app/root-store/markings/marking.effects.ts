import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, Effect } from '@ngrx/effects';
import { mergeMap, switchMap } from 'rxjs/operators';
import * as MarkingActions from './marking.actions';
import { UsersService } from '../../core/services/users.service';
import { GenericApi } from '../../core/services/genericapi.service';
import { Constance } from '../../utils/constance';
import { MarkingDefinition } from '../../../../node_modules/stix';

@Injectable()
export class MarkingEffects {

    @Effect()
    public fetchMarkings = this.actions$
        .ofType(MarkingActions.FETCH_MARKINGS)
        .pipe(
            switchMap(() => {
                let url = '';
                const sort = `sort=${encodeURIComponent(JSON.stringify({ name: '1' }))}`;
                const projections = {
                    'stix.id': 1,
                    'stix.type': 1,
                    'stix.definition_type': 1,
                    'stix.definition': 1,
                };
                const project = `project=${encodeURI(JSON.stringify(projections))}`;
                url = `${Constance.ATTACK_PATTERN_URL}?${project}&${sort}`;
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
