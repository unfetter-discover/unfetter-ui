
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { forkJoin as observableForkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MarkingDefinition, AttackPattern } from 'stix';
import { Dictionary } from 'stix/common/dictionary';

import { UsersService } from '../../core/services/users.service';
import * as stixActions from './stix.actions';
import { GenericApi } from '../../core/services/genericapi.service';
import { Constance } from '../../utils/constance';
import { AttackPatternService } from '../../core/services/attack-pattern.service';
import { TacticChain, Tactic } from '../../global/components/tactics-pane/tactics.model';
import { ConfigService } from '../../core/services/config.service';

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

    @Effect()
    public fetchAttackPatterns = this.actions$
        .ofType(stixActions.FETCH_ATTACK_PATTERNS)
        .pipe(
            switchMap(() => {
                return observableForkJoin(
                    this.configService.getConfig({ configKey: 'killChains' }), this.attackPatternService.fetchByFramework()
                );
            }),
            map(([config, patterns]) => this.createTacticsChains(config, patterns as any)),
            map(attackPatterns => new stixActions.SetAttackPatterns(attackPatterns))
        );
    
    /**
     * @description Group the given attack patterns into TacticChain objects, ordered according to the configuration
     */
    private createTacticsChains(config: any, patterns: AttackPattern[]) {
        const killChains = config.find(cfg => cfg.attributes.configKey === 'killChains');
        if (killChains) {
            const tactics: Dictionary<TacticChain> = killChains.attributes.configValue.reduce((chains, framework) => {
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
        return {};
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
        private configService: ConfigService,
    ) {
    }

}
