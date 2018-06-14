
import {mergeMap, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { UsersService } from '../../core/services/users.service';
import * as identityActions from './identity.actions';

@Injectable()
export class IdentityEffects {

    @Effect()
    public fetchIdentities = this.actions$
        .ofType(identityActions.FETCH_IDENTITIES).pipe(
        switchMap(() => this.usersService.getOrganizations()),
        mergeMap(identities => [
            new identityActions.SetIdentities(identities.map(x => x.attributes))
        ]),);

    constructor(
        private actions$: Actions,
        private usersService: UsersService,
    ) {
    }

}
