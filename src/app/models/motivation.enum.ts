export enum Motivation {
    accidental = 'accidental',
    coercion = 'coercion',
    dominance = 'dominance',
    ideology = 'ideology',
    notoriety = 'notoriety',
    'organizational-gain' = 'organizational gain',
    'personal-gain' = 'personal gain',
    'personal-satisfaction' = 'personal satisfaction',
    revenge = 'revenge',
    unpredictable = 'unpredictable'
}

// tslint:disable-next-line:no-namespace
export namespace Motivation {
    export function values(): Motivation[] {
        return [
            Motivation.accidental, Motivation.coercion, Motivation.dominance,
            Motivation['organizational-gain'], Motivation['personal-gain'],
            Motivation['personal-satisfaction'], Motivation.ideology, Motivation.notoriety,
            Motivation.revenge, Motivation.unpredictable
        ];
    }
}
