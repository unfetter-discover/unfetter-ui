import { LastModifiedStix } from '../../../global/models/last-modified-stix';

/**
 * @description object returned from the last modified assessments aggregate query
 */
export class LastModifiedAssessment extends LastModifiedStix {
    rollupId: string;
}
