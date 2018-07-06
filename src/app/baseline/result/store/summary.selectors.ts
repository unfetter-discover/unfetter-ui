import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ConfigState } from "../../../root-store/config/config.reducers";
import { Dictionary } from "stix/common/dictionary";
import { TacticChain } from "../../../global/components/tactics-pane/tactics.model";
import { getPreferredKillchain } from "../../../root-store/users/user.selectors";

const getConfigState = createFeatureSelector<ConfigState>('config');

export const getTacticsChains = createSelector(
    getConfigState,
    (state: ConfigState) => state.tacticsChains
);

export const getAttackPatternCount = createSelector(
    getPreferredKillchain,
    getTacticsChains,
    (prefKillChain: string, tacticsChains: Dictionary<TacticChain>) => {
        JSON.stringify(tacticsChains);

        JSON.stringify(prefKillChain);

        const kc = tacticsChains[prefKillChain];

        let apCount = 0;
        kc.phases.map((phase) => apCount += phase.tactics.length);

        // const frameworkKeys = Object.keys(tacticsChains);
        // const frameworksMatched = frameworkKeys.filter((key) => {
        //     const hasId = tacticsChains[key].phases.some((el) => assessedPhaseIdSet.has(el.id));
        //     return hasId;
        // });

        // if (!frameworksMatched || frameworksMatched.length < 1) {
        //     console.log(`could not determine the correct framework for the unassessed phases. attempting to move on...`);
        //     return group.unassessedPhases;
        // }

        // const curFrameworkKey = frameworksMatched[0];
        // const curFrameworkPhases = tacticsChains[curFrameworkKey].phases;
        // const curFrameworkUnassessedPhases = curFrameworkPhases
        //     .filter((phase) => assessedPhases.indexOf(phase.id) < 0)
        //     .map((phase) => phase.id);
        // return curFrameworkUnassessedPhases;
        return apCount;
    },
);
