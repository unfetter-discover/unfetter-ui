
/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 */
export enum StixLabelEnum {
    ATTACK_PATTERN = 'attack-pattern',
    CAMPAIGN = 'campaign',
    COURSE_OF_ACTION = 'course-of-action',
    IDENTITY = 'identity',
    INDICATOR = 'indicator',
    MALWARE = 'malware',
    REPORT = 'report',
    OBSERVED_DATA = 'observed-data',
    THREAT_REPORT = 'threat-report',
    THREAT_ACTOR = 'threat-actor',
    TOOL = 'tool',
    VULNERABILITY = 'vulnerability',

    SENSOR = 'x-unfetter-sensor',
    CAPABILITY = 'x-unfetter-capability',
    ASSESSMENT = 'x-unfetter-assessment',
    ASSESSMENT3= 'x-unfetter-object-assessment'
}
