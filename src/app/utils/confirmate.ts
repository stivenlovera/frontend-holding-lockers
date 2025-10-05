import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FuseConfirmationConfig, FuseConfirmationService } from "@fuse/services/confirmation";
import { FuseConfirmationDialogComponent } from "@fuse/services/confirmation/dialog/dialog.component";

@Injectable()
export class Confirmation {
    constructor(private _fuseConfirmationService: FuseConfirmationService) {
    }

    confirmation(config: FuseConfirmationConfig): MatDialogRef<FuseConfirmationDialogComponent> {
        return this._fuseConfirmationService.open(config);
    }
}