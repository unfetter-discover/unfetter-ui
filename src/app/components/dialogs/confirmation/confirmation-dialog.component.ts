import { Component, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.html',
})
export class ConfirmationDialogComponent {
  public deleteObject: any;
  public title: string;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    // this.deleteObject =  this.dialogRef.config.data;
    this.title = data.attributes.name;
    if (data.type.toLowerCase() === 'relationships') {
      this.title = data.attributes.relationship_type;
    }
  }
}
