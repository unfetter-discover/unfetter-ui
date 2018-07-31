
import { mergeMap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MarkingDefinition } from 'stix';

import { UsersService } from '../../core/services/users.service';
import * as stixActions from './stix.actions';
import { GenericApi } from '../../core/services/genericapi.service';
import { Constance } from '../../utils/constance';

@Injectable()
export class StixEffects {

    @Effect()
    public fetchIdentities = this.actions$
        .ofType(stixActions.FETCH_IDENTITIES).pipe(
        switchMap(() => this.usersService.getOrganizations()),
        mergeMap(identities => [
            new stixActions.SetIdentities(identities.map(x => x.attributes))
        ]));

    @Effect()
    public fetchMarkings = this.actions$
        .ofType(stixActions.FETCH_MARKING_DEFINITIONS)
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
                return this.genericApi.getAs<MarkingDefinition[]>(url);
            }),
            mergeMap(markings => [new stixActions.SetMarkingDefinitions(markings)])
        );

    constructor(
        private actions$: Actions,
        private usersService: UsersService,
        private genericApi: GenericApi,
    ) {
    }

}
