import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { DataTableDepartmentComponent } from "../../components/data-table-department/data-table-department.component";
import { IDataTableDepartament, initialStateDataTableDepartament } from '../../department.type';
import { DepartmentService } from '../../department.service';
import { take } from 'rxjs';
import { IBuilding, initialStateBuilding } from 'app/modules/building/building.types';
import { ILocker, initialStateLocker } from 'app/modules/locker/locker.types';

@Component({
  selector: 'app-list-department',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    DataTableDepartmentComponent
  ],
  templateUrl: './list-department.component.html',
  styleUrl: './list-department.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDepartmentComponent implements OnInit {

  lockerId = parseInt(this._activateRoute.snapshot.paramMap.get('id')!);
  locker = signal<ILocker>(initialStateLocker)
  dataTableDepartament = signal<IDataTableDepartament>(initialStateDataTableDepartament)

  constructor(
    private _activateRoute: ActivatedRoute,
    private _departmentService: DepartmentService
  ) {

  }

  ngOnInit(): void {
    this.loadTableDepartament();
  }

  loadTableDepartament() {
    this._departmentService.dataTableDepartment(this.lockerId, this.dataTableDepartament().paginate, this.dataTableDepartament().sort).pipe(take(1)).subscribe
      (
        (res) => {
          this.dataTableDepartament.set(res.data)
          this.locker.set(res.data.locker)
        }
      )
  }
  reloaddataTableDepartament($event: any) {
    this.loadTableDepartament();
  }
}
