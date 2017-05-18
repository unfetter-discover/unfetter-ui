import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AttackPattern, Filter, KillChainPhase } from '../../models';
import { Constance } from '../../utils/constance';
import { BaseComponentService } from '../base-service.component';
import { RelationshipListComponent } from '../relationship-list/relationship-list.component';

@Component({
  selector: 'mitigate-list',
  templateUrl: './mitigate-list.component.html'
})
export class MitigateListComponent extends RelationshipListComponent implements OnInit {
    @Input() public source: any[];
    public phaseNameGroupKeys: string[];
    public phaseNameGroups = {};
    public show = false;
    private pageTitle = 'Mapping Course of Action to Attack Patterns';
    private pageIcon = Constance.RELATIONSHIPS_ICON;
    private description = 'This page allows your to quickly create relationships between a Course of Action and an Attack Pattern that it mitigates. Every selected checkbox is a relationship.';

    constructor(public baseComponentService: BaseComponentService, public router: Router) {
        super(baseComponentService, router);
    }

    public ngOnInit() {
        let filter = new Filter();
        filter.values.where['target_ref'] = this.model.id;
        super.loadRelationships(filter.values);

        filter = new Filter();
        filter.values.where['source_ref'] = this.model.id;
        super.loadRelationships(filter.values);
        this.getPhaseNameAttackPatterns();
        this.phaseNameGroupKeys = Object.keys(this.phaseNameGroups);
        this.show = true;
    }

    private isChecked(attackPattern: AttackPattern): boolean {
        let isChecked = false;
        this.relationships.forEach(
            (relationship) => {
                if (relationship.id === attackPattern.id) {
                    isChecked = true;
                }
            }
        );
        return isChecked;
    }

    private getPhaseNameAttackPatterns() {
        this.phaseNameGroups['unspecified'] = [];
        this.source.forEach((data) => {
            let attackPattern = new AttackPattern(data);
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
