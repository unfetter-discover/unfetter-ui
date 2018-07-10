import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {

    private readonly DEFAULT_DURATION = 3000;

    constructor(private snackBar: MatSnackBar) { }

    public openSnackbar(message: string, panelClass?: string[], duration: number = this.DEFAULT_DURATION) {
        this.snackBar.open(message, '', { duration, panelClass });
    }
}
