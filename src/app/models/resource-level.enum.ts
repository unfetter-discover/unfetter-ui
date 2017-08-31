export enum ResourceLevel {
    individual = 'individual',
    club = 'club',
    contest = 'contest',
    team = 'team',
    organization = 'organization',
    government = 'government'
}

// tslint:disable-next-line:no-namespace
export namespace ResourceLevel {
    export function values(): ResourceLevel[] {
        return [
            ResourceLevel.individual, ResourceLevel.club, ResourceLevel.contest,
            ResourceLevel.team, ResourceLevel.organization, ResourceLevel.government
        ];
    }
}
