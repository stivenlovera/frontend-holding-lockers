import { ChangeDetectionStrategy, Component, effect, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { DatatableDoorComponent } from "../../components/datatable-door/datatable-door.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormLockerComponent } from "../../components/form-locker/form-locker.component";
import { DatatableControlerComponent } from "../../components/datatable-controler/datatable-controler.component";
import { IDataTableController, ILocker, initialStateDataTableController, initialStateLocker, ITypeLocker } from 'app/modules/locker/locker.types';
import { LockerService } from 'app/modules/locker/locker.service';

import { DoorService } from 'app/modules/door/door.service';
import { IDataTableDoor, initialStateDataTableDoor } from 'app/modules/door/door.type';
import { SnackBar } from 'app/utils/snack-bar';

@Component({
  selector: 'app-locker',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormLockerComponent,
    DatatableControlerComponent,
    DatatableDoorComponent
  ],
  templateUrl: './locker.component.html',
  styleUrl: './locker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnackBar]
})
export class LockerComponent implements OnInit {

  locker = signal<ILocker>(initialStateLocker)
  typeLocker = signal<ITypeLocker[]>([])
  dataTableDoor = signal<IDataTableDoor>(initialStateDataTableDoor)
  dataTableController = signal<IDataTableController>(initialStateDataTableController)

  locker_id: number | undefined = this._activatedRoute.snapshot.params['id'];

  constructor(
    private _lockerService: LockerService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _doorService: DoorService,
    private _snackBar: SnackBar
  ) {

  }

  ngOnInit(): void {
    this._lockerService.getLockerRequeriments().subscribe((res) => {
      if (res.meta.code === 200) {
        this.typeLocker.set(res.data.type_lockers)
        console.log('redirect')
      }
    })
    if (this.locker_id !== undefined) {
      this.onEditLocker(this.locker_id)
      this.loadDataTableController()
      this.loadDataTableDoor()
    }
  }
  ////lOCKER
  onEditLocker(locker_id: number) {
    this._lockerService.lockerEdit(locker_id).subscribe((res) => {
      if (res.meta.code === 200) {
        this.locker.set(res.data)
      }
    })
  }

  onSubmit(locker: ILocker) {
    this.locker.set(locker)
    if (this.locker_id !== undefined) {
      this.updateLocker()
    } else {
      this.storeLocker()

    }
  }

  storeLocker() {
    this._lockerService.lockerStore(this.locker()).subscribe((res) => {
      this._snackBar.openSnackBar(res.meta.message)
      if (res.meta.code === 200) {
        this._router.navigate([`locker/edit/${res.data}`])
      }
    })
  }

  updateLocker() {
    this._lockerService.lockerUpdate(this.locker()).subscribe((res) => {
      this._snackBar.openSnackBar(res.meta.message)
      if (res.meta.code === 200) {
        //this._router.navigate([`dashboard`])
      }
    })
  }

  ////CONTROLLER
  loadDataTableController() {
    this._doorService.dataTableController(
      this.locker_id,
      this.dataTableController().paginate,
      this.dataTableController().sort
    ).subscribe((res) => {
      if (res.meta.code === 200) {
        console.log('redirect')
        this.dataTableController.set(res.data)
      }
    })
  }
  ////DOOR
  loadDataTableDoor() {
    this._doorService.dataTableDoor(
      this.locker_id,
      this.dataTableDoor().paginate,
      this.dataTableDoor().sort
    ).subscribe((res) => {
      if (res.meta.code === 200) {
        console.log('redirect')
        this.dataTableDoor.set(res.data)
      }
    })
  }

  handlerReloadDataTableDoor(dataTableDoor: IDataTableDoor) {
    this.dataTableDoor.set(dataTableDoor)
    this.loadDataTableDoor()
  }

  handlerReloadDataTableController(dataTableController: IDataTableController) {
    this.dataTableController.set(dataTableController)
    this.loadDataTableController()
  }
}
