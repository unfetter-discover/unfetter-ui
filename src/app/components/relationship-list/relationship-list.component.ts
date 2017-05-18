import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Campaign, Indicator, AttackPattern, Filter } from '../../models';
import { Constance } from '../../utils/constance';
import { BaseComponentService } from '../base-service.component';

@Component({
  selector: 'relationship-list',
  templateUrl: './relationship-list.component.html'
})
export class RelationshipListComponent implements OnInit {
    @Input() protected model: any;
    protected url: string;
    protected relationships: any = [];

    constructor(public baseComponentService: BaseComponentService, public router: Router) {
        console.dir(this.model);
    }

    public ngOnInit() {
        let filter = new Filter();
        filter.values.where['target_ref'] = this.model.id;
        this.loadRelationships(filter.values);

        filter = new Filter();
        filter.values.where['source_ref'] = this.model.id;
        this.loadRelationships(filter.values);
    }

    protected loadRelationships(filter: any): void {
        let url = Constance.RELATIONSHIPS_URL + '?filter=' + JSON.stringify(filter);
        let sub =  this.baseComponentService.get( encodeURI(url) ).subscribe(
        (data) => {
            let list = data as any[];
            list.forEach(
                (relationship) => {
                    if (filter.where['source_ref']) {
                        this.loadStixObject(relationship.attributes.target_ref);
                    } else {
                        this.loadStixObject(relationship.attributes.source_ref);
                    }
                }
            );
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

    private loadStixObject(id: string): void {
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

    private load(url: string, id: string ): void {
        const uri = `${url}/${id}`;
        let sub = this.baseComponentService.get(uri).subscribe(
            (data) => {
                this.relationships.push(data);
            }, (error) => {
                console.log(error);
            }, () => {
                if (sub) {
                    sub.unsubscribe();
                }
            }
        );
    }

    private getIcon(relationship: any): string {
        let icon = '';
        if (relationship.type === Constance.ATTACK_PATTERN_TYPE ) {
           icon = Constance.ATTACK_PATTERN_ICON;
        } else if (relationship.type === Constance.CAMPAIGN_TYPE) {
           icon = Constance.CAMPAIGN_ICON;
        } else if (relationship.type === Constance.INDICATOR_TYPE) {
            icon = Constance.INDICATOR_ICON;
        } else if (relationship.type === Constance.INTRUSION_SET_TYPE) {
            icon = Constance.INTRUSION_SET_ICON;
        } else if (relationship.type === Constance.MALWARE_TYPE) {
            icon = Constance.MALWARE_ICON;
        }
        return icon;
    }

     private getName(relationship: any): string {
        let name = relationship.attributes.name;
        if (relationship.type === Constance.INDICATOR_TYPE) {
            name = relationship.attributes.pattern;
        }
        return name;
    }

    private gotoDetail(relationship: any): void {
        let url = relationship.type + '/' + relationship.id;
        this.router.navigateByUrl(url);
    }
}
