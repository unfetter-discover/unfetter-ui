export interface PatternHandlerTranslateAll {
    pattern: string;
    validated: boolean;
    'car-elastic': string;
    'car-splunk': string;
    'cim-splunk': string;
}

export interface PatternHandlerGetObjects {
    pattern: string;
    validated: boolean;
    object?: {
        name: string;
        property: string;
    }[]
}
