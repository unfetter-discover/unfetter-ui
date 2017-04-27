import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { AttackPattern } from '../../../models';
import { AttackPatternsService } from '../attack-patterns.service';

@Component({
  selector: 'attack-pattern-list',
  templateUrl: './attack-pattern-list.component.html',

})

export class AttackPatternListComponent extends BaseStixComponent implements OnInit {

    public phaseNameGroups: any[];
    private selectedPhaseNameGroup: any = {};

     constructor(
        public attackPatternsService: AttackPatternsService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(attackPatternsService, route, router, dialog);
    }

    public ngOnInit() {
       let subscription =  super.load().subscribe(
            (data) => {
                this.phaseNameGroups = data;
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

    public onSelect(event: any, phaseNameGroup: any): void {
        event.preventDefault();
        this.selectedPhaseNameGroup = phaseNameGroup;

    }

    public editButtonClicked(attackPattern: AttackPattern): void {
        let link = ['edit', attackPattern.id];
        super.gotoView(link);
    }

    public showDetails(event: any,  attackPattern: AttackPattern): void {
        event.preventDefault();
        let link = ['.', attackPattern.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(attackPattern: AttackPattern): void {
        super.openDialog(attackPattern);
    }
}
