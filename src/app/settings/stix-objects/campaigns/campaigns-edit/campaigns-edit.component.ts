import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CampaignComponent } from '../campaign/campaign.component';
import { StixService } from '../../../stix.service';
import { Campaign, AttackPattern, Identity, IntrusionSet , Relationship } from '../../../../models';

@Component({
  selector: 'campaigns-edit',
  templateUrl: './campaigns-edit.component.html',
})
export class CampaignsEditComponent extends CampaignComponent implements OnInit {
    public attackPatterns: AttackPattern[] = [];
    public identities: Identity[] = [];
    public intrusionSets: IntrusionSet[] = [];

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
        super.loadCampaign();
    }

    public saveCampaign(): void {
       let subscription = super.saveButtonClicked().subscribe(
            (data) => {
                this.saveRelationships(new Campaign(data));
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

    public saveRelationships(campaign: Campaign): void {
        this.attackPatterns.forEach((relatedRecord) => {
            let relationship = new Relationship();
            relationship.attributes.relationship_type = 'uses';
            relationship.attributes.source_ref = campaign.id;
            relationship.attributes.target_ref = relatedRecord.id;
            this.saveRelationship(relationship);
        });

        this.intrusionSets.forEach((relatedRecord) => {
            let relationship = new Relationship();
            relationship.attributes.relationship_type =  'attributed-to';
            relationship.attributes.source_ref = campaign.id;
            relationship.attributes.target_ref = relatedRecord.id;
            this.saveRelationship(relationship);
        });

        this.identities.forEach((relatedRecord) => {
            let relationship = new Relationship();
            relationship.attributes.relationship_type = 'targets';
            relationship.attributes.source_ref = campaign.id;
            relationship.attributes.target_ref = relatedRecord.id;
            this.saveRelationship(relationship);
        });
    }

    public saveRelationship(relationship: Relationship): void {
        let subscription = super.create(relationship).subscribe(
            (data) => {
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

    // add chip
    public add(event: any): void {
        console.log(event.type);
        if (event.type === 'attack-patterns' && !this.found(this.attackPatterns, event)) {
            this.attackPatterns.push(event as AttackPattern);
        } else if (event.type === 'intrusion-sets'  && !this.found(this.intrusionSets, event)) {
            this.intrusionSets.push(event as IntrusionSet);
        } else if (event.type === 'identities'  && !this.found(this.identities, event)) {
            this.identities.push(event as Identity);
        }
    }

    // remove chip
    public remove(object: any): void {
        if (object.type === 'attack-patterns') {
            this.attackPatterns = this.attackPatterns.filter((o) => o.id !== object.id);
        } else if (object.type === 'intrusion-sets') {
            this.intrusionSets = this.intrusionSets.filter((o) => o.id !== object.id);
        } else if (object.type === 'identities') {
            this.identities = this.identities.filter((o) => o.id !== object.id);
        }
    }

    private found(list: any[], object: any): any {
        return list.find( (entry) => { return entry.id === object.id; } );
    }
}
