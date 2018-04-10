import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { KillChainPhase } from '../../models';

@Component({
    selector: 'kill-chain-phases',
    templateUrl: './kill-chain-phases.component.html'
})
export class KillChainPhasesComponent {

    @Input() public model: any;

    constructor() { }

    public addkillChainPhase(): void {
        let killChainPhase = new KillChainPhase();
        killChainPhase.kill_chain_name = '';
        killChainPhase.phase_name = '';
        if (!this.model.attributes.kill_chain_phases) {
            this.model.attributes.kill_chain_phases = [];
        }
        this.model.attributes.kill_chain_phases.unshift(killChainPhase);
    }

    public removekillChainPhase(killChainPhase: KillChainPhase): void {
        this.model.attributes.kill_chain_phases = this.model.attributes.kill_chain_phases
            .filter((h) => h !== killChainPhase);
    }

}
