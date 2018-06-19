
import { finalize } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Campaign, Indicator, AttackPattern, Relationship, Filter } from '../../models';
import { Constance } from '../../utils/constance';
import { BaseComponentService } from '../base-service.component';

@Component({
    selector: 'relationship-list',
    templateUrl: './relationship-list.component.html'
})
export class RelationshipListComponent implements OnInit, OnChanges {

    @Input() public model: any;

    public url: string;
    public relationshipMapping: any = [];
    public relationships: Relationship[];

    constructor(public baseComponentService: BaseComponentService, public router: Router) {
        console.dir(this.model);
    }

    public ngOnInit() {
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.model.currentValue.id !== undefined) {
            this.relationshipMapping = [];
            this.loadRelationships({ 'stix.target_ref': changes.model.currentValue.id });
            this.loadRelationships({ 'stix.source_ref': changes.model.currentValue.id });
        }
    }

    public loadRelationships(filter: any): void {
        let url = Constance.RELATIONSHIPS_URL + '?filter=' + JSON.stringify(filter);
        let sub =  this.baseComponentService.get( encodeURI(url) ).pipe(
            finalize(() => {
                // prevent memory links
                if (sub) {
                    sub.unsubscribe();
                }
            }))
            .subscribe(
                (data) => {
                    this.relationships = data as Relationship[];
                    this.relationships.forEach(
                        (relationship) => {
                            if (filter['stix.source_ref']) {
                                this.loadStixObject(relationship.attributes.target_ref);
                            } else {
                                this.loadStixObject(relationship.attributes.source_ref);
                            }
                        }
                    );
                },
                (error) => {
                    // handle errors here
                    console.log('error ' + error);
                }
            );
    }

    public deleteRelationships(id: string): void {
        let relationship = this.relationships.find((r) => {
            return r.attributes.source_ref === id || r.attributes.target_ref === id;
        });
        this.baseComponentService.delete(Constance.RELATIONSHIPS_URL, relationship.id)
            .subscribe(
                () => this.relationships = this.relationships.filter((r) => r.id === relationship.id)
            );
    }

    public saveRelationships(relationship: Relationship): void {
        this.baseComponentService.save(Constance.RELATIONSHIPS_URL, relationship)
            .subscribe(
                (data) => this.relationships.push(new Relationship(data))
            );
    }

    public loadStixObject(id: string): void {
        if (id.indexOf('indicator') >= 0) {
            this.load(Constance.INDICATOR_URL, id);
        } else if (id.indexOf('attack-pattern') >= 0) {
            this.load(Constance.ATTACK_PATTERN_URL, id);
        } else if (id.indexOf('campaign') >= 0) {
            this.load(Constance.CAMPAIGN_URL, id);
        } else if (id.indexOf('intrusion-set') >= 0) {
            this.load(Constance.INTRUSION_SET_URL, id);
        }  else if (id.indexOf('malware') >= 0) {
            this.load(Constance.MALWARE_URL, id);
        }
    }

    public load(url: string, id: string ): void {
        const uri = `${url}/${id}`;
        let sub = this.baseComponentService.get(uri).pipe(
            finalize(() => {
                if (sub) {
                    sub.unsubscribe();
                }
            }))
            .subscribe(
                (data) => this.relationshipMapping.push(data),
                (error) => console.log(error),
            );
    }

    public getIcon(relationshipMap: any): string {
        let icon = '';
        if (relationshipMap.type === Constance.ATTACK_PATTERN_TYPE ) {
           icon = Constance.ATTACK_PATTERN_ICON;
        } else if (relationshipMap.type === Constance.CAMPAIGN_TYPE) {
           icon = Constance.CAMPAIGN_ICON;
        } else if (relationshipMap.type === Constance.INDICATOR_TYPE) {
            icon = Constance.INDICATOR_ICON;
        } else if (relationshipMap.type === Constance.INTRUSION_SET_TYPE) {
            icon = Constance.INTRUSION_SET_ICON;
        } else if (relationshipMap.type === Constance.MALWARE_TYPE) {
            icon = Constance.MALWARE_ICON;
        }
        return icon;
    }

     public getUrl(relationshipMap: any): string {
        let url = '';
        if (relationshipMap.type === Constance.ATTACK_PATTERN_TYPE ) {
           url = Constance.ATTACK_PATTERN_URL;
        } else if (relationshipMap.type === Constance.CAMPAIGN_TYPE) {
           url = Constance.CAMPAIGN_URL;
        } else if (relationshipMap.type === Constance.INDICATOR_TYPE) {
            url = Constance.INDICATOR_URL;
        } else if (relationshipMap.type === Constance.INTRUSION_SET_TYPE) {
            url = Constance.INTRUSION_SET_URL;
        } else if (relationshipMap.type === Constance.MALWARE_TYPE) {
            url = Constance.MALWARE_URL;
        }
        return url.replace('api', '');
    }

     public getName(relationshipMap: any): string {
        let name = relationshipMap.attributes.name;
        if (relationshipMap.type === Constance.INDICATOR_TYPE) {
            name = relationshipMap.attributes.pattern;
        }
        return name;
    }

    public gotoDetail(relationshipMap: any): void {
        let url = relationshipMap.type + '/' + relationshipMap.id;
        this.router.navigateByUrl(url);
    }

}
