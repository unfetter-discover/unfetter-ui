import { FormGroup, FormControl, Validators } from '@angular/forms';

export const ArticleForm = () => new FormGroup({
    name: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    metaProperties: new FormGroup({
        relationships: new FormControl([])
    })
});
