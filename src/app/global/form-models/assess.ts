import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Assessment } from '../../models/asssess/assessment';

export const AssessForm = (assessment?: Assessment) => {
    if (!assessment) {
        assessment = new Assessment();
    }

    return new FormGroup({
        title: new FormControl(assessment.title || ''),
        description: new FormControl(assessment.description || ''),
        includesIndicators: new FormControl(assessment.includesIndicators),
        includesMitigations: new FormControl(assessment.includesMitigations),
        includesSensors: new FormControl(assessment.includesSensors),
    });
}
