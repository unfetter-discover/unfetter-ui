import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { BaselineMeta } from '../../models/baseline/baseline-meta';

export const BaselineForm = (assessment?: BaselineMeta) => {
    if (!assessment) {
        assessment = new BaselineMeta();
    }

    return new FormGroup({
        title: new FormControl(assessment.title || '', Validators.required),
        description: new FormControl(assessment.description || ''),
        created_by_ref: new FormControl(assessment.created_by_ref || '', Validators.required),
    });
}
