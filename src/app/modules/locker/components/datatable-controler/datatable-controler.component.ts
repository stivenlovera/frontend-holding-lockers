import { ChangeDetectionStrategy, Component, effect, EventEmitter, input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { initialPagination } from 'app/shared/paginator.traslate';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IDataTableController } from 'app/modules/locker/locker.types';

@Component({
  selector: 'datatable-controler',
  standalone: true,
  imports: [
    MatSortModule,
    MatIcon,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './datatable-controler.component.html',
  styleUrl: './datatable-controler.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatatableControlerComponent {

  @Output() reloadDataTableController = new EventEmitter<IDataTableController>();
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  locker_id = input.required<number | undefined>()
  initialPagination = initialPagination
  dataTableController = input.required<IDataTableController>();

  constructor() {
    effect(() => {

    })
  }

  handleSorts() {
    //console.log(this._sort.active, this._sort.direction)
    this.dataTableController().sort.active = this._sort.active
    this.dataTableController().sort.direction = this._sort.direction
    this.reloadDataTableController.emit(this.dataTableController())
  }
  handlePageEvent(event: PageEvent) {
    this.dataTableController().paginate.length = event.length
    this.dataTableController().paginate.pageIndex = event.pageIndex
    this.dataTableController().paginate.pageSize = event.pageSize
    this.reloadDataTableController.emit(this.dataTableController())
  }

  handlerAddController() {
    throw new Error('Method not implemented.');
  } 
}
