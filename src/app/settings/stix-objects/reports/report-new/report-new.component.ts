import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MatDialogConfig, MatSnackBar } from '@angular/material';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Report, AttackPattern, IntrusionSet, Relationship } from '../../../../models';

@Component({
    selector: 'report-new',
    templateUrl: './report-new.component.html',
})
export class ReportNewComponent extends BaseStixComponent implements OnInit {

    public report: Report = new Report();
    public attackPatterns: AttackPattern[] = [];
    public intrusionSets: IntrusionSet[] = [];
    public labels = ['Indicator', 'Campaign', 'Intrusion Set'];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = this.report.url;
    }
    public ngOnInit() { }

    public saveButtonClicked(): void {
        const subscription = super.create(this.report).subscribe(
            (data) => {
                this.saveRelationships(data as Report);
                this.location.back();
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

    public saveRelationships(report: Report): void {
        this.attackPatterns.forEach((relatedRecord) => {
            const relationship = new Relationship();
            relationship.attributes.relationship_type = 'uses';
            relationship.attributes.source_ref = report.id;
            relationship.attributes.target_ref = relatedRecord.id;
            this.saveRelationship(relationship);
        });

        this.intrusionSets.forEach((relatedRecord) => {
            const relationship = new Relationship();
            relationship.attributes.relationship_type = 'attributed-to';
            relationship.attributes.source_ref = report.id;
            relationship.attributes.target_ref = relatedRecord.id;
            this.saveRelationship(relationship);
        });
    }

    public saveRelationship(relationship: Relationship): void {
        const created = new Date();
        relationship.attributes.created = created;
        relationship.attributes.modified = created;
        relationship.attributes.version = '1';
        const subscription = super.create(relationship).subscribe(
            (data) => {
                console.log('saved');
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
        if (event.type === 'attack-patterns' && !this.found(this.attackPatterns, event)) {
            this.attackPatterns.push(event as AttackPattern);
        } else if (event.type === 'intrusion-sets' && !this.found(this.intrusionSets, event)) {
            this.intrusionSets.push(event as IntrusionSet);
        }
    }

    // remove chip
    public remove(object: any): void {
        event.preventDefault();
        if (object.type === 'attack-patterns') {
            this.attackPatterns = this.attackPatterns.filter((o) => o.id !== object.id);
        } else if (object.type === 'intrusion-sets') {
            this.intrusionSets = this.intrusionSets.filter((o) => o.id !== object.id);
        }
    }

    public found(list: any[], object: any): any {
        return list.find((entry) => entry.id === object.id);
    }

    public dateChange(date: string): void {
        console.log(date);
    }

}
