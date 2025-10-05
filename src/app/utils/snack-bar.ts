import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable()
export class SnackBar {
    constructor(private _snackBar: MatSnackBar) {
    }

    openSnackBar(message: string) {
        const horizontalPosition: MatSnackBarHorizontalPosition = 'start';
        const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
        this._snackBar.open(message, '', {
            horizontalPosition: horizontalPosition,
            verticalPosition: verticalPosition,
            duration: 5000
        });
    }

    openSnackBarError(message: string) {
        const horizontalPosition: MatSnackBarHorizontalPosition = 'start';
        const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
        this._snackBar.open(message, '', {
            horizontalPosition: horizontalPosition,
            verticalPosition: verticalPosition,
            duration: 5000,
            panelClass: ['[&>*]:bg-red-500'],
        });
    }
}