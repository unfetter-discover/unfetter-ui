import { AttackPattern } from '../../models/attack-pattern';

export class BarChartItem {
    public constructor(public name: string, public frequency: number, public patterns: AttackPattern[]) { }
}
