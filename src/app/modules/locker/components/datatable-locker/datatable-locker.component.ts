import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { IDataTableMovement, inizializeDataTable } from '@app/modules/movement/movement.types';
import { initialPagination, IPagination } from '@app/shared/paginator.traslate';

@Component({
  selector: 'datatable-locker',
  standalone: true,
  imports: [MatPaginator],
  templateUrl: './datatable-locker.component.html',
  styleUrl: './datatable-locker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatatableLockerComponent {
  handleSorts() {
    throw new Error('Method not implemented.');
  }
  handlePageEvent($event: PageEvent) {
    throw new Error('Method not implemented.');
  }

  dataTableMovement = signal<IDataTableMovement[]>(inizializeDataTable)
  pagination = signal<IPagination>(initialPagination)
  constructor() {
    console.log('ListMovementComponent')
  }

}
