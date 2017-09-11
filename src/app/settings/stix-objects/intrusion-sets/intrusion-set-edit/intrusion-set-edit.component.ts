import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { IntrusionSetComponent } from '../intrusion-set/intrusion-set.component';
import { StixService } from '../../../stix.service';
import { Motivation } from '../../../../models/motivation.enum';
import { ResourceLevel } from '../../../../models/resource-level.enum';
import { SortHelper } from '../../../../assessments/assessments-summary/sort-helper';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {
  IntrusionSet,
  AttackPattern,
  Identity,
  ThreatActor,
  Relationship
} from '../../../../models';
import { Constance } from '../../../../utils/constance';

@Component({
  selector: 'intrusion-set-edit',
  templateUrl: './intrusion-set-edit.component.html',
})
export class IntrusionSetEditComponent extends IntrusionSetComponent implements OnInit {
    public motivations = new Set(Motivation.values().map((el) => el.toString()).sort(SortHelper.sortDesc()));
    public resourceLevels = new Set(ResourceLevel.values().map((el) => el.toString()).sort(SortHelper.sortDesc()));
    public motivationCtrl: FormControl;
    public resourceLevelCtrl: FormControl;

    protected labels = [
        {label: 'activist'},
        {label: 'competitor'},
        {label: 'crime-syndicate'},
        {label: 'criminal'},
        {label: 'hacker'},
        {label: 'insider-accidental'},
        {label: 'insider-disgruntled'},
        {label: 'nation-state'},
        {label: 'sensationalist'},
        {label: 'spy'},
        {label: 'terrorist'}
    ];
    protected attackPatterns: AttackPattern[] = [];
    protected identities: Identity[] = [];
    protected threatActors: ThreatActor[] = [];
    protected newRelationships: Relationship[] = [];
    protected savedRelationships: Relationship[] = [];
    protected deletedRelationships: Relationship[] = [];

   constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        this.motivationCtrl = new FormControl();
        this.resourceLevelCtrl = new FormControl();
    }

    public ngOnInit() {
       super.loadIntrusionSet();
    }

    public isChecked(label: string): boolean {
        const found = this.intrusionSet.attributes.labels.find((l) => {
            return l === label;
        });
        return found ? true : false;
    }

    public addLabel(label: string) {
        this.intrusionSet.attributes.labels.push(label);
    }

    public saveIdentity(): void {
         const sub = super.saveButtonClicked().subscribe(
            (data) => {
                this.location.back();
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

     // add chip
    protected add(event: any): void {
        console.log(event.type);
        const relationship = new Relationship();
        this.newRelationships.push(relationship);
        relationship.attributes.source_ref = this.intrusionSet.id;

        if (event.type === Constance.ATTACK_PATTERN_TYPE && !this.found(this.attackPatterns, event)) {
            const attackPattern = new AttackPattern(event);
            relationship.attributes.relationship_type = 'uses';
            relationship.attributes.target_ref = attackPattern.id;

            this.attackPatterns.push(attackPattern);
        } else if (event.type === Constance.IDENTITY_TYPE && !this.found(this.identities, event)) {
            const identity = new Identity(event);
            relationship.attributes.relationship_type = 'uses';
            relationship.attributes.target_ref = identity.id;

            this.identities.push(identity);
        } else if (event.type === Constance.INTRUSION_SET_TYPE && !this.found(this.threatActors, event)) {
            const threatActor = new ThreatActor(event);
            relationship.attributes.relationship_type = 'uses';
            relationship.attributes.target_ref = threatActor.id;

            this.threatActors.push(threatActor);
        }
    }

    private found(list: any[], object: any): any {
        return list.find( (entry) => entry.id === object.id );
    }
}
