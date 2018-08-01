
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
            switchMap(() => this.store.select('config')
                .pipe(
                    filter((configState: ConfigState) => configState.configurations.killChains && configState.configurations.killChains.length),
                    take(1)
                )
            ),
            switchMap((configState: ConfigState) => {
                return observableForkJoin(
                    observableOf(configState.configurations.killChains), 
                    this.attackPatternService.fetchByFramework()
                );
            }),
            map(([killChains, patterns]) => this.createTacticsChains(killChains, patterns as any)),
            map(attackPatterns => new stixActions.SetAttackPatterns(attackPatterns))
        );
    
    /**
     * @description Group the given attack patterns into TacticChain objects, ordered according to the configuration
     */
    private createTacticsChains(killChains: any, patterns: AttackPattern[]) {
        const tactics: Dictionary<TacticChain> = killChains.reduce((chains, framework) => {
            const chain: TacticChain = {
                id: framework.name,
                name: this.normalizeTerm(framework.name),
                phases: framework.phase_names.map(phase => {
                    return { id: phase, name: this.normalizeTerm(phase), tactics: [] };
                }),
            };
            chains[framework.name] = chain;
            return chains;
        }, {});
        patterns.forEach((pattern: any) => {
            if (pattern && pattern.attributes && pattern.attributes.kill_chain_phases) {
                const tactic = this.mapTactic(pattern);
                pattern.attributes.kill_chain_phases.forEach(phase => {
                    let chain = phase.kill_chain_name;
                    if (tactics[chain]) {
                        /* tslint:disable:triple-equals */
                        let chainphase = tactics[chain].phases.find(p => p.id == phase.phase_name);
                        /* tslint:enable:triple-equals */
                        if (chainphase) {
                            chainphase.tactics.push(tactic);
                        } else {
                            console.log(`${new Date().toISOString()} bad tactic, no matching phase`,
                                tactic, phase, chain, tactics[chain]);
                        }
                    } else {
                        console.log(`${new Date().toISOString()} bad tactic, no matching chain`, tactic, chain);
                    }
                });
            }
        });
        Object.values(tactics).forEach(chain => {
            const orderedPhases = chain.phases.map(phase => phase.name);
            chain.phases.forEach(phase => {
                phase.tactics.forEach(tactic => {
                    return tactic.phases.sort((a, b) => orderedPhases.indexOf(a) - orderedPhases.indexOf(b));
                });
                phase.tactics.sort((a, b) => a.name.localeCompare(b.name));
            });
        })
        return tactics;
    }

    /**
     * @description Create a Tactic object from the given AttackPattern
     */
    private mapTactic(pattern: any): Tactic {
        const tactic: Tactic = {
            id: pattern.id,
            name: pattern.attributes.name,
            version: pattern.attributes.version,
            created: pattern.attributes.created,
            modified: pattern.attributes.modified,
            description: pattern.attributes.description,
            sophistication_level: pattern.x_unfetter_sophistication_level,
            phases: pattern.attributes.kill_chain_phases.map(phase => phase.phase_name),
            labels: pattern.attributes.labels || [],
            sources: (pattern.attributes as any).x_mitre_data_sources || [],
            platforms: (pattern.attributes as any).x_mitre_platforms || [],
            references: pattern.attributes.external_references || [],
            analytics: [],
        };
        return tactic;
    }

    /**
     * @description convert the given term into something more human-readable
     */
    protected normalizeTerm(term: string): string {
        return term
            .replace(/\-/g, ' ')
            .split(/\s+/)
            .map(w => w[0].toUpperCase() + w.slice(1))
            .join(' ')
            .replace(/\sAnd\s/g, ' and ')
            ;
    }

    constructor(
        private actions$: Actions,
        private usersService: UsersService,
        private genericApi: GenericApi,
        private attackPatternService: AttackPatternService,
        private store: Store<AppState>
    ) {
    }

}
