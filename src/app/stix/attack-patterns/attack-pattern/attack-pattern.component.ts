import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { AttackPattern } from '../../../models';
import { AttackPatternsService } from '../attack-patterns.service';

@Component({
  selector: 'attack-pattern',
  templateUrl: './attack-pattern.component.html',

})

export class AttackPatternComponent extends BaseStixComponent implements OnInit {

    public attackPattern: AttackPattern;

    constructor(
        public attackPatternsService: AttackPatternsService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(attackPatternsService, route, router, dialog);
    }

    public ngOnInit() {
       let subscription =  super.get().subscribe(
            (data) => {
                this.attackPattern = data as AttackPattern;

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
        let link = ['../edit', this.attackPattern.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.attackPattern);
    }
}
