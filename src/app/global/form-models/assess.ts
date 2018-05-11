import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssessmentMeta } from 'stix/assess/v2/assessment-meta';

export const AssessForm = (assessment?: AssessmentMeta) => {
    if (!assessment) {
        assessment = new AssessmentMeta();
    }

    return new FormGroup({
        title: new FormControl(assessment.title || '', Validators.required),
        description: new FormControl(assessment.description || ''),
        created_by_ref: new FormControl(assessment.created_by_ref),
        includesIndicators: new FormControl(assessment.includesIndicators),
        includesMitigations: new FormControl(assessment.includesMitigations),
        includesSensors: new FormControl(assessment.includesSensors),
    });
}
