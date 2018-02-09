import { Phase } from '../../../models/assess/phase';
import { AssessAttackPattern } from '../../../models/assess/assess-attack-pattern';
import { AssessKillChainType } from '../../../models/assess/assess-kill-chain-type';

export class SummarySortHelper {
    public static sortByRiskDesc(): (a: AssessKillChainType, b: AssessKillChainType) => number {
        const sorter = (a: AssessKillChainType, b: AssessKillChainType) => {
            if ((!b.risk && a.risk) || (a.risk > b.risk)) {
                return -1;
            } else if ((!a.risk && b.risk) || (a.risk < b.risk)) {
                return 1;
            }
            return 0;
        };
        return sorter;
    }
    
    public static sortByAvgRiskDesc(): (a: Phase, b: Phase) => number {
        const sorter = (a: Phase, b: Phase) => {
            if ((!b.avgRisk && a.avgRisk) || (a.avgRisk > b.avgRisk)) {
                return -1;
            } else if ((!a.avgRisk && b.avgRisk) || (a.avgRisk < b.avgRisk)) {
                return 1;
            }
            return 0;
        };
        return sorter;
    }

    public static sortBySophisticationAsc(): (a: AssessAttackPattern, b: AssessAttackPattern) => number {
        const sorter = (a: AssessAttackPattern, b: AssessAttackPattern) => {
            if ((!a.x_unfetter_sophistication_level && b.x_unfetter_sophistication_level) || 
                (a.x_unfetter_sophistication_level > b.x_unfetter_sophistication_level)) {
                return 1;
            } else if ((!b.x_unfetter_sophistication_level && a.x_unfetter_sophistication_level) || 
                (a.x_unfetter_sophistication_level < b.x_unfetter_sophistication_level)) {
                return -1;
            }
            return 0;
        };
        return sorter;
    }
}


