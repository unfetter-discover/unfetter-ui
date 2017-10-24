import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from '../components/dialogs/confirmation/confirmation-dialog.component';
export class BaseComponent {

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected dialog: MatDialog,
        protected location?: Location) {
    }
    protected gotoView(command: any[]): void {
        this.router.navigate(command, { relativeTo: this.route });
    }

    protected openDialog(item: any) {
        let dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: item });

        dialogRef.afterClosed().subscribe(
            (result) => {
        });
    }

    protected download(): void {}

    protected cancelButtonClicked(): void {
        this.location.back();
    }

}
