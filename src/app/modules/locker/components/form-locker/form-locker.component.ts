import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatSelect } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDivider } from "@angular/material/divider";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatRadioGroup, MatRadioButton } from "@angular/material/radio";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { DatatableDoorComponent } from "../datatable-door/datatable-door.component";
import { DatatableControlerComponent } from "../datatable-controler/datatable-controler.component";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalDoorComponent } from '../../modal-door/modal-door.component';
import { IDataTableController, ILocker, initialStateDataTableController, ITypeLocker } from 'app/modules/locker/locker.types';
import { LockerService } from 'app/modules/locker/locker.service';
import { IDataTableDoor, initialStateDataTableDoor } from 'app/modules/door/door.type';

@Component({
  selector: 'form-locker',
  standalone: true,
  imports: [
    MatSelect,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './form-locker.component.html',
  styleUrl: './form-locker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLockerComponent {

  locker = input.required<ILocker>()
  typeLockers = input.required<ITypeLocker[]>()
  dataTableDoor = signal<IDataTableDoor>(initialStateDataTableDoor)
  dataTableController = signal<IDataTableController>(initialStateDataTableController)

  @Output() onSubmit = new EventEmitter<ILocker>();

  formLocker = new FormGroup({
    building_id: new FormControl(-1),
    locker_id: new FormControl(-1),
    type_locker_id: new FormControl(-1),
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    state: new FormControl(-1)
  })

  constructor(
    private _matDialog: MatDialog,
  ) {
    effect(() => {
      this.loadFormController()
      this.formLocker.setValue(this.locker())
    })
  }

  /* get formArrayDoor(): FormArray {
    return this.formLocker.get('doors') as FormArray
  }

  get formArrayController(): FormArray {
    return this.formLocker.get('controllers') as FormArray
  } */

  handlerAddDoor() {
    this._matDialog.open(ModalDoorComponent, {
      width: '1000px',
      //height: '500px',
      data: {}
    });

    /* this.formArrayDoor.push(new FormGroup({
      controller_id: new FormControl(initialStateDoor.controller_id),
      door_id: new FormControl(initialStateDoor.door_id),
      door_size_id: new FormControl(initialStateDoor.door_size_id),
      number: new FormControl(initialStateDoor.number),
      state: new FormControl(initialStateDoor.state),
      create_at: new FormControl(initialStateDoor.create_at)
    })); */
  }
  handlerCloseDoor(index: number) {
    /* this.formArrayDoor.removeAt(index); */
  }
  handlerAddController() {
    /* this.formArrayController.push(new FormGroup({
      controller_id: new FormControl(initialStateController.controller_id),
      locker_id: new FormControl(initialStateController.locker_id),
      address485: new FormControl(initialStateController.address485),
      create_at: new FormControl(initialStateController.create_at)
    })); */
  }
  handlerCloseController(index: number) {
    /* this.formArrayController.removeAt(index); */
  }

  private loadFormController() {
    /* this.formArrayController.clear();
    this.locker().controllers.map((c) => {
      this.formArrayController.push(new FormGroup({
        controller_id: new FormControl(c.controller_id),
        locker_id: new FormControl(c.locker_id),
        address485: new FormControl(c.address485),
        create_at: new FormControl(c.create_at)
      }))
    }) */
  }

  handlerSubmit() {
    if (this.formLocker.valid) {
      const value = this.formLocker.value as ILocker
      this.onSubmit.emit(value)
    } else {
      this.formLocker.markAllAsTouched()
    }
  }
}
