import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogClose, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LockerService } from '../../locker.service';
import { SnackBar } from 'app/utils/snack-bar';
import { firstValueFrom } from 'rxjs';
import { IDepartamento } from '../../locker.types';

@Component({
  selector: 'app-modal-departament',
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
  templateUrl: './modal-departament.html',
  styleUrl: './modal-departament.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnackBar]
})
export class ModalDepartament {

  formDepartmant = new FormGroup({
    department_id: new FormControl(0),
    building_id: new FormControl(0),
    name: new FormControl(''),
    is_api: new FormControl(''),
    id_ref: new FormControl(''),
    state: new FormControl(0),
    users: new FormArray([])
  })

  get formArrayUsers(): FormArray {
    return this.formDepartmant.get('users') as FormArray;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { departamento_id: number, edit: boolean },
    private _lockerService: LockerService,
    private _matDialogRef: MatDialogRef<ModalDepartament>,
    private _snackBar: SnackBar
  ) {
    if (data.edit) {
      this.handlerEdit(this.data.departamento_id)
    }
  }

  async handlerEdit(departamento_id: number) {
    const edit = await firstValueFrom(this._lockerService.editDepartamento(departamento_id))
    this.formDepartmant.setValue({
      department_id: edit.data.department_id,
      building_id: edit.data.building_id,
      name: edit.data.name,
      is_api: edit.data.is_api,
      id_ref: edit.data.id_ref,
      state: edit.data.state,
      users: []
    })
    edit.data.users.map((u) => {
      const formUser = new FormGroup({
        user_id: new FormControl(u.user_id),
        department_id: new FormControl(u.department_id),
        name: new FormControl(u.name),
        celular: new FormControl(u.celular),
        state: new FormControl(u.state),
      })
      this.formArrayUsers.push(formUser)
    })

  }

  async handlerSubmit() {
    if (this.formDepartmant.valid) {
      const values = this.formDepartmant.getRawValue() as IDepartamento
      const update = await firstValueFrom(this._lockerService.updateDepartamento(values))
      if (update.meta.status) {
        this._snackBar.openSnackBar(update.meta.message)
        this._matDialogRef.close({ reload: true })
      }
    } else {
      this.formDepartmant.markAllAsTouched()
    }

  }
}
