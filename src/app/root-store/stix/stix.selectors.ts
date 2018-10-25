import { createSelector } from '@ngrx/store';
import { Identity, AttackPattern } from 'stix';
import { Dictionary } from 'stix/common/dictionary';

import { AppState } from '../app.reducers';
import { TacticChain, Tactic } from '../../global/components/tactics-pane/tactics.model';
import { getConfigState } from '../config/config.selectors';

export const getStixState = (state: AppState) => state.stix;

export const getOrganizations = createSelector(
    getStixState,
    (stixState): Identity[] => {
        if (stixState && stixState.identities) {
            return stixState.identities
                .filter((identity) => identity.identity_class && identity.identity_class.toLowerCase() === 'organization');
        } else {
            return null;
        }
    }
);

export const getVisualizationData = createSelector(
    getStixState,
    getConfigState,
    (stixState, configState): Dictionary<TacticChain> => {
        if (stixState.attackPatterns && stixState.attackPatterns.length && configState.configurations.killChains && configState.configurations.killChains.length) {
            return createTacticsChains(configState.configurations.killChains, stixState.attackPatterns as any)
        } else {
            return {};
        }
    }
);

export const getAttackPatternsWithArbitrarilyRenamedPropertiesForHeatMap = createSelector(
    getStixState,
    (stixState): Tactic[] => {
        if (stixState.attackPatterns && stixState.attackPatterns.length) {
            return stixState.attackPatterns.map(ap => mapTactic(ap));
        } else {
            return [];
        }
    }
);

/**
 * @description Group the given attack patterns into TacticChain objects, ordered according to the configuration
 */
function createTacticsChains(killChains: any, patterns: AttackPattern[]) {
    const tactics: Dictionary<TacticChain> = killChains.reduce((chains, framework) => {
        const chain: TacticChain = {
            id: framework.name,
            name: normalizeTerm(framework.name),
            phases: framework.phase_names.map(phase => {
                return { id: phase, name: normalizeTerm(phase), tactics: [] };
            }),
        };
        chains[framework.name] = chain;
        return chains;
    }, {});
    patterns.forEach((pattern: any) => {
        if (pattern && pattern && pattern.kill_chain_phases) {
            const tactic = mapTactic(pattern);
            pattern.kill_chain_phases.forEach(phase => {
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
function mapTactic(pattern: any): Tactic {
    const tactic: Tactic = {
        id: pattern.id,
        name: pattern.name,
        version: pattern.version,
        created: pattern.created,
        modified: pattern.modified,
        description: pattern.description,
        sophistication_level: pattern.x_unfetter_sophistication_level,
        phases: pattern.kill_chain_phases.map(phase => phase.phase_name),
        labels: pattern.labels || [],
        sources: (pattern as any).x_mitre_data_sources || [],
        platforms: (pattern as any).x_mitre_platforms || [],
        references: pattern.external_references || [],
        analytics: [],
    };
    return tactic;
}

/**
 * @description convert the given term into something more human-readable
 */
function normalizeTerm(term: string): string {
return term
    .replace(/\-/g, ' ')
    .split(/\s+/)
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(' ')
    .replace(/\sAnd\s/g, ' and ')
}
