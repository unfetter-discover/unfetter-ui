import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'list-stix-objects',
  templateUrl: './list-stix-objects.component.html'
})
export class ListStixObjectComponent extends BaseComponent implements OnInit {

    @Input() public model: any;
    @Input() public showLabels: boolean;
    @Input() public showExternalReferences: boolean;

     constructor(
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(route, router, dialog);
        console.log('Initial ListStixObjectComponent');
    }

    public ngOnInit() {
        console.log('Initial ListStixObjectComponent');
    }

     public editButtonClicked(item: any): void {
        let link = ['edit', item.id];
        super.gotoView(link);
    }

    public showDetails(event: any, item: any): void {
        event.preventDefault();
        let link = ['.', item.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(item: any): void {
        super.openDialog(item);
    }
}
