
import { mergeMap, switchMap, map, withLatestFrom, filter, tap, take } from 'rxjs/operators';
import { forkJoin as observableForkJoin, of as observableOf, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MarkingDefinition, AttackPattern, IntrusionSet } from 'stix';
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
            switchMap(() => {

                const markingOptions: StixApiOptions = {
                    sort: {
                        'stix.name': 1
                    },
                    project: {
                        'stix.id': 1,
                        'stix.definition_type': 1,
                        'stix.definition': 1,
                    }
                };

                const intrusionOptions: StixApiOptions = {
                    sort: {
                        'stix.name': 1
                    }
                };
                return forkJoin(
                    this.usersService.getOrganizations().pipe(RxjsHelpers.unwrapJsonApi()),
                    this.genericApi.getStix<MarkingDefinition[]>(StixUrls.MARKING_DEFINITION, null, markingOptions),
                    this.attackPatternService.fetchByFramework().pipe(RxjsHelpers.unwrapJsonApi()),
                    this.genericApi.getStix<IntrusionSet[]>(StixUrls.INTRUSION_SET, null, intrusionOptions)
                );
            }),
            mergeMap(([identities, markings, attackPatterns, sets]) => [
                new stixActions.SetIdentities(identities),
                new stixActions.SetMarkingDefinitions(markings),
                new stixActions.SetAttackPatterns(attackPatterns as any),
                new stixActions.SetIntrusionSets(sets),
                new stixActions.SetLoadingComplete(true)
            ])
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
