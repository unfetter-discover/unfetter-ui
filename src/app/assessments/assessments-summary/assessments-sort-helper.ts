import { SortHelper } from '../../global/static/sort-helper';
import { Risk } from './risk';
import { AverageRisk } from './average-risk';
import { AttackPattern } from '../../models/attack-pattern';

/**
 * @description sort helper scoped to models in the assessments pages
 */
export class AssessmentsSortHelper extends SortHelper {
    public static sortByRiskDesc(): (a: Risk, b: Risk) => number {
        const sorter = (a: Risk, b: Risk) => {
            if (a.risk > b.risk) {
                return -1;
            } else if (a.risk < b.risk) {
                return 1;
            }
            return 0;
        };

        return sorter;
    }

    public static sortByAvgRiskDesc(): (a: AverageRisk, b: AverageRisk) => number {
        const sorter = (a: AverageRisk, b: AverageRisk) => {
            if (a.avgRisk > b.avgRisk) {
                return -1;
            } else if (a.avgRisk < b.avgRisk) {
                return 1;
            }
            return 0;
        };

        return sorter;
    }

    public static sortBySophisticationLevelAsc(): (a: AttackPattern, b: AttackPattern) => number {
        const sorter = (a: AttackPattern, b: AttackPattern) => {
            if (a.x_unfetter_sophistication_level > b.x_unfetter_sophistication_level) {
                return 1;
            } else if (a.x_unfetter_sophistication_level < b.x_unfetter_sophistication_level) {
                return -1;
            }
            return 0;
        };

        return sorter;
    }
}
