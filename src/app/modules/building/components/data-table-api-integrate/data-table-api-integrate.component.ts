import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { initialPagination, PaginateTraslate } from 'app/shared/paginator.traslate';
import { IDataTableApiIntegration } from '../../building.types';

@Component({
  selector: 'data-table-api-integrate',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './data-table-api-integrate.component.html',
  styleUrl: './data-table-api-integrate.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatPaginatorIntl, useClass: PaginateTraslate }]
})
export class DataTableApiIntegrateComponent {

  initialPagination = initialPagination
  dataTableApiIntegration = input.required<IDataTableApiIntegration>()
  @Output() reloaddataTableApiIntegration = new EventEmitter<IDataTableApiIntegration>();

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  constructor() {

  }

  handleSorts() {
    this.dataTableApiIntegration().sort.active = this._sort.active
    this.dataTableApiIntegration().sort.direction = this._sort.direction
    this.reloaddataTableApiIntegration.emit(this.dataTableApiIntegration())
  }

  handlePageEvent(event: PageEvent) {
    this.dataTableApiIntegration().paginate.length = event.length
    this.dataTableApiIntegration().paginate.pageIndex = event.pageIndex
    this.dataTableApiIntegration().paginate.pageSize = event.pageSize
    this.reloaddataTableApiIntegration.emit(this.dataTableApiIntegration())
  }

}
