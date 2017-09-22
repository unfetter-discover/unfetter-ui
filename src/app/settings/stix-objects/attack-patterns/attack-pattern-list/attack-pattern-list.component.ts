import { Component, OnInit, ViewEncapsulation, ViewChildren, QueryList } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AttackPatternComponent } from '../attack-pattern/attack-pattern.component';
import { AttackPattern, KillChainPhase } from '../../../../models';
import { StixService } from '../../../stix.service';

@Component({
    selector: 'attack-pattern-list',
    templateUrl: './attack-pattern-list.component.html',

})
export class AttackPatternListComponent extends AttackPatternComponent implements OnInit {

    public attackPatterns: AttackPattern[] = [];
    public selectedPhaseNameGroup: string;
    public phaseNameGroups = {};
    public phaseNameGroupKeys: string[];
    public filterAttackPattern = {};
    public attackPatternByPhaseMap: any = {};
    public numOfRows = 10;
    public displayedColumns: string[] = ['name', 'action'];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        this.phaseNameGroups['unspecified'] = [];
    }

    public ngOnInit() {
        let filter = 'sort=' + encodeURIComponent(JSON.stringify({ 'stix.name': '1' }));
        let subscription = super.load(filter).subscribe(
            (data) => {
                this.attackPatterns = data as AttackPattern[];
                this.getPhaseNameAttackPatterns();
                this.populateAttackPatternByPhaseMap();
                this.phaseNameGroupKeys = Object.keys(this.phaseNameGroups).sort();
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

    public populateAttackPatternByPhaseMap() {
        this.attackPatterns.forEach((attackPattern: AttackPattern) => {
            let killChainPhases = attackPattern.attributes.kill_chain_phases;
            if (!killChainPhases || killChainPhases.length === 0) {
                if (this.attackPatternByPhaseMap.unspecified === undefined) {
                    this.attackPatternByPhaseMap.unspecified = [];
                }
                this.attackPatternByPhaseMap.unspecified.push(attackPattern);
            } else {
                killChainPhases.forEach((killChainPhase: KillChainPhase) => {
                    if (this.attackPatternByPhaseMap[killChainPhase.phase_name] === undefined) {
                        this.attackPatternByPhaseMap[killChainPhase.phase_name] = [];
                    }
                    this.attackPatternByPhaseMap[killChainPhase.phase_name].push(attackPattern);
                });
            }
        });
    }

    public onSelect(event: any, phaseNameGroup: any): void {
        event.preventDefault();
        this.selectedPhaseNameGroup = phaseNameGroup;

    }

    public edit(attackPattern: AttackPattern): void {
        let link = ['edit', attackPattern.id];
        super.gotoView(link);
    }

    public showDetails(event: any, attackPattern: AttackPattern): void {
        event.preventDefault();
        let link = ['.', attackPattern.id];
        super.gotoView(link);
    }

    public deletButtonClicked(attackPattern: AttackPattern, key: string): void {
        super.openDialog(attackPattern).subscribe(
            () => {
                this.attackPatterns = this.attackPatterns.filter((h) => h.id !== attackPattern.id);
                this.phaseNameGroups[key] = this.phaseNameGroups[key].filter((h) => h.id !== attackPattern.id);
            }
        );
    }

    public getPhaseNameAttackPatterns() {
        this.attackPatterns.forEach((attackPattern: AttackPattern) => {
            let killChainPhases = attackPattern.attributes.kill_chain_phases;
            if (attackPattern.attributes.name === 'test attack') {
                console.dir(killChainPhases);
            }
            if (!killChainPhases || killChainPhases.length === 0) {
                let attackPatternsProxies = this.phaseNameGroups['unspecified'];
                attackPatternsProxies.push(attackPattern);
            } else {
                killChainPhases.forEach((killChainPhase: KillChainPhase) => {
                    let phaseName = killChainPhase.phase_name.toLowerCase();
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

    public onTabShow(event: any): void {
        let phaseName = this.phaseNameGroupKeys[event.index];
        if (!this.filterAttackPattern[phaseName]) {
            this.loadData({ first: 0, rows: this.numOfRows }, this.phaseNameGroupKeys[event.index]);
        }
    }

    public totalRecords(key: string): number {
        return this.phaseNameGroups[key].length;
    }

    public loadData(event: any, phaseName: string): void {
        let attackPatterns = this.phaseNameGroups[phaseName] as AttackPattern[];
        attackPatterns = attackPatterns.filter((attackPattern: AttackPattern, index: number, arr: any) => {
            return (index >= event.first && index < (event.first + event.rows));
        });
        attackPatterns.sort(
            (a1: AttackPattern, a2: AttackPattern) => {
                return a1.attributes.name.toLowerCase().localeCompare(a2.attributes.name.toLowerCase());
            }
        );
        this.filterAttackPattern[phaseName] = attackPatterns;
    }
}
