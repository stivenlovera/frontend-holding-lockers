import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, ViewChild } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatChip } from "@angular/material/chips";
import { MatDialog } from '@angular/material/dialog';
import { Confirmation } from 'app/utils/confirmate';
import { IDataTableDepartament } from 'app/modules/door/door.type';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { initialPagination } from 'app/shared/paginator.traslate';
import { ModalDepartament } from '../modal-departament/modal-departament';

@Component({
  selector: 'datatable-departament',
  standalone: true,
  imports: [
    MatIcon,
    MatChip,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './datatable-departament.html',
  styleUrl: './datatable-departament.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Confirmation]
})
export class DatatableDepartament {

  @Output() reloadDataTableDepartament = new EventEmitter<IDataTableDepartament>();
  dataTableDepartament = input.required<IDataTableDepartament>();
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;
  @Output() getDepartamentApi = new EventEmitter();


  initialPagination = initialPagination

  constructor(
    private _matDialog: MatDialog,
    private _confirmation: Confirmation
  ) {

  }

  handleSorts() {
    this.dataTableDepartament().sort.active = this._sort.active
    this.dataTableDepartament().sort.direction = this._sort.direction
    this.reloadDataTableDepartament.emit(this.dataTableDepartament())
  }
  handlePageEvent(event: PageEvent) {
    this.dataTableDepartament().paginate.length = event.length
    this.dataTableDepartament().paginate.pageIndex = event.pageIndex
    this.dataTableDepartament().paginate.pageSize = event.pageSize
    this.reloadDataTableDepartament.emit(this.dataTableDepartament())
  }

  handlerModalDepartament({ departamento_id, edit, name }: { departamento_id: number; edit: boolean; name: string; }) {
    this._matDialog.open(ModalDepartament, {
      width: '1000px',
      //height: '500px',
      data: {
        departamento_id: departamento_id,
        edit: edit
      }
    }).afterClosed().subscribe(result => {
      console.log('subscribe', result)
      if (result !== undefined) {
        console.log('reload', result)
        this.reloadDataTableDepartament.emit(this.dataTableDepartament())
      }
    });
  }
}
