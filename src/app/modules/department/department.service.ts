import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from 'app/shared/paginator.traslate';
import { IResponse, ISort } from 'app/utils/util.types';
import { Observable } from 'rxjs';
import { IDataTableDepartament, IDataTableUser } from './department.type';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private _httpClient: HttpClient) {

  }

  //Users
  public dataTableUser(
    department_id: number,
    locker_id: number,
    { length, pageIndex, pageSize }: IPagination,
    { active, direction }: ISort
  ): Observable<IResponse<IDataTableUser>> {
    const response = this._httpClient
      .post<IResponse<IDataTableUser>>(
        `${environment.apiUrl}/user-deparment/data-table`,
        {
          department_id,
          locker_id,
          length,
          pageIndex,
          pageSize,
          active,
          direction
        }
      );
    return response;
  }

  //Departament
  public dataTableDepartment(
    locker_id: number,
    { length, pageIndex, pageSize }: IPagination,
    { active, direction }: ISort

  ): Observable<IResponse<IDataTableDepartament>> {
    const response = this._httpClient
      .post<IResponse<IDataTableDepartament>>(
        `${environment.apiUrl}/department/data-table`,
        {
          locker_id,
          length,
          pageIndex,
          pageSize,
          active,
          direction
        }
      );
    return response;
  }
}
