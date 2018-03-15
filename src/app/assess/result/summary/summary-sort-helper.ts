import { Phase } from '../../../models/assess/phase';
import { AssessAttackPattern } from '../../../models/assess/assess-attack-pattern';
import { AssessKillChainType } from '../../../models/assess/assess-kill-chain-type';
import { SortHelper } from '../../../global/static/sort-helper';

export class SummarySortHelper extends SortHelper {

    public static isFirstValueOnlyUnset(firstValue: any, otherValue: any) {
        let firstValueOnlyIsUnset = false;
        if (firstValue !== 0) {
            if (!firstValue && (otherValue || otherValue === 0)) {
                firstValueOnlyIsUnset = true;
            }
        }
        return firstValueOnlyIsUnset;
    }

    public static sortByRiskDesc(): (a: AssessKillChainType, b: AssessKillChainType) => number {
        const sorter = (a: AssessKillChainType, b: AssessKillChainType) => {
            if (this.isFirstValueOnlyUnset(b.risk, a.risk) || b.risk < a.risk) {
                return -1;
            } else if (this.isFirstValueOnlyUnset(a.risk, b.risk) || (a.risk < b.risk)) {
                return 1;
            }
            return 0;
        };
        return sorter;
    }

    public static sortByAvgRiskDesc(): (a: Phase, b: Phase) => number {
        const sorter = (a: Phase, b: Phase) => {
            if (this.isFirstValueOnlyUnset(b.avgRisk, a.avgRisk) || b.avgRisk < a.avgRisk) {
                return -1;
            } else if (this.isFirstValueOnlyUnset(a.avgRisk, b.avgRisk) || a.avgRisk < b.avgRisk) {
                return 1;
            }
            return 0;
        };
        return sorter;
    }

    public static sortBySophisticationAsc(): (a: AssessAttackPattern, b: AssessAttackPattern) => number {
        const sorter = (a: AssessAttackPattern, b: AssessAttackPattern) => {
            if (this.isFirstValueOnlyUnset(a.x_unfetter_sophistication_level, b.x_unfetter_sophistication_level) ||
                a.x_unfetter_sophistication_level > b.x_unfetter_sophistication_level) {
                return 1;
            } else if (this.isFirstValueOnlyUnset(b.x_unfetter_sophistication_level, a.x_unfetter_sophistication_level) ||
                b.x_unfetter_sophistication_level > a.x_unfetter_sophistication_level) {
                return -1;
            }
            return 0;
        };
        return sorter;
    }
}


