import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { KillChainPhase } from '../../models';

@Component({
  selector: 'kill-chain-phases',
  templateUrl: './kill-chain-phases.component.html'
})
export class KillChainPhasesComponent implements OnInit {

    @Input() public model: any;

     constructor() {
        console.log('Initial KillChainPhasesComponent');
    }

    public ngOnInit() {
        console.log('Initial KillChainPhasesComponent');
    }

     public addkillChainPhase(): void {
        // let id = this.attackPattern.kill_chain_phases.length + 1;
        let killChainPhase = new KillChainPhase();
        killChainPhase.killChainName = '';
        killChainPhase.phaseName = '';
        this.model.attributes.kill_chain_phases.unshift(killChainPhase);
    }

    public removekillChainPhase(killChainPhase: KillChainPhase): void {
         this.model.attributes.kill_chain_phases = this.model.attributes.kill_chain_phases.filter((h) => h !== killChainPhase);
    }
}
