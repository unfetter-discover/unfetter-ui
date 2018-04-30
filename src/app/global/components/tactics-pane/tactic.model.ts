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
    values?: Array<{name: string, color: string}>,
    color?: {background: string, foreground: string},
}

export interface Phase {
    framework: string,
    name: string,
    tactics: Tactic[],
    values?: Array<{name: string, color: string}>,
    color?: {background: string, foreground: string},
}
