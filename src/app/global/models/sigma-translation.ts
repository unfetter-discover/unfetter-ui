/**
 * @description See backend_names in stix2pattern/translatesigma/__init__.py
 */
export enum SigmaSupportedBackends {
    SPLUNK = 'splunk',
    QRADAR = 'qradar',
    ELASTIC_QUERY_STRING = 'es-qs'
}

export interface SigmaTranslation {
    tool: SigmaSupportedBackends;
    query: string;
}

export interface SigmaTranslations {
    pattern: string;
    validated: boolean;
    message?: string;
    translations?: SigmaTranslation[]
}
