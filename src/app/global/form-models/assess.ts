import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

export const AssessForm  = () => new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    categories: new FormArray([]),
});
