import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from "@angular/material/paginator";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { IDataTableUser } from '../../department.type';
import { initialPagination, PaginateTraslate } from 'app/shared/paginator.traslate';
import { Confirmation } from 'app/utils/confirmate';
import { SnackBar } from 'app/utils/snack-bar';

@Component({
  selector: 'data-table-user',
  standalone: true,
  imports: [
    MatSortModule,
    MatIconModule,
    MatPaginator,
    MatChipsModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './data-table-user.component.html',
  styleUrl: './data-table-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    Confirmation,
    SnackBar,
    { provide: MatPaginatorIntl, useClass: PaginateTraslate }
  ]
})
export class DataTableUserComponent {

  handlePageEvent($event: PageEvent) {
    throw new Error('Method not implemented.');
  }
  handlerViewDepartament(arg0: number) {
    throw new Error('Method not implemented.');
  }

  initialPagination = initialPagination
  dataTableUsers = input.required<IDataTableUser>()

  handleSorts() {
    throw new Error('Method not implemented.');
  }
}
