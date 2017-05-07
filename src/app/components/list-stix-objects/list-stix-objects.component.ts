import { Component, Input, Output, EventEmitter } from '@angular/core';
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
export class ListStixObjectComponent extends BaseComponent {

    @Input() public model: any;
    @Input() public showLabels: boolean;
    @Input() public showPattern: boolean;
    @Input() public showKillChainPhases: boolean;
    @Input() public showExternalReferences: boolean;
    @Input() public showSectors: boolean;
    @Output() public deletButtonClicked: EventEmitter<any> = new EventEmitter();

     constructor(
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(route, router, dialog);
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
        this.deletButtonClicked.emit(item);
    }
}
