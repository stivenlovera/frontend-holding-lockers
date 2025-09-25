import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, signal, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IDataTableMovement } from 'app/modules/movement/movement.type';
import { initialPagination, IPagination } from 'app/shared/paginator.traslate';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'datatable-movement',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,

  ],
  templateUrl: './datatable-movement.component.html',
  styleUrl: './datatable-movement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatatableLockerComponent {
  initialPagination = initialPagination
  dataTableMovement = input.required<IDataTableMovement>()
  @Output() reloadDataTableMovement = new EventEmitter<IDataTableMovement>();

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  handleSorts() {
    //console.log(this._sort.active, this._sort.direction)
    this.dataTableMovement().sort.active = this._sort.active
    this.dataTableMovement().sort.direction = this._sort.direction
    this.reloadDataTableMovement.emit(this.dataTableMovement())
  }
  handlePageEvent(event: PageEvent) {
    this.dataTableMovement().paginate.length = event.length
    this.dataTableMovement().paginate.pageIndex = event.pageIndex
    this.dataTableMovement().paginate.pageSize = event.pageSize
    this.reloadDataTableMovement.emit(this.dataTableMovement())
  }

  constructor() {

  }

}
