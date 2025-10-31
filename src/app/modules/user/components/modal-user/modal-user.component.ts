import { ChangeDetectionStrategy, Component, Inject, input, signal } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogTitle, MatDialogClose, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatLabel, MatFormFieldModule } from "@angular/material/form-field";
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { IRoles, IUser, ModalUserProp } from '../../user.types';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../user.service';
import { lastValueFrom } from 'rxjs';
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { SnackBar } from 'app/utils/snack-bar';
import { IBuilding } from 'app/modules/building/building.types';

@Component({
  selector: 'app-modal-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatFormFieldModule,
    MatLabel,
    MatSelectModule,
    MatDialogActions,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSlideToggle
  ],
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnackBar]
})
export class ModalUserComponent {

  roles = signal<IRoles[]>([])
  buildings = signal<IBuilding[]>([])

  formUser = new FormGroup({
    id: new FormControl(-1),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    roles: new FormControl([1], [Validators.required]),
    celular: new FormControl('', [Validators.required]),
    reset_password: new FormControl(false),
    password: new FormControl('', [Validators.required]),
    buildings: new FormControl([], [Validators.required]),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalUserProp,
    private _matDialogRef: MatDialogRef<ModalUserComponent>,
    private _userService: UserService,
    private _snackBar: SnackBar
  ) {
    if (!data.edit) {
      this.formUser.get('reset_password').setValue(true)
    }
    this.requirement()
    this.handlerChangeResetPassword()
  }

  handlerSubmit() {
    if (this.formUser.valid) {
      if (this.data.edit) {
        this.updateUser()
      } else {
        this.storeUser()
      }
    } else {
      this.formUser.markAllAsTouched()
    }
  }

  async requirement() {
    const res = await lastValueFrom(this._userService.userRequeriments());
    this.roles.set(res.data.roles)
    this.buildings.set(res.data.buildings)
    if (this.data.edit) {
      this.editUser()
    }
  }

  storeUser() {
    const formUser = this.formUser.value as IUser;
    this._userService.userStore(formUser).subscribe(
      (res) => {
        if (res.meta.code === 200) {
          this._snackBar.openSnackBar(res.meta.message)
          this._matDialogRef.close(this.data)
        }
      })
  }
  updateUser() {
    const formUser = this.formUser.value as IUser;
    this._userService.userUpdate(formUser).subscribe(
      (res) => {
        if (res.meta.code === 200) {
          this._snackBar.openSnackBar(res.meta.message)
          this._matDialogRef.close(this.data)
        }
      })
  }
  editUser() {
    this._userService.userEdit(this.data.user_id).subscribe(
      (res) => {
        if (res.meta.code === 200) {
          this.formUser.setValue(res.data)
        }
      })
  }

  handlerChangeResetPassword() {
    if (this.formUser.get('reset_password').value === true) {
      this.formUser.get('password').setValue('');
      this.formUser.get('password').setValidators(Validators.required);
      this.formUser.get('password').updateValueAndValidity();
    }
    else {
      this.formUser.get('password').setValidators(null);
      this.formUser.get('password').updateValueAndValidity();
    }
  }

  checkRol() {
    const roles = this.formUser.get('roles').value as number[]
    const rol = roles.filter((rol) => rol === 2)
    if (rol.length > 0) {
      return true
    } else {
      return false
    }
  }
}
