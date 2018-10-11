import { FormGroup, FormControl, Validators } from '@angular/forms';

export const AdditionalQueriesForm = () => new FormGroup({
    name: new FormControl('', Validators.required),
    query: new FormControl('', Validators.required),
    details: new FormControl(''),
    syntax: new FormControl('')
});
