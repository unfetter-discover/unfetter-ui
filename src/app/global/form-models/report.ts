import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

export const ReportForm = () => {
    return new FormGroup({
        created_by_ref: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        description: new FormControl(),
        external_references: new FormArray([]),
        labels: new FormArray([]),
        metaProperties: new FormGroup({
            published: new FormControl(true)
        }),
        object_marking_refs: new FormControl([]),
    })
};
