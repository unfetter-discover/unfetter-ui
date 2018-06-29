
import { switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UsersService } from '../../core/services/users.service';
import * as stixActions from './stix.actions';
import { AttackPatternService } from '../../core/services/attack-pattern.service';

@Injectable()
export class StixEffects {

    @Effect()
    public fetchIdentities = this.actions$
        .ofType(stixActions.FETCH_IDENTITIES)
        .pipe(
            switchMap(() => this.usersService.getOrganizations()),
            map(identities => new stixActions.SetIdentities(identities.map(x => x.attributes)))
        );
        
    @Effect()
    public fetchAttackPatterns = this.actions$
        .ofType(stixActions.FETCH_ATTACK_PATTERNS)
        .pipe(
            switchMap(() => this.attackPatternService.fetchAttackPatterns()),
            map(aps => new stixActions.SetAttackPatterns(aps))
        );

    constructor(
        private actions$: Actions,
        private usersService: UsersService,
        private attackPatternService: AttackPatternService
    ) { }
}
