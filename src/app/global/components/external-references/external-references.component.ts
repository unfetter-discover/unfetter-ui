import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ExternalReferencesForm } from '../../form-models/external-references';

@Component({
    selector: 'external-references-reactive',
    templateUrl: 'external-references.component.html',
    styleUrls: ['external-references.component.scss']
})

export class ExternalReferencesReactiveComponent implements OnInit {
    @Input() public parentForm: any;
    @Input() public parentDocumentType: string = 'analytic';

    public localForm: FormGroup;
    public formResetComplete = true;

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    public ngOnInit() {
        this.resetForm();     
    }

    public resetForm() {
        this.localForm = ExternalReferencesForm();
    }

    public addToParent() {
        this.parentForm.get('external_references').insert(0, this.localForm);

        this.formResetComplete = false;
        this.resetForm();
        this.changeDetectorRef.detectChanges(); // To force rerender of angular material inputs
        this.formResetComplete = true;   
    }
}
