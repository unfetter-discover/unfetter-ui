import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

export const IndicatorForm  = () => new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(),
    labels: new FormArray([]),
    pattern_lang: new FormControl(),
    pattern: new FormControl('', Validators.required),
    valid_from: new FormControl(new Date(), Validators.required),
    valid_until: new FormControl(new Date()),
    external_references: new FormArray([]),
    kill_chain_phases: new FormArray([]),
});
