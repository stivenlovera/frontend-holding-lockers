import { Injectable } from '@angular/core';
import { IResponse, ISort } from 'app/utils/util.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { IPagination } from 'app/shared/paginator.traslate';
import { IDataTableController } from '../locker/locker.types';
import { CardLockerProps } from './dashboard.types';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  public dataTableController({ length, pageIndex, pageSize }: IPagination, { active, direction }: ISort): Observable<IResponse<IDataTableController>> {
    const response = this._httpClient
      .post<IResponse<IDataTableController>>(
        `${environment.apiUrl}/controller/data-table`,
        {
          length,
          pageIndex,
          pageSize,
          active,
          direction
        }
      );
    return response;
  }

  public getDashboardInfo(): Observable<IResponse<CardLockerProps>> {
    const response = this._httpClient
      .get<IResponse<CardLockerProps>>(
        `${environment.apiUrl}/dashboard/info`,
      );
    return response;
  }

  
}
