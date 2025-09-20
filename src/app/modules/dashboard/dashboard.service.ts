import { Injectable } from '@angular/core';
import { IResponse } from 'app/utils/util.types';
import { Observable } from 'rxjs';
import { CardLockerProps } from './dashboard.types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private _httpClient: HttpClient
  ) { }

   public getDashboardInfo(): Observable<IResponse<CardLockerProps>> {
    const response = this._httpClient
      .get<IResponse<CardLockerProps>>(
        `${environment.apiUrl}/dashboard/info`,
      );
    return response;
  }
}
