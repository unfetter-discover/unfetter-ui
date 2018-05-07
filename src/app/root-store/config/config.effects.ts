import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import * as configActions from '../../root-store/config/config.actions';
import { ConfigService } from '../../core/services/config.service';
import { AttackPatternService } from '../../core/services/attack-pattern.service';
import { TacticChain, Tactic } from '../../global/components/tactics-pane/tactics.model';
import { AttackPattern } from '../../models';
import { Dictionary } from '../../models/json/dictionary';

@Injectable()
export class ConfigEffects {

    constructor(
        private actions$: Actions,
        private configService: ConfigService,
        private tacticsService: AttackPatternService,
    ) {}

    @Effect()
    public configUser = this.actions$
        .ofType(configActions.FETCH_CONFIG)
        .pluck('payload')
        .switchMap((getPublicConfig: boolean) => {
            if (getPublicConfig) {
                return this.configService.getPublicConfig();
            } else {
                return this.configService.getConfig();
            }
        })
        .map((configRes: any[]) => {
            const retVal = {};
            for (let config of configRes) {
                retVal[config.attributes.configKey] = config.attributes.configValue;
            }
            return retVal;
        })
        .map((config) => ({
            type: configActions.ADD_CONFIG,
            payload: config
        }));

    @Effect()
    public loadTactics = this.actions$
        .ofType(configActions.FETCH_TACTICS)
        .switchMap(() => {
            return Observable.forkJoin(this.configService.getConfig(), this.tacticsService.fetchByFramework());
        })
        .map(([config, patterns]) => this.createTacticsChains(config, patterns))
        .map(tactics => new configActions.LoadTactics(tactics));

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
                        return {id: phase, name: this.normalizeTerm(phase), tactics: []};
                    }),
                };
                chains[framework.name] = chain;
                return chains;
            }, {});
            patterns.forEach((pattern: AttackPattern) => {
                if (pattern && pattern.attributes && pattern.attributes.kill_chain_phases) {
                    const tactic = this.mapTactic(pattern);
                    pattern.attributes.kill_chain_phases.forEach(phase => {
                        let chain = phase.kill_chain_name;
                        if (tactics[chain]) {
                            let chainphase = tactics[chain].phases.find(p => p.id === phase.phase_name);
                            if (chainphase) {
                                chainphase.tactics.push(tactic);
                            } else {
                                console.log(`${new Date().toISOString()} bad tactic, no matching phase`, tactic, phase);
                            }
                        } else {
                            console.log(`${new Date().toISOString()} bad tactic, no matching chain`, tactic, chain);
                        }
                    });
                }
            });
            Object.values(tactics).forEach(chain =>
                chain.phases.forEach(phase => phase.tactics.sort((a, b) => a.name.localeCompare(b.name))))
            return tactics;
        }
        return {};
    }

    /**
     * @description Create a Tactic object from the given AttackPattern
     */
    private mapTactic(pattern: AttackPattern): Tactic {
        const tactic: Tactic = {
            id: pattern.id,
            name: pattern.attributes.name,
            version: pattern.attributes.version,
            created: pattern.attributes.created,
            modified: pattern.attributes.modified,
            description: pattern.attributes.description,
            sophistication_level: pattern.x_unfetter_sophistication_level,
            phases: pattern.attributes.kill_chain_phases.map(phase => phase.phase_name),
            labels: pattern.attributes.labels,
            references: pattern.attributes.external_references,
        };
        if (pattern.attributes.hasOwnProperty('extendedProperties')) {
            tactic.sources = (pattern.attributes as any).extendedProperties.x_mitre_data_sources;
            tactic.platforms = (pattern.attributes as any).extendedProperties.x_mitre_platforms;
        }
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

}
