import { PatternHandlerPatternObject } from '../../global/models/pattern-handlers';

export interface SearchParameters {
    indicatorName: string,
    killChainPhases: string[],
    labels: string[],
    organizations: string[],
    sensors: string[],
    attackPatterns: string[],
    published: string[], // Should be boolean[], but mat-option is being finicky
    dataSources: string[],
    intrusionSets: string[], // Intrusion sets are not handled by the backend, they are used to add attack patterns to the filter
    validStixPattern: boolean,
    observedData: PatternHandlerPatternObject[],
    intrusionSetAttackPatterns?: string[], // Only used for final request to server
}
