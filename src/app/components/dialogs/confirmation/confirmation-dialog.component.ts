import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.html',
})
export class ConfirmationDialogComponent {
  public deleteObject: any;
  private title: string;

  constructor(public dialogRef: MdDialogRef<ConfirmationDialogComponent>) {
    // this.deleteObject =  this.dialogRef.config.data;
    this.title = this.deleteObject.attributes.name;
    if (this.deleteObject.type.toLowerCase() === 'relationships') {
      this.title = this.deleteObject.attributes.relationship_type;
    }
  }
}
