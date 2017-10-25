import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ThreatActorsComponent } from '../threat-actor/threat-actors.component';
import { StixService } from '../../../stix.service';
import { ThreatActor } from '../../../../models';

@Component({
  selector: 'threat-actor-edit',
  templateUrl: './threat-actor-edit.component.html',
})
export class ThreatActorEditComponent extends ThreatActorsComponent implements OnInit {

    public labels = [
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
    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
    }

    public ngOnInit() {
        super.loadThreatActor();
    }

    public isChecked(label: string): boolean {
        const found = this.threatActor.attributes.labels.find((l) => {
            return l === label;
        });
        return found ? true : false;
    }

    public addLabel(label: string) {
        this.threatActor.attributes.labels.push(label);
    }

    public saveThreatActor(): void {
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
}
