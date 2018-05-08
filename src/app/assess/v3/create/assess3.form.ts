import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Assess3Meta } from 'stix/assess/v3/assess3-meta';
import { Assessment } from 'stix/assess/v2/assessment';


export const Assess3Form = (meta?: Assess3Meta) => {
    if (!meta) {
        meta = new Assess3Meta();
    }

    return new FormGroup({
        title: new FormControl(meta.title, Validators.required),
        description: new FormControl(meta.description),
        created_by_ref: new FormControl(meta.created_by_ref),
        includesIndicators: new FormControl(meta.includesIndicators),
        includesMitigations: new FormControl(meta.includesMitigations),
        baselineRef: new FormControl(meta.baselineRef),
    });
}