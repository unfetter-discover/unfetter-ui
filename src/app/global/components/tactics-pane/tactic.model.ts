export interface TMark {
    label?: string,
    value?: number,
    color?: {
        style?: string,
        bg?: string,
        fg?: string,
    },
}

export interface TGloss {
    badges?: TMark[],
    notes?: TMark[],
    highlights?: TMark[],
}

export interface Tactic {
    id: string,
    name: string,
    version?: string,
    created?: Date,
    modified?: Date,
    description: string,
    sophistication_level?: number,
    phases: string[],
    labels?: string[],
    sources?: string[],
    platforms?: string[],
    analytics?: any[],
    references?: any[],
    adds?: TGloss,
}

export interface TacticPhase {
    name: string,
    tactics: Tactic[],
    adds?: TGloss,
}

export interface TacticChain {
    name: string,
    phases: TacticPhase[],
    adds?: TGloss,
}
