import { FormGroup, FormControl, Validators } from '@angular/forms';

export const ExternalReferencesForm = () => new FormGroup({
    source_name: new FormControl('', Validators.required),
    external_id: new FormControl(),
    description: new FormControl(),
    // URL is not required by the STIX schema, but we require it
    url: new FormControl('', Validators.required)
});
