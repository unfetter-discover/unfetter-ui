import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material';
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
    @Input() public url: string;
    @Input() public showLabels: boolean;
    @Input() public showPattern: boolean;
    @Input() public showKillChainPhases: boolean;
    @Input() public showExternalReferences: boolean;
    @Input() public showSectors: boolean;
    @Output() public deletButtonClicked: EventEmitter<any> = new EventEmitter();
    private isLastRow: boolean;

    private index = 0;
     constructor(
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location) {

        super(route, router, dialog);
    }

    public ngOnInit() {
        this.url = this.url ? this.url.replace('api', '') : '';
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

    private  notLastIndex(): boolean {
        this.isLastRow = this.index < this.model.length ? true : false;
        this.index = this.index + 1;
        return this.isLastRow;
    }
}
