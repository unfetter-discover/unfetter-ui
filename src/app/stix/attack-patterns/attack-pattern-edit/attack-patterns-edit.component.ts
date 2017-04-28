import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { AttackPattern, ExternalReference, KillChainPhase } from '../../../models';

@Component({
    selector: 'attack-pattern-edit',
    templateUrl: './attack-pattern-edit.component.html'
})
export class AttackPatternEditComponent extends BaseStixComponent implements OnInit {
     private attackPattern: AttackPattern;

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog, location);
        stixService.url = 'cti-stix-store-api/attack-patterns';

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
        killChainPhase.kill_chain_name = '';
        killChainPhase.phase_name = '';
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
