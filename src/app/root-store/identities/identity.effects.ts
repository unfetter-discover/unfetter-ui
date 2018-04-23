import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../../core/services/users.service';
import * as identityActions from './identity.actions';

@Injectable()
export class IdentityEffects {

    // Initial token refresh delay until configuration is loaded
    private refreshTokenDelayMS: number = 10000;

    // The buffer between a token expiring and refresh attempts being made
    private refreshBufferPercent: number = 0.3;

    private tokenInitialized: boolean = false;

    private doRefreshToken: boolean = false;

    @Effect()
    public fetchIdentities = this.actions$
        .ofType(identityActions.FETCH_IDENTITIES)
        .switchMap(() => this.usersService.getOrganizations())
        .mergeMap(identities => [
            new identityActions.FetchIdentities(identities.map(x => x.attributes))
        ]);

    constructor(
        private actions$: Actions,
        private usersService: UsersService,
    ) {
    }

}
