
/**
 * @description object returned from the last modified assessments aggregate query
 */
export class LastModifiedAssessment {
    _id: string;
    id: string;
    rollupId: string;
    name: string;
    modified: string;
    create_by_ref: string;
}
