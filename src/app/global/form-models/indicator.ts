import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { ExternalReferencesForm } from './external-references';
import { KillChainPhasesForm } from './kill-chain-phases';

export const IndicatorForm  = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(),
    labels: new FormArray([new FormControl()]),
    pattern_lang: new FormControl(),
    pattern: new FormControl('', Validators.required),
    valid_from: new FormControl(new Date(), Validators.required),
    valid_until: new FormControl(new Date()),
    external_references: new FormArray([ExternalReferencesForm]),
    kill_chain_phases: new FormArray([KillChainPhasesForm]),
}); 
