import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

export const ExternalReportForm = () => new FormGroup({
    external_ref_name: new FormControl('', Validators.required),
    external_ref_source_name: new FormControl('', Validators.required),
    external_ref_external_id: new FormControl('', Validators.required),
    external_ref_description: new FormControl(),
    external_ref_url: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl(),
    granular_markings: new FormArray([]),
    external_references: new FormArray([]),
    kill_chain_phases: new FormArray([]),
    object_refs: new FormArray([])
});
