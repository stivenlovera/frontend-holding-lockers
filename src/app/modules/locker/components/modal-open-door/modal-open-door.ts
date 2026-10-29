import { ChangeDetectionStrategy, Component, Inject, signal } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { firstValueFrom } from 'rxjs';
import { LockerService } from '../../locker.service';
import { IDoor, TipoApertura } from '../../locker.types';
import { SnackBar } from 'app/utils/snack-bar';

/**
 * Apertura manual de un casillero desde el panel, con tipo y motivo (door_event).
 * "Intervención" solo se ofrece si el casillero tiene una entrega pendiente: la libera
 * e invalida el código del residente. Se cierra con true si la apertura se registró.
 */
@Component({
  selector: 'app-modal-open-door',
  standalone: true,
  imports: [
    MatIcon,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './modal-open-door.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnackBar]
})
export class ModalOpenDoor {

  // El último movimiento de la puerta es una entrega sin retiro ni intervención.
  pendiente = this.door.tipo_movimiento === 'pendiente'
  sending = signal<boolean>(false)

  form = new FormGroup({
    tipo: new FormControl<TipoApertura | null>(null, [Validators.required]),
    observacion: new FormControl('', [Validators.required, Validators.maxLength(255)]),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public door: IDoor,
    private _lockerService: LockerService,
    private _matDialogRef: MatDialogRef<ModalOpenDoor>,
    private _snackBar: SnackBar
  ) { }

  async handlerSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    const { tipo, observacion } = this.form.getRawValue()
    this.sending.set(true)
    try {
      const response = await firstValueFrom(
        this._lockerService.openManualLocker(this.door.door_id, tipo!, observacion!.trim())
      )
      if (response.meta.status === 'success') {
        this._snackBar.openSnackBar(response.meta.message)
        this._matDialogRef.close(true)
      } else {
        this._snackBar.openSnackBarError(response.meta.message)
      }
    } finally {
      this.sending.set(false)
    }
  }
}
