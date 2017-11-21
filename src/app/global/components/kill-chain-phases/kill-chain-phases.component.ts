import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { KillChainPhasesForm } from '../../form-models/kill-chain-phases';
import { heightCollapse } from '../../animations/height-collapse';
import { ConfigService } from '../../../core/services/config.service';

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
    public killChainRaw: any[] = []
    public killChainNames: string[] = [];
    public distinctKillChainPhases: string[] = [];

    constructor(private configService: ConfigService) { }

    public ngOnInit() {
        this.resetForm();
        this.configService.getConfigPromise()
            .then((res) => {
                this.killChainRaw = res.killChains;
                this.killChainNames = res.killChains.map((kc) => kc.name);
                this.distinctKillChainPhases = res.killChains
                    .map((kc) => kc.phase_names)
                    .reduce((prev, cur) => prev.concat(cur), [])
                    .filter((phase, pos, arr) => arr.indexOf(phase) === pos);
            })
            .catch((err) => console.log(err));
    }

    public resetForm() {
        this.localForm = KillChainPhasesForm();
    }

    public getDisplayedKillchains() {
        const matchingKillchain = this.killChainRaw.find((kc) => kc.name.toLowerCase() === this.localForm.get('kill_chain_name').value.toLowerCase());
        if (!matchingKillchain) {
            return this.distinctKillChainPhases;
        } else {
            return matchingKillchain.phase_names;
        }
    }

    public addToParent() {
        this.parentForm.get('kill_chain_phases').push(this.localForm);
        this.resetForm();
    }
}
