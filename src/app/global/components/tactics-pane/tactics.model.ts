interface Marking {
    label?: string,
    value?: number,
    color?: {
        style?: string | boolean,
        bg?: string,
        fg?: string,
    },
}

interface Features {
    badges?: Marking[],
    notes?: Marking[],
    highlights?: Marking[],
}

export interface Tactic {
    id: string,
    name: string,
    version?: string,
    created?: Date,
    modified?: Date,
    description: string,
    sophistication_level?: number,
    framework?: string,
    phases: string[],
    labels?: string[],
    sources?: string[],
    platforms?: string[],
    analytics?: any[],
    references?: any[],
    adds?: Features,
}

export interface TacticPhase {
    id: string,
    name: string,
    tactics: Tactic[],
    adds?: Features,
}

export interface TacticChain {
    id: string,
    name: string,
    phases: TacticPhase[],
    adds?: Features,
}
