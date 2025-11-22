import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, ViewChild } from '@angular/core';
import { initialPagination, PaginateTraslate } from 'app/shared/paginator.traslate';
import { IDataTableUser, ModalUserProp } from '../../user.types';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIcon } from "@angular/material/icon";
import { MatDialog } from '@angular/material/dialog';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { MatChip, MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from '@angular/material/button';
import { Confirmation } from 'app/utils/confirmate';
import { UserService } from '../../user.service';
import { SnackBar } from 'app/utils/snack-bar';

@Component({
  selector: 'data-table-user',
  standalone: true,
  imports: [
    MatSortModule,
    MatIcon,
    MatPaginator,
    MatChipsModule,
    MatButtonModule
  ],
  templateUrl: './data-table-user.component.html',
  styleUrl: './data-table-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Confirmation, SnackBar, { provide: MatPaginatorIntl, useClass: PaginateTraslate }]
})
export class DataTableUserComponent {

  initialPagination = initialPagination
  dataTableUser = input.required<IDataTableUser>()
  @Output() reloadDataTableUser = new EventEmitter<IDataTableUser>();

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  constructor(
    private _matDialog: MatDialog,
    private _confirmation: Confirmation,
    private _userService: UserService,
    private _snackBar: SnackBar
  ) {

  }

  handleSorts() {
    //console.log(this._sort.active, this._sort.direction)
    this.dataTableUser().sort.active = this._sort.active
    this.dataTableUser().sort.direction = this._sort.direction
    this.reloadDataTableUser.emit(this.dataTableUser())
  }
  handlePageEvent(event: PageEvent) {
    this.dataTableUser().paginate.length = event.length
    this.dataTableUser().paginate.pageIndex = event.pageIndex
    this.dataTableUser().paginate.pageSize = event.pageSize
    this.reloadDataTableUser.emit(this.dataTableUser())
  }

  handlerOpenModalUser(modalUser: ModalUserProp) {
    this._matDialog.open(ModalUserComponent, {
      width: '800px',
      //height: '500px',
      data: modalUser
    }).afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.reloadDataTableUser.emit(this.dataTableUser())
      }
    })
  }

  rolesToArray(roles: string): string[] {
    const rolesArray = roles.split(',')
    return rolesArray;
  }

  handlerOpenDeleteUser(user_id: number) {
    console.log('handlerDeleteUser', user_id)
    this._confirmation.confirmation({
      title: 'Eliminar',
      message: 'Esta seguro de eliminar este usuario?',
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
          this.handlerDeleteUser(user_id)
        } else {

        }
      });
  }
  handlerDeleteUser(user_id: number) {
    this._userService.userDelete(user_id).subscribe((res) => {
      if (res.meta.code === 200) {
        this._snackBar.openSnackBar(res.meta.message)
        this.reloadDataTableUser.emit(this.dataTableUser())
      }
    })
  }
}
