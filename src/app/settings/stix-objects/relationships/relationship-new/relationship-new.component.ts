import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Relationship } from '../../../../models';

@Component({
  selector: 'relationship-new',
  templateUrl: './relationship-new.component.html'
})
export class RelationshipNewComponent extends BaseStixComponent implements OnInit {
    private relationship: Relationship  = new Relationship();
    private selectedSource: string;
    private selectedSources: any[];
    private selectedTargetType: string;
    private selectedTargetTypes: any[];

    private types = [
        { label: 'Attack Pattern', id: 'attack-pattern'},
        { label: 'Course of Action', id: 'course-of-action'},
        { label: 'Intrusion Set', id: 'intrusion-set' }
    ];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);

    }
    public ngOnInit() { }

   public saveButtonClicked(): void {
        this.stixService.url = 'cti-stix-store-api/relationship';
        let subscription = super.save(this.relationship).subscribe(
            (data) => {
                this.relationship = data as Relationship;
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

    public onSelectedSourceChange(): void {
        this.stixService.url = 'cti-stix-store-api/' + this.selectedSource;
        super.load().subscribe(
            (data) => {
                this.selectedSources = data as any[];
            }
        );
    }

    public onSelectedTargetTypeChange(): void {
        this.stixService.url = 'cti-stix-store-api/' + this.selectedTargetType;
        super.load().subscribe(
            (data) => {
                this.selectedTargetTypes = data as any[];
            }
        );
    }
}
