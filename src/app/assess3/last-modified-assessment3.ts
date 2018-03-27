import { LastModifiedStix } from '../global/models/last-modified-stix';

/**
 * @description object returned from the last modified assessments 3.0 aggregate query
 */
export class LastModifiedAssessment3 extends LastModifiedStix {
    rollupId: string;
}
