import { AssessAttackPattern } from 'stix/assess/v2/assess-attack-pattern';
import { AssessKillChainType } from 'stix/assess/v2/assess-kill-chain-type';
import { Phase } from 'stix/assess/v2/phase';
import { SortHelper } from '../../../../global/static/sort-helper';

export class SummarySortHelper extends SortHelper {

    public static sortByRiskDesc(): (a: AssessKillChainType, b: AssessKillChainType) => number {
        const sorter = (a: AssessKillChainType, b: AssessKillChainType) => {
            if (b.risk || (b.risk === 0)) {
                if (a.risk || (a.risk === 0)) {
                    return b.risk - a.risk;
                }
                return 1;
            }
            if (a.risk || (a.risk === 0)) {
                return -1;
            }
            return 0;
        };
        return sorter;
    }

    public static sortByAvgRiskDesc(): (a: Phase, b: Phase) => number {
        const sorter = (a: Phase, b: Phase) => {
            if (b.avgRisk || (b.avgRisk === 0)) {
                if (a.avgRisk || (a.avgRisk === 0)) {
                    return b.avgRisk - a.avgRisk;
                }
                return 1;
            }
            if (a.avgRisk || (a.avgRisk === 0)) {
                return -1;
            }
            return 0;
        };
        return sorter;
    }

    public static sortBySophisticationAsc(): (a: AssessAttackPattern, b: AssessAttackPattern) => number {
        const sorter = (a: AssessAttackPattern, b: AssessAttackPattern) => {
            if (a.x_unfetter_sophistication_level || (a.x_unfetter_sophistication_level === 0)) {
                if (b.x_unfetter_sophistication_level || (b.x_unfetter_sophistication_level === 0)) {
                    return a.x_unfetter_sophistication_level - b.x_unfetter_sophistication_level;
                }
                return -1;
            }
            if (b.x_unfetter_sophistication_level || (b.x_unfetter_sophistication_level === 0)) {
                return 1;
            }
            return 0;
        };
        return sorter;
    }
}


