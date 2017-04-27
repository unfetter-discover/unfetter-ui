import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.html',
})
export class ConfirmationDialogComponent {
  public deleteObject: string;
  constructor(public dialogRef: MdDialogRef<ConfirmationDialogComponent>) {
    this.deleteObject =  this.dialogRef.config.data;
  }
}
