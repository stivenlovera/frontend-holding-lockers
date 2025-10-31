import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IDataTableUser, initialStateDataTableUser } from '../../department.type';
import { DataTableUserComponent } from '../../components/data-table-user/data-table-user.component';
import { DepartmentService } from '../../department.service';
import { take } from 'rxjs';
import { ILocker, initialStateLocker } from 'app/modules/locker/locker.types';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    DataTableUserComponent
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUserComponent implements OnInit {
  lockerId = parseInt(this._activateRoute.snapshot.paramMap.get('id')!);
  departmentId = parseInt(this._activateRoute.snapshot.paramMap.get('department_id')!);
  dataTableUser = signal<IDataTableUser>(initialStateDataTableUser)
  locker = signal<ILocker>(initialStateLocker)

  constructor(
    private _departmentService: DepartmentService,
    private _activateRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this._departmentService.dataTableUser(
      this.departmentId,
      this.lockerId,
      this.dataTableUser().paginate,
      this.dataTableUser().sort
    ).pipe(take(1)).subscribe(
      (res) => {
        this.dataTableUser.set(res.data)
        this.locker.set(res.data.locker)
      }
    )
  }
}
