
import { mergeMap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UsersService } from '../../core/services/users.service';
import * as stixActions from './stix.actions';

@Injectable()
export class StixEffects {

    @Effect()
    public fetchIdentities = this.actions$
        .ofType(stixActions.FETCH_IDENTITIES).pipe(
        switchMap(() => this.usersService.getOrganizations()),
        mergeMap(identities => [
            new stixActions.SetIdentities(identities.map(x => x.attributes))
        ]));

    constructor(
        private actions$: Actions,
        private usersService: UsersService,
    ) {
    }

}
