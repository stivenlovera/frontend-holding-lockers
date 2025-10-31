import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogClose, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { IDoor, ISizeDoor, ModalDoorProp } from 'app/modules/door/door.type';
import { DoorService } from 'app/modules/door/door.service';
import { IController } from 'app/modules/locker/locker.types';
import { SnackBar } from 'app/utils/snack-bar';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal-door',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './modal-door.component.html',
  styleUrl: './modal-door.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnackBar]
})
export class ModalDoorComponent {

  formDoor = new FormGroup({
    door_id: new FormControl(-1, [Validators.required]),
    door_size_id: new FormControl(1, [Validators.required]),
    controller_id: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    order: new FormControl(1, [Validators.required]),
    state: new FormControl(1, [Validators.required])
  })

  door_sizes = signal<ISizeDoor[]>([])
  controllers = signal<IController[]>([])

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalDoorProp,
    private _matDialogRef: MatDialogRef<ModalDoorComponent>,
    private _doorService: DoorService,
    private _snackBar: SnackBar
  ) {

    this.requeriment()
    if (this.data.edit) {
      this.editDoor()
    }
  }

  handlerSubmit() {
    if (this.formDoor.valid) {
      if (this.data.edit) {
        console.log('editar')
        this.updateDoor()
      } else {
        console.log('store')
        this.storeDoor()
      }
    } else {
      this.formDoor.markAllAsTouched()
    }
    console.log(this.formDoor.value)
  }

  async requeriment() {
    const res = await lastValueFrom(this._doorService.doorRequeriments(this.data.locker_id));
    this.door_sizes.set(res.data.door_sizes)
    this.controllers.set(res.data.controllers)
  }

  storeDoor() {
    const door = this.formDoor.value as IDoor;
    this._doorService.doorStore(door).subscribe(
      (res) => {
        if (res.meta.code === 200) {
          this._snackBar.openSnackBar(res.meta.message)
          this._matDialogRef.close(this.data)
        }
      }
    )
  }

  updateDoor() {
    const door = this.formDoor.value as IDoor;
    this._doorService.doorUpdate(door).subscribe(
      (res) => {
        if (res.meta.code === 200) {
          this._snackBar.openSnackBar(res.meta.message)
          this._matDialogRef.close(this.data)
        }
      }
    )
  }

  editDoor() {
    const door = this.formDoor.value as IDoor;
    this._doorService.doorEdit(this.data.door_id).subscribe(
      (res) => {
        if (res.meta.code === 200) {
          this.formDoor.setValue(res.data)
        }
      }
    )
  }


  /* deleteDoor() {
    this._doorService.doorDelete().subscribe(
      (res) => {
        console.log(res)
      }
    )
  } */
}
