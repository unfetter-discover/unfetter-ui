import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { KillChainPhasesForm } from '../../form-models/kill-chain-phases';
import { heightCollapse } from '../../animations/height-collapse';

@Component({
    selector: 'kill-chain-phases-reactive',
    templateUrl: 'kill-chain-phases.component.html',
    styleUrls: ['kill-chain-phases.component.scss'],
    animations: [heightCollapse]
})

export class KillChainPhasesReactiveComponent implements OnInit {

    @Input() public parentForm: any;

    public localForm: FormGroup;
    public showKillChainPhases: boolean = false;

    constructor() { }

    public ngOnInit() {
        this.resetForm();
    }

    public resetForm() {
        this.localForm = KillChainPhasesForm();
    }

    public addToParent() {
        this.parentForm.get('kill_chain_phases').push(this.localForm);
        this.resetForm();
    }
}
