import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { ToolEditComponent } from '../tool-edit/tool-edit.component';
import { StixService } from '../../../stix.service';
import { Tool, AttackPattern, Indicator, IntrusionSet, CourseOfAction, Filter, Relationship } from '../../../../models';
import { Constance } from '../../../../utils/constance';

@Component({
    selector: 'tool-new',
    templateUrl: './tool-new.component.html',
})
export class ToolNewComponent extends ToolEditComponent implements OnInit {

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {
        super(stixService, route, router, dialog, location, snackBar);
    }

    public ngOnInit() {
        console.log('ToolNewComponent');
    }

    private saveNewTool(): void {
        console.log(this.tool.url);
        const sub = super.create(this.tool).subscribe(
            (data) => {
                this.tool = new Tool(data);
                if (this.newRelationships.length > 0) {
                    let count = this.newRelationships.length;
                    this.newRelationships.forEach((relationship) => {
                        this.saveRelationship(relationship);
                        --count;
                        if (count <= 0) {
                            this.location.back();
                        }
                    });
                } else {
                    this.location.back();
                }
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
