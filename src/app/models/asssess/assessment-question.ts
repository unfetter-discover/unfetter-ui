import { RiskValue } from './risk-value';

/**
 * @description
 */
export class AssessmentQuestion {
    public name: string;
    public risk: number;
    public options: RiskValue[];
    public selected_value: RiskValue;
}
