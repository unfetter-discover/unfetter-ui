import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { AssessmentMeta } from '../../models/assess/assessment-meta';

export const Assess3Form = (assessment?: AssessmentMeta) => {
    if (!assessment) {
        assessment = new AssessmentMeta();
    }

    return new FormGroup({
        title: new FormControl(assessment.title || '', Validators.required),
        description: new FormControl(assessment.description || ''),
        created_by_ref: new FormControl(assessment.created_by_ref),
    });
}
