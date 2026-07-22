import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
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
import { ModalDoorComponent } from '../modal-door/modal-door.component';
import { IDataTableController, ILocker, initialStateDataTableController, ITypeLocker } from 'app/modules/locker/locker.types';
import { LockerService } from 'app/modules/locker/locker.service';
import { IDataTableDoor, initialStateDataTableDoor } from 'app/modules/door/door.type';
import { MatSlideToggle, MatSlideToggleChange } from "@angular/material/slide-toggle";
import { Confirmation } from 'app/utils/confirmate';
import { SnackBar } from 'app/utils/snack-bar';

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
    MatSlideToggle
  ],
  templateUrl: './form-locker.component.html',
  styleUrl: './form-locker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Confirmation]
})
export class FormLockerComponent implements OnInit {
  edit = input.required<boolean>()
  locker = input.required<ILocker>()
  typeLockers = input.required<ITypeLocker[]>()
  dataTableDoor = signal<IDataTableDoor>(initialStateDataTableDoor)
  dataTableController = signal<IDataTableController>(initialStateDataTableController)
  total = signal<number>(0)

  @Output() onSubmit = new EventEmitter<ILocker>();

  formLocker = new FormGroup({
    building_id: new FormControl(-1),
    locker_id: new FormControl(-1),
    type_locker_id: new FormControl(-1),
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    state: new FormControl(-1),
    fila: new FormControl(0, [Validators.required]),
    columna: new FormControl(0, [Validators.required]),
    size: new FormControl(''),
    modificar_casillero: new FormControl(false),
  })

  constructor(
    private _matDialog: MatDialog,
    private _confimation: Confirmation
  ) {
    effect(() => {
      if (this.edit() === false) {
        this.locker().modificar_casillero = true
        this.formLocker.get('modificar_casillero')?.disable()
      }
      this.formLocker.setValue(this.locker())

      if (this.formLocker.get('modificar_casillero')?.value === false) {
        this.formLocker.get('fila')?.disable()
        this.formLocker.get('columna')?.disable()
        this.formLocker.get('size')?.disable()
      }
    })
  }

  ngOnInit(): void {
    this.formLocker.valueChanges.subscribe(nuevoValor => {
      const allValues = this.formLocker.getRawValue();
      this.total.set(allValues.fila! * allValues.columna!)
    });
  }

  handlerAddDoor() {
    this._matDialog.open(ModalDoorComponent, {
      width: '1000px',
      //height: '500px',
      data: {}
    });

  }

  handlerSubmit() {
    if (this.formLocker.valid) {
      console.log('modificar_casillero', this.formLocker.get('modificar_casillero')?.value)
      if (this.formLocker.get('modificar_casillero')?.value) {
        this._confimation.confirmation({
          title: 'Modificar los casilleros',
          message: 'Esta seguro de Modificar los casilleros se reestablecera la configuación por defecto?',
          icon: {
            show: true,
            name: "heroicons_outline:exclamation-triangle",
            color: "success"
          },
          actions: {
            confirm: {
              show: true,
              label: "Si",
              color: "warn"
            },
            cancel: {
              show: true,
              label: "Cancelar"
            }
          },
          dismissible: true
        })
          .afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
              const value = this.formLocker.getRawValue() as ILocker
              this.onSubmit.emit(value)
            }
          });
      }
      else {
        const value = this.formLocker.getRawValue() as ILocker
        this.onSubmit.emit(value)
      }
    } else {
      this.formLocker.markAllAsTouched()
    }
  }

  changeModificarCasilleros(event: MatSlideToggleChange) {
    this.formLocker.get('modificar_casillero')?.setValue(event.checked)
    if (!event.checked) {
      this.formLocker.get('fila')?.disable()
      this.formLocker.get('columna')?.disable()
      this.formLocker.get('size')?.disable()
    } else {
      this.formLocker.get('fila')?.enable()
      this.formLocker.get('columna')?.enable()
      this.formLocker.get('size')?.enable()
    }
  }

}
