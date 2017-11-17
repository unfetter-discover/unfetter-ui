import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

export const ObservedDataForm = () => new FormGroup({
    name: new FormControl('', Validators.required),
    action: new FormControl('', Validators.required),
    property: new FormControl('', Validators.required)
});
