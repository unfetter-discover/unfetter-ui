export interface SearchParameters {
    indicatorName: string,
    killChainPhases: string[],
    labels: string[],
    organizations: string[],
    sensors: string[],
    attackPatterns: string[],
    published: string[] // Should be boolean[], but mat-option is being finicky
}
