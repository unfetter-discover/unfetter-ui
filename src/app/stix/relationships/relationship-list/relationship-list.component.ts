import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { Relationship } from '../../../models';
import { Constance } from '../../../utils/constance';

@Component({
  selector: 'relationships-list',
  templateUrl: './relationship-list.component.html'
})
export class RelationshipListComponent extends BaseStixComponent implements OnInit {
    private pageTitle = Constance.RELATIONSHIPS_TYPE;
    private pageIcon = Constance.RELATIONSHIPS_ICON;
    private relationships: Relationship[] = [];

     constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.RELATIONSHIPS_URL;
    }
    public ngOnInit() {
        let subscription =  super.load().subscribe(
            (data) => {
                this.relationships = data as Relationship[];
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

    public showDetails(event: any, relationship: Relationship): void {
        event.preventDefault();
        let link = ['.', relationship.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(relationship: Relationship): void {
        super.openDialog(relationship);
    }
}
