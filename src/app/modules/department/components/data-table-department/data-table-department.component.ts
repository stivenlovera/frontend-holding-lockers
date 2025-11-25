import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, PageEvent } from "@angular/material/paginator";
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Confirmation } from 'app/utils/confirmate';
import { DepartmentService } from '../../department.service';
import { SnackBar } from 'app/utils/snack-bar';
import { initialPagination, PaginateTraslate } from 'app/shared/paginator.traslate';
import { IDataTableDepartament } from '../../department.type';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'data-table-department',
  standalone: true,
  imports: [
    MatSortModule,
    MatIconModule,
    MatPaginator,
    MatChipsModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './data-table-department.component.html',
  styleUrl: './data-table-department.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    Confirmation,
    SnackBar,
    { provide: MatPaginatorIntl, useClass: PaginateTraslate }
  ]
})
export class DataTableDepartmentComponent {
  handlerNavigateUser(arg0: number) {
    throw new Error('Method not implemented.');
  }
  handlerViewDepartament(arg0: number) {
    throw new Error('Method not implemented.');
  }
  lockerId=input.required<number>()
  initialPagination = initialPagination
  dataTableDepartament = input.required<IDataTableDepartament>()

  @Output() reloaddataTableDepartament = new EventEmitter<IDataTableDepartament>();

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  constructor(
    private _matDialog: MatDialog,
    private _confirmation: Confirmation,
    private _departmentService: DepartmentService,
    private _snackBar: SnackBar
  ) {

  }

  handleSorts() {
    //console.log(this._sort.active, this._sort.direction)
    this.dataTableDepartament().sort.active = this._sort.active
    this.dataTableDepartament().sort.direction = this._sort.direction
    this.reloaddataTableDepartament.emit(this.dataTableDepartament())
  }
  handlePageEvent(event: PageEvent) {
    this.dataTableDepartament().paginate.length = event.length
    this.dataTableDepartament().paginate.pageIndex = event.pageIndex
    this.dataTableDepartament().paginate.pageSize = event.pageSize
    this.reloaddataTableDepartament.emit(this.dataTableDepartament())
  }
}
