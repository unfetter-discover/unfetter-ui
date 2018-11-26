import { FormGroup, FormControl, Validators } from '@angular/forms';

export const TextTagForm = () => new FormGroup({
    stixId: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    range: new FormGroup({
        anchor: new FormGroup({
            line: new FormControl(),
            ch: new FormControl   
        }),
        head: new FormGroup({
            line: new FormControl(),
            ch: new FormControl
        })
    })
});
