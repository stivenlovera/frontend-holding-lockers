import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { firstValueFrom } from 'rxjs';
import { LockerService } from '../../locker.service';
import { IController } from '../../locker.types';
import { SnackBar } from 'app/utils/snack-bar';

@Component({
  selector: 'app-modal-controller',
  standalone: true,
  imports: [
    MatIcon,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatFormField,
    MatLabel,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './modal-controller.html',
  styleUrl: './modal-controller.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnackBar]
})
export class ModalController {

  formController = new FormGroup({
    controller_id: new FormControl(-1, [Validators.required]),
    locker_id: new FormControl(-1, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    serie: new FormControl('', [Validators.required]),
    token: new FormControl('', [Validators.required]),
    building_id: new FormControl(-1, []),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public controller_id: number,
    private _lockerService: LockerService,
    private _matDialogRef: MatDialogRef<ModalController>,
    private _snackBar: SnackBar
  ) {
    this.editControler()
  }

  async handlerSubmit() {
    if (this.formController.valid) {
      await this.updateControler()
    } else {
      this.formController.markAllAsTouched();
    }
  }

  async editControler() {
    this.formController.disable()
    const values = await firstValueFrom(this._lockerService.editController(this.controller_id))
    this.formController.enable()
    this.formController.setValue(values.data)
  }

  async updateControler() {
    const values = this.formController.getRawValue() as IController
    const response = await firstValueFrom(this._lockerService.updateController(values))
    if (response.meta.status === 'success') {
      this._snackBar.openSnackBar(response.meta.message)
      this._matDialogRef.close()
    } else {
      this._snackBar.openSnackBarError(response.meta.message)
    }
  }
}
