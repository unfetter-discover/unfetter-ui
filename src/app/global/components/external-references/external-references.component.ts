import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ExternalReferencesForm } from '../../form-models/external-references';
import { heightCollapse } from '../../animations/height-collapse';

@Component({
    selector: 'external-references-reactive',
    templateUrl: 'external-references.component.html',
    styleUrls: ['external-references.component.scss'],
    animations: [heightCollapse]
})

export class ExternalReferencesReactiveComponent implements OnInit {
    @Input() public parentForm: any;

    public localForm: FormGroup; 
    public showExternalReferences: boolean = false;

    constructor() { }

    public ngOnInit() {
        this.resetForm();
    }

    public resetForm() {
        this.localForm = ExternalReferencesForm();
    }

    public addToParent() {
        this.parentForm.get('external_references').push(this.localForm);
        this.resetForm();
    }
}
