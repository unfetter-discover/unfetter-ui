
import { mergeMap, switchMap, map, withLatestFrom, filter, tap, take } from 'rxjs/operators';
import { forkJoin as observableForkJoin, of as observableOf } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MarkingDefinition, AttackPattern } from 'stix';
import { Dictionary } from 'stix/common/dictionary';
import { Store } from '@ngrx/store';

import { UsersService } from '../../core/services/users.service';
import * as stixActions from './stix.actions';
import { GenericApi } from '../../core/services/genericapi.service';
import { AttackPatternService } from '../../core/services/attack-pattern.service';
import { TacticChain, Tactic } from '../../global/components/tactics-pane/tactics.model';
import { StixUrls } from '../../global/enums/stix-urls.enum';
import { StixApiOptions } from '../../global/models/stix-api-options';
import { AppState } from '../app.reducers';
import { ConfigState } from '../config/config.reducers';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';

@Injectable()
export class StixEffects {

    @Effect()
    public fetchStix = this.actions$
        .ofType(stixActions.FETCH_STIX)
        .pipe(
            mergeMap(() => [
                new stixActions.FetchAttackPatterns(),
                new stixActions.FetchIdentities(),
                new stixActions.FetchMarkingDefinitions(),
            ])
        );

    @Effect()
    public fetchIdentities = this.actions$
        .ofType(stixActions.FETCH_IDENTITIES)
        .pipe(
            switchMap(() => this.usersService.getOrganizations()),
            RxjsHelpers.unwrapJsonApi(),
            map(identities => new stixActions.SetIdentities(identities))
        );

    @Effect()
    public fetchMarkings = this.actions$
        .ofType(stixActions.FETCH_MARKING_DEFINITIONS)
        .pipe(
            switchMap(() => {
                const options: StixApiOptions = {
                    sort: { 
                        'stix.name': 1 
                    },
                    project: {
                        'stix.id': 1,
                        'stix.definition_type': 1,
                        'stix.definition': 1,
                    }
                };
                return this.genericApi.getStix<MarkingDefinition[]>(StixUrls.MARKING_DEFINITION, null, options);
            }),
            map(markings => new stixActions.SetMarkingDefinitions(markings))
        );

    @Effect()
    public fetchAttackPatterns = this.actions$
        .ofType(stixActions.FETCH_ATTACK_PATTERNS)
        .pipe(
            switchMap(() => this.attackPatternService.fetchByFramework()),
            RxjsHelpers.unwrapJsonApi(),
            map(attackPatterns => new stixActions.SetAttackPatterns(attackPatterns as any))
        );    

    constructor(
        private actions$: Actions,
        private usersService: UsersService,
        private genericApi: GenericApi,
        private attackPatternService: AttackPatternService,
        private store: Store<AppState>
    ) {
    }

}
