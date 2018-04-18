import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { AttackPattern, KillChainPhase } from '../../../../models';
import { UserProfile } from '../../../../models/user/user-profile';
import { AppState } from '../../../../root-store/app.reducers';
import { StixService } from '../../../stix.service';
import { AttackPatternComponent } from '../attack-pattern/attack-pattern.component';

@Component({
    selector: 'attack-pattern-list',
    templateUrl: './attack-pattern-list.component.html',

})
export class AttackPatternListComponent extends AttackPatternComponent implements OnInit, OnDestroy {

    public attackPatterns: AttackPattern[] = [];
    public selectedPhaseNameGroup: string;
    public phaseNameGroups = {};
    public phaseNameGroupKeys: string[];
    public filterAttackPattern = {};
    public attackPatternByPhaseMap: any = {};
    public numOfRows = 10;
    public displayedColumns: string[] = ['name', 'action'];
    public user: UserProfile;
    private subscriptions: Subscription[] = [];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar,
        private ref: ChangeDetectorRef,
        private userStore: Store<AppState>,
    ) {
        super(stixService, route, router, dialog, location, snackBar);
        this.phaseNameGroups['unspecified'] = [];
    }
    /**
     * @description angular initialize the component
     * @returns void
     */
    public ngOnInit(): void {
        const getUser$ = this.userStore
            .select('users')
            .pluck('userProfile')
            .take(1)
            .subscribe((user: UserProfile) => {
                this.user = user;
                this.fetchData(user);
            },
                (err) => console.log(err));
        this.subscriptions.push(getUser$);
    }
    /**
     * @description call the backend to populate this component
     * @param  {UserProfile} userProfile? - filters on this users kill chain framework if given
     * @returns void
     */
    public fetchData(userProfile?: UserProfile): void {
        let filter = '';
        if (userProfile && userProfile.preferences && userProfile.preferences.killchain) {
            const userFramework = this.user.preferences.killchain;
            const userFrameworkFilter = { 'stix.kill_chain_phases.kill_chain_name': { $exists: true, $eq: userFramework } };
            filter = `filter=${encodeURIComponent(JSON.stringify(userFrameworkFilter))}`;
        }
        const sortObj = { 'stix.name': '1' };
        const sort = `sort=${JSON.stringify(sortObj)}`;
        const projectObj = {
            'stix.name': 1,
            'stix.external_references': 1,
            'stix.kill_chain_phases': 1,
            'stix.id': 1
        };
        const project = `project=${encodeURI(JSON.stringify(projectObj))}`;
        const url = `${filter}&${project}&${sort}`;
        const subscription = super.load(url).subscribe(
            (data) => {
                this.attackPatterns = data as AttackPattern[];
                this.getPhaseNameAttackPatterns();
                this.populateAttackPatternByPhaseMap();
                this.phaseNameGroupKeys = Object.keys(this.phaseNameGroups).sort();
            },
            (error) => console.log('error ' + error),
        );
        this.subscriptions.push()
    }

    /**
     * @description clean up this component
     */
    public ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        }
    }
    /**
     * @description
     * @returns void
     */
    public populateAttackPatternByPhaseMap(): void {
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

                // TODO determine if there is a better wya to do this
                let temp = this.attackPatternByPhaseMap[key].filter((h) => h.id !== attackPattern.id);
                delete this.attackPatternByPhaseMap[key];
                this.ref.detectChanges();
                this.attackPatternByPhaseMap[key] = temp;
            }
        );
    }
    /**
     * @description groups the phase names of the given attack patterns
     * @returns void
     */
    public getPhaseNameAttackPatterns(): void {
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

    /**
     * @description angular track by list function, uses the items id if
     *  it exists, otherwise uses the index
     * @param {number} index
     * @param {item}
     * @return {number}
     */
    public trackByFn(index: number, item: any): number {
        return item.id || index;
    }
}
