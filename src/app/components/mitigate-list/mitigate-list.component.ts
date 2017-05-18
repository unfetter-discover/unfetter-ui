import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AttackPattern, Filter, KillChainPhase, Relationship } from '../../models';
import { Constance } from '../../utils/constance';
import { BaseComponentService } from '../base-service.component';
import { RelationshipListComponent } from '../relationship-list/relationship-list.component';

@Component({
  selector: 'mitigate-list',
  templateUrl: './mitigate-list.component.html'
})
export class MitigateListComponent extends RelationshipListComponent implements OnInit {
    @Input() public source: any[];
    @Input() public title: string;
    @Input() public description: string;

    public phaseNameGroupKeys: string[];
    public phaseNameGroups = {};
    public show = false;
    private pageIcon = Constance.RELATIONSHIPS_ICON;

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
          return this.find(attackPattern) ? true : false;
    }

    private update(attackPattern: AttackPattern): void {
        let relationshipMap = this.find(attackPattern);
        if (relationshipMap) {
            super.deleteRelationships(relationshipMap.id);
        } else {
            let relationship = new Relationship();
            relationship.attributes.relationship_type = Constance.RELATIONSHIPS_TYPES.MITIGATES;
            relationship.attributes.source_ref = this.model.id;
            relationship.attributes.target_ref = attackPattern.id;
            super.saveRelationships(relationship);
        }
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

    private find(attackPattern: AttackPattern): AttackPattern {
       return this.relationshipMapping.find((relationship) => {
            return relationship.id === attackPattern.id;
        });
    }

}
