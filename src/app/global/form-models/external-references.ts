import { FormGroup, FormControl, Validators } from '@angular/forms';

export const ExternalReferencesForm = () => new FormGroup({
    source_name: new FormControl('', Validators.required),
    external_id: new FormControl('', Validators.required),
    description: new FormControl(),
    url: new FormControl()
});
