import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'confirmation-dialog',
    templateUrl: './confirmation-dialog.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

    public deleteObject: any;

    public title: string;

    constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.title = data.attributes.name;
        if (data.type && data.type.toLowerCase() === 'relationships') {
            this.title = data.attributes.relationship_type;
        }
    }

}
