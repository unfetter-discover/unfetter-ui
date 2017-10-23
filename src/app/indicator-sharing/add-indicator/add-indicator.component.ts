import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IndicatorForm } from '../../global/form-models/indicator';

@Component({
    selector: 'add-indicator',
    templateUrl: 'add-indicator.component.html',
    styleUrls: ['add-indicator.component.scss']
})

export class AddIndicatorComponent implements OnInit {

    public form: FormGroup;

    constructor() { }

    public ngOnInit() {
        this.form = IndicatorForm;
        console.log(this.form);        
    }

    public submitIndicator() {
        
    }
}
