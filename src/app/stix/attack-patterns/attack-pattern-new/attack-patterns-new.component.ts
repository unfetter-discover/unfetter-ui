import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { AttackPatternsService } from '../attack-patterns.service';
import { AttackPattern } from '../../../models';

@Component({
    selector: 'attack-pattern-new',
    templateUrl: './attack-pattern-new.component.html'
})
export class AttackPatternNewComponent implements OnInit {

    private attackPattern: AttackPattern =  new AttackPattern();

    constructor(private attackPatternsService: AttackPatternsService, private route: ActivatedRoute, private location: Location) {

     }
    public ngOnInit() {
        console.log('Initial AttackPatternNewComponent');
    }

    public save(): void {
       let subscription = this.attackPatternsService.create(this.attackPattern).subscribe(
            (attackPattern) => {
                this.attackPattern = attackPattern;

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
