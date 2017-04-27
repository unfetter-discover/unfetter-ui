import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { AttackPatternsService } from '../attack-patterns.service';
import { AttackPattern, ExternalReference, KillChainPhase } from '../../../models';

@Component({
    selector: 'attack-pattern-edit',
    templateUrl: './attack-pattern-edit.component.html'
})
export class AttackPatternEditComponent extends BaseStixComponent implements OnInit {
     private attackPattern: AttackPattern = <AttackPattern> {};

    constructor(
        private attackPatternsService: AttackPatternsService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(attackPatternsService, route, router, dialog, location);
    }

    public ngOnInit() {
        let subscription =  super.get().subscribe(
            (data) => {
                this.attackPattern = data as AttackPattern;
            }, (error) => {
                // handle errors here
                 console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (subscription) {
                    subscription.unsubscribe();
                }
            }
        );
    }

    public addkillChainPhase(): void {
        // let id = this.attackPattern.kill_chain_phases.length + 1;
        let killChainPhase: KillChainPhase;
        killChainPhase.killChainName = '';
        killChainPhase.phaseName = '';
        this.attackPattern.attributes.kill_chain_phases.unshift(killChainPhase);
    }

    public removekillChainPhase(killChainPhase: KillChainPhase): void {
         this.attackPattern.attributes.kill_chain_phases = this.attackPattern.attributes.kill_chain_phases.filter((h) => h !== killChainPhase);
    }

    public saveButtonClicked(): void {
       let subscription = super.save(this.attackPattern).subscribe(
            (data) => {
                this.attackPattern = data as AttackPattern;
            }, (error) => {
                // handle errors here
                 console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (subscription) {
                    subscription.unsubscribe();
                }
            }
        );
    }
}
