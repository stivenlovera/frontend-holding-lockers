import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, signal, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIcon } from "@angular/material/icon";
import { PageEvent, MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { initialPagination, IPagination } from 'app/shared/paginator.traslate';

import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IDataTableDoor, ModalDoorProp } from 'app/modules/door/door.type';
import { MatDialog } from '@angular/material/dialog';
import { Confirmation } from 'app/utils/confirmate';
import { MatChipsModule } from "@angular/material/chips";
import { ModalDoorComponent } from '../../modal-door/modal-door.component';

@Component({
  selector: 'datatable-door',
  standalone: true,
  imports: [
    MatSortModule,
    MatIcon,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule
  ],
  templateUrl: './datatable-door.component.html',
  styleUrl: './datatable-door.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Confirmation]
})
export class DatatableDoorComponent {


  @Output() reloadDataTableDoor = new EventEmitter<IDataTableDoor>();
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  locker_id = input.required<number | undefined>()
  initialPagination = initialPagination
  dataTableDoor = input.required<IDataTableDoor>();

  constructor(
    private _matDialog: MatDialog,
    private _confirmation: Confirmation
  ) {

  }

  handleSorts() {
    this.dataTableDoor().sort.active = this._sort.active
    this.dataTableDoor().sort.direction = this._sort.direction
    this.reloadDataTableDoor.emit(this.dataTableDoor())
  }
  handlePageEvent(event: PageEvent) {
    this.dataTableDoor().paginate.length = event.length
    this.dataTableDoor().paginate.pageIndex = event.pageIndex
    this.dataTableDoor().paginate.pageSize = event.pageSize
    this.reloadDataTableDoor.emit(this.dataTableDoor())
  }

  handlerOpenModalController(modalDoor: ModalDoorProp) {
    this._matDialog.open(ModalDoorComponent, {
      width: '1000px',
      //height: '500px',
      data: modalDoor
    }).afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.reloadDataTableDoor.emit(this.dataTableDoor())
      }
    });
  }

  handlerDelete(door_id: number) {
    this._confirmation.confirmation({
      title: 'Eliminar',
      message: 'Esta seguro de eliminar este registro?',
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

        } else {

        }
      });
  }
}
