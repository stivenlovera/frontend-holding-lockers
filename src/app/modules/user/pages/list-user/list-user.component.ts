import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../user.service';
import { IDataTableUser, initialStateDataTableUser } from '../../user.types';
import { take } from 'rxjs';
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { DataTableUserComponent } from "../../components/data-table-user/data-table-user.component";

@Component({
  selector: 'list-user',
  standalone: true,
  imports: [RouterLink, MatIcon, DataTableUserComponent],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUserComponent implements OnInit {

  dataTableUser = signal<IDataTableUser>(initialStateDataTableUser)

  constructor(
    private _userService: UserService
  ) {

  }
  ngOnInit(): void {
    this.inizializeDataTable()
  }

  inizializeDataTable() {
    this._userService.dataTableUser(this.dataTableUser().paginate, this.dataTableUser().sort).pipe(take(1)).subscribe(
      res => {
        this.dataTableUser.set(res.data)
      }
    )
  }

  handlerLoadDataTableUser(dataTableUser: IDataTableUser) {
    this.dataTableUser.set(dataTableUser)
    this.inizializeDataTable()
  }
}
