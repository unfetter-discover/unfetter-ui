import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { AttackPattern } from '../../../models';

@Component({
    selector: 'attack-pattern-new',
    templateUrl: './attack-pattern-new.component.html'
})
export class AttackPatternNewComponent extends BaseStixComponent implements OnInit {

    private attackPattern: AttackPattern =  new AttackPattern();

     constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog);
        stixService.url = 'cti-stix-store-api/attack-patterns';
    }

    public ngOnInit() {
        console.log('Initial AttackPatternNewComponent');
    }

     public saveButtonClicked(): void {
       let subscription = super.save(this.attackPattern).subscribe(
            (data) => {
                this.attackPattern = data as AttackPattern;
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

    public cancel(): void {
        this.location.back();
    }
}
