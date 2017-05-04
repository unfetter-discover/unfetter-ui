import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AttackPatternComponent } from '../attack-pattern/attack-pattern.component';
import { AttackPattern, KillChainPhase } from '../../../models';
import { StixService } from '../../stix.service';

@Component({
  selector: 'attack-pattern-list',
  templateUrl: './attack-pattern-list.component.html',

})

export class AttackPatternListComponent extends AttackPatternComponent implements OnInit {

    public attackPatterns: AttackPattern[] = [];
    private selectedPhaseNameGroup: String;
    private phaseNameGroups = {};
    private phaseNameGroupKeys: string[];

     constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog, location);
        this.phaseNameGroups['unspecified'] = [];
    }

    public ngOnInit() {
       let subscription =  super.load().subscribe(
            (data) => {
                this.attackPatterns = data as AttackPattern[];
                this.getPhaseNameAttackPatterns();
                this.phaseNameGroupKeys = Object.keys(this.phaseNameGroups);
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

    public onSelect(event: any, phaseNameGroup: any): void {
        event.preventDefault();
        this.selectedPhaseNameGroup = phaseNameGroup;

    }

    public edit(attackPattern: AttackPattern): void {
        let link = ['edit', attackPattern.id];
        super.gotoView(link);
     }

    public showDetails(event: any,  attackPattern: AttackPattern): void {
        event.preventDefault();
        let link = ['.', attackPattern.id];
        super.gotoView(link);
    }

    public delete(attackPattern: AttackPattern): void {
        this.attackPattern = attackPattern;
        super.deleteButtonClicked();
    }

    private getPhaseNameAttackPatterns() {
        this.attackPatterns.forEach((attackPattern: AttackPattern) => {
            let killChainPhases = attackPattern.attributes.kill_chain_phases;

            if (!killChainPhases) {
                let attackPatternsProxies = this.phaseNameGroups['unspecified'];
                attackPatternsProxies.push(attackPattern);
            } else {
                killChainPhases.forEach( (killChainPhase: KillChainPhase) => {
                    let phaseName = killChainPhase.phase_name;
                    let attackPatternsProxies = this.phaseNameGroups[phaseName];
                    if (attackPatternsProxies === undefined) {
                        attackPatternsProxies = [];
                        this.phaseNameGroups[phaseName] = attackPatternsProxies;
                    }
                    attackPatternsProxies.push(attackPattern);
                });
            }
        });
    }
}
