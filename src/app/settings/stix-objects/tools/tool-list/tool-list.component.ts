import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AttackPattern, KillChainPhase, Tool } from '../../../../models';
import { StixService } from '../../../stix.service';
import { BaseStixComponent } from '../../../base-stix.component';
import { Constance } from '../../../../utils/constance';

@Component({
  selector: 'tool-list',
  templateUrl: './tool-list.component.html',

})

export class ToolListComponent extends BaseStixComponent implements OnInit {
    private tools: Tool[] = [];
    private url = Tool.url;

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {
        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.TOOL_URL;
    }

    public ngOnInit() {
        let filter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
        let subscription =  super.load(filter).subscribe(
            (data) => {
                this.tools = data as Tool[];
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

    public deletButtonClicked(tool: Tool): void {
        super.openDialog(tool).subscribe(
            () => {
                 this.tools = this.tools.filter((h) => h.id !== tool.id);
            }
        );
    }
}
