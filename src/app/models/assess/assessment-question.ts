import { RiskValue } from './risk-value';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 * @description
 */
export class AssessmentQuestion {
    public name: string;
    public risk: number;
    public options: RiskValue[];
    public selected_value: RiskValue;
}
