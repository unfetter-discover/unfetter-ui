import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AttackPatternComponent } from '../attack-pattern/attack-pattern.component';
import { StixService } from '../../../stix.service';
import { AttackPattern, ExternalReference, KillChainPhase } from '../../../../models';

@Component({
    selector: 'attack-pattern-edit',
    templateUrl: './attack-pattern-edit.component.html'
})

export class AttackPatternEditComponent extends AttackPatternComponent implements OnInit {

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
    }

    public ngOnInit() {
       super.loadAttackPattern();
    }

    public addkillChainPhase(): void {
        // let id = this.attackPattern.kill_chain_phases.length + 1;
        let killChainPhase = new KillChainPhase();
        killChainPhase.kill_chain_name = '';
        killChainPhase.phase_name = '';
        this.attackPattern.attributes.kill_chain_phases.unshift(killChainPhase);
    }

    public removekillChainPhase(killChainPhase: KillChainPhase): void {
         this.attackPattern.attributes.kill_chain_phases = this.attackPattern.attributes.kill_chain_phases.filter((h) => h !== killChainPhase);
    }

    public saveAttackPattern(): void {
         let sub = super.saveButtonClicked().subscribe(
            (data) => {
                console.log('saved');
            }, (error) => {
                // handle errors here
                 console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (sub) {
                    sub.unsubscribe();
                }
            }
        );
    }
}
