import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../base-stix.component';
import { StixService } from '../stix.service';
import { Relationship } from '../../models';

@Component({
  selector: 'relationships',
  templateUrl: './relationships.component.html'
})
export class RelationshipsComponent extends BaseStixComponent implements OnInit {
    private pageTitle = 'Relationships';
    private pageIcon = 'assets/icon/stix-icons/svg/relationship-b.svg';
    private relationships: Relationship[] = [];

     constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog) {

        super(stixService, route, router, dialog);
        stixService.url = 'api/relationships';
    }
    public ngOnInit() {
        console.log('Initial RelationshipsComponent');
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
