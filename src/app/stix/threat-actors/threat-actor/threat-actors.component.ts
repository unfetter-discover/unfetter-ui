import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { ThreatActor } from '../../../models';

@Component({
    selector: 'threat-actors',
    templateUrl: './threat-actors.component.html'
})
export class TheatActorComponent extends BaseStixComponent implements OnInit {
    private threatActor: ThreatActor = new ThreatActor();

     constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog) {

        super(stixService, route, router, dialog);

        console.log('Initial TheatActorComponent');
    }

    public ngOnInit() {
        console.log('Initial TheatActorComponent');
        let subscription =  super.get().subscribe(
            (data) => {
                this.threatActor = data as ThreatActor;
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

    public editButtonClicked(): void {
        let link = ['../edit', this.threatActor.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.threatActor);
    }
}
