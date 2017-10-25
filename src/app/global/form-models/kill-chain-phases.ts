import { FormGroup, FormControl, Validators } from '@angular/forms';

export const KillChainPhasesForm = () => new FormGroup({
    kill_chain_name: new FormControl('', Validators.required),
    phase_name: new FormControl('', Validators.required)
});
